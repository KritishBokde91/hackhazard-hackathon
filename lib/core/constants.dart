import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';

class Constants {
  static const String webName = 'Coding Geeks';

  static const List<Map<String, dynamic>> problems = [
    {
      'title': 'Responsive Navbar',
      'description': 'Create a responsive navigation bar that collapses into a hamburger menu on mobile devices. The navbar should have a logo on the left and navigation links on the right.',
      'image': 'assets/images/navbar.png',
      'tags': ['HTML', 'CSS', 'JavaScript'],
      'difficulty': 'Easy',
    },
    {
      'title': 'Todo List App',
      'description': 'Build a simple todo list application where users can add, edit, and delete tasks. Use local storage to save the tasks.',
      'image': 'assets/images/todo.png',
      'tags': ['JavaScript', 'React'],
      'difficulty': 'Medium',
    },
    {
      'title': 'Weather App',
      'description': 'Create a weather application that fetches data from a weather API and displays the current weather and forecast for the next 5 days.',
      'image': 'assets/images/weather.png',
      'category': 'HTML/CSS/JavaScript',
      'difficulty': 'Medium',
    },
    {
      'title': 'E-commerce Website',
      'description': 'Build a simple e-commerce website with product listings, a shopping cart, and a checkout process.',
      'image': 'assets/images/ecommerce.png',
      'category': 'HTML/CSS/JavaScript',
      'difficulty': 'Hard',
    },
    {
      'title': 'Chat Application',
      'description': 'Create a real-time chat application using WebSocket or Firebase. Users should be able to send and receive messages in real-time.',
      'image': 'assets/images/chat.png',
      'category': 'HTML/CSS/JavaScript',
      'difficulty': 'Hard',
    },
  ];

  static const List<Map<String, dynamic>> competitiveProblems = [
    {
      'title': 'Array Rotation',
      'difficulty': 'Easy',
      'tags': ['Arrays', 'Algorithms'],
      'points': 100,
      'completed': 78,
      'icon': Iconsax.code_1,
    },
    {
      'title': 'Binary Tree Traversal',
      'difficulty': 'Medium',
      'tags': ['Trees', 'Recursion'],
      'points': 300,
      'completed': 45,
      'icon': Iconsax.tree,
    },
    {
      'title': 'Dijkstra\'s Algorithm',
      'difficulty': 'Hard',
      'tags': ['Graphs', 'Shortest Path'],
      'points': 500,
      'completed': 22,
      'icon': Iconsax.diagram,
    },
    {
      'title': 'Dynamic Programming',
      'difficulty': 'Hard',
      'tags': ['DP', 'Optimization'],
      'points': 450,
      'completed': 30,
      'icon': Iconsax.chart_2,
    },
    {
      'title': 'Sliding Window',
      'difficulty': 'Medium',
      'tags': ['Arrays', 'Optimization'],
      'points': 350,
      'completed': 52,
      'icon': Iconsax.slider_horizontal,
    },
  ];

  static const List<Map<String, dynamic>> frontendProblems = [
    {
      'title': 'Responsive Navbar',
      'difficulty': 'Easy',
      'tags': ['HTML', 'CSS', 'Responsive'],
      'points': 100,
      'completed': 65,
      'icon': Iconsax.code,
    },
    {
      'title': 'Animated Login Form',
      'difficulty': 'Medium',
      'tags': ['CSS', 'JS', 'Animations'],
      'points': 250,
      'completed': 42,
      'icon': Iconsax.login_1,
    },
    {
      'title': 'Drag & Drop UI Builder',
      'difficulty': 'Hard',
      'tags': ['JS', 'DOM', 'Interactive'],
      'points': 500,
      'completed': 18,
      'icon': Iconsax.driver,
    },
    {
      'title': 'CSS Art Challenge',
      'difficulty': 'Medium',
      'tags': ['CSS', 'Art'],
      'points': 300,
      'completed': 37,
      'icon': Iconsax.paintbucket,
    },
    {
      'title': 'Real-time Chat UI',
      'difficulty': 'Hard',
      'tags': ['JS', 'WebSocket', 'UI'],
      'points': 450,
      'completed': 23,
      'icon': Iconsax.message,
    },
  ];

  static const List<Color> categoryColors = [
    Color(0xFF6EE7B7),
    Color(0xFF93C5FD),
  ];

  static Widget space(double height) {
    return SizedBox(height: height);
  }
}
