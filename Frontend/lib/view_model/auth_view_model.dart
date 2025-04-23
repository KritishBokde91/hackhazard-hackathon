import 'package:code_pulse_web/model/authentication_model.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import '../repositories/auth_repository.dart';
import 'package:go_router/go_router.dart';

class AuthViewModel with ChangeNotifier {
  final AuthRepository _authRepository;
  final GoRouter _routes;
  AuthenticationModel? _authenticationModel;
  bool _isLoading = false;
  String? _error;

  AuthViewModel({
    required AuthRepository authRepository,
    required GoRouter routes,
  })  : _authRepository = authRepository,
        _routes = routes {
    FirebaseAuth.instance.authStateChanges().listen((User? user) async {
      if (user != null) {
        try {
          _authenticationModel = await _authRepository.getCurrentUser();
          _error = null;
          _routes.go('/home');
        } catch (e) {
          _error = e.toString();
          _authenticationModel = null;
          _routes.go('/login');
        }
      } else {
        _authenticationModel = null;
        _routes.go('/login');
      }
      notifyListeners();
    });
  }

  AuthenticationModel? get authenticationModel => _authenticationModel;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> init() async {
    _isLoading = true;
    notifyListeners();

    try {
      _authenticationModel = await _authRepository.getCurrentUser();
      _error = null;
      if (_authenticationModel != null) {
        _routes.go('/home');
      } else {
        _routes.go('/login');
      }
    } catch (e) {
      _error = e.toString();
      _routes.go('/login');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> signInWithGoogle() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _authenticationModel = await _authRepository.signInWithGoogle();
      if (_authenticationModel != null) {
        _routes.go('/home');
      }
    } catch (e) {
      _error = e.toString();
      if (e.toString().contains('popup_blocked')) {
        _error = 'Please allow popups for this site and try again.';
      }
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> signInWithEmailPassword(String email, String password) async {
    if (email.isEmpty || password.isEmpty) {
      _error = 'Email and password cannot be empty';
      notifyListeners();
      return;
    }

    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _authenticationModel = await _authRepository.signInWithEmailAndPassword(email, password);
      if (_authenticationModel != null) {
        _routes.go('/home');
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> signUpWithEmailPassword(String email, String password) async {
    if (email.isEmpty || password.isEmpty) {
      _error = 'Email and password cannot be empty';
      notifyListeners();
      return;
    }

    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _authenticationModel = await _authRepository.createUserWithEmailAndPassword(email, password);
      if (_authenticationModel != null) {
        _routes.go('/home');
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> signOut() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _authRepository.signOut();
      _authenticationModel = null;
      _routes.go('/login');
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> sendPasswordResetEmail(String email) async {
    if (email.isEmpty) {
      _error = 'Email cannot be empty';
      notifyListeners();
      return;
    }

    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _authRepository.sendPasswordResetEmail(email);
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}