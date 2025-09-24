import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class QuickActions extends StatefulWidget {
  final VoidCallback? onSendTap;
  final VoidCallback? onReceiveTap;
  final VoidCallback? onScanTap;
  final VoidCallback? onAddMoneyTap;

  const QuickActions({
    Key? key,
    this.onSendTap,
    this.onReceiveTap,
    this.onScanTap,
    this.onAddMoneyTap,
  }) : super(key: key);

  @override
  _QuickActionsState createState() => _QuickActionsState();
}

class _QuickActionsState extends State<QuickActions>
    with TickerProviderStateMixin {
  late List<AnimationController> _controllers;
  late List<Animation<double>> _scaleAnimations;
  late List<Animation<double>> _rotationAnimations;

  final List<ActionItem> _actions = [
    ActionItem(
      icon: Icons.send_rounded,
      label: 'Send',
      color: AppTheme.neonBlue,
      gradient: [AppTheme.neonBlue, AppTheme.neonBlue.withOpacity(0.7)],
    ),
    ActionItem(
      icon: Icons.call_received_rounded,
      label: 'Request',
      color: AppTheme.neonGreen,
      gradient: [AppTheme.neonGreen, AppTheme.neonGreen.withOpacity(0.7)],
    ),
    ActionItem(
      icon: Icons.qr_code_scanner_rounded,
      label: 'Scan',
      color: Colors.orange,
      gradient: [Colors.orange, Colors.deepOrange],
    ),
    ActionItem(
      icon: Icons.add_rounded,
      label: 'Add Money',
      color: AppTheme.neonPurple,
      gradient: [AppTheme.neonPurple, Colors.purple],
    ),
  ];

  @override
  void initState() {
    super.initState();
    _controllers = List.generate(
      _actions.length,
      (index) => AnimationController(
        duration: Duration(milliseconds: 200),
        vsync: this,
      ),
    );

    _scaleAnimations = _controllers.map((controller) {
      return Tween<double>(begin: 1.0, end: 0.95).animate(
        CurvedAnimation(parent: controller, curve: Curves.easeInOut),
      );
    }).toList();

    _rotationAnimations = _controllers.map((controller) {
      return Tween<double>(begin: 0.0, end: 0.1).animate(
        CurvedAnimation(parent: controller, curve: Curves.easeInOut),
      );
    }).toList();
  }

  @override
  void dispose() {
    for (var controller in _controllers) {
      controller.dispose();
    }
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
                Icons.flash_on_rounded,
                color: AppTheme.neonGreen,
                size: 20,
              ),
              SizedBox(width: 8),
              Text(
                'Quick Actions',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: _actions.asMap().entries.map((entry) {
              int index = entry.key;
              ActionItem action = entry.value;
              
              return _buildActionButton(action, index);
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildActionButton(ActionItem action, int index) {
    return GestureDetector(
      onTapDown: (_) {
        _controllers[index].forward();
        HapticFeedback.lightImpact();
      },
      onTapUp: (_) {
        _controllers[index].reverse();
      },
      onTapCancel: () {
        _controllers[index].reverse();
      },
      onTap: () {
        switch (index) {
          case 0:
            widget.onSendTap?.call();
            break;
          case 1:
            widget.onReceiveTap?.call();
            break;
          case 2:
            widget.onScanTap?.call();
            break;
          case 3:
            widget.onAddMoneyTap?.call();
            break;
        }
      },
      child: AnimatedBuilder(
        animation: _controllers[index],
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimations[index].value,
            child: Transform.rotate(
              angle: _rotationAnimations[index].value,
              child: Column(
                children: [
                  Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: action.gradient,
                      ),
                      borderRadius: BorderRadius.circular(18),
                      boxShadow: [
                        BoxShadow(
                          color: action.color.withOpacity(0.4),
                          blurRadius: 15,
                          spreadRadius: 2,
                          offset: Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Icon(
                      action.icon,
                      color: Colors.white,
                      size: 28,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    action.label,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class ActionItem {
  final IconData icon;
  final String label;
  final Color color;
  final List<Color> gradient;

  ActionItem({
    required this.icon,
    required this.label,
    required this.color,
    required this.gradient,
  });
}