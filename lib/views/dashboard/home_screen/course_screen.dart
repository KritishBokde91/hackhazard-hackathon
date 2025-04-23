import 'package:code_pulse_web/core/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax/iconsax.dart';
import 'package:confetti/confetti.dart';
import 'package:sizer/sizer.dart';
import 'package:cached_network_image/cached_network_image.dart';

class CourseScreen extends StatefulWidget {
  const CourseScreen({super.key});

  @override
  State<CourseScreen> createState() => _CourseScreenState();
}

class _CourseScreenState extends State<CourseScreen> {
  late ConfettiController _confettiController;
  int _selectedCategory = 0;
  final List<String> _categories = ['All', 'Popular', 'New', 'Advanced'];
  final TextEditingController _searchController = TextEditingController();
  bool _isSearching = false;

  // Sample courses data with internet images
  final List<Map<String, dynamic>> _allCourses = [
    {
      'title': 'AI-Powered Flutter Development',
      'description': 'Learn to integrate cutting-edge AI into your Flutter apps',
      'duration': '8 weeks',
      'level': 'Intermediate',
      'rating': 4.8,
      'students': 1250,
      'image': 'https://images.unsplash.com/photo-1678995632928-b321df23997f?q=80&w=600',
      'category': 'Popular',
      'isNew': false,
      'tags': ['AI', 'Flutter', 'Mobile'],
    },
    {
      'title': 'Generative UI with Flutter',
      'description': 'Create dynamic UIs that adapt using AI models',
      'duration': '6 weeks',
      'level': 'Advanced',
      'rating': 4.9,
      'students': 890,
      'image': 'https://images.unsplash.com/photo-1637611331620-51149c7ceb94?q=80&w=600',
      'category': 'New',
      'isNew': true,
      'tags': ['UI/UX', 'AI', 'Flutter'],
    },
    {
      'title': 'Flutter Web Mastery',
      'description': 'Build responsive web applications with Flutter',
      'duration': '5 weeks',
      'level': 'Beginner',
      'rating': 4.7,
      'students': 2100,
      'image': 'https://images.unsplash.com/photo-1551651653-c5dcb9d9e933?q=80&w=600',
      'category': 'Popular',
      'isNew': false,
      'tags': ['Web', 'Responsive', 'Flutter'],
    },
    {
      'title': 'AI-Assisted Code Optimization',
      'description': 'Use AI tools to optimize your Dart and Flutter code',
      'duration': '4 weeks',
      'level': 'Advanced',
      'rating': 4.6,
      'students': 650,
      'image': 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600',
      'category': 'Advanced',
      'isNew': true,
      'tags': ['Performance', 'AI', 'Dart'],
    },
    {
      'title': 'Flutter Animations with Rive',
      'description': 'Create stunning animations using Rive and Flutter',
      'duration': '3 weeks',
      'level': 'Intermediate',
      'rating': 4.5,
      'students': 1800,
      'image': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600',
      'category': 'Popular',
      'isNew': false,
      'tags': ['Animations', 'UI', 'Rive'],
    },
    {
      'title': 'Building AI Chatbots in Flutter',
      'description': 'Integrate conversational AI into your applications',
      'duration': '7 weeks',
      'level': 'Intermediate',
      'rating': 4.7,
      'students': 950,
      'image': 'https://images.unsplash.com/photo-1625805866449-3589fe3f71a3?q=80&w=600',
      'category': 'New',
      'isNew': true,
      'tags': ['Chatbot', 'AI', 'Flutter'],
    },
  ];

  List<Map<String, dynamic>> get _filteredCourses {
    if (_searchController.text.isNotEmpty) {
      final searchQuery = _searchController.text.toLowerCase();
      return _allCourses.where((course) =>
      course['title'].toLowerCase().contains(searchQuery) ||
          course['description'].toLowerCase().contains(searchQuery) ||
          course['level'].toLowerCase().contains(searchQuery) ||
          (course['tags'] as List).any((tag) => tag.toLowerCase().contains(searchQuery))).toList();
    }

    if (_selectedCategory == 0) return _allCourses;

    final category = _categories[_selectedCategory];
    if (category == 'Popular') {
      return _allCourses.where((course) => course['rating'] >= 4.7).toList();
    } else if (category == 'New') {
      return _allCourses.where((course) => course['isNew'] == true).toList();
    } else if (category == 'Advanced') {
      return _allCourses.where((course) => course['level'] == 'Advanced').toList();
    }
    return _allCourses;
  }

  // Get responsive values based on screen size
  double get _horizontalPadding => MediaQuery.of(context).size.width > 1200 ? 32 : MediaQuery.of(context).size.width > 600 ? 24 : 16;
  int get _gridColumnCount => MediaQuery.of(context).size.width > 1200 ? 3 : MediaQuery.of(context).size.width > 800 ? 2 : 1;
  double get _cardHeight => MediaQuery.of(context).size.height * (MediaQuery.of(context).size.width > 800 ? 0.5 : 0.3);
  double get _learningPathWidth => MediaQuery.of(context).size.width > 1200 ? MediaQuery.of(context).size.width * 0.3 :
  MediaQuery.of(context).size.width > 800 ? MediaQuery.of(context).size.width * 0.4 :
  MediaQuery.of(context).size.width * 0.8;

  // Font sizes
  double _fontSize(String type) {
    final width = MediaQuery.of(context).size.width;
    switch (type) {
      case 'title': return width > 1200 ? 24 : width > 800 ? 22 : 20;
      case 'subtitle': return width > 1200 ? 20 : width > 800 ? 18 : 16;
      case 'body': return width > 1200 ? 16 : width > 800 ? 14 : 12;
      case 'small': return width > 1200 ? 14 : width > 800 ? 12 : 10;
      default: return 14;
    }
  }

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 1));
  }

  @override
  void dispose() {
    _confettiController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _playConfetti() {
    _confettiController.play();
  }

  void _toggleSearch() {
    setState(() {
      _isSearching = !_isSearching;
      if (!_isSearching) {
        _searchController.clear();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF121212),
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.light,
        child: Stack(
          children: [
            // Background gradient
            Positioned(
              top: -MediaQuery.of(context).size.height * 0.1,
              right: -MediaQuery.of(context).size.width * 0.1,
              child: Container(
                width: MediaQuery.of(context).size.width * 0.5,
                height: MediaQuery.of(context).size.height * 0.5,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [const Color(0xFF6EE7B7).withOpacity(0.1), Colors.transparent],
                    stops: const [0.1, 1.0],
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: -MediaQuery.of(context).size.height * 0.2,
              left: -MediaQuery.of(context).size.width * 0.1,
              child: Container(
                width: MediaQuery.of(context).size.width * 0.6,
                height: MediaQuery.of(context).size.height * 0.6,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [const Color(0xFF93C5FD).withOpacity(0.1), Colors.transparent],
                    stops: const [0.1, 1.0],
                  ),
                ),
              ),
            ),

            // Main content
            SafeArea(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: _horizontalPadding),
                child: ScrollConfiguration(
                  behavior: const ScrollBehavior().copyWith(
                    scrollbars: false,
                      overscroll: true
                  ),
                  child: CustomScrollView(
                    physics: const BouncingScrollPhysics(),
                    slivers: [
                      SliverToBoxAdapter(child: SizedBox(height: 16)),

                      // Header with title and actions
                      SliverToBoxAdapter(
                        child: _buildHeader(),
                      ),

                      SliverToBoxAdapter(child: SizedBox(height: 24)),

                      // Category selector
                      SliverToBoxAdapter(
                        child: _buildCategorySelector(),
                      ),

                      SliverToBoxAdapter(child: SizedBox(height: 24)),

                      // Featured course section
                      SliverToBoxAdapter(
                        child: Text(
                          'Featured Course',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: _fontSize('subtitle'),
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),

                      SliverToBoxAdapter(child: SizedBox(height: 16)),

                      // Featured course card
                      SliverToBoxAdapter(
                        child: _buildFeaturedCourse(),
                      ),

                      SliverToBoxAdapter(child: SizedBox(height: 24)),

                      // All courses section
                      SliverToBoxAdapter(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'All Courses',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: _fontSize('subtitle'),
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              '${_filteredCourses.length} courses',
                              style: TextStyle(
                                color: Colors.white54,
                                fontSize: _fontSize('small'),
                              ),
                            ),
                          ],
                        ),
                      ),

                      SliverToBoxAdapter(child: SizedBox(height: 16)),

                      // No courses found message
                      if (_filteredCourses.isEmpty)
                        SliverToBoxAdapter(
                          child: _buildEmptyState(),
                        ),

                      // Course grid
                      if (_filteredCourses.isNotEmpty)
                        SliverGrid(
                          gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                            maxCrossAxisExtent: 400, // Maximum width for each card
                            crossAxisSpacing: 16,
                            mainAxisSpacing: 16,
                            // Remove childAspectRatio to allow natural height
                            mainAxisExtent: MediaQuery.of(context).size.width > 800 ? 380 : 360, // Estimate height, can be adjusted
                          ),
                          delegate: SliverChildBuilderDelegate(
                                (context, index) => _buildCourseCard(_filteredCourses[index]),
                            childCount: _filteredCourses.length,
                          ),
                        ),

                      SliverToBoxAdapter(child: SizedBox(height: 32)),

                      // Learning path section
                      SliverToBoxAdapter(
                        child: Text(
                          'Learning Paths',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: _fontSize('subtitle'),
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),

                      SliverToBoxAdapter(child: SizedBox(height: 16)),

                      // Learning paths list
                      SliverToBoxAdapter(
                        child: _buildLearningPaths(),
                      ),

                      SliverToBoxAdapter(child: SizedBox(height: 32)),
                    ],
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

  Widget _buildHeader() {
    return Row(
      children: [
        IconButton(
          icon: Icon(Iconsax.arrow_left, size: 24, color: Colors.white),
          onPressed: () => context.go('/home'),
        ),
        Expanded(
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 300),
            child: _isSearching
                ? TextField(
              controller: _searchController,
              style: TextStyle(color: Colors.white, fontSize: _fontSize('body')),
              decoration: InputDecoration(
                hintText: 'Search courses...',
                hintStyle: TextStyle(color: Colors.white54, fontSize: _fontSize('body')),
                border: InputBorder.none,
              ),
              onChanged: (value) => setState(() {}),
            )
                : Center(
              child: Text(
                'AI-Powered Courses',
                style: TextStyle(
                  fontSize: _fontSize('title'),
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  letterSpacing: 1.2,
                ),
              ),
            ),
          ),
        ),
        IconButton(
          icon: Icon(
            _isSearching ? Iconsax.close_square : Iconsax.search_normal,
            size: 24,
            color: Colors.white,
          ),
          onPressed: _toggleSearch,
        ),
        IconButton(
          icon: Icon(Iconsax.star, size: 24, color: Colors.amber),
          onPressed: _playConfetti,
        ),
      ],
    );
  }

  Widget _buildCategorySelector() {
    return SizedBox(
      height: 48,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: _categories.length,
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.only(right: 12),
            child: GestureDetector(
              onTap: () => setState(() => _selectedCategory = index),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                decoration: BoxDecoration(
                  color: _selectedCategory == index
                      ? Constants.categoryColors[index % Constants.categoryColors.length]
                      : const Color(0xFF1E1E1E),
                  borderRadius: BorderRadius.circular(50),
                ),
                child: Center(
                  child: Text(
                    _categories[index],
                    style: TextStyle(
                      color: _selectedCategory == index ? Colors.black : Colors.white70,
                      fontWeight: FontWeight.bold,
                      fontSize: _fontSize('body'),
                    ),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildFeaturedCourse() {
    final isWide = MediaQuery.of(context).size.width > 800;

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF6E45E2), Color(0xFF88D3CE)],
        ),
      ),
      child: Stack(
        children: [
          if (isWide) Positioned(
            right: 20,
            bottom: 12,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: CachedNetworkImage(
                imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=500',
                width: MediaQuery.of(context).size.width * (isWide ? 0.2 : 0.3),
                // Use aspect ratio instead of fixed height
                height: MediaQuery.of(context).size.width * (isWide ? 0.15 : 0.18) * (9/16),
                fit: BoxFit.cover,
                placeholder: (context, url) => Container(
                  color: Colors.black12,
                  child: const Center(child: CircularProgressIndicator(color: Colors.white)),
                ),
                errorWidget: (context, url, error) => Container(
                  color: Colors.black12,
                  child: const Icon(Icons.error_outline, color: Colors.white),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisSize: MainAxisSize.min, // This allows the column to size based on content
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.3),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    'NEW',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: _fontSize('small'),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'AI-Assisted Flutter Development',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: _fontSize('subtitle'),
                    fontWeight: FontWeight.bold,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 8),
                Text(
                  'Learn to build apps faster with AI pair programming',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.9),
                    fontSize: _fontSize('body'),
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 16), // Replace Spacer with fixed spacing
                Row(
                  children: [
                    Icon(Iconsax.star, color: Colors.amber, size: _fontSize('body')),
                    const SizedBox(width: 4),
                    Text(
                      '4.9 (1.2k)',
                      style: TextStyle(color: Colors.white, fontSize: _fontSize('small')),
                    ),
                    const SizedBox(width: 16),
                    Icon(Iconsax.clock, color: Colors.white, size: _fontSize('body')),
                    const SizedBox(width: 4),
                    Text(
                      '6 weeks',
                      style: TextStyle(color: Colors.white, fontSize: _fontSize('small')),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: MediaQuery.of(context).size.height * 0.1),
        child: Column(
          children: [
            Icon(
              Iconsax.search_normal,
              size: 48,
              color: Colors.white.withOpacity(0.5),
            ),
            const SizedBox(height: 16),
            Text(
              'No courses found',
              style: TextStyle(
                color: Colors.white.withOpacity(0.7),
                fontSize: _fontSize('subtitle'),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Try different search terms or categories',
              style: TextStyle(
                color: Colors.white.withOpacity(0.5),
                fontSize: _fontSize('body'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCourseCard(Map<String, dynamic> course) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E1E),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(15)),
            child: AspectRatio(
              aspectRatio: 16/9, // Maintains consistent image aspect ratio
              child: CachedNetworkImage(
                imageUrl: course['image'],
                width: double.infinity,
                fit: BoxFit.cover,
                placeholder: (context, url) => Container(
                  color: Colors.black12,
                  child: const Center(child: CircularProgressIndicator(color: Colors.white)),
                ),
                errorWidget: (context, url, error) => Container(
                  color: Colors.black12,
                  child: const Icon(Icons.error_outline, color: Colors.white),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min, // Use minimum space needed
              children: [
                Wrap(
                  spacing: 8,
                  children: [
                    if (course['isNew'])
                      _buildBadge('NEW', Constants.categoryColors[1], Colors.black),
                    _buildBadge(
                      course['level'],
                      course['level'] == 'Advanced'
                          ? Colors.red.withOpacity(0.2)
                          : course['level'] == 'Intermediate'
                          ? Colors.blue.withOpacity(0.2)
                          : Colors.green.withOpacity(0.2),
                      course['level'] == 'Advanced'
                          ? Colors.red
                          : course['level'] == 'Intermediate'
                          ? Colors.blue
                          : Colors.green,
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  course['title'],
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: _fontSize('body'),
                    fontWeight: FontWeight.bold,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Text(
                  course['description'],
                  style: TextStyle(
                    color: Colors.white54,
                    fontSize: _fontSize('small'),
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Iconsax.star, color: Colors.amber, size: _fontSize('small')),
                    const SizedBox(width: 4),
                    Text(
                      '${course['rating']}',
                      style: TextStyle(color: Colors.white70, fontSize: _fontSize('small')),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '(${course['students']})',
                      style: TextStyle(color: Colors.white54, fontSize: _fontSize('small')),
                    ),
                    const Spacer(),
                    Icon(Iconsax.clock, color: Colors.white54, size: _fontSize('small')),
                    const SizedBox(width: 4),
                    Text(
                      course['duration'],
                      style: TextStyle(color: Colors.white70, fontSize: _fontSize('small')),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBadge(String text, Color bgColor, Color textColor) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        text,
        style: TextStyle(
          color: textColor,
          fontSize: _fontSize('small'),
          fontWeight: text == 'NEW' ? FontWeight.bold : FontWeight.normal,
        ),
      ),
    );
  }

  Widget _buildLearningPaths() {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.2,
      child: ListView(
        scrollDirection: Axis.horizontal,
        physics: const BouncingScrollPhysics(),
        children: [
          _buildLearningPathCard(
            'Flutter + AI Specialist',
            'Master AI integration in Flutter',
            ['Beginner', 'Intermediate', 'Advanced'],
            const [Color(0xFF6E45E2), Color(0xFF88D3CE)],
          ),
          const SizedBox(width: 16),
          _buildLearningPathCard(
            'Flutter Web Developer',
            'Build responsive web apps',
            ['Beginner', 'Intermediate'],
            const [Color(0xFF4CA1AF), Color(0xFFC4E0E5)],
          ),
          const SizedBox(width: 16),
          _buildLearningPathCard(
            'Flutter Animations Expert',
            'Create stunning UI motion',
            ['Intermediate', 'Advanced'],
            const [Color(0xFFFF4E50), Color(0xFFF9D423)],
          ),
        ],
      ),
    );
  }

  Widget _buildLearningPathCard(
      String title,
      String description,
      List<String> levels,
      List<Color> colors,
      ) {
    return Container(
      width: _learningPathWidth,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: colors,
        ),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              color: Colors.white,
              fontSize: _fontSize('body'),
              fontWeight: FontWeight.bold,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: TextStyle(
              color: Colors.white.withOpacity(0.9),
              fontSize: _fontSize('small'),
            ),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const Spacer(),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: levels.map((level) {
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  level,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: _fontSize('small'),
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}