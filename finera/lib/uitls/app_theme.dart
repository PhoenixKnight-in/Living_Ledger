import 'package:flutter/material.dart';

class AppTheme {
  // 🎨 Updated Color constants (your new palette)
  static const Color primaryLight = Color(0xFF6D94C5); // pastel blue
  static const Color secondaryLight = Color(0xFFCBDCEB); // light sky
  static const Color accentLight = Color(0xFFE8DFCA); // muted beige
  static const Color backgroundLight = Color(0xFFF5EFE6); // soft cream
  static const Color cardBackground = Color(0xFFE8DFCA); // reused
  static const Color textPrimary = Color(0xFF1A1A1A);
  static const Color textSecondary = Color(0xFF555555);
  static const Color neonGreen = Color(0xFF87CEFA); 
  static const Color neonBlue = Color(0xFF00008B);
  static const Color neonPurple = Color(0xFF0077BE);

  static ThemeData get lightTheme {
    return ThemeData(
      brightness: Brightness.light,
      primaryColor: primaryLight,
      scaffoldBackgroundColor: backgroundLight,

      // ✅ Text theme
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
      
      // ✅ Elevated button theme
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryLight,
          foregroundColor: Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        ),
      ),
      
      // ✅ App bar theme
      appBarTheme: const AppBarTheme(
        backgroundColor: backgroundLight,
        foregroundColor: textPrimary,
        elevation: 0,
        centerTitle: true,
      ),
      
      // ✅ Color scheme for Material 3
      colorScheme: const ColorScheme.light(
        primary: primaryLight,
        secondary: secondaryLight,
        surface: cardBackground,
        background: backgroundLight,
        onPrimary: Colors.white,
        onSecondary: textPrimary,
        onSurface: textPrimary,
        onBackground: textPrimary,
      ),
    );
  }

  // Glass morphism decoration (lighter style)
  static BoxDecoration get glassMorphism {
    return BoxDecoration(
      gradient: LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          Colors.white.withOpacity(0.3),
          Colors.white.withOpacity(0.15),
        ],
      ),
      borderRadius: BorderRadius.circular(20),
      border: Border.all(
        color: Colors.black.withOpacity(0.05),
        width: 1,
      ),
    );
  }

  // Glow effect adapted for light mode
  static BoxDecoration get softGlow {
    return BoxDecoration(
      borderRadius: BorderRadius.circular(20),
      boxShadow: [
        BoxShadow(
          color: primaryLight.withOpacity(0.3),
          blurRadius: 20,
          spreadRadius: 2,
        ),
      ],
    );
  }

  // Gradient decoration
  static BoxDecoration get pastelGradient {
    return BoxDecoration(
      gradient: LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          primaryLight.withOpacity(0.8),
          secondaryLight.withOpacity(0.8),
          accentLight.withOpacity(0.8),
        ],
      ),
      borderRadius: BorderRadius.circular(20),
    );
  }
}
