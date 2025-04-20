import 'package:code_pulse_web/core/constants.dart';
import 'package:code_pulse_web/widgets/course_card.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

class FeaturedCourses extends StatelessWidget {
  const FeaturedCourses({super.key});

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final isSmallScreen = screenSize.width < 600;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Featured Courses',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            TextButton(
              onPressed: () {},
              child: const Text('View All'),
            ),
          ],
        ),
        const SizedBox(height: 16),
        SizedBox(
          height: isSmallScreen ? 200 : 220,
          child: ListView(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            padding: const EdgeInsets.symmetric(vertical: 4),
            children: [
              CourseCard(
                title: 'Advanced CSS',
                subtitle: 'Master Flexbox, Grid and Animations',
                imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/1*OFsc0SD55jhi8cjo7aCA4w.jpeg',
                color: Colors.purple,
              ),
              Constants.space(12.sp),
              CourseCard(
                title: 'JavaScript 2023',
                subtitle: 'ES6+ Features and Modern Patterns',
                imageUrl: 'https://cdn.geekboots.com/geek/javascript-meta-1652702081069.jpg',
                color: Colors.amber,
              ),
              Constants.space(12.sp),
              CourseCard(
                title: 'React Masterclass',
                subtitle: 'Hooks, Context and Performance',
                imageUrl: 'https://www.scnsoft.com/blog-pictures/cover-pics/react_js.png',
                color: Colors.blue,
              ),
              Constants.space(12.sp),
              CourseCard(
                title: 'TypeScript Basics',
                subtitle: 'Static Typing for JavaScript',
                imageUrl: 'https://cdn.thenewstack.io/media/2022/01/10b88c68-typescript-logo.png',
                color: Colors.cyan,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
