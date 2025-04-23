import 'package:code_pulse_web/core/constants.dart';
import 'package:code_pulse_web/widgets/competitive_problems.dart';
import 'package:code_pulse_web/widgets/frontend_problems.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax/iconsax.dart';
import 'package:confetti/confetti.dart';
import 'package:sizer/sizer.dart';

class ProblemScreen extends StatefulWidget {
  const ProblemScreen({super.key});

  @override
  State<ProblemScreen> createState() => _ProblemScreenState();
}

class _ProblemScreenState extends State<ProblemScreen> {
  late ConfettiController _confettiController;
  int _selectedCategory = 0;
  final List<String> _categories = ['Frontend', 'Competitive'];


  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(
      duration: const Duration(seconds: 1),
    );
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  void _playConfetti() {
    _confettiController.play();
    Future.delayed(const Duration(seconds: 1), () {
      _confettiController.stop();
    });
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isDesktop = size.width > 900;
    final isTablet = size.width > 600 && size.width <= 900;

    final horizontalPadding =
        size.width *
        (isDesktop
            ? 0.05
            : isTablet
            ? 0.04
            : 0.03);
    final titleFontSize =
        isDesktop
            ? 24.0
            : isTablet
            ? 20.0
            : 18.0;
    final subtitleFontSize =
        isDesktop
            ? 16.0
            : isTablet
            ? 14.0
            : 12.0;

    return Scaffold(
      backgroundColor: const Color(0xFF121212),
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        sized: false,
        value: SystemUiOverlayStyle.light,
        child: Stack(
          children: [
            Positioned(
              top: -size.height * 0.1,
              right: -size.width * 0.1,
              child: Container(
                width: size.width * 0.5,
                height: size.height * 0.5,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [
                      const Color(0xFF6EE7B7).withValues(alpha: 0.1),
                      Colors.transparent,
                    ],
                    stops: const [0.1, 1.0],
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: -size.height * 0.2,
              left: -size.width * 0.1,
              child: Container(
                width: size.width * 0.6,
                height: size.height * 0.6,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [
                      const Color(0xFF93C5FD).withValues(alpha: 0.1),
                      Colors.transparent,
                    ],
                    stops: const [0.1, 1.0],
                  ),
                ),
              ),
            ),
            SafeArea(
              child: Center(
                child: ConstrainedBox(
                  constraints: BoxConstraints(maxWidth: 100.w),
                  child: Padding(
                    padding: EdgeInsets.symmetric(
                      horizontal: horizontalPadding,
                    ),
                    child: ScrollConfiguration(
                      behavior: ScrollConfiguration.of(context).copyWith(
                        scrollbars: false,
                      ),
                      child: CustomScrollView(
                        slivers: [
                          SliverToBoxAdapter(
                            child: SizedBox(height: size.height * 0.02),
                          ),
                          SliverToBoxAdapter(
                            child: Stack(
                              alignment: Alignment.center,
                              children: [
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: IconButton(
                                    icon: Icon(
                                      Iconsax.arrow_left,
                                      size: titleFontSize,
                                      color: Colors.white,
                                    ),
                                    onPressed: () => context.go('/home'),
                                  ),
                                ),
                                Center(
                                  child: Text(
                                    'Problem Bank',
                                    style: TextStyle(
                                      fontSize: titleFontSize,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white,
                                      letterSpacing: 1.5,
                                    ),
                                  ),
                                ),
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: IconButton(
                                    icon: Icon(
                                      Iconsax.star,
                                      size: titleFontSize,
                                      color: Colors.amber,
                                    ),
                                    onPressed: _playConfetti,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SliverToBoxAdapter(
                            child: SizedBox(height: size.height * 0.03),
                          ),

                          SliverToBoxAdapter(
                            child: Center(
                              child: Container(
                                width:
                                    isDesktop
                                        ? size.width * 0.5
                                        : isTablet
                                        ? size.width * 0.7
                                        : size.width * 0.9,
                                height: size.height * 0.06,
                                decoration: BoxDecoration(
                                  color: const Color(0xFF1E1E1E),
                                  borderRadius: BorderRadius.circular(50),
                                ),
                                child: Stack(
                                  children: [
                                    AnimatedPositioned(
                                      duration: const Duration(milliseconds: 300),
                                      curve: Curves.easeInOut,
                                      left:
                                          _selectedCategory *
                                          (isDesktop
                                              ? size.width * 0.25
                                              : isTablet
                                              ? size.width * 0.35
                                              : size.width * 0.45),
                                      child: Container(
                                        width:
                                            isDesktop
                                                ? size.width * 0.25
                                                : isTablet
                                                ? size.width * 0.35
                                                : size.width * 0.45,
                                        height: size.height * 0.06,
                                        decoration: BoxDecoration(
                                          gradient: LinearGradient(
                                            colors: [
                                              Constants.categoryColors[_selectedCategory],
                                              Constants.categoryColors[_selectedCategory]
                                                  .withValues(alpha: 0.7),
                                            ],
                                            begin: Alignment.topLeft,
                                            end: Alignment.bottomRight,
                                          ),
                                          borderRadius: BorderRadius.circular(50),
                                        ),
                                      ),
                                    ),
                                    Row(
                                      children: List.generate(
                                        _categories.length,
                                        (index) => Expanded(
                                          child: GestureDetector(
                                            onTap: () {
                                              setState(() {
                                                _selectedCategory = index;
                                              });
                                            },
                                            child: Center(
                                              child: Text(
                                                _categories[index],
                                                style: TextStyle(
                                                  color:
                                                      _selectedCategory == index
                                                          ? Colors.black
                                                          : Colors.white70,
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: subtitleFontSize,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          SliverToBoxAdapter(
                            child: SizedBox(height: size.height * 0.04),
                          ),
                          // Problem cards section
                          if (_selectedCategory == 0) ...[
                            FrontendProblems(
                              titleSize: titleFontSize,
                              subtitleSize: subtitleFontSize,
                            ),
                          ] else ...[
                            CompetitiveProblems(
                              titleSize: titleFontSize,
                              subtitleSize: subtitleFontSize,
                            ),
                          ],
                          SliverToBoxAdapter(
                            child: SizedBox(height: size.height * 0.05),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
            // Confetti
            Align(
              alignment: Alignment.topCenter,
              child: ConfettiWidget(
                confettiController: _confettiController,
                blastDirectionality: BlastDirectionality.explosive,
                shouldLoop: false,
                colors: const [
                  Colors.green,
                  Colors.blue,
                  Colors.pink,
                  Colors.orange,
                  Colors.purple,
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}