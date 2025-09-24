import 'package:flutter/material.dart';

class AppTheme {
  // Color constants
  static const Color primaryDark = Color(0xFF0A0E1A);
  static const Color secondaryDark = Color(0xFF1A2332);
  static const Color accentDark = Color(0xFF2D3B52);
  static const Color neonBlue = Color(0xFF00D4FF);
  static const Color neonGreen = Color(0xFF39FF14);
  static const Color neonPurple = Color(0xFF9D4EDD);
  static const Color cardBackground = Color(0xFF1E2A3A);
  static const Color textPrimary = Color(0xFFE8F4FD);
  static const Color textSecondary = Color(0xFFB0C4DE);
  
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: neonBlue,
      scaffoldBackgroundColor: primaryDark,
      fontFamily: 'Inter',
      
      // Updated text theme structure
      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          color: textPrimary,
          fontSize: 32,
          fontWeight: FontWeight.bold,
          letterSpacing: -0.5,
        ),
        headlineMedium: TextStyle(
          color: textPrimary,
          fontSize: 24,
          fontWeight: FontWeight.w600,
        ),
        bodyLarge: TextStyle(
          color: textPrimary,
          fontSize: 16,
          fontWeight: FontWeight.normal,
        ),
        bodyMedium: TextStyle(
          color: textSecondary,
          fontSize: 14,
          fontWeight: FontWeight.normal,
        ),
      ),
      
      // Elevated button theme
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: neonBlue,
          foregroundColor: primaryDark,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        ),
      ),
      
      // App bar theme
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryDark,
        foregroundColor: textPrimary,
        elevation: 0,
        centerTitle: true,
      ),
      
      // Color scheme for better Material 3 compatibility
      colorScheme: ColorScheme.dark(
        primary: neonBlue,
        secondary: neonGreen,
        tertiary: neonPurple,
        surface: cardBackground,
        background: primaryDark,
        onPrimary: primaryDark,
        onSecondary: primaryDark,
        onSurface: textPrimary,
        onBackground: textPrimary,
      ),
    );
  }
  
  // Glass morphism decoration
  static BoxDecoration get glassMorphism {
    return BoxDecoration(
      gradient: LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          Colors.white.withOpacity(0.1),
          Colors.white.withOpacity(0.05),
        ],
      ),
      borderRadius: BorderRadius.circular(20),
      border: Border.all(
        color: Colors.white.withOpacity(0.2),
        width: 1,
      ),
    );
  }
  
  // Neon glow decoration
  static BoxDecoration get neonGlow {
    return BoxDecoration(
      borderRadius: BorderRadius.circular(20),
      boxShadow: [
        BoxShadow(
          color: neonBlue.withOpacity(0.3),
          blurRadius: 20,
          spreadRadius: 2,
        ),
      ],
    );
  }
  
  // Additional utility methods
  static BoxDecoration neonGlowWithColor(Color color) {
    return BoxDecoration(
      borderRadius: BorderRadius.circular(20),
      boxShadow: [
        BoxShadow(
          color: color.withOpacity(0.3),
          blurRadius: 20,
          spreadRadius: 2,
        ),
      ],
    );
  }
  
  // Gradient decoration
  static BoxDecoration get neonGradient {
    return BoxDecoration(
      gradient: LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          neonBlue.withOpacity(0.8),
          neonPurple.withOpacity(0.8),
          neonGreen.withOpacity(0.8),
        ],
      ),
      borderRadius: BorderRadius.circular(20),
    );
  }
}