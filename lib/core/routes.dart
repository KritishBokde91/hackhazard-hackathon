import 'package:code_pulse_web/repositories/auth_repository.dart';
import 'package:code_pulse_web/view_model/auth_view_model.dart';
import 'package:code_pulse_web/views/dashboard/home_screen/course_screen.dart';
import 'package:code_pulse_web/views/dashboard/home_screen/groq_guru_screen.dart';
import 'package:code_pulse_web/views/dashboard/home_screen/problem_screen.dart';
import 'package:code_pulse_web/views/pre_dashboard/authentication_screen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../views/dashboard/code_editor/code_editor_screen.dart';
import '../views/dashboard/home_screen/home_screen.dart';

class WebRoutes {
  final AuthRepository authRepository;
  final AuthViewModel authViewModel;
  final GoRouter router;

  WebRoutes({required this.authRepository})
    : authViewModel = AuthViewModel(
        authRepository: authRepository,
        routes: _createRouter(authRepository),
      ),
      router = _createRouter(authRepository);

  static GoRouter _createRouter(AuthRepository authRepository) {
    final authViewModel = AuthViewModel(
      authRepository: authRepository,
      routes: GoRouter(routes: []),
    );

    return GoRouter(
      debugLogDiagnostics: true,
      redirect: (BuildContext context, GoRouterState state) async {
        if (authViewModel.isLoading) {
          return null;
        }

        final isLoggedIn = authViewModel.authenticationModel != null;
        final isLoggingIn = state.matchedLocation == '/login';

        if (!isLoggedIn && !isLoggingIn) {
          return '/login';
        }

        if (isLoggedIn && isLoggingIn) {
          return '/home';
        }

        return null;
      },
      routes: [
        GoRoute(
          path: '/login',
          builder:
              (context, state) => ChangeNotifierProvider.value(
                value: authViewModel,
                child: const AuthenticationScreen(),
              ),
        ),
        GoRoute(
          path: '/home',
          builder:
              (context, state) => ChangeNotifierProvider.value(
                value: authViewModel,
                child: const HomeScreen(),
              ),
        ),
        GoRoute(
          path: '/problem',
          builder:
              (context, state) => ChangeNotifierProvider.value(
                value: authViewModel,
                child: const ProblemScreen(),
              ),
        ),
        GoRoute(
          path: '/code-editor',
          builder:
              (context, state) => ChangeNotifierProvider.value(
                value: authViewModel,
                child: const CodeEditorScreen(),
              ),
        ),
        GoRoute(
          path: '/course',
          builder:
              (context, state) => ChangeNotifierProvider.value(
                value: authViewModel,
                child: const CourseScreen(),
              ),
        ),
        GoRoute(
          path: '/guru',
          builder:
              (context, state) => ChangeNotifierProvider.value(
                value: authViewModel,
                child: const GroqGuruScreen(),
              ),
        ),
        GoRoute(path: '/', redirect: (context, state) => '/home'),
      ],
      refreshListenable: authViewModel,
      errorBuilder:
          (context, state) => Scaffold(
            body: Center(child: Text('Route not found: ${state.uri.path}')),
          ),
    );
  }
}
