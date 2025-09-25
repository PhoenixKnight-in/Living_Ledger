import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../widgets/balance_card.dart';
import '../widgets/quick_actions.dart';
import '../widgets/financial_coach.dart';
import '../widgets/transaction_list.dart';
import '../widgets/floating_orbs.dart';
import 'payment_screen.dart';
import 'dashboard_screen.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> with TickerProviderStateMixin {
  late AnimationController _fadeController;
  late AnimationController _slideController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  
  int _currentIndex = 0;
  PageController _pageController = PageController();

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(
      duration: Duration(milliseconds: 1000),
      vsync: this,
    );
    _slideController = AnimationController(
      duration: Duration(milliseconds: 800),
      vsync: this,
    );
    
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _fadeController, curve: Curves.easeOut)
    );
    
    _slideAnimation = Tween<Offset>(
      begin: Offset(0, 0.3), 
      end: Offset.zero
    ).animate(CurvedAnimation(parent: _slideController, curve: Curves.elasticOut));
    
    _fadeController.forward();
    _slideController.forward();
  }

  @override
  void dispose() {
    _fadeController.dispose();
    _slideController.dispose();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryLight,
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          // Animated background
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  AppTheme.primaryLight,
                  AppTheme.secondaryLight,
                  AppTheme.accentLight,
                ],
                stops: [0.0, 0.5, 1.0],
              ),
            ),
          ),
          
          // Floating orbs background
          FloatingOrbs(),
          
          // Main content
          PageView(
            controller: _pageController,
            onPageChanged: (index) {
              setState(() {
                _currentIndex = index;
              });
            },
            children: [
              _buildHomePage(),
              DashboardScreen(),
              PaymentScreen(),
            ],
          ),
          
          // AI Assistant
          // Positioned(
          //   right: 20,
          //   bottom: 100,
          //   child: AIAssistant(),
          // ),
        ],
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildHomePage() {
    return SafeArea(
      child: SingleChildScrollView(
        physics: BouncingScrollPhysics(),
        padding: EdgeInsets.symmetric(horizontal: 20),
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: SlideTransition(
            position: _slideAnimation,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: 20),
                _buildGreeting(),
                SizedBox(height: 30),
                BalanceCard(),
                SizedBox(height: 25),
                QuickActions(
                  onSendTap: () => _navigateToPayment(),
                  onReceiveTap: () => _showReceiveDialog(),
                  onScanTap: () => _showScanDialog(),
                  onAddMoneyTap: () => _showAddMoneyDialog(),
                ),
                SizedBox(height: 25),
                FinancialCoach(),
                SizedBox(height: 25),
                TransactionList(),
                SizedBox(height: 100),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildGreeting() {
    final hour = DateTime.now().hour;
    String greeting = 'Good morning';
    if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
    if (hour >= 17) greeting = 'Good evening';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '$greeting,',
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
            color: AppTheme.textSecondary,
            fontWeight: FontWeight.w400,
          ),
        ),
        Row(
          children: [
            Text(
              'Alex! ',
              style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                color: AppTheme.neonBlue,
              ),
            ),
            Container(
              width: 8,
              height: 8,
              decoration: BoxDecoration(
                color: AppTheme.neonGreen,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.neonGreen,
                    blurRadius: 10,
                    spreadRadius: 2,
                  ),
                ],
              ),
            ),
          ],
        ),
        SizedBox(height: 8),
        Text(
          'Ready to manage your digital finances?',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }

  Widget _buildBottomNav() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.cardBackground.withOpacity(0.9),
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(25),
          topRight: Radius.circular(25),
        ),
        border: Border.all(
          color: AppTheme.neonBlue.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
          _pageController.animateToPage(
            index,
            duration: Duration(milliseconds: 300),
            curve: Curves.easeInOut,
          );
        },
        backgroundColor: Colors.transparent,
        elevation: 0,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: AppTheme.neonBlue,
        unselectedItemColor: AppTheme.textSecondary,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_rounded),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_rounded),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.payment_rounded),
            label: 'Pay',
          ),
        ],
      ),
    );
  }

  void _navigateToPayment() {
    HapticFeedback.lightImpact();
    setState(() {
      _currentIndex = 2;
    });
    _pageController.animateToPage(
      2,
      duration: Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  void _showReceiveDialog() {
    HapticFeedback.lightImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.cardBackground,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Text('Receive Payment', style: TextStyle(color: AppTheme.textPrimary)),
        content: Text('Show QR code for receiving payments', 
          style: TextStyle(color: AppTheme.textSecondary)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close', style: TextStyle(color: AppTheme.neonBlue)),
          ),
        ],
      ),
    );
  }

  void _showScanDialog() {
    HapticFeedback.lightImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.cardBackground,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Text('Scan QR Code', style: TextStyle(color: AppTheme.textPrimary)),
        content: Text('Camera integration for QR code scanning', 
          style: TextStyle(color: AppTheme.textSecondary)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close', style: TextStyle(color: AppTheme.neonBlue)),
          ),
        ],
      ),
    );
  }

  void _showAddMoneyDialog() {
    HapticFeedback.lightImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.cardBackground,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Text('Add Money', style: TextStyle(color: AppTheme.textPrimary)),
        content: Text('Add funds from bank account or card', 
          style: TextStyle(color: AppTheme.textSecondary)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close', style: TextStyle(color: AppTheme.neonBlue)),
          ),
        ],
      ),
    );
  }
}