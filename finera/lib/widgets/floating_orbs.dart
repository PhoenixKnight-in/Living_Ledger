import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';
import 'dart:math';

class FloatingOrbs extends StatefulWidget {
  @override
  _FloatingOrbsState createState() => _FloatingOrbsState();
}

class _FloatingOrbsState extends State<FloatingOrbs>
    with TickerProviderStateMixin {
  late List<AnimationController> _controllers;
  late List<Animation<double>> _animations;
  
  final int orbCount = 6;
  late List<OrbData> orbs;

  @override
  void initState() {
    super.initState();
    
    orbs = List.generate(orbCount, (index) {
      return OrbData(
        x: Random().nextDouble(),
        y: Random().nextDouble(),
        size: 60 + Random().nextDouble() * 80,
        color: _getRandomColor(),
        duration: 3000 + Random().nextInt(4000),
      );
    });
    
    _controllers = List.generate(orbCount, (index) {
      return AnimationController(
        duration: Duration(milliseconds: orbs[index].duration),
        vsync: this,
      );
    });
    
    _animations = _controllers.map((controller) {
      return Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(parent: controller, curve: Curves.easeInOut),
      );
    }).toList();
    
    // Start animations
    for (var controller in _controllers) {
      controller.repeat(reverse: true);
    }
  }

  Color _getRandomColor() {
    final colors = [
      AppTheme.neonBlue.withOpacity(0.1),
      AppTheme.neonGreen.withOpacity(0.1),
      AppTheme.neonPurple.withOpacity(0.1),
      Colors.orange.withOpacity(0.1),
      Colors.pink.withOpacity(0.1),
    ];
    return colors[Random().nextInt(colors.length)];
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
      width: double.infinity,
      height: double.infinity,
      child: Stack(
        children: List.generate(orbCount, (index) {
          return AnimatedBuilder(
            animation: _animations[index],
            builder: (context, child) {
              final orb = orbs[index];
              final animatedValue = _animations[index].value;
              
              return Positioned(
                left: MediaQuery.of(context).size.width * orb.x - orb.size / 2,
                top: MediaQuery.of(context).size.height * orb.y - orb.size / 2 + 
                     sin(animatedValue * 2 * pi) * 20,
                child: Transform.scale(
                  scale: 0.8 + sin(animatedValue * 2 * pi) * 0.2,
                  child: Container(
                    width: orb.size,
                    height: orb.size,
                    decoration: BoxDecoration(
                      gradient: RadialGradient(
                        center: Alignment.topLeft,
                        colors: [
                          orb.color.withOpacity(0.3),
                          orb.color.withOpacity(0.1),
                          orb.color.withOpacity(0.05),
                        ],
                      ),
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              );
            },
          );
        }),
      ),
    );
  }
}

class OrbData {
  final double x;
  final double y;
  final double size;
  final Color color;
  final int duration;

  OrbData({
    required this.x,
    required this.y,
    required this.size,
    required this.color,
    required this.duration,
  });
}