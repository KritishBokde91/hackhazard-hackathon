import 'package:code_pulse_web/core/colors.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../view_model/auth_view_model.dart';
import '../view_model/user_info_view_model.dart';

class ResponsiveDrawer extends StatefulWidget {
  const ResponsiveDrawer({super.key});

  @override
  State<ResponsiveDrawer> createState() => _ResponsiveDrawerState();
}

class _ResponsiveDrawerState extends State<ResponsiveDrawer> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final bool isMobile = screenSize.width < 600;
    final bool isTablet = screenSize.width < 1000;

    final userInfoViewModel = Provider.of<UserInfoViewModel>(context);
    final authViewModel = Provider.of<AuthViewModel>(context);
    final userName = userInfoViewModel.userInfoModel?.name ?? 'Guest';
    final photoUrl =
        userInfoViewModel.userInfoModel?.photoUrl ??
            'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png';

    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    final drawerBackgroundColor = isDarkMode
        ? const Color(0xFF1E1E1E)
        : const Color(0xFFF5F5F7);

    final selectedItemColor = UICOLORS.white;
    final unselectedItemColor = isDarkMode ? Colors.white70 : Colors.black87;

    final drawerWidth = isMobile
        ? screenSize.width * 0.75
        : isTablet
        ? screenSize.width * 0.5
        : screenSize.width * 0.3;

    return Drawer(
      width: drawerWidth,
      backgroundColor: drawerBackgroundColor,
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(userName, photoUrl),
            Expanded(
              child: ListView(
                padding: EdgeInsets.zero,
                physics: const ClampingScrollPhysics(),
                children: [
                  _buildDrawerItem(
                    Icons.home,
                    'Home',
                    0,
                    authViewModel,
                    selectedItemColor,
                    unselectedItemColor,
                  ),
                  _buildDrawerItem(
                    Icons.code,
                    'Problems',
                    1,
                    authViewModel,
                    selectedItemColor,
                    unselectedItemColor,
                  ),
                  _buildDrawerItem(
                    Icons.school,
                    'Courses',
                    2,
                    authViewModel,
                    selectedItemColor,
                    unselectedItemColor,
                  ),
                  _buildDrawerItem(
                    Icons.leaderboard,
                    'Leaderboard',
                    3,
                    authViewModel,
                    selectedItemColor,
                    unselectedItemColor,
                  ),
                  _buildDrawerItem(
                    Icons.forum,
                    'Groq Guru',
                    4,
                    authViewModel,
                    selectedItemColor,
                    unselectedItemColor,
                  ),
                  Divider(
                    height: 32,
                    color: isDarkMode ? Colors.white24 : Colors.black12,
                  ),
                  _buildDrawerItem(
                    Icons.exit_to_app,
                    'Logout',
                    6,
                    authViewModel,
                    selectedItemColor,
                    unselectedItemColor,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(String userName, String photoUrl) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final screenSize = MediaQuery.of(context).size;
    final bool isMobile = screenSize.width < 600;

    // Responsive font sizes
    final titleSize = isMobile ? 14.0 : 16.0;
    final subtitleSize = isMobile ? 12.0 : 14.0;

    // Responsive spacing
    final verticalPadding = isMobile ? 12.0 : 16.0;
    final avatarRadius = isMobile ? 20.0 : 30.0;
    final spacing = isMobile ? 6.0 : 10.0;

    return Padding(
      padding: EdgeInsets.all(8),
      child: Container(
        width: double.infinity,
        // No fixed height - will adjust based on content
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: isDarkMode
                ? [const Color(0xFF6E45E2), const Color(0xFF88D3CE)]
                : [Theme.of(context).primaryColor, Theme.of(context).primaryColor.withOpacity(0.7)],
          ),
          borderRadius: BorderRadius.circular(15),
        ),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 16, vertical: verticalPadding),
          child: Column(
            mainAxisSize: MainAxisSize.min, // This allows auto height
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CircleAvatar(
                radius: avatarRadius,
                backgroundImage: NetworkImage(photoUrl),
              ),
              SizedBox(height: spacing),
              Text(
                userName,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: titleSize,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: spacing / 2),
              Text(
                'Level 5 Frontend Developer',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.8),
                  fontSize: subtitleSize,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDrawerItem(
      IconData icon,
      String title,
      int index,
      AuthViewModel? authViewModel,
      Color selectedColor,
      Color unselectedColor,
      ) {
    final isSelected = _selectedIndex == index;
    final screenSize = MediaQuery.of(context).size;
    final bool isMobile = screenSize.width < 600;

    // Responsive sizes
    final iconSize = isMobile ? 20.0 : 24.0;
    final fontSize = isMobile ? 12.0 : 14.0;
    final horizontalPadding = isMobile ? 8.0 : 16.0;
    final verticalPadding = isMobile ? 2.0 : 4.0;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4, vertical: 2),
      child: ListTile(
        leading: Icon(
          icon,
          size: iconSize,
          color: isSelected ? selectedColor : unselectedColor,
        ),
        title: Text(
          title,
          style: TextStyle(
            fontSize: fontSize,
            color: isSelected ? selectedColor : unselectedColor,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
        minLeadingWidth: iconSize,
        contentPadding: EdgeInsets.symmetric(
          horizontal: horizontalPadding,
          vertical: verticalPadding,
        ),
        dense: true,
        selected: isSelected,
        selectedTileColor: selectedColor.withOpacity(0.1),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        onTap: () {
          setState(() {
            _selectedIndex = index;
          });
          Navigator.pop(context);
          if (_selectedIndex == 6) {
            _showLogoutDialog(authViewModel);
          } else if (_selectedIndex == 1) {
            context.go('/problem');
          } else if (_selectedIndex == 2) {
            context.go('/course');
          } else if (_selectedIndex == 0) {
            context.go('/');
          } else if (_selectedIndex == 3) {
            // context.go('/leaderboard');
          } else if (_selectedIndex == 4) {
            context.go('/guru');
          }
        },
      ),
    );
  }

  void _showLogoutDialog(AuthViewModel? authViewModel) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final screenSize = MediaQuery.of(context).size;
    final bool isMobile = screenSize.width < 600;

    // Responsive dialog size
    final dialogWidth = isMobile ? screenSize.width * 0.8 : screenSize.width * 0.4;

    showDialog(
      context: context,
      builder: (context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          child: Container(
            width: dialogWidth,
            decoration: BoxDecoration(
              color: isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
              borderRadius: BorderRadius.circular(15),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Logout',
                    style: TextStyle(
                      color: isDarkMode ? Colors.white : Colors.black,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Are you sure you want to logout?',
                    style: TextStyle(
                      color: isDarkMode ? Colors.white70 : Colors.black87,
                      fontSize: 14,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: Text(
                          'Cancel',
                          style: TextStyle(
                            color: isDarkMode ? Colors.white70 : Colors.black54,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Theme.of(context).primaryColor,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        onPressed: () {
                          try {
                            authViewModel?.signOut();
                            Navigator.pop(context);
                          } on Exception catch (e) {
                            debugPrint('Logout error: $e');
                          }
                        },
                        child: const Text('Logout'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}