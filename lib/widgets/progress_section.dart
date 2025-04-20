import 'package:code_pulse_web/widgets/progress_card.dart';
import 'package:flutter/material.dart';

class ProgressSection extends StatelessWidget {
  const ProgressSection({super.key});

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final isSmallScreen = screenSize.width < 600;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Your Progress',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        isSmallScreen
            ? Column(
          children: [
            ProgressCard(
              title: 'HTML/CSS',
              percent: 75,
              color: Colors.blue,
              imageUrl: 'https://cdn-icons-png.flaticon.com/512/732/732190.png',
            ),
            const SizedBox(height: 12),
            ProgressCard(
              title: 'JavaScript',
              percent: 60,
              color: Colors.amber,
              imageUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
            ),
            const SizedBox(height: 12),
            ProgressCard(
              title: 'React',
              percent: 45,
              color: Colors.cyan,
              imageUrl: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png',
            ),
          ],
        )
            : Row(
          children: [
            Expanded(
              child: ProgressCard(
                title: 'HTML/CSS',
                percent: 75,
                color: Colors.blue,
                imageUrl: 'https://cdn-icons-png.flaticon.com/512/732/732190.png',
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ProgressCard(
                title: 'JavaScript',
                percent: 60,
                color: Colors.amber,
                imageUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ProgressCard(
                title: 'React',
                percent: 45,
                color: Colors.cyan,
                imageUrl: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png',
              ),
            ),
          ],
        ),
      ],
    );
  }
}
