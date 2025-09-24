// widgets/category_breakdown.dart
import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';
import '../screens/dashboard_screen.dart';

class CategoryBreakdown extends StatelessWidget {
  final List<CategoryData> categories;

  const CategoryBreakdown({Key? key, required this.categories}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final total = categories.fold<double>(0, (sum, cat) => sum + cat.amount);
    
    return Container(
      padding: EdgeInsets.all(20),
      decoration: AppTheme.glassMorphism,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.category_rounded,
                color: AppTheme.neonPurple,
                size: 20,
              ),
              SizedBox(width: 8),
              Text(
                'Category Spending',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 16),
          Column(
            children: categories.map((category) {
              final percentage = (category.amount / total * 100);
              return Container(
                margin: EdgeInsets.only(bottom: 12),
                child: Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: category.color.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(
                        category.icon,
                        color: category.color,
                        size: 20,
                      ),
                    ),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                category.name,
                                style: TextStyle(
                                  color: AppTheme.textPrimary,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 13,
                                ),
                              ),
                              Text(
                                '₹${category.amount.toStringAsFixed(0)}',
                                style: TextStyle(
                                  color: category.color,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 6),
                          Row(
                            children: [
                              Expanded(
                                child: Container(
                                  height: 6,
                                  decoration: BoxDecoration(
                                    color: AppTheme.textSecondary.withOpacity(0.2),
                                    borderRadius: BorderRadius.circular(3),
                                  ),
                                  child: FractionallySizedBox(
                                    alignment: Alignment.centerLeft,
                                    widthFactor: percentage / 100,
                                    child: Container(
                                      decoration: BoxDecoration(
                                        color: category.color,
                                        borderRadius: BorderRadius.circular(3),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              SizedBox(width: 8),
                              Text(
                                '${percentage.toStringAsFixed(1)}%',
                                style: TextStyle(
                                  color: AppTheme.textSecondary,
                                  fontSize: 11,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
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
}
