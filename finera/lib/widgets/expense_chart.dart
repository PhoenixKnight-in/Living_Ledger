// widgets/expense_chart.dart
import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';
import 'dart:math';
import '../screens/dashboard_screen.dart';

class ExpenseChart extends StatefulWidget {
  final List<CategoryData> expenses;

  const ExpenseChart({Key? key, required this.expenses}) : super(key: key);

  @override
  _ExpenseChartState createState() => _ExpenseChartState();
}

class _ExpenseChartState extends State<ExpenseChart>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeOutBack),
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

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
                Icons.pie_chart_rounded,
                color: AppTheme.neonGreen,
                size: 20,
              ),
              SizedBox(width: 8),
              Text(
                'Expense Breakdown',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 20),
          Container(
            height: 200,
            child: AnimatedBuilder(
              animation: _animation,
              builder: (context, child) {
                return CustomPaint(
                  painter: PieChartPainter(
                    expenses: widget.expenses,
                    animationValue: _animation.value,
                  ),
                  size: Size(double.infinity, 200),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class PieChartPainter extends CustomPainter {
  final List<CategoryData> expenses;
  final double animationValue;

  PieChartPainter({required this.expenses, required this.animationValue});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = min(size.width, size.height) / 3;
    
    final total = expenses.fold<double>(0, (sum, expense) => sum + expense.amount);
    
    double startAngle = -pi / 2;
    
    for (int i = 0; i < expenses.length; i++) {
      final expense = expenses[i];
      final sweepAngle = (expense.amount / total) * 2 * pi * animationValue;
      
      final paint = Paint()
        ..color = expense.color
        ..style = PaintingStyle.fill;
      
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        startAngle,
        sweepAngle,
        true,
        paint,
      );
      
      startAngle += sweepAngle;
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}