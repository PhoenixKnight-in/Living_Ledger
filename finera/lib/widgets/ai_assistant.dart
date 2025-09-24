import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AIAssistant extends StatefulWidget {
  @override
  _AIAssistantState createState() => _AIAssistantState();
}

class _AIAssistantState extends State<AIAssistant>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late AnimationController _bounceController;
  late Animation<double> _pulseAnimation;
  late Animation<double> _bounceAnimation;
  
  bool isExpanded = false;
  
  final List<String> tips = [
    "Your balance looks healthy - I'm proud of your discipline! 💪",
    "Steady progress is the key to financial success! 🌱",
    "I love how you're managing different categories! 🎯",
    "Consider SIP in mutual funds for better returns 📈",
    "You're doing great with money management! 🚀",
  ];

  @override
  void initState() {
    super.initState();
    
    _pulseController = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    
    _bounceController = AnimationController(
      duration: Duration(milliseconds: 300),
      vsync: this,
    );
    
    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.1).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
    
    _bounceAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _bounceController, curve: Curves.easeInOut),
    );
    
    _pulseController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _bounceController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 300),
      curve: Curves.easeInOut,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          if (isExpanded) _buildTipBubble(),
          if (isExpanded) SizedBox(height: 10),
          _buildAssistantButton(),
        ],
      ),
    );
  }

  Widget _buildTipBubble() {
    return Container(
      constraints: BoxConstraints(maxWidth: 200),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.cardBackground,
            AppTheme.cardBackground.withOpacity(0.9),
          ],
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.neonBlue.withOpacity(0.3),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: AppTheme.neonBlue.withOpacity(0.2),
            blurRadius: 15,
            spreadRadius: 1,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Text(
                '🤖',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Finny',
                  style: TextStyle(
                    color: AppTheme.neonBlue,
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 8),
          Text(
            tips[(DateTime.now().millisecondsSinceEpoch ~/ 5000) % tips.length],
            style: TextStyle(
              color: AppTheme.textPrimary,
              fontSize: 12,
              height: 1.3,
            ),
          ),
          SizedBox(height: 8),
          Text(
            'Tap Finny for more tips!',
            style: TextStyle(
              color: AppTheme.textSecondary,
              fontSize: 10,
              fontStyle: FontStyle.italic,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAssistantButton() {
    return GestureDetector(
      onTapDown: (_) {
        _bounceController.forward();
        HapticFeedback.lightImpact();
      },
      onTapUp: (_) {
        _bounceController.reverse();
      },
      onTapCancel: () {
        _bounceController.reverse();
      },
      onTap: () {
        setState(() {
          isExpanded = !isExpanded;
        });
        HapticFeedback.mediumImpact();
      },
      child: AnimatedBuilder(
        animation: Listenable.merge([_pulseAnimation, _bounceAnimation]),
        builder: (context, child) {
          return Transform.scale(
            scale: _pulseAnimation.value * _bounceAnimation.value,
            child: Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    AppTheme.neonBlue,
                    AppTheme.neonPurple,
                  ],
                ),
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.neonBlue.withOpacity(0.4),
                    blurRadius: 20,
                    spreadRadius: 3,
                    offset: Offset(0, 6),
                  ),
                ],
              ),
              child: Stack(
                children: [
                  Center(
                    child: Text(
                      '🤖',
                      style: TextStyle(fontSize: 24),
                    ),
                  ),
                  // Notification dot
                  Positioned(
                    right: 8,
                    top: 8,
                    child: Container(
                      width: 12,
                      height: 12,
                      decoration: BoxDecoration(
                        color: AppTheme.neonGreen,
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.neonGreen,
                            blurRadius: 8,
                            spreadRadius: 1,
                          ),
                        ],
                      ),
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