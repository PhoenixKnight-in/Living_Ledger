FINERA 💸

> Transform static financial identities into dynamic, predictive, and personal financial stories through real-time data integration and AI-powered insights.

Living Ledger is an AI-powered personal finance platform that helps users understand, track, and improve their financial journey.

Instead of treating finance as isolated transactions, Living Ledger converts financial behavior into a living financial identity — combining portfolio tracking, payments, analytics, AI guidance, and personalized financial storytelling.

---

✨ Features
📈 Dynamic Financial Identity

- Spending analysis
- Savings trends
- Financial milestone tracking
- Personalized financial timeline

💰 Portfolio Management

Supports:

- Cryptocurrency portfolios
- Stocks
- ETFs
- Mutual Funds

Features:

- Real-time asset valuation
- Daily performance tracking
- Weekly growth monitoring
- Portfolio analytics

🤖 AI Financial Assistant

- Smart financial suggestions
- Savings recommendations
- Investment nudges
- Personalized money insights

### 📊 Interactive Dashboard

- Expense breakdown charts
- Savings tracking
- Goal analytics
- Portfolio summaries

💸 Smart Payment System

- Peer-to-peer payments
- Transaction history
- Spending categorization
- Financial impact analysis

### 📖 Financial Story Engine

Transforms:

- Expenses
- Income
- Investments
- Financial milestones

Into an evolving financial journey.

🎯 Financial Health Score

Built using:

- Savings habits
- Spending behavior
- Income consistency
- Expense management

🧪 Mock Data Generator

Demo-ready financial datasets for testing and hackathons.

---

🏗 Tech Stack

Frontend
- Flutter
 Backend
- FastAPI
- Python
Database
- MongoDB
APIs
- CoinGecko API
- Alpha Vantage API

---
📂 Project Structure

```
Living_Ledger/

├── backend/
│   └── main.py

├── finera/
│   ├── lib/
│   ├── screens/
│   ├── widgets/
│   └── pubspec.yaml

└── README.md
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/PhoenixKnight-in/Living_Ledger.git

cd Living_Ledger
```

### Backend Setup

```bash
pip install -r requirements.txt
```

Create `.env`

```env
MONGODB_URL=your_connection_string

ALPHA_VANTAGE_API_KEY=your_key
```

Run backend:

```bash
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd finera

flutter pub get

flutter run
```

---

## 🔌 Core API Endpoints

POST `/api/users/register`

GET `/api/portfolio/{user_id}`

POST `/api/assets/add`

POST `/api/transactions/send`

GET `/api/dashboard/{user_id}`

GET `/api/financial-story/{user_id}`

GET `/api/crypto-prices`

GET `/api/stock-prices/{symbol}`

---

## 🚀 Future Scope

- AI forecasting
- Smart budgeting
- Portfolio risk analysis
- Bank integrations
- Predictive expense modeling

---

## 🌟 Vision

Living Ledger transforms financial data into financial intelligence.

**Not just tracking money. Understanding it. Growing through it.**

---

Hackathons • FinTech • Financial Innovation
