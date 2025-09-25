import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Financial App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'SF Pro Display',
      ),
      home: AuthWrapper(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class AuthWrapper extends StatefulWidget {
  @override
  _AuthWrapperState createState() => _AuthWrapperState();
}

class _AuthWrapperState extends State<AuthWrapper> {
  bool isLogin = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF5F7FA),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: 60),
                // Header
                Text(
                  isLogin ? 'Welcome back!' : 'Create Account',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF2D3748),
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  isLogin 
                    ? 'Sign in to manage your digital finances'
                    : 'Join us to start managing your digital finances',
                  style: TextStyle(
                    fontSize: 16,
                    color: Color(0xFF718096),
                  ),
                ),
                SizedBox(height: 40),
                
                // Form Card
                Container(
                  padding: EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.05),
                        blurRadius: 20,
                        offset: Offset(0, 10),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      if (!isLogin) ...[
                        _buildTextField(
                          label: 'Full Name',
                          icon: Icons.person_outline,
                          hint: 'Enter your full name',
                        ),
                        SizedBox(height: 20),
                      ],
                      _buildTextField(
                        label: 'Email',
                        icon: Icons.email_outlined,
                        hint: 'Enter your email',
                        keyboardType: TextInputType.emailAddress,
                      ),
                      SizedBox(height: 20),
                      _buildTextField(
                        label: 'Password',
                        icon: Icons.lock_outline,
                        hint: 'Enter your password',
                        isPassword: true,
                      ),
                      if (!isLogin) ...[
                        SizedBox(height: 20),
                        _buildTextField(
                          label: 'Confirm Password',
                          icon: Icons.lock_outline,
                          hint: 'Confirm your password',
                          isPassword: true,
                        ),
                      ],
                      if (isLogin) ...[
                        SizedBox(height: 16),
                        Align(
                          alignment: Alignment.centerRight,
                          child: TextButton(
                            onPressed: () {},
                            child: Text(
                              'Forgot Password?',
                              style: TextStyle(
                                color: Color(0xFF3182CE),
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ),
                      ],
                      SizedBox(height: 30),
                      
                      // Main Action Button
                      Container(
                        width: double.infinity,
                        height: 56,
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color(0xFF3182CE),
                            foregroundColor: Colors.white,
                            elevation: 0,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                          child: Text(
                            isLogin ? 'Sign In' : 'Create Account',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                      
                      SizedBox(height: 24),
                      
                      // Divider
                      Row(
                        children: [
                          Expanded(child: Divider(color: Color(0xFFE2E8F0))),
                          Padding(
                            padding: EdgeInsets.symmetric(horizontal: 16),
                            child: Text(
                              'OR',
                              style: TextStyle(
                                color: Color(0xFF718096),
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                          Expanded(child: Divider(color: Color(0xFFE2E8F0))),
                        ],
                      ),
                      
                      SizedBox(height: 24),
                      
                      // Social Login Buttons
                      _buildSocialButton(
                        icon: Icons.fingerprint,
                        text: isLogin ? 'Sign in with Biometrics' : 'Enable Biometrics',
                        color: Color(0xFF48BB78),
                      ),
                      SizedBox(height: 12),
                      _buildSocialButton(
                        icon: Icons.g_mobiledata,
                        text: isLogin ? 'Sign in with Google' : 'Sign up with Google',
                        color: Color(0xFFEA4335),
                      ),
                    ],
                  ),
                ),
                
                SizedBox(height: 32),
                
                // Toggle between Login/Signup
                Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        isLogin 
                          ? "Don't have an account? "
                          : "Already have an account? ",
                        style: TextStyle(
                          color: Color(0xFF718096),
                          fontSize: 16,
                        ),
                      ),
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            isLogin = !isLogin;
                          });
                        },
                        child: Text(
                          isLogin ? 'Sign Up' : 'Sign In',
                          style: TextStyle(
                            color: Color(0xFF3182CE),
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                
                SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField({
    required String label,
    required IconData icon,
    required String hint,
    bool isPassword = false,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: Color(0xFF2D3748),
          ),
        ),
        SizedBox(height: 8),
        Container(
          decoration: BoxDecoration(
            color: Color(0xFFF7FAFC),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Color(0xFFE2E8F0)),
          ),
          child: TextField(
            obscureText: isPassword,
            keyboardType: keyboardType,
            decoration: InputDecoration(
              hintText: hint,
              hintStyle: TextStyle(color: Color(0xFF718096)),
              prefixIcon: Icon(icon, color: Color(0xFF718096)),
              suffixIcon: isPassword 
                ? Icon(Icons.visibility_off_outlined, color: Color(0xFF718096))
                : null,
              border: InputBorder.none,
              contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSocialButton({
    required IconData icon,
    required String text,
    required Color color,
  }) {
    return Container(
      width: double.infinity,
      height: 56,
      child: OutlinedButton(
        onPressed: () {},
        style: OutlinedButton.styleFrom(
          foregroundColor: Color(0xFF2D3748),
          side: BorderSide(color: Color(0xFFE2E8F0)),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: color, size: 24),
            SizedBox(width: 12),
            Text(
              text,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Dashboard placeholder (you can replace this with your actual dashboard)
class DashboardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF5F7FA),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Good afternoon,',
              style: TextStyle(
                fontSize: 16,
                color: Color(0xFF718096),
                fontWeight: FontWeight.normal,
              ),
            ),
            Text(
              'Alex!',
              style: TextStyle(
                fontSize: 24,
                color: Color(0xFF3182CE),
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.account_balance_wallet,
              size: 80,
              color: Color(0xFF3182CE),
            ),
            SizedBox(height: 20),
            Text(
              'Welcome to Your Dashboard!',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Color(0xFF2D3748),
              ),
            ),
            SizedBox(height: 10),
            Text(
              'You have successfully logged in.',
              style: TextStyle(
                fontSize: 16,
                color: Color(0xFF718096),
              ),
            ),
          ],
        ),
      ),
    );
  }
}