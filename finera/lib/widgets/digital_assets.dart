// widgets/digital_assets.dart
import 'package:finera/uitls/app_theme.dart';
import 'package:flutter/material.dart';


class DigitalAssets extends StatefulWidget {
  @override
  _DigitalAssetsState createState() => _DigitalAssetsState();
}

class _DigitalAssetsState extends State<DigitalAssets>
    with TickerProviderStateMixin {
  late AnimationController _slideController;
  late Animation<Offset> _slideAnimation;

  final List<Asset> assets = [
    Asset('AAPL', 'Apple Inc.', 15420.50, 2.34, true),
    Asset('TSLA', 'Tesla Inc.', 8750.25, -1.23, false),
    Asset('GOOGL', 'Alphabet Inc.', 12300.75, 0.87, true),
    Asset('BTC', 'Bitcoin', 25000.00, 4.56, true),
    Asset('ETH', 'Ethereum', 8500.30, -0.45, false),
  ];

  @override
  void initState() {
    super.initState();
    _slideController = AnimationController(
      duration: Duration(milliseconds: 600),
      vsync: this,
    );
    _slideAnimation = Tween<Offset>(
      begin: Offset(1, 0),
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
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _slideAnimation,
      child: Container(
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              AppTheme.neonGreen.withOpacity(0.1),
              AppTheme.neonBlue.withOpacity(0.1),
            ],
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: AppTheme.neonGreen.withOpacity(0.3),
            width: 1,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  Icons.trending_up_rounded,
                  color: AppTheme.neonGreen,
                  size: 20,
                ),
                SizedBox(width: 8),
                Text(
                  'Digital Assets Portfolio',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Spacer(),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppTheme.neonGreen.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    'Live',
                    style: TextStyle(
                      color: AppTheme.neonGreen,
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            Container(
              height: 160,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                physics: BouncingScrollPhysics(),
                itemCount: assets.length,
                itemBuilder: (context, index) {
                  final asset = assets[index];
                  return Container(
                    width: 140,
                    margin: EdgeInsets.only(right: 12),
                    padding: EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.cardBackground.withOpacity(0.7),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: asset.isPositive
                            ? AppTheme.neonGreen.withOpacity(0.3)
                            : Colors.red.withOpacity(0.3),
                        width: 1,
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              width: 32,
                              height: 32,
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  colors: asset.isPositive
                                      ? [AppTheme.neonGreen, AppTheme.neonBlue]
                                      : [Colors.red, Colors.orange],
                                ),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Center(
                                child: Text(
                                  asset.symbol.substring(0, 2),
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                            Spacer(),
                            Icon(
                              asset.isPositive
                                  ? Icons.trending_up_rounded
                                  : Icons.trending_down_rounded,
                              color: asset.isPositive
                                  ? AppTheme.neonGreen
                                  : Colors.red,
                              size: 16,
                            ),
                          ],
                        ),
                        SizedBox(height: 12),
                        Text(
                          asset.symbol,
                          style: TextStyle(
                            color: AppTheme.textPrimary,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          asset.name,
                          style: TextStyle(
                            color: AppTheme.textSecondary,
                            fontSize: 10,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        SizedBox(height: 12),
                        Text(
                          '₹${asset.value.toStringAsFixed(2)}',
                          style: TextStyle(
                            color: AppTheme.textPrimary,
                            fontWeight: FontWeight.w600,
                            fontSize: 13,
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          '${asset.isPositive ? '+' : ''}${asset.change.toStringAsFixed(2)}%',
                          style: TextStyle(
                            color: asset.isPositive
                                ? AppTheme.neonGreen
                                : Colors.red,
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: Text(
                    'Total Portfolio Value',
                    style: TextStyle(
                      color: AppTheme.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                ),
                Text(
                  '₹69,971.80',
                  style: TextStyle(
                    color: AppTheme.neonGreen,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class Asset {
  final String symbol;
  final String name;
  final double value;
  final double change;
  final bool isPositive;

  Asset(this.symbol, this.name, this.value, this.change, this.isPositive);
}
      