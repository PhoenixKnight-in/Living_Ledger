import 'package:flutter/material.dart';
import 'dart:math';

class CoinAnimation extends StatefulWidget {
  @override
  _CoinAnimationState createState() => _CoinAnimationState();
}

class _CoinAnimationState extends State<CoinAnimation>
    with TickerProviderStateMixin {
  late List<AnimationController> _controllers;
  late List<Animation<Offset>> _animations;
  late List<Animation<double>> _scaleAnimations;
  late List<Animation<double>> _rotationAnimations;
  
  final int coinCount = 8;
  late List<CoinData> coins;

  @override
  void initState() {
    super.initState();
    
    coins = List.generate(coinCount, (index) {
      return CoinData(
        startX: Random().nextDouble(),
        startY: 0.8,
        endX: Random().nextDouble(),
        endY: Random().nextDouble() * 0.3,
        delay: index * 100,
      );
    });
    
    _controllers = List.generate(coinCount, (index) {
      return AnimationController(
        duration: Duration(milliseconds: 1500 + index * 100),
        vsync: this,
      );
    });
    
    _animations = _controllers.asMap().entries.map((entry) {
      int index = entry.key;
      AnimationController controller = entry.value;
      
      return Tween<Offset>(
        begin: Offset(coins[index].startX, coins[index].startY),
        end: Offset(coins[index].endX, coins[index].endY),
      ).animate(CurvedAnimation(
        parent: controller,
        curve: Curves.easeOutQuart,
      ));
    }).toList();
    
    _scaleAnimations = _controllers.map((controller) {
      return Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(parent: controller, curve: Curves.elasticOut),
      );
    }).toList();
    
    _rotationAnimations = _controllers.map((controller) {
      return Tween<double>(begin: 0.0, end: 4 * pi).animate(
        CurvedAnimation(parent: controller, curve: Curves.easeOut),
      );
    }).toList();
    
    // Start animations with delays
    for (int i = 0; i < coinCount; i++) {
      Future.delayed(Duration(milliseconds: coins[i].delay), () {
        if (mounted) {
          _controllers[i].forward();
        }
      });
    }
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
        children: List.generate(coinCount, (index) {
          return AnimatedBuilder(
            animation: _controllers[index],
            builder: (context, child) {
              return Positioned(
                left: MediaQuery.of(context).size.width * _animations[index].value.dx - 25,
                top: MediaQuery.of(context).size.height * _animations[index].value.dy,
                child: Transform.scale(
                  scale: _scaleAnimations[index].value,
                  child: Transform.rotate(
                    angle: _rotationAnimations[index].value,
                    child: _buildCoin(),
                  ),
                ),
              );
            },
          );
        }),
      ),
    );
  }

  Widget _buildCoin() {
    return Container(
      width: 50,
      height: 50,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Colors.amber.shade300,
            Colors.amber.shade600,
            Colors.orange.shade700,
          ],
        ),
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.amber.withOpacity(0.6),
            blurRadius: 15,
            spreadRadius: 2,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Center(
        child: Text(
          '₹',
          style: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}

class CoinData {
  final double startX;
  final double startY;
  final double endX;
  final double endY;
  final int delay;

  CoinData({
    required this.startX,
    required this.startY,
    required this.endX,
    required this.endY,
    required this.delay,
  });
}