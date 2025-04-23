import 'package:flutter/material.dart';

class ProgressCard extends StatelessWidget {
  final String imageUrl;
  final String title;
  final int percent;
  final Color color;
  const ProgressCard({
    super.key,
    required this.imageUrl,
    required this.title,
    required this.percent,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    return Card(
      elevation: 3,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Image.network(
              imageUrl,
              width: 40,
              height: 40,
              errorBuilder:
                  (context, error, stackTrace) =>
                      const Icon(Icons.code, size: 40),
            ),
            const SizedBox(height: 12),
            Text(
              title,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            LinearProgressIndicator(
              value: percent / 100,
              backgroundColor:
                  isDarkMode ? color.withValues(alpha: 0.3) : color.withValues(alpha: 0.2),
              color: color,
              minHeight: 8,
              borderRadius: BorderRadius.circular(4),
            ),
            const SizedBox(height: 8),
            Text(
              '$percent% Complete',
              style: TextStyle(
                fontSize: 12,
                color:
                    Theme.of(context).brightness == Brightness.dark
                        ? Colors.grey[300]
                        : Colors.grey[600],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
