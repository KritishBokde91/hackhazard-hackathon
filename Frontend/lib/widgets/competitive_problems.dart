import 'package:code_pulse_web/widgets/responsive_grid.dart';
import 'package:flutter/material.dart';

import '../core/constants.dart';

class CompetitiveProblems extends StatelessWidget {
  final double titleSize;
  final double subtitleSize;
  const CompetitiveProblems({
    super.key,
    required this.titleSize,
    required this.subtitleSize,
  });

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return SliverToBoxAdapter(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Competitive Programming',
            style: TextStyle(
              fontSize: titleSize,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          SizedBox(height: size.height * 0.02),
          Text(
            'Sharpen your problem-solving skills with algorithmic challenges',
            style: TextStyle(fontSize: subtitleSize, color: Colors.white70),
          ),
          SizedBox(height: size.height * 0.03),
          ResponsiveGrid(
            problems: Constants.competitiveProblems,
            color: Constants.categoryColors[1],
          ),
        ],
      ),
    );
  }
}
