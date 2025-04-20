import 'package:code_pulse_web/widgets/problem_of_the_day.dart';
import 'package:code_pulse_web/widgets/progress_section.dart';
import 'package:code_pulse_web/widgets/recent_activity.dart';
import 'package:code_pulse_web/widgets/welcome_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:sizer/sizer.dart';

import '../core/constants.dart';
import 'featured_courses.dart';

class Body extends StatefulWidget {
  const Body({super.key});

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  final ScrollController _scrollController = ScrollController();
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scrollbar(
        controller: _scrollController,
        thumbVisibility: true,
        radius: const Radius.circular(8),
        thickness: 6,
        child: SingleChildScrollView(
          controller: _scrollController,
          physics: const BouncingScrollPhysics(),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                WelcomeCard(),
                Constants.space(15.sp),
                ProgressSection(),
                Constants.space(15.sp),
                ProblemOfTheDay(),
                Constants.space(15.sp),
                FeaturedCourses(),
                Constants.space(15.sp),
                RecentActivity(),
                Constants.space(15.sp),
              ],
            ).animate().fadeIn(duration: const Duration(milliseconds: 500)),
          ),
        ),
      ),
    );
  }
}
