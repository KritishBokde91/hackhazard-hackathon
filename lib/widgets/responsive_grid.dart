import 'package:code_pulse_web/widgets/problem_card2.dart';
import 'package:flutter/material.dart';

class ResponsiveGrid extends StatelessWidget {
  final List<Map<String, dynamic>> problems;
  final Color color;
  const ResponsiveGrid({
    super.key,
    required this.problems,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isDesktop = size.width > 900;
    final isTablet = size.width > 600 && size.width <= 900;

    if (isDesktop) {
      return GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 20,
          crossAxisSpacing: 20,
          childAspectRatio: 1.9,
        ),
        itemCount: problems.length,
        itemBuilder: (context, index) {
          final problem = problems[index];
          return ProblemCard2(
            title: problem['title'],
            difficulty: problem['difficulty'],
            tags: problem['tags'],
            points: problem['points'],
            completed: problem['completed'],
            icon: problem['icon'],
            color: color,
          );
        },
      );
    } else if (isTablet) {
      return GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
          childAspectRatio: 1.4,
        ),
        itemCount: problems.length,
        itemBuilder: (context, index) {
          final problem = problems[index];
          return ProblemCard2(
            title: problem['title'],
            difficulty: problem['difficulty'],
            tags: problem['tags'],
            points: problem['points'],
            completed: problem['completed'],
            icon: problem['icon'],
            color: color,
          );
        },
      );
    } else {
      // Mobile layout
      return ListView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: problems.length,
        itemBuilder: (context, index) {
          final problem = problems[index];
          return Padding(
            padding: EdgeInsets.only(bottom: 16),
            child: ProblemCard2(
              title: problem['title'],
              difficulty: problem['difficulty'],
              tags: problem['tags'],
              points: problem['points'],
              completed: problem['completed'],
              icon: problem['icon'],
              color: color,
            ),
          );
        },
      );
    }
  }
}
