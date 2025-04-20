import 'package:code_pulse_web/core/routes.dart';
import 'package:code_pulse_web/repositories/auth_repository.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:sizer/sizer.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_web/webview_flutter_web.dart';
import 'firebase_options.dart';
import 'model/theme_view_model.dart';

void registerWebViewWebImplementation() {
  WebViewPlatform.instance = WebWebViewPlatform();
}

Future<void> main() async {
  BindingBase.debugZoneErrorsAreFatal = true;
  WidgetsFlutterBinding.ensureInitialized();
  registerWebViewWebImplementation();
  FlutterError.onError = (FlutterErrorDetails details) {
    debugPrint('FlutterError: ${details.exceptionAsString()}');
    debugPrint(details.stack.toString());
  };

  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.web,
    );
    debugPrint('Firebase initialized successfully');
    await FirebaseAuth.instance.authStateChanges().first;
  } catch (e) {
    debugPrint('Firebase initialization error: $e');
  }
  final webRoutes = WebRoutes(authRepository: AuthRepository());
  await webRoutes.authViewModel.init();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider.value(value: webRoutes.authViewModel),
      ],
      child: CodeEditorApp(webRoutes: webRoutes),
    ),
  );
}

class CodeEditorApp extends StatelessWidget {
  final WebRoutes webRoutes;
  const CodeEditorApp({super.key, required this.webRoutes});

  @override
  Widget build(BuildContext context) {
    return Sizer(
      builder: (context, orientation, deviceType) {
        return MaterialApp.router(
          routerConfig: webRoutes.router,
          title: 'Code Pulse Editor',
          theme: ThemeData(
            brightness: Brightness.dark,
            primarySwatch: Colors.deepPurple,
            scaffoldBackgroundColor: const Color(0xFF1E1E1E),
            visualDensity: VisualDensity.adaptivePlatformDensity,
            fontFamily: GoogleFonts.poppins().fontFamily,
            textTheme: GoogleFonts.poppinsTextTheme().apply(
              bodyColor: Colors.white,
              displayColor: Colors.white,
            ),
          ),
          builder: (context, child) => ResponsiveBreakpoints.builder(
            child: Builder(
              builder: (context) {
                ErrorWidget.builder = (FlutterErrorDetails details) {
                  return Scaffold(
                    body: Center(
                      child: Text(
                        'Error: ${details.exceptionAsString()}',
                        style: const TextStyle(color: Colors.red, fontSize: 18),
                      ),
                    ),
                  );
                };
                return child!;
              },
            ),
            breakpoints: [
              const Breakpoint(start: 0, end: 450, name: MOBILE),
              const Breakpoint(start: 451, end: 1100, name: TABLET),
              const Breakpoint(start: 1101, end: 1920, name: DESKTOP),
              const Breakpoint(start: 1921, end: double.infinity, name: '4K'),
            ],
          ),
          debugShowCheckedModeBanner: false,
        );
      },
    );
  }
}