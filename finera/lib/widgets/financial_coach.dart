// widgets/financial_coach.dart
import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';


class FinancialCoach extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
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
              Container(
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppTheme.neonPurple.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  Icons.psychology_rounded,
                  color: AppTheme.neonPurple,
                  size: 20,
                ),
              ),
              SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Your Financial Coach',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Text(
                      'Personalized insights just for you',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 16),
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.cardBackground.withOpacity(0.5),
              borderRadius: BorderRadius.circular(15),
              border: Border.all(
                color: AppTheme.textSecondary.withOpacity(0.2),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(
                      Icons.favorite_rounded,
                      color: Colors.pink,
                      size: 16,
                    ),
                    SizedBox(width: 8),
                    Text(
                      'Financial Wellness',
                      style: TextStyle(
                        color: Colors.pink,
                        fontWeight: FontWeight.w600,
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 8),
                Text(
                  'Balance is Key',
                  style: TextStyle(
                    color: AppTheme.textPrimary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  'You\'re doing great with money management!',
                  style: TextStyle(
                    color: AppTheme.textSecondary,
                    fontSize: 12,
                  ),
                ),
                SizedBox(height: 12),
                GestureDetector(
                  onTap: () {
                    // Show action plan
                  },
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: AppTheme.neonBlue.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: AppTheme.neonBlue.withOpacity(0.3),
                      ),
                    ),
                    child: Text(
                      'Show Action Plan',
                      style: TextStyle(
                        color: AppTheme.neonBlue,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}





