import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../widgets/coin_animation.dart';

class PaymentScreen extends StatefulWidget {
  @override
  _PaymentScreenState createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen>
    with TickerProviderStateMixin {
  late AnimationController _slideController;
  late Animation<Offset> _slideAnimation;
  
  final TextEditingController _amountController = TextEditingController();
  final TextEditingController _noteController = TextEditingController();
  
  String selectedContact = '';
  bool showCoinAnimation = false;
  
  final List<Contact> contacts = [
    Contact('Sarah Wilson', '+91 98765 43210', '🎨'),
    Contact('Mike Johnson', '+91 87654 32109', '💼'),
    Contact('Emma Brown', '+91 76543 21098', '🌟'),
    Contact('David Lee', '+91 65432 10987', '🚀'),
    Contact('Lisa Chen', '+91 54321 09876', '🎵'),
    Contact('Alex Kumar', '+91 43210 98765', '⚡'),
  ];

  @override
  void initState() {
    super.initState();
    _slideController = AnimationController(
      duration: Duration(milliseconds: 600),
      vsync: this,
    );
    
    _slideAnimation = Tween<Offset>(
      begin: Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _slideController,
      curve: Curves.easeOutBack,
    ));
    
    _slideController.forward();
  }

  @override
  void dispose() {
    _slideController.dispose();
    _amountController.dispose();
    _noteController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      body: Stack(
        children: [
          // Background gradient
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  AppTheme.primaryDark,
                  AppTheme.secondaryDark,
                ],
              ),
            ),
          ),
          
          // Coin animation overlay
          if (showCoinAnimation) CoinAnimation(),
          
          SafeArea(
            child: SlideTransition(
              position: _slideAnimation,
              child: Column(
                children: [
                  _buildHeader(),
                  Expanded(
                    child: SingleChildScrollView(
                      physics: BouncingScrollPhysics(),
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(height: 20),
                          _buildAmountInput(),
                          SizedBox(height: 20),
                          _buildNoteInput(),
                          SizedBox(height: 30),
                          _buildContactList(),
                          SizedBox(height: 30),
                          _buildPayButton(),
                          SizedBox(height: 20),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: EdgeInsets.all(20),
      child: Row(
        children: [
          IconButton(
            onPressed: () => Navigator.pop(context),
            icon: Icon(
              Icons.arrow_back_ios_rounded,
              color: AppTheme.textPrimary,
            ),
          ),
          SizedBox(width: 10),
          Text(
            'Send Money',
            style: Theme.of(context).textTheme.headlineMedium,
          ),
          Spacer(),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: AppTheme.neonBlue.withOpacity(0.2),
              borderRadius: BorderRadius.circular(15),
              border: Border.all(
                color: AppTheme.neonBlue.withOpacity(0.3),
              ),
            ),
            child: Text(
              'Balance: ₹42,850',
              style: TextStyle(
                color: AppTheme.neonBlue,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAmountInput() {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: AppTheme.glassMorphism,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Enter Amount',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 15),
          Row(
            children: [
              Text(
                '₹',
                style: TextStyle(
                  color: AppTheme.neonGreen,
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Expanded(
                child: TextField(
                  controller: _amountController,
                  keyboardType: TextInputType.number,
                  style: TextStyle(
                    color: AppTheme.textPrimary,
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                  ),
                  decoration: InputDecoration(
                    border: InputBorder.none,
                    hintText: '0',
                    hintStyle: TextStyle(
                      color: AppTheme.textSecondary,
                      fontSize: 32,
                    ),
                  ),
                  inputFormatters: [
                    FilteringTextInputFormatter.digitsOnly,
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 15),
          Row(
            children: [
              _buildQuickAmount('500'),
              SizedBox(width: 10),
              _buildQuickAmount('1000'),
              SizedBox(width: 10),
              _buildQuickAmount('2000'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQuickAmount(String amount) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        _amountController.text = amount;
      },
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: AppTheme.neonBlue.withOpacity(0.2),
          borderRadius: BorderRadius.circular(15),
          border: Border.all(
            color: AppTheme.neonBlue.withOpacity(0.3),
          ),
        ),
        child: Text(
          '₹$amount',
          style: TextStyle(
            color: AppTheme.neonBlue,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }

  Widget _buildNoteInput() {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: AppTheme.glassMorphism,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Add Note (Optional)',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 15),
          TextField(
            controller: _noteController,
            style: TextStyle(color: AppTheme.textPrimary),
            decoration: InputDecoration(
              border: InputBorder.none,
              hintText: 'What\'s this for?',
              hintStyle: TextStyle(color: AppTheme.textSecondary),
            ),
            maxLines: 2,
          ),
          SizedBox(height: 10),
          Row(
            children: [
              _buildEmojiButton('🍕'),
              _buildEmojiButton('☕'),
              _buildEmojiButton('🎬'),
              _buildEmojiButton('🛒'),
              _buildEmojiButton('💝'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildEmojiButton(String emoji) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        _noteController.text += emoji;
      },
      child: Container(
        width: 40,
        height: 40,
        margin: EdgeInsets.only(right: 10),
        decoration: BoxDecoration(
          color: AppTheme.cardBackground,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: AppTheme.textSecondary.withOpacity(0.3),
          ),
        ),
        child: Center(
          child: Text(
            emoji,
            style: TextStyle(fontSize: 20),
          ),
        ),
      ),
    );
  }

  Widget _buildContactList() {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: AppTheme.glassMorphism,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Send To',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 15),
          Container(
            height: 200,
            child: ListView.builder(
              physics: BouncingScrollPhysics(),
              itemCount: contacts.length,
              itemBuilder: (context, index) {
                final contact = contacts[index];
                final isSelected = selectedContact == contact.name;
                
                return GestureDetector(
                  onTap: () {
                    HapticFeedback.lightImpact();
                    setState(() {
                      selectedContact = contact.name;
                    });
                  },
                  child: Container(
                    margin: EdgeInsets.only(bottom: 12),
                    padding: EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: isSelected 
                        ? AppTheme.neonBlue.withOpacity(0.2)
                        : AppTheme.cardBackground.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(15),
                      border: Border.all(
                        color: isSelected 
                          ? AppTheme.neonBlue 
                          : AppTheme.textSecondary.withOpacity(0.3),
                        width: isSelected ? 2 : 1,
                      ),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 50,
                          height: 50,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [
                                AppTheme.neonBlue,
                                AppTheme.neonPurple,
                              ],
                            ),
                            borderRadius: BorderRadius.circular(25),
                          ),
                          child: Center(
                            child: Text(
                              contact.emoji,
                              style: TextStyle(fontSize: 24),
                            ),
                          ),
                        ),
                        SizedBox(width: 15),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                contact.name,
                                style: TextStyle(
                                  color: AppTheme.textPrimary,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              SizedBox(height: 4),
                              Text(
                                contact.phone,
                                style: TextStyle(
                                  color: AppTheme.textSecondary,
                                  fontSize: 12,
                                ),
                              ),
                            ],
                          ),
                        ),
                        if (isSelected)
                          Icon(
                            Icons.check_circle_rounded,
                            color: AppTheme.neonBlue,
                          ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPayButton() {
    final bool canPay = _amountController.text.isNotEmpty && selectedContact.isNotEmpty;
    
    return GestureDetector(
      onTap: canPay ? _processPayment : null,
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.symmetric(vertical: 18),
        decoration: BoxDecoration(
          gradient: canPay
            ? LinearGradient(
                colors: [AppTheme.neonBlue, AppTheme.neonPurple],
              )
            : LinearGradient(
                colors: [
                  AppTheme.textSecondary.withOpacity(0.3),
                  AppTheme.textSecondary.withOpacity(0.2),
                ],
              ),
          borderRadius: BorderRadius.circular(20),
          boxShadow: canPay ? [
            BoxShadow(
              color: AppTheme.neonBlue.withOpacity(0.4),
              blurRadius: 20,
              spreadRadius: 2,
              offset: Offset(0, 8),
            ),
          ] : [],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.send_rounded,
              color: canPay ? Colors.white : AppTheme.textSecondary,
            ),
            SizedBox(width: 10),
            Text(
              'Send Payment',
              style: TextStyle(
                color: canPay ? Colors.white : AppTheme.textSecondary,
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _processPayment() {
    HapticFeedback.heavyImpact();
    
    setState(() {
      showCoinAnimation = true;
    });
    
    // Show success dialog after animation
    Future.delayed(Duration(seconds: 2), () {
      setState(() {
        showCoinAnimation = false;
      });
      
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: AppTheme.cardBackground,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          title: Row(
            children: [
              Icon(Icons.check_circle_rounded, color: AppTheme.neonGreen),
              SizedBox(width: 10),
              Text('Payment Sent!', style: TextStyle(color: AppTheme.textPrimary)),
            ],
          ),
          content: Text(
            '₹${_amountController.text} sent to $selectedContact successfully',
            style: TextStyle(color: AppTheme.textSecondary),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
                _amountController.clear();
                _noteController.clear();
                setState(() {
                  selectedContact = '';
                });
              },
              child: Text('Done', style: TextStyle(color: AppTheme.neonBlue)),
            ),
          ],
        ),
      );
    });
  }
}

class Contact {
  final String name;
  final String phone;
  final String emoji;

  Contact(this.name, this.phone, this.emoji);
}