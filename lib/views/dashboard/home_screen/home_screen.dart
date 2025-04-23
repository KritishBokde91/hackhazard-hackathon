import 'package:code_pulse_web/widgets/body.dart';
import 'package:code_pulse_web/widgets/custom_nav_bar.dart';
import 'package:code_pulse_web/widgets/responsive_drawer.dart';
import 'package:code_pulse_web/widgets/shimmer_loader.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({
    super.key,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _isLoading = true;
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    final backgroundColor = isDarkMode
        ? const Color(0xFF121212)
        : const Color(0xFFF5F5F7);

    return Scaffold(
      extendBodyBehindAppBar: true,
      extendBody: true,
      backgroundColor: backgroundColor,
      appBar: customNavBar(context),
      drawer: ResponsiveDrawer(),
      body: Container(
        decoration: BoxDecoration(
          gradient: isDarkMode
              ? const LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF121212), Color(0xFF1E1E1E)],
          )
              : null,
        ),
        child: _isLoading
            ? ShimmerLoader(isDarkMode: isDarkMode)
            : Body(),
      ),
    );
  }
}