// widgets/transaction_list.dart
import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';

class TransactionList extends StatelessWidget {
  final List<Transaction> transactions = [
    Transaction('Coffee with Sarah', -450, DateTime.now().subtract(Duration(hours: 2)), '☕', 'Food'),
    Transaction('Salary Credit', 28500, DateTime.now().subtract(Duration(days: 1)), '💰', 'Income'),
    Transaction('Netflix Subscription', -599, DateTime.now().subtract(Duration(days: 2)), '🎬', 'Entertainment'),
    Transaction('Grocery Shopping', -2340, DateTime.now().subtract(Duration(days: 3)), '🛒', 'Shopping'),
    Transaction('Uber Ride', -234, DateTime.now().subtract(Duration(days: 4)), '🚗', 'Travel'),
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: AppTheme.glassMorphism,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.history_rounded,
                color: AppTheme.neonBlue,
                size: 20,
              ),
              SizedBox(width: 8),
              Text(
                'Recent Transactions',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              Spacer(),
              GestureDetector(
                onTap: () {
                  // Show all transactions
                },
                child: Text(
                  'View All',
                  style: TextStyle(
                    color: AppTheme.neonBlue,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 16),
          Column(
            children: transactions.take(4).map((transaction) {
              return Container(
                margin: EdgeInsets.only(bottom: 12),
                padding: EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.cardBackground.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: AppTheme.textSecondary.withOpacity(0.2),
                  ),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: transaction.amount > 0
                            ? AppTheme.neonGreen.withOpacity(0.2)
                            : AppTheme.textSecondary.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Center(
                        child: Text(
                          transaction.emoji,
                          style: TextStyle(fontSize: 18),
                        ),
                      ),
                    ),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            transaction.title,
                            style: TextStyle(
                              color: AppTheme.textPrimary,
                              fontWeight: FontWeight.w600,
                              fontSize: 13,
                            ),
                          ),
                          SizedBox(height: 2),
                          Text(
                            transaction.category,
                            style: TextStyle(
                              color: AppTheme.textSecondary,
                              fontSize: 11,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          '${transaction.amount > 0 ? '+' : ''}₹${transaction.amount.abs().toStringAsFixed(0)}',
                          style: TextStyle(
                            color: transaction.amount > 0
                                ? AppTheme.neonGreen
                                : AppTheme.textPrimary,
                            fontWeight: FontWeight.w600,
                            fontSize: 13,
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          _formatTime(transaction.date),
                          style: TextStyle(
                            color: AppTheme.textSecondary,
                            fontSize: 10,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  String _formatTime(DateTime date) {
    final now = DateTime.now();
    final difference = now.difference(date);
    
    if (difference.inDays > 0) {
      return '${difference.inDays}d ago';
    } else if (difference.inHours > 0) {
      return '${difference.inHours}h ago';
    } else {
      return '${difference.inMinutes}m ago';
    }
  }
}

class Transaction {
  final String title;
  final double amount;
  final DateTime date;
  final String emoji;
  final String category;

  Transaction(this.title, this.amount, this.date, this.emoji, this.category);
}
