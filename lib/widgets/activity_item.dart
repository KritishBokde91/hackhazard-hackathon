import 'package:flutter/material.dart';

class ActivityItem extends StatelessWidget {
  final String title;
  final String time;
  final IconData icon;
  final Color color;
  const ActivityItem({
    super.key,
    required this.title,
    required this.time,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: color),
      title: Text(title),
      subtitle: Text(time),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {},
    );
  }
}
