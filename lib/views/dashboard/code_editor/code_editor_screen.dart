import 'package:flutter/material.dart';
import 'package:flutter_code_editor/flutter_code_editor.dart';
import 'package:flutter_highlight/themes/monokai-sublime.dart';
import 'package:highlight/languages/css.dart';
import 'package:highlight/languages/htmlbars.dart';
import 'package:highlight/languages/javascript.dart';
import 'package:split_view/split_view.dart';
import 'package:webview_flutter_platform_interface/webview_flutter_platform_interface.dart';
import 'package:webview_flutter_web/webview_flutter_web.dart';
import '../../../core/colors.dart';
import 'dart:html' as html;

class CodeEditorScreen extends StatefulWidget {
  const CodeEditorScreen({super.key});

  @override
  State<CodeEditorScreen> createState() => _CodeEditorScreenState();
}

class _CodeEditorScreenState extends State<CodeEditorScreen>
    with TickerProviderStateMixin {
  late WebWebViewController _webViewController;
  late final CodeController _htmlController;
  late final CodeController _cssController;
  late final CodeController _jsController;

  int _currentTabIndex = 0;
  late TabController _tabController;
  bool _isRunning = false;
  String _statusMessage = 'Ready';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _htmlController = CodeController(
      language: htmlbars,
      text: '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Particle Animation</title>
</head>
<body>
  <canvas id="particle-canvas"></canvas>
  <div class="overlay">
    <header class="header">
      <h1><span class="highlight">Particle</span> Animation</h1>
    </header>
    <p class="description">✨ Move your mouse to interact with the particles! ✨</p>
    <div class="stats">
      <span>Particles: <strong>100</strong></span>
    </div>
  </div>
</body>
</html>''',
    );
    _cssController = CodeController(
      language: css,
      text: '''body {
  margin: 0;
  overflow: hidden;
  background: #1a1a1a;
}

#particle-canvas {
  display: block;
  width: 100%;
  height: 100vh;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px); /* Glassmorphism effect */
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.header {
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

h1 {
  font-family: Arial, sans-serif;
  font-size: 2.5rem;
  margin: 0;
  color: white;
}

.highlight {
  background: linear-gradient(90deg, #ffeb3b, #ff5722);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-family: Arial, sans-serif;
  font-size: 1.2rem;
  color: #e0e0e0;
  margin: 10px 0;
}

.stats {
  margin-top: 15px;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  color: #b0b0b0;
}

.stats strong {
  color: #4ecdc4;
}''',
    );
    _jsController = CodeController(
      language: javascript,
      text: '''document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 100;
  let mouse = { x: null, y: null };

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.1;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        this.size = Math.min(this.size + 1, 10);
      }
    }

    draw() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();

      for (let j = index + 1; j < particles.length; j++) {
        const dx = particles[j].x - particle.x;
        const dy = particles[j].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 50) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      if (particle.size <= 0.2) {
        particles.splice(index, 1);
        particles.push(new Particle());
      }
    });
    requestAnimationFrame(animate);
  }

  animate();
});''',
    );

    _webViewController = WebWebViewController(WebWebViewControllerCreationParams())
      ..loadHtmlString(_generateFullHtml());
  }

  String _generateFullHtml() {
    return '''
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Editor Output</title>
  <style>
    ${_cssController.text}
  </style>
</head>
<body>
  ${_htmlController.text}
  <script>
    ${_jsController.text}
  </script>
</body>
</html>
''';
  }

  void _runCode() async {
    setState(() {
      _isRunning = true;
      _statusMessage = 'Running code...';
    });
    try {
      final fullHtml = _generateFullHtml();
      await _webViewController.loadHtmlString(fullHtml);
      setState(() {
        _isRunning = false;
        _statusMessage = 'Code executed successfully';
      });
    } catch (e) {
      setState(() {
        _isRunning = false;
        _statusMessage = 'Error: $e';
      });
    }
  }

  void _saveCode() {
    final fullHtml = _generateFullHtml();
    final blob = html.Blob([fullHtml], 'text/html');
    final url = html.Url.createObjectUrlFromBlob(blob);
    final _ = html.AnchorElement(href: url)
      ..setAttribute('download', 'output.html')
      ..click();
    html.Url.revokeObjectUrl(url);
    setState(() => _statusMessage = 'Code saved as output.html');
  }

  @override
  void dispose() {
    _tabController.dispose();
    _htmlController.dispose();
    _cssController.dispose();
    _jsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Code Pulse Editor', style: TextStyle(fontWeight: FontWeight.bold)),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [UICOLORS.deepPurple, UICOLORS.purpleAccent],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: ElevatedButton.icon(
              onPressed: _runCode,
              icon: const Icon(Icons.play_arrow, size: 20),
              label: const Text('Run'),
              style: ElevatedButton.styleFrom(
                foregroundColor: UICOLORS.white,
                backgroundColor: Colors.transparent,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                side: const BorderSide(color: Colors.white30),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: ElevatedButton.icon(
              onPressed: _saveCode,
              icon: const Icon(Icons.save, size: 20),
              label: const Text('Save'),
              style: ElevatedButton.styleFrom(
                foregroundColor: UICOLORS.white,
                backgroundColor: Colors.transparent,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                side: const BorderSide(color: Colors.white30),
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: LayoutBuilder(
              builder: (context, constraints) {
                if (constraints.maxWidth > 600) {
                  return SplitView(
                    viewMode: SplitViewMode.Horizontal,
                    indicator: const SplitIndicator(viewMode: SplitViewMode.Horizontal),
                    activeIndicator: const SplitIndicator(
                      viewMode: SplitViewMode.Horizontal,
                      isActive: true,
                      color: UICOLORS.purpleAccent,
                    ),
                    controller: SplitViewController(weights: [0.5, 0.5]),
                    children: [
                      _buildEditorPanel(),
                      _buildWebViewPanel(),
                    ],
                  );
                } else {
                  return Column(
                    children: [
                      _buildEditorPanel(height: constraints.maxHeight * 0.5),
                      const Divider(color: Colors.white24, height: 1),
                      _buildWebViewPanel(height: constraints.maxHeight * 0.5),
                    ],
                  );
                }
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.all(8.0),
            color: const Color(0xFF252525),
            child: Text(
              _statusMessage,
              style: const TextStyle(color: Colors.white70),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEditorPanel({double? height}) {
    return Container(
      height: height,
      color: const Color(0xFF2D2D2D),
      child: Column(
        children: [
          Container(
            color: const Color(0xFF252525),
            child: TabBar(
              controller: _tabController,
              indicatorColor: UICOLORS.purpleAccent,
              labelColor: UICOLORS.white,
              unselectedLabelColor: Colors.white70,
              labelStyle: const TextStyle(fontWeight: FontWeight.bold),
              tabs: const [
                Tab(icon: Icon(Icons.html), text: 'HTML'),
                Tab(icon: Icon(Icons.css), text: 'CSS'),
                Tab(icon: Icon(Icons.code), text: 'JavaScript'),
              ],
              onTap: (index) {
                setState(() => _currentTabIndex = index);
              },
            ),
          ),
          Expanded(
            child: AnimatedSwitcher(
              duration: const Duration(milliseconds: 200),
              child: IndexedStack(
                key: ValueKey(_currentTabIndex),
                index: _currentTabIndex,
                children: [
                  CodeEditor(controller: _htmlController),
                  CodeEditor(controller: _cssController),
                  CodeEditor(controller: _jsController),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildWebViewPanel({double? height}) {
    return Container(
      height: height,
      padding: const EdgeInsets.all(8.0),
      child: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: Colors.white24),
              borderRadius: BorderRadius.circular(8),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.2),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: PlatformWebViewWidget(
                PlatformWebViewWidgetCreationParams(controller: _webViewController),
              ).build(context),
            ),
          ),
          if (_isRunning)
            const Center(
              child: CircularProgressIndicator(color: UICOLORS.purpleAccent),
            ),
        ],
      ),
    );
  }
}

class CodeEditor extends StatelessWidget {
  final CodeController controller;

  const CodeEditor({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(8.0),
      decoration: BoxDecoration(
        color: const Color(0xFF272822),
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: CodeTheme(
        data: CodeThemeData(styles: monokaiSublimeTheme),
        child: SingleChildScrollView(
          child: SizedBox(
            width: double.infinity,
            child: CodeField(
              controller: controller,
              textStyle: const TextStyle(
                fontFamily: 'monospace',
                fontSize: 16,
                color: Color(0xFFF8F8F2),
              ),
              padding: const EdgeInsets.all(12.0),
              minLines: 10,
              maxLines: null,
              textSelectionTheme: TextSelectionThemeData(
                cursorColor: Colors.black,
                selectionColor: Colors.blue.shade100.withValues(alpha: 0.5),
                selectionHandleColor: Colors.black,
              ),
              background: const Color(0xFF272822),
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.all(Radius.circular(8)),
              ),
              gutterStyle: const GutterStyle(
                background: Color(0xFF272822),
                showLineNumbers: false,
                showFoldingHandles: true,
                showErrors: true,
                textStyle: TextStyle(
                  color: Color(0xFF75715E),
                  fontSize: 20,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}