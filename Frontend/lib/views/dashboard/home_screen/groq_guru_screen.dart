import 'package:code_pulse_web/core/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax/iconsax.dart';
import 'package:sizer/sizer.dart';
import 'package:intl/intl.dart';

class GroqGuruScreen extends StatefulWidget {
  const GroqGuruScreen({super.key});

  @override
  State<GroqGuruScreen> createState() => _GroqGuruScreenState();
}

class _GroqGuruScreenState extends State<GroqGuruScreen> with SingleTickerProviderStateMixin {
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  final FocusNode _focusNode = FocusNode();
  final List<Map<String, dynamic>> _messages = [];
  bool _isTyping = false;

  // List of suggested prompts that users can quickly select
  final List<String> _suggestedPrompts = [
    'How do I implement animations in Flutter?',
    'What are best practices for state management?',
    'How can I optimize Flutter performance?',
    'Explain Flutter web rendering options',
    'How to implement responsive UI in Flutter?',
  ];

  // Get responsive values based on screen size
  double get _horizontalPadding => MediaQuery.of(context).size.width > 1200 ? 32 : MediaQuery.of(context).size.width > 600 ? 24 : 16;
  double get _chatInputHeight => 60;
  double get _suggestedPromptHeight => 40;

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
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  // Mock sending a message to the AI and getting a response
  void _sendMessage() {
    if (_messageController.text.trim().isEmpty) return;

    final userMessage = {
      'isUser': true,
      'message': _messageController.text,
      'timestamp': DateTime.now(),
    };

    setState(() {
      _messages.add(userMessage);
      _isTyping = true;
    });

    _messageController.clear();
    _scrollToBottom();

    // Simulate AI response after delay
    Future.delayed(const Duration(seconds: 1), () {
      _generateAIResponse(userMessage['message'] as String); // Add explicit cast here
    });
  }

  // Generate an AI response based on the user message
  void _generateAIResponse(String userMessage) {
    String response;
    // This is a simple mock implementation
    if (userMessage.toLowerCase().contains('flutter')) {
      response = 'Flutter is Google\'s UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. To learn more about specific Flutter topics, you can ask about widgets, state management, animations, or platform integration.';
    } else if (userMessage.toLowerCase().contains('animation')) {
      response = 'Flutter offers several ways to implement animations:\n\n1. **Implicit animations**: Use widgets like AnimatedContainer, AnimatedOpacity, etc.\n\n2. **Explicit animations**: Use AnimationController, Tween, and other animation classes.\n\n3. **Hero animations**: For transitions between routes.\n\n4. **Physics-based animations**: Implement natural motion using physics simulations.\n\nWould you like me to explain any of these in more detail?';
    } else if (userMessage.toLowerCase().contains('state')) {
      response = 'For state management in Flutter, you have several options:\n\n• Provider\n• Bloc/Cubit\n• GetX\n• Riverpod\n• Redux\n\nThe best approach depends on your app\'s complexity and your team\'s preferences. Provider and Bloc are particularly popular in the Flutter community.';
    } else {
      response = 'I\'m GroqGuru, your Flutter AI assistant. I can help with Flutter development questions, suggest code solutions, and provide guidance on best practices. What would you like to learn about Flutter today?';
    }

    final aiMessage = {
      'isUser': false,
      'message': response,
      'timestamp': DateTime.now(),
    };

    setState(() {
      _isTyping = false;
      _messages.add(aiMessage);
    });

    _scrollToBottom();
  }

  void _scrollToBottom() {
    // Add a small delay to ensure the list has updated
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  void _useSuggestedPrompt(String prompt) {
    _messageController.text = prompt;
    _focusNode.requestFocus();
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
                    colors: [const Color(0xFF93C5FD).withOpacity(0.1), Colors.transparent],
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
                    colors: [const Color(0xFF6EE7B7).withOpacity(0.1), Colors.transparent],
                    stops: const [0.1, 1.0],
                  ),
                ),
              ),
            ),

            // Main content
            SafeArea(
              child: Column(
                children: [
                  // Header
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: _horizontalPadding, vertical: 16),
                    child: _buildHeader(),
                  ),

                  // Chat messages area
                  Expanded(
                    child: _messages.isEmpty
                        ? _buildEmptyState()
                        : _buildChatMessages(),
                  ),

                  // Suggested prompts
                  if (_messages.isEmpty)
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: _horizontalPadding, vertical: 8),
                      child: _buildSuggestedPrompts(),
                    ),

                  // Input area
                  Padding(
                    padding: EdgeInsets.all(_horizontalPadding),
                    child: _buildInputArea(),
                  ),
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
          child: Center(
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  Iconsax.message_question,
                  color: Constants.categoryColors[0],
                  size: 24,
                ),
                const SizedBox(width: 8),
                Text(
                  'GroqGuru',
                  style: TextStyle(
                    fontSize: _fontSize('title'),
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    letterSpacing: 1.2,
                  ),
                ),
              ],
            ),
          ),
        ),
        IconButton(
          icon: Icon(
            Iconsax.refresh,
            size: 24,
            color: Colors.white,
          ),
          onPressed: () {
            setState(() {
              _messages.clear();
            });
          },
        ),
      ],
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: _horizontalPadding * 2),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Iconsax.message_programming,
                size: 64,
                color: Constants.categoryColors[0].withOpacity(0.8),
              ),
              const SizedBox(height: 24),
              Text(
                'Ask GroqGuru',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: _fontSize('subtitle'),
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Your AI-powered Flutter development assistant. Ask me anything about Flutter, Dart, app development, or programming concepts.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white70,
                  fontSize: _fontSize('body'),
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'Example queries:',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: _fontSize('body'),
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              _buildExampleQuery('How do I implement animations in Flutter?'),
              const SizedBox(height: 8),
              _buildExampleQuery('What are best practices for state management?'),
              const SizedBox(height: 8),
              _buildExampleQuery('Explain Flutter web deployment'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildExampleQuery(String query) {
    return InkWell(
      onTap: () {
        _messageController.text = query;
        _focusNode.requestFocus();
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: const Color(0xFF1E1E1E),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          query,
          style: TextStyle(
            color: Colors.white70,
            fontSize: _fontSize('body'),
          ),
        ),
      ),
    );
  }

  Widget _buildChatMessages() {
    return ListView.builder(
      controller: _scrollController,
      padding: EdgeInsets.symmetric(horizontal: _horizontalPadding, vertical: 8),
      itemCount: _messages.length + (_isTyping ? 1 : 0),
      itemBuilder: (context, index) {
        if (index == _messages.length) {
          // Typing indicator
          return _buildMessage(
            {'isUser': false, 'message': 'Typing...', 'isTyping': true},
          );
        }
        return _buildMessage(_messages[index]);
      },
    );
  }

  Widget _buildMessage(Map<String, dynamic> message) {
    final isUser = message['isUser'] == true;
    final isTyping = message['isTyping'] == true;

    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * (MediaQuery.of(context).size.width > 800 ? 0.6 : 0.8),
        ),
        margin: EdgeInsets.only(
          top: 8,
          bottom: 8,
          left: isUser ? 64 : 0,
          right: isUser ? 0 : 64,
        ),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isUser
              ? Constants.categoryColors[0].withOpacity(0.8)
              : const Color(0xFF1E1E1E),
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  isUser ? Iconsax.user : Iconsax.message_programming,
                  size: 16,
                  color: isUser ? Colors.black : Constants.categoryColors[0],
                ),
                const SizedBox(width: 8),
                Text(
                  isUser ? 'You' : 'GroqGuru',
                  style: TextStyle(
                    color: isUser ? Colors.black : Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: _fontSize('small'),
                  ),
                ),
                if (message['timestamp'] != null && !isTyping) ...[
                  const SizedBox(width: 8),
                  Text(
                    DateFormat('HH:mm').format(message['timestamp']),
                    style: TextStyle(
                      color: isUser ? Colors.black.withOpacity(0.7) : Colors.white54,
                      fontSize: _fontSize('small') - 2,
                    ),
                  ),
                ],
              ],
            ),
            const SizedBox(height: 8),
            isTyping
                ? _buildTypingIndicator()
                : Text(
              message['message'],
              style: TextStyle(
                color: isUser ? Colors.black : Colors.white,
                fontSize: _fontSize('body'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTypingIndicator() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(
        3,
            (index) => Container(
          margin: const EdgeInsets.symmetric(horizontal: 2),
          child: AnimatedBuilder(
            animation: AnimationController(
              duration: Duration(milliseconds: 300 * (index + 1)),
              vsync: this,
            )..repeat(reverse: true),
            builder: (context, child) {
              return Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: Constants.categoryColors[0].withOpacity(0.5),
                  shape: BoxShape.circle,
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  Widget _buildSuggestedPrompts() {
    return SizedBox(
      height: _suggestedPromptHeight,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: _suggestedPrompts.length,
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: InkWell(
              onTap: () => _useSuggestedPrompt(_suggestedPrompts[index]),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E1E1E),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Constants.categoryColors[0].withOpacity(0.3)),
                ),
                child: Center(
                  child: Text(
                    _suggestedPrompts[index],
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: _fontSize('small'),
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildInputArea() {
    return Container(
      height: _chatInputHeight,
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E1E),
        borderRadius: BorderRadius.circular(30),
      ),
      child: Row(
        children: [
          const SizedBox(width: 16),
          Expanded(
            child: TextField(
              controller: _messageController,
              focusNode: _focusNode,
              style: TextStyle(color: Colors.white, fontSize: _fontSize('body')),
              decoration: InputDecoration(
                hintText: 'Ask GroqGuru a question...',
                hintStyle: TextStyle(color: Colors.white54, fontSize: _fontSize('body')),
                border: InputBorder.none,
              ),
              onSubmitted: (_) => _sendMessage(),
              maxLines: 1,
            ),
          ),
          IconButton(
            icon: Icon(
              Iconsax.send_1,
              size: 24,
              color: Constants.categoryColors[0],
            ),
            onPressed: _sendMessage,
          ),
          const SizedBox(width: 8),
        ],
      ),
    );
  }
}