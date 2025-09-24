import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';


class BalanceCard extends StatefulWidget {
  @override
  _BalanceCardState createState() => _BalanceCardState();
}

class _BalanceCardState extends State<BalanceCard>
    with TickerProviderStateMixin {
  late AnimationController _balanceController;
  late AnimationController _growthController;
  late Animation<double> _balanceAnimation;
  late Animation<double> _growthAnimation;
  
  double targetBalance = 42850.0;
  double monthlyGrowth = 12.5;
  bool isBalanceVisible = true;

  @override
  void initState() {
    super.initState();
    _balanceController = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    _growthController = AnimationController(
      duration: Duration(milliseconds: 1500),
      vsync: this,
    );
    
    _balanceAnimation = Tween<double>(begin: 0, end: targetBalance).animate(
      CurvedAnimation(parent: _balanceController, curve: Curves.easeOutExpo)
    );
    
    _growthAnimation = Tween<double>(begin: 0, end: monthlyGrowth).animate(
      CurvedAnimation(parent: _growthController, curve: Curves.elasticOut)
    );
    
    _balanceController.forward();
    Future.delayed(Duration(milliseconds: 500), () {
      _growthController.forward();
    });
  }

  @override
  void dispose() {
    _balanceController.dispose();
    _growthController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.cardBackground,
            AppTheme.cardBackground.withOpacity(0.8),
          ],
        ),
        borderRadius: BorderRadius.circular(25),
        border: Border.all(
          color: AppTheme.neonBlue.withOpacity(0.3),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: AppTheme.neonBlue.withOpacity(0.2),
            blurRadius: 20,
            spreadRadius: 2,
            offset: Offset(0, 8),
          ),
        ],
      ),
      padding: EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(
                    Icons.account_balance_wallet_rounded,
                    color: AppTheme.neonBlue,
                    size: 24,
                  ),
                  SizedBox(width: 8),
                  Text(
                    'Total Balance',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.textSecondary,
                    ),
                  ),
                ],
              ),
              GestureDetector(
                onTap: () {
                  setState(() {
                    isBalanceVisible = !isBalanceVisible;
                  });
                },
                child: Icon(
                  isBalanceVisible 
                    ? Icons.visibility_rounded 
                    : Icons.visibility_off_rounded,
                  color: AppTheme.textSecondary,
                  size: 20,
                ),
              ),
            ],
          ),
          SizedBox(height: 16),
          
          // Animated Balance
          AnimatedBuilder(
            animation: _balanceAnimation,
            builder: (context, child) {
              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '₹',
                    style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                      color: AppTheme.neonGreen,
                      fontSize: 28,
                    ),
                  ),
                  Text(
                    isBalanceVisible 
                      ? _balanceAnimation.value.toStringAsFixed(0)
                          .replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), 
                            (Match m) => '${m[1]},')
                      : '••,•••',
                    style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                      color: AppTheme.textPrimary,
                      fontSize: 32,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              );
            },
          ),
          
          SizedBox(height: 16),
          
          // Growth indicator
          Row(
            children: [
              Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.neonGreen.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: AppTheme.neonGreen.withOpacity(0.3),
                    width: 1,
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
                    AnimatedBuilder(
                      animation: _growthAnimation,
                      builder: (context, child) {
                        return Text(
                          '+${_growthAnimation.value.toStringAsFixed(1)}%',
                          style: TextStyle(
                            color: AppTheme.neonGreen,
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
              SizedBox(width: 8),
              Text(
                'This month',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  fontSize: 12,
                ),
              ),
            ],
          ),
          
          SizedBox(height: 12),
          Text(
            'Good balance - Keep it up! 🚀',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.textSecondary,
              fontSize: 13,
            ),
          ),
        ],
      ),
    );
  }
}