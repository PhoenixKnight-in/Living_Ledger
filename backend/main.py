from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta
import httpx
import asyncio
import os
from enum import Enum
import uuid
import json
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import IndexModel
from bson import ObjectId
import certifi
from dotenv import load_dotenv

app = FastAPI(title="Living Ledger API", description="Dynamic Financial Identity Platform")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
load_dotenv()

# MongoDB Configuration
MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = "Finera"

# MongoDB client
client = None
db = None

def serialize_mongo_doc(doc):
    """Convert MongoDB document to JSON serializable format"""
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_mongo_doc(item) for item in doc]
    if isinstance(doc, dict):
        serialized = {}
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                serialized[key] = str(value)
            elif isinstance(value, datetime):
                serialized[key] = value.isoformat()
            elif isinstance(value, dict):
                serialized[key] = serialize_mongo_doc(value)
            elif isinstance(value, list):
                serialized[key] = serialize_mongo_doc(value)
            else:
                serialized[key] = value
        return serialized
    elif isinstance(doc, ObjectId):
        return str(doc)
    elif isinstance(doc, datetime):
        return doc.isoformat()
    else:
        return doc

@app.on_event("startup")
async def startup_db():
    """Initialize MongoDB connection"""
    global client, db
    try:
        client = AsyncIOMotorClient(MONGODB_URL, tlsCAFile=certifi.where())
        db = client[DATABASE_NAME]
        
        # Create indexes for better performance
        await db.users.create_index("user_id", unique=True)
        await db.transactions.create_index([("user_id", 1), ("timestamp", -1)])
        await db.financial_stories.create_index([("user_id", 1), ("timestamp", -1)])
        await db.digital_assets.create_index("user_id")
        
        print("Connected to MongoDB successfully")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")

@app.on_event("shutdown")
async def shutdown_db():
    """Close MongoDB connection"""
    if client:
        client.close()

# Pydantic Models
class AssetType(str, Enum):
    CRYPTO = "crypto"
    STOCK = "stock"
    MUTUAL_FUND = "mutual_fund"
    ETF = "etf"

class User(BaseModel):
    user_id: str
    name: str
    email: str
    phone: str
    created_at: datetime = datetime.now()

class DigitalAsset(BaseModel):
    symbol: str
    name: str
    asset_type: AssetType
    quantity: float
    current_price: float
    value: float
    change_24h: float
    last_updated: datetime

class Transaction(BaseModel):
    transaction_id: str = str(uuid.uuid4())
    user_id: str
    from_user: str
    to_user: str
    amount: float
    currency: str = "INR"
    description: str
    timestamp: datetime = datetime.now()
    status: str = "completed"

class FinancialStoryEvent(BaseModel):
    event_id: str = str(uuid.uuid4())
    user_id: str
    event_type: str  # "investment", "expense", "income", "milestone"
    title: str
    description: str
    amount: float
    category: str
    timestamp: datetime
    impact_score: float  # -1 to 1, how this affects financial health

class PaymentRequest(BaseModel):
    to_phone: str
    amount: float
    description: str

class AddAssetRequest(BaseModel):
    symbol: str
    asset_type: AssetType
    quantity: float

class Portfolio(BaseModel):
    user_id: str
    total_value: float
    assets: List[DigitalAsset]
    daily_change: float
    weekly_change: float
    last_updated: datetime

# Real API Clients
class CoinGeckoClient:
    BASE_URL = "https://api.coingecko.com/api/v3"
    
    @staticmethod
    async def get_crypto_prices(symbols: List[str]) -> Dict:
        """Get real cryptocurrency prices from CoinGecko"""
        async with httpx.AsyncClient() as client:
            try:
                symbol_string = ",".join(symbols)
                response = await client.get(
                    f"{CoinGeckoClient.BASE_URL}/simple/price",
                    params={
                        "ids": symbol_string,
                        "vs_currencies": "inr,usd",
                        "include_24hr_change": "true"
                    },
                    timeout=10.0
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    print(f"CoinGecko API error: {response.status_code}")
                    return {}
            except Exception as e:
                print(f"CoinGecko API exception: {e}")
                return {}

    @staticmethod
    async def get_single_crypto_price(symbol: str) -> Dict:
        """Get single cryptocurrency price"""
        result = await CoinGeckoClient.get_crypto_prices([symbol])
        return result.get(symbol, {})

class AlphaVantageClient:
    BASE_URL = "https://www.alphavantage.co/query"
    API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")  # Get free key from alphavantage.co
    
    @staticmethod
    async def get_stock_price(symbol: str) -> Dict:
        """Get real stock price from Alpha Vantage"""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    AlphaVantageClient.BASE_URL,
                    params={
                        "function": "GLOBAL_QUOTE",
                        "symbol": symbol,
                        "apikey": AlphaVantageClient.API_KEY
                    },
                    timeout=10.0
                )
                print(f"Alpha Vantage API response: {response.json()}")
                if response.status_code == 200:
                    data = response.json()
                    if "Global Quote" in data:
                        quote = data["Global Quote"]
                        return {
                            "price": float(quote.get("05. price", 0)),
                            "change": float(quote.get("09. change", 0)),
                            "change_percent": quote.get("10. change percent", "0%")
                        }
                    else:
                        print(f"Alpha Vantage API response: {data}")
                        return await AlphaVantageClient._get_fallback_price(symbol)
                else:
                    return await AlphaVantageClient._get_fallback_price(symbol)
            except Exception as e:
                print(f"Alpha Vantage API exception: {e}")
                return await AlphaVantageClient._get_fallback_price(symbol)
    
    @staticmethod
    async def _get_fallback_price(symbol: str) -> Dict:
        """Fallback prices for demo when API is unavailable"""
        fallback_prices = {
            "RELIANCE.BO": {"price": 2500.50, "change": 1.2, "change_percent": "+0.48%"},
            "TCS.BO": {"price": 3200.75, "change": -0.8, "change_percent": "-0.025%"},
            "INFY.BO": {"price": 1450.25, "change": 2.1, "change_percent": "+0.145%"},
            "HDFCBANK.BO": {"price": 1600.00, "change": 0.5, "change_percent": "+0.031%"},
            "AAPL": {"price": 150.00, "change": 2.5, "change_percent": "+1.69%"},
            "GOOGL": {"price": 2500.00, "change": -5.0, "change_percent": "-0.20%"}
        }
        return fallback_prices.get(symbol, {"price": 100.0, "change": 0.0, "change_percent": "0%"})

class YahooFinanceClient:
    @staticmethod
    async def get_indian_stock_price(symbol: str) -> Dict:
        """Get Indian stock prices using Yahoo Finance alternative"""
        # For hackathons, you can use yfinance library or financial data APIs
        # This is a simplified implementation
        try:
            # Add .NS for NSE or .BO for BSE
            if not symbol.endswith(('.NS', '.BO')):
                symbol = f"{symbol}.NS"
            
            # Use Alpha Vantage as fallback for Indian stocks
            return await AlphaVantageClient.get_stock_price(symbol)
        except Exception as e:
            print(f"Yahoo Finance exception: {e}")
            return {"price": 100.0, "change": 0.0, "change_percent": "0%"}

# Utility Functions
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """Mock authentication - return user ID"""
    # In production, validate JWT token
    return "test_user_123"  # Mock user ID

async def calculate_financial_health_score(user_id: str) -> float:
    """Calculate dynamic financial health score"""
    try:
        # Get recent transactions from MongoDB
        thirty_days_ago = datetime.now() - timedelta(days=30)
        transactions = await db.transactions.find({
            "user_id": user_id,
            "timestamp": {"$gte": thirty_days_ago}
        }).to_list(None)
        
        income = sum(t["amount"] for t in transactions if t["amount"] > 0)
        expenses = sum(abs(t["amount"]) for t in transactions if t["amount"] < 0)
        
        if income == 0:
            return 0.5  # Neutral score
        
        savings_rate = (income - expenses) / income if income > 0 else 0
        return max(0, min(1, 0.5 + savings_rate))
    except Exception:
        return 0.5

# API Endpoints

@app.post("/api/users/register")
async def register_user(user: User):
    """Register a new user"""
    try:
        # Check if user exists
        existing_user = await db.users.find_one({"user_id": user.user_id})
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")
        
        # Insert new user
        user_dict = user.dict()
        user_dict["created_at"] = datetime.now()
        result = await db.users.insert_one(user_dict)
        
        return {"message": "User registered successfully", "user_id": user.user_id}
    except Exception as e:
        if "User already exists" in str(e):
            raise e
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")

@app.post("/api/assets/add")
async def add_asset(asset_request: AddAssetRequest, current_user: str = Depends(get_current_user)):
    """Add a digital asset to user's portfolio"""
    try:
        # Get real-time price based on asset type
        if asset_request.asset_type == AssetType.CRYPTO:
            price_data = await CoinGeckoClient.get_single_crypto_price(asset_request.symbol.lower())
            current_price = price_data.get("inr", 0)
            change_24h = price_data.get("inr_24h_change", 0)
            name = asset_request.symbol.upper()
        else:
            # Stock/ETF/Mutual Fund
            if asset_request.asset_type == AssetType.STOCK:
                price_data = await AlphaVantageClient.get_stock_price(asset_request.symbol)
            else:
                price_data = await YahooFinanceClient.get_indian_stock_price(asset_request.symbol)
            
            current_price = price_data.get("price", 0)
            change_24h = price_data.get("change", 0)
            name = asset_request.symbol.upper()
        
        # Create asset document
        asset = {
            "user_id": current_user,
            "symbol": asset_request.symbol.upper(),
            "name": name,
            "asset_type": asset_request.asset_type.value,
            "quantity": asset_request.quantity,
            "current_price": current_price,
            "value": current_price * asset_request.quantity,
            "change_24h": change_24h,
            "last_updated": datetime.now()
        }
        
        result = await db.digital_assets.insert_one(asset)
        asset["_id"] = str(result.inserted_id)  # Convert ObjectId to string
        
        return {"message": "Asset added successfully", "asset": serialize_mongo_doc(asset)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add asset: {str(e)}")

@app.get("/api/portfolio/{user_id}")
async def get_user_portfolio(user_id: str):
    """Get user's real-time digital asset portfolio"""
    try:
        # Check if user exists
        user = await db.users.find_one({"user_id": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Get user's assets
        assets = await db.digital_assets.find({"user_id": user_id}).to_list(None)
        
        updated_assets = []
        total_value = 0
        total_change = 0
        
        for asset in assets:
            # Get real-time prices
            if asset["asset_type"] == "crypto":
                price_data = await CoinGeckoClient.get_single_crypto_price(asset["symbol"].lower())
                current_price = price_data.get("inr", asset["current_price"])
                change_24h = price_data.get("inr_24h_change", asset["change_24h"])
            else:
                price_data = await AlphaVantageClient.get_stock_price(asset["symbol"])
                current_price = price_data.get("price", asset["current_price"])
                change_24h = price_data.get("change", asset["change_24h"])
            
            # Update asset values
            value = current_price * asset["quantity"]
            updated_asset = {
                **serialize_mongo_doc(asset),  # Serialize the asset
                "current_price": current_price,
                "value": value,
                "change_24h": change_24h,
                "last_updated": datetime.now().isoformat()
            }
            
            # Update in database
            await db.digital_assets.update_one(
                {"_id": asset["_id"]},
                {"$set": {
                    "current_price": current_price,
                    "value": value,
                    "change_24h": change_24h,
                    "last_updated": datetime.now()
                }}
            )
            
            updated_assets.append(updated_asset)
            total_value += value
            total_change += (change_24h * value / 100) if change_24h else 0
        
        return {
            "user_id": user_id,
            "total_value": total_value,
            "assets": updated_assets,
            "daily_change": total_change,
            "weekly_change": total_change * 5,  # Approximation
            "last_updated": datetime.now().isoformat()
        }
    except Exception as e:
        if "User not found" in str(e):
            raise e
        raise HTTPException(status_code=500, detail=f"Failed to get portfolio: {str(e)}")

@app.post("/api/transactions/send")
async def send_money(payment: PaymentRequest):
    """Send money to another user via phone number"""
    current_user = "test_user_123"  # Mock user for testing
    try:
        # Create transaction document
        transaction = {
            "transaction_id": str(uuid.uuid4()),
            "user_id": current_user,
            "from_user": current_user,
            "to_user": payment.to_phone,
            "amount": -payment.amount,  # Negative for sender
            "currency": "INR",
            "description": payment.description,
            "timestamp": datetime.now(),
            "status": "completed"
        }
        
        result = await db.transactions.insert_one(transaction)
        
        # Add to financial story
        story_event = {
            "event_id": str(uuid.uuid4()),
            "user_id": current_user,
            "event_type": "expense",
            "title": f"Sent ₹{payment.amount}",
            "description": f"Payment to {payment.to_phone}: {payment.description}",
            "amount": -payment.amount,
            "category": "transfer",
            "timestamp": datetime.now(),
            "impact_score": -0.1 if payment.amount < 1000 else -0.3
        }
        
        await db.financial_stories.insert_one(story_event)
        
        return {"message": "Payment sent successfully", "transaction_id": transaction["transaction_id"]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transaction failed: {str(e)}")

@app.get("/api/financial-story/{user_id}")
async def get_financial_story(user_id: str):
    """Get user's dynamic financial story timeline"""
    try:
        # Check if user exists
        user = await db.users.find_one({"user_id": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Get recent events
        events = await db.financial_stories.find(
            {"user_id": user_id}
        ).sort("timestamp", -1).limit(10).to_list(None)
        
        # Serialize events
        serialized_events = serialize_mongo_doc(events)
        
        # Calculate insights
        health_score = await calculate_financial_health_score(user_id)
        
        # Generate dynamic insights
        insights = []
        if health_score > 0.7:
            insights.append("Your financial health is excellent! Keep up the great savings habit.")
        elif health_score > 0.5:
            insights.append("You're doing well financially. Consider investing more in growth assets.")
        else:
            insights.append("Focus on reducing expenses and building an emergency fund.")
        
        return {
            "user_id": user_id,
            "health_score": health_score,
            "timeline": serialized_events,
            "insights": insights,
            "milestones": [
                {"title": "First Investment", "date": "2024-01-15", "achieved": True},
                {"title": "₹1 Lakh Portfolio", "date": "2024-06-01", "achieved": True},
                {"title": "₹5 Lakh Portfolio", "date": "2024-12-31", "achieved": False}
            ]
        }
    except Exception as e:
        if "User not found" in str(e):
            raise e
        raise HTTPException(status_code=500, detail=f"Failed to get financial story: {str(e)}")

@app.get("/api/crypto-prices")
async def get_crypto_prices():
    """Get current cryptocurrency prices"""
    symbols = ["bitcoin", "ethereum", "cardano", "polkadot", "chainlink"]
    prices = await CoinGeckoClient.get_crypto_prices(symbols)
    return prices

@app.get("/api/stock-prices/{symbol}")
async def get_stock_price(symbol: str):
    """Get real stock price"""
    price_data = await AlphaVantageClient.get_stock_price(symbol)
    return {
        "symbol": symbol,
        "price": price_data["price"],
        "change": price_data["change"],
        "change_percent": price_data.get("change_percent", "0%"),
        "currency": "INR" if symbol.endswith(('.NS', '.BO')) else "USD",
        "last_updated": datetime.now().isoformat()
    }

@app.get("/api/dashboard/{user_id}")
async def get_dashboard(user_id: str):
    """Get comprehensive dashboard data"""
    try:
        # Get all user data
        portfolio = await get_user_portfolio(user_id)
        financial_story = await get_financial_story(user_id)
        
        # Calculate monthly summary from transactions
        thirty_days_ago = datetime.now() - timedelta(days=30)
        transactions = await db.transactions.find({
            "user_id": user_id,
            "timestamp": {"$gte": thirty_days_ago}
        }).to_list(None)
        
        income = sum(t["amount"] for t in transactions if t["amount"] > 0)
        expenses = sum(abs(t["amount"]) for t in transactions if t["amount"] < 0)
        savings = income - expenses
        
        # Calculate investment growth (mock for now)
        investment_growth = portfolio["daily_change"] * 30 if portfolio["daily_change"] else 0
        
        monthly_summary = {
            "income": income,
            "expenses": expenses,
            "savings": savings,
            "investment_growth": investment_growth
        }
        
        return {
            "user_id": user_id,
            "portfolio": portfolio,
            "financial_story": financial_story,
            "monthly_summary": monthly_summary,
            "quick_actions": [
                {"action": "invest", "title": "Invest ₹5000", "suggestion": "SIP in Nifty 50"},
                {"action": "save", "title": "Emergency Fund", "suggestion": "Build 6 months expenses"},
                {"action": "optimize", "title": "Reduce Expenses", "suggestion": "Cut subscription costs"}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get dashboard: {str(e)}")

@app.post("/api/mock-data/{user_id}")
async def generate_mock_data(user_id: str):
    """Generate mock data for hackathon purposes"""
    try:
        # Check/Create user
        user = await db.users.find_one({"user_id": user_id})
        if not user:
            mock_user = {
                "user_id": user_id,
                "name": "Mock User",
                "email": f"{user_id}@example.com",
                "phone": f"+91{user_id[-10:] if len(user_id) >= 10 else '9876543210'}",
                "created_at": datetime.now()
            }
            await db.users.insert_one(mock_user)
        
        # Generate mock transactions
        mock_transactions = [
            {"amount": 50000, "description": "Salary Credit", "timestamp": datetime.now() - timedelta(days=1)},
            {"amount": -2500, "description": "Grocery Shopping", "timestamp": datetime.now() - timedelta(days=2)},
            {"amount": -10000, "description": "SIP Investment", "timestamp": datetime.now() - timedelta(days=5)},
            {"amount": -1200, "description": "Netflix Subscription", "timestamp": datetime.now() - timedelta(days=7)},
        ]
        
        for trans in mock_transactions:
            transaction = {
                "transaction_id": str(uuid.uuid4()),
                "user_id": user_id,
                "from_user": user_id,
                "to_user": "system",
                "amount": trans["amount"],
                "currency": "INR",
                "description": trans["description"],
                "timestamp": trans["timestamp"],
                "status": "completed"
            }
            await db.transactions.insert_one(transaction)
            
            # Add to story
            story_event = {
                "event_id": str(uuid.uuid4()),
                "user_id": user_id,
                "event_type": "income" if trans["amount"] > 0 else "expense",
                "title": trans["description"],
                "description": f"₹{abs(trans['amount'])} - {trans['description']}",
                "amount": trans["amount"],
                "category": "salary" if "Salary" in trans["description"] else "expense",
                "timestamp": trans["timestamp"],
                "impact_score": 0.5 if trans["amount"] > 0 else -0.2
            }
            await db.financial_stories.insert_one(story_event)
        
        # Add some mock digital assets
        mock_assets = [
            {"symbol": "bitcoin", "asset_type": "crypto", "quantity": 0.01},
            {"symbol": "RELIANCE.NS", "asset_type": "stock", "quantity": 5}
        ]
        
        for asset in mock_assets:
            # Get real prices
            if asset["asset_type"] == "crypto":
                price_data = await CoinGeckoClient.get_single_crypto_price(asset["symbol"])
                current_price = price_data.get("inr", 4500000)  # Fallback price
                change_24h = price_data.get("inr_24h_change", 2.5)
            else:
                price_data = await AlphaVantageClient.get_stock_price(asset["symbol"])
                current_price = price_data.get("price", 2500)
                change_24h = price_data.get("change", 1.2)
            
            asset_doc = {
                "user_id": user_id,
                "symbol": asset["symbol"].upper(),
                "name": asset["symbol"].upper(),
                "asset_type": asset["asset_type"],
                "quantity": asset["quantity"],
                "current_price": current_price,
                "value": current_price * asset["quantity"],
                "change_24h": change_24h,
                "last_updated": datetime.now()
            }
            await db.digital_assets.insert_one(asset_doc)
        
        return {"message": f"Mock data generated for user {user_id}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate mock data: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)