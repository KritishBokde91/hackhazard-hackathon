import 'package:code_pulse_web/widgets/body.dart';
import 'package:code_pulse_web/widgets/custom_nav_bar.dart';
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
  int _selectedIndex = 0;
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

    return Scaffold(
      extendBodyBehindAppBar: true,
      extendBody: true,
      appBar: customNavBar(context),
      drawer: _buildDrawer(),
      body: _isLoading
          ? ShimmerLoader(isDarkMode: isDarkMode)
          : Body(),
    );
  }

  Widget _buildDrawer() {
    return Drawer(
      child: Column(
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const CircleAvatar(
                  radius: 30,
                  backgroundImage: NetworkImage('https://randomuser.me/api/portraits/men/1.jpg'),
                ),
                const SizedBox(height: 10),
                const Text(
                  'John Doe',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Level 5 Frontend Developer',
                  style: TextStyle(
                    color: Colors.white.withValues(alpha: 0.8),
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              padding: EdgeInsets.zero,
              physics: const ClampingScrollPhysics(),
              children: [
                _buildDrawerItem(Icons.home, 'Home', 0),
                _buildDrawerItem(Icons.code, 'Problems', 1),
                _buildDrawerItem(Icons.school, 'Courses', 2),
                _buildDrawerItem(Icons.leaderboard, 'Leaderboard', 3),
                _buildDrawerItem(Icons.forum, 'Discuss', 4),
                _buildDrawerItem(Icons.settings, 'Settings', 5),
                const Divider(height: 32),
                _buildDrawerItem(Icons.exit_to_app, 'Logout', 6),
              ],
            ),
          ),
        ],
      ),
    );
  }

  ListTile _buildDrawerItem(IconData icon, String title, int index) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      selected: _selectedIndex == index,
      onTap: () {
        setState(() {
          _selectedIndex = index;
        });
        Navigator.pop(context);
      },
    );
  }
}