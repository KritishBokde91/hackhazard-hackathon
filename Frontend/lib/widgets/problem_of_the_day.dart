import 'package:code_pulse_web/core/constants.dart';
import 'package:code_pulse_web/widgets/problem_card.dart';
import 'package:flutter/material.dart';

class ProblemOfTheDay extends StatelessWidget {
  const ProblemOfTheDay({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Problem of the Day',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          child: ListView.builder(
            scrollDirection: Axis.vertical,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: Constants.problems.length,
              itemBuilder: (context, index) {
                final problem = Constants.problems[index];
                return ProblemCard(problem: problem);
              },
          ),
        )
      ],
    );
  }
}
