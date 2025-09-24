import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(NeoWalletApp());
}

class NeoWalletApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Color(0xFF0A0E1A),
    ));

    return MaterialApp(
      title: 'NeoWallet',
      theme: AppTheme.darkTheme,
      home: HomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}