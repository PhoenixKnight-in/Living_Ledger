import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';
import '../widgets/expense_chart.dart';
import '../widgets/category_breakdown.dart';
import '../widgets/digital_assets.dart';

class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen>
    with TickerProviderStateMixin {
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;
  
  double savingsRate = 49.6;
  double goalProgress = 42.9;
  
  final List<CategoryData> expenses = [
    CategoryData('Food', 4500, Colors.orange, Icons.restaurant),
    CategoryData('Shopping', 3200, AppTheme.neonPurple, Icons.shopping_bag),
    CategoryData('Travel', 2800, AppTheme.neonBlue, Icons.flight),
    CategoryData('Bills', 2400, Colors.red, Icons.receipt_long),
    CategoryData('Entertainment', 1450, AppTheme.neonGreen, Icons.movie),
  ];

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(
      duration: Duration(milliseconds: 800),
      vsync: this,
    );
    
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _fadeController, curve: Curves.easeOut)
    );
    
    _fadeController.forward();
  }

  @override
  void dispose() {
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              AppTheme.primaryDark,
              AppTheme.secondaryDark,
            ],
          ),
        ),
        child: SafeArea(
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: SingleChildScrollView(
              physics: BouncingScrollPhysics(),
              padding: EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 20),
                  _buildHeader(),
                  SizedBox(height: 30),
                  _buildProgressCards(),
                  SizedBox(height: 25),
                  _buildIncomeExpenseCard(),
                  SizedBox(height: 25),
                  ExpenseChart(expenses: expenses),
                  SizedBox(height: 25),
                  CategoryBreakdown(categories: expenses),
                  SizedBox(height: 25),
                  DigitalAssets(),
                  SizedBox(height: 25),
                  _buildFinancialTips(),
                  SizedBox(height: 100),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Financial Dashboard',
          style: Theme.of(context).textTheme.headlineLarge?.copyWith(
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8),
        Text(
          'Track your financial wellness',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            color: AppTheme.textSecondary,
          ),
        ),
      ],
    );
  }

  Widget _buildProgressCards() {
    return Row(
      children: [
        Expanded(
          child: _buildProgressCard(
            'Savings Rate',
            savingsRate,
            '%',
            AppTheme.neonGreen,
            Icons.savings_rounded,
          ),
        ),
        SizedBox(width: 15),
        Expanded(
          child: _buildProgressCard(
            'Goal Progress',
            goalProgress,
            '%',
            AppTheme.neonBlue,
            Icons.flag_rounded,
          ),
        ),
      ],
    );
  }

  Widget _buildProgressCard(
    String title,
    double value,
    String suffix,
    Color color,
    IconData icon,
  ) {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.cardBackground,
            AppTheme.cardBackground.withOpacity(0.8),
          ],
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: color.withOpacity(0.3),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.2),
            blurRadius: 15,
            spreadRadius: 1,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 20),
              SizedBox(width: 8),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    color: AppTheme.textSecondary,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 12),
          TweenAnimationBuilder<double>(
            tween: Tween(begin: 0, end: value),
            duration: Duration(seconds: 1),
            builder: (context, animatedValue, child) {
              return Text(
                '${animatedValue.toStringAsFixed(1)}$suffix',
                style: TextStyle(
                  color: color,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              );
            },
          ),
          SizedBox(height: 8),
          LinearProgressIndicator(
            value: value / 100,
            backgroundColor: color.withOpacity(0.2),
            valueColor: AlwaysStoppedAnimation<Color>(color),
            borderRadius: BorderRadius.circular(4),
          ),
        ],
      ),
    );
  }

  Widget _buildIncomeExpenseCard() {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: AppTheme.glassMorphism,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.account_balance_rounded,
                color: AppTheme.neonBlue,
                size: 20,
              ),
              SizedBox(width: 8),
              Text(
                'Monthly Overview',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Income',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    SizedBox(height: 8),
                    TweenAnimationBuilder<double>(
                      tween: Tween(begin: 0, end: 28500),
                      duration: Duration(seconds: 1),
                      builder: (context, value, child) {
                        return Text(
                          '₹${value.toStringAsFixed(0)}',
                          style: TextStyle(
                            color: AppTheme.neonGreen,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Expenses',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    SizedBox(height: 8),
                    TweenAnimationBuilder<double>(
                      tween: Tween(begin: 0, end: 14350),
                      duration: Duration(seconds: 1),
                      builder: (context, value, child) {
                        return Text(
                          '₹${value.toStringAsFixed(0)}',
                          style: TextStyle(
                            color: Colors.orange,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 15),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: AppTheme.neonGreen.withOpacity(0.2),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: AppTheme.neonGreen.withOpacity(0.3),
              ),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  Icons.trending_up_rounded,
                  color: AppTheme.neonGreen,
                  size: 16,
                ),
                SizedBox(width: 4),
                Text(
                  'Saved ₹14,150 this month',
                  style: TextStyle(
                    color: AppTheme.neonGreen,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFinancialTips() {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.neonPurple.withOpacity(0.2),
            AppTheme.neonBlue.withOpacity(0.2),
          ],
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.neonPurple.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.lightbulb_rounded,
                color: AppTheme.neonPurple,
                size: 20,
              ),
              SizedBox(width: 8),
              Text(
                'Smart Recommendations',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 15),
          _buildTipItem(
            'Investment Opportunity',
            'Consider SIP in mutual funds for better returns',
            Icons.trending_up_rounded,
            AppTheme.neonGreen,
          ),
          SizedBox(height: 10),
          _buildTipItem(
            'Budget Alert',
            'Food expenses are 15% higher than last month',
            Icons.warning_rounded,
            Colors.orange,
          ),
          SizedBox(height: 10),
          _buildTipItem(
            'Goal Achievement',
            'You\'re on track to reach your savings goal',
            Icons.flag_rounded,
            AppTheme.neonBlue,
          ),
        ],
      ),
    );
  }

  Widget _buildTipItem(String title, String subtitle, IconData icon, Color color) {
    return Row(
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: color.withOpacity(0.2),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: color, size: 20),
        ),
        SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  color: AppTheme.textPrimary,
                  fontWeight: FontWeight.w600,
                  fontSize: 13,
                ),
              ),
              SizedBox(height: 2),
              Text(
                subtitle,
                style: TextStyle(
                  color: AppTheme.textSecondary,
                  fontSize: 11,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class CategoryData {
  final String name;
  final double amount;
  final Color color;
  final IconData icon;

  CategoryData(this.name, this.amount, this.color, this.icon);
}