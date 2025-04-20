import 'package:flutter/material.dart';

class WelcomeCard extends StatelessWidget {
  const WelcomeCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: LayoutBuilder(
          builder: (context, constraints) {
            final isVerySmallScreen = constraints.maxWidth < 350;
            if (isVerySmallScreen) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Image.network(
                    'https://cdn-icons-png.flaticon.com/512/3242/3242257.png',
                    width: 80,
                    height: 80,
                    errorBuilder: (context, error, stackTrace) =>
                    const Icon(Icons.error_outline, size: 80),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Welcome back, John!',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Keep practicing to improve your frontend skills. Today we have a new challenge for you!',
                    style: TextStyle(fontSize: 14),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                      minimumSize: const Size(double.infinity, 50),
                    ),
                    child: const Text('Start Practicing'),
                  ),
                ],
              );
            } else {
              return Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Welcome back, John!',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Keep practicing to improve your frontend skills. Today we have a new challenge for you!',
                          style: TextStyle(fontSize: 14),
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          ),
                          child: const Text('Start Practicing'),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 16),
                  Image.network(
                    'https://cdn-icons-png.flaticon.com/512/3242/3242257.png',
                    width: 80,
                    height: 80,
                    errorBuilder: (context, error, stackTrace) =>
                    const Icon(Icons.error_outline, size: 80),
                  ),
                ],
              );
            }
          },
        ),
      ),
    );
  }
}
