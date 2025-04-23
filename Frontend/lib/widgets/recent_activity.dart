import 'package:code_pulse_web/widgets/activity_item.dart';
import 'package:flutter/material.dart';

class RecentActivity extends StatelessWidget {
  const RecentActivity({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Recent Activity',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        Card(
          elevation: 3,
          child: Column(
            children: [
              ActivityItem(
                title: 'Solved "CSS Grid Layout"',
                time: '2 hours ago',
                icon: Icons.check_circle,
                color: Colors.green,
              ),
              const Divider(height: 1),
              ActivityItem(
                title: 'Started "React Hooks" course',
                time: '5 hours ago',
                icon: Icons.play_circle_fill,
                color: Colors.blue,
              ),
              const Divider(height: 1),
              ActivityItem(
                title: 'Earned "JavaScript Expert" badge',
                time: '1 day ago',
                icon: Icons.verified,
                color: Colors.amber,
              ),
              const Divider(height: 1),
              ActivityItem(
                title: 'Completed "HTML5 Semantics" lesson',
                time: '2 days ago',
                icon: Icons.assignment_turned_in,
                color: Colors.purple,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
