import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';

class ProblemCard2 extends StatelessWidget {
  final String title;
  final String difficulty;
  final List<String> tags;
  final Color color;
  final IconData icon;
  final int points;
  final int completed;
  const ProblemCard2({
    super.key,
    required this.title,
    required this.difficulty,
    required this.tags,
    required this.color,
    required this.icon,
    required this.points,
    required this.completed,
  });

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isDesktop = size.width > 900;
    final isTablet = size.width > 600 && size.width <= 900;
    final isMobile = size.width <= 600;

    // Adjust font sizes based on screen size
    final titleFontSize =
        isDesktop
            ? 16.0
            : isTablet
            ? 14.0
            : 12.0;
    final tagFontSize =
        isDesktop
            ? 12.0
            : isTablet
            ? 10.0
            : 9.0;
    final buttonFontSize =
        isDesktop
            ? 12.0
            : isTablet
            ? 10.0
            : 9.0;

    // Calculate appropriate spacing
    final cardPadding =
        size.width *
        (isDesktop
            ? 0.02
            : isTablet
            ? 0.025
            : 0.03);
    final spaceHeight = size.height * 0.01;
    final spaceWidth = size.width * 0.01;

    final difficultyColor =
        difficulty == 'Easy'
            ? Colors.green
            : difficulty == 'Medium'
            ? Colors.amber
            : Colors.red;

    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E1E),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.1),
            blurRadius: 10,
            spreadRadius: 1,
            offset: const Offset(0, 5),
          ),
        ],
        border: Border.all(color: const Color(0xFF2E2E2E), width: 1),
      ),
      child: Padding(
        padding: EdgeInsets.all(cardPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: EdgeInsets.symmetric(
                    horizontal: cardPadding,
                    vertical: size.height * 0.005,
                  ),
                  decoration: BoxDecoration(
                    color: difficultyColor.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: difficultyColor.withValues(alpha: 0.5),
                      width: 1,
                    ),
                  ),
                  child: Text(
                    difficulty,
                    style: TextStyle(
                      color: difficultyColor,
                      fontSize: tagFontSize,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Row(
                  children: [
                    Icon(
                      Iconsax.star,
                      size: titleFontSize,
                      color: Colors.amber,
                    ),
                    SizedBox(width: spaceWidth),
                    Text(
                      '$points XP',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: tagFontSize,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            SizedBox(height: spaceHeight * 2),
            Row(
              children: [
                Container(
                  padding: EdgeInsets.all(cardPadding * 0.6),
                  decoration: BoxDecoration(
                    color: color.withValues(alpha: 0.1),
                    shape: BoxShape.circle,
                    border: Border.all(color: color.withValues(alpha: 0.3), width: 1),
                  ),
                  child: Icon(icon, size: titleFontSize, color: color),
                ),
                SizedBox(width: spaceWidth * 2),
                Expanded(
                  child: Text(
                    title,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: titleFontSize,
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            SizedBox(height: spaceHeight * 2),
            Wrap(
              spacing: spaceWidth * 2,
              runSpacing: spaceHeight,
              children:
                  tags
                      .map(
                        (tag) => Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: cardPadding,
                            vertical: size.height * 0.005,
                          ),
                          decoration: BoxDecoration(
                            color: const Color(0xFF2E2E2E),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            tag,
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: tagFontSize,
                            ),
                          ),
                        ),
                      )
                      .toList(),
            ),
            SizedBox(height: spaceHeight * 2),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '$completed% completed',
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: tagFontSize,
                  ),
                ),
                SizedBox(height: spaceHeight * 0.5),
                LayoutBuilder(
                  builder: (context, constraints) {
                    return Container(
                      height: size.height * 0.005,
                      width: constraints.maxWidth,
                      decoration: BoxDecoration(
                        color: const Color(0xFF2E2E2E),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Container(
                          width: (constraints.maxWidth * completed) / 100,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [color, color.withValues(alpha: 0.7)],
                            ),
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
            isMobile ? SizedBox(height: spaceHeight) : Spacer(flex: 1),
            Align(
              alignment: Alignment.centerRight,
              child: Container(
                padding: EdgeInsets.symmetric(
                  horizontal: cardPadding * 1.5,
                  vertical: size.height * 0.01,
                ),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [color, color.withValues(alpha: 0.7)],
                  ),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  'Solve Challenge',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: buttonFontSize,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
