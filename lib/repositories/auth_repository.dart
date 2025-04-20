import 'dart:developer' as developer;
import 'package:firebase_auth/firebase_auth.dart';
import 'package:code_pulse_web/model/authentication_model.dart';

class AuthException implements Exception {
  final String message;
  final String? code;

  const AuthException(this.message, {this.code});

  @override
  String toString() => 'AuthException(code: $code, message: $message)';
}

class AuthRepository {
  final FirebaseAuth _firebaseAuth;

  AuthRepository({
    FirebaseAuth? firebaseAuth,
  }) : _firebaseAuth = firebaseAuth ?? FirebaseAuth.instance;

  Stream<User?> get authStateChanges => _firebaseAuth.authStateChanges();

  Future<AuthenticationModel> signInWithGitHub() async {
    try {
      developer.log('Starting GitHub Sign-In', name: 'AuthRepository');

      final githubProvider = GithubAuthProvider();
      githubProvider.addScope('user:email');
      githubProvider.setCustomParameters({
        'allow_signup': 'true',
      });

      final userCredential = await _firebaseAuth.signInWithPopup(githubProvider);
      final user = userCredential.user;
      if (user == null) {
        throw const AuthException('User not found after GitHub sign-in', code: 'user_not_found');
      }

      final oauthCredential = userCredential.credential as OAuthCredential?;
      if (oauthCredential == null || oauthCredential.accessToken == null) {
        throw const AuthException('GitHub authentication failed: missing access token', code: 'github_auth_failed');
      }

      final token = await user.getIdToken();
      return AuthenticationModel(
        accessToken: token,
        refreshToken: null,
        tokenType: 'Bearer',
        expiresIn: 3600,
        scope: 'user:email',
      );
    } catch (e, stackTrace) {
      developer.log('Error during GitHub sign-in: $e', name: 'AuthRepository', error: e, stackTrace: stackTrace);
      throw AuthException('Failed to sign in with GitHub: $e', code: 'unknown');
    }
  }

  Future<void> signOut() async {
    try {
      await _firebaseAuth.signOut();
      developer.log('User signed out successfully', name: 'AuthRepository');
    } on FirebaseAuthException catch (e) {
      developer.log(
        'Sign-out error: ${e.code} - ${e.message}',
        name: 'AuthRepository',
      );
      throw _mapFirebaseException(e);
    } catch (e, stackTrace) {
      developer.log(
        'Unexpected error during sign-out: $e',
        name: 'AuthRepository',
        error: e,
        stackTrace: stackTrace,
      );
      throw AuthException('Failed to sign out: $e', code: 'unknown');
    }
  }

  Future<AuthenticationModel?> getCurrentUser() async {
    try {
      final user = _firebaseAuth.currentUser;
      if (user == null) {
        developer.log('No current user found', name: 'AuthRepository');
        return null;
      }

      final tokenResult = await user.getIdTokenResult();
      return AuthenticationModel(
        accessToken: tokenResult.token ?? '',
        tokenType: 'Bearer',
        expiresIn: tokenResult.expirationTime?.difference(DateTime.now()).inSeconds ?? 3600,
        scope: 'email',
      );
    } catch (e, stackTrace) {
      developer.log(
        'Error retrieving current user: $e',
        name: 'AuthRepository',
        error: e,
        stackTrace: stackTrace,
      );
      throw AuthException(
        'Failed to retrieve current user: $e',
        code: 'unknown',
      );
    }
  }

  Future<void> sendPasswordResetEmail(String email) async {
    try {
      _validateEmail(email);
      await _firebaseAuth.sendPasswordResetEmail(email: email.trim());
      developer.log(
        'Password reset email sent to $email',
        name: 'AuthRepository',
      );
    } on FirebaseAuthException catch (e) {
      developer.log(
        'Password reset error: ${e.code} - ${e.message}',
        name: 'AuthRepository',
      );
      throw _mapFirebaseException(e);
    } catch (e, stackTrace) {
      developer.log(
        'Unexpected error sending password reset email: $e',
        name: 'AuthRepository',
        error: e,
        stackTrace: stackTrace,
      );
      throw AuthException(
        'Failed to send password reset email: $e',
        code: 'unknown',
      );
    }
  }

  Future<AuthenticationModel> signInWithEmailAndPassword(
      String email,
      String password,
      ) async {
    try {
      _validateEmail(email);
      _validatePassword(password);
      final userCredential = await _firebaseAuth.signInWithEmailAndPassword(
        email: email.trim(),
        password: password,
      );
      final user = userCredential.user;
      if (user == null) {
        throw const AuthException(
          'User not found after sign-in',
          code: 'user_not_found',
        );
      }

      final token = await user.getIdToken();
      return AuthenticationModel(
        accessToken: token,
        refreshToken: null,
        tokenType: 'Bearer',
        expiresIn: 3600,
        scope: 'email',
      );
    } on FirebaseAuthException catch (e) {
      developer.log(
        'Email sign-in error: ${e.code} - ${e.message}',
        name: 'AuthRepository',
      );
      throw _mapFirebaseException(e);
    } catch (e, stackTrace) {
      developer.log(
        'Unexpected error during email sign-in: $e',
        name: 'AuthRepository',
        error: e,
        stackTrace: stackTrace,
      );
      throw AuthException('Failed to sign in with email: $e', code: 'unknown');
    }
  }

  Future<AuthenticationModel> createUserWithEmailAndPassword(
      String email,
      String password,
      ) async {
    try {
      _validateEmail(email);
      _validatePassword(password);
      final userCredential = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email.trim(),
        password: password,
      );
      final user = userCredential.user;
      if (user == null) {
        throw const AuthException(
          'User not found after creation',
          code: 'user_not_found',
        );
      }

      final token = await user.getIdToken();
      return AuthenticationModel(
        accessToken: token,
        refreshToken: null,
        tokenType: 'Bearer',
        expiresIn: 3600,
        scope: 'email',
      );
    } on FirebaseAuthException catch (e) {
      developer.log(
        'User creation error: ${e.code} - ${e.message}',
        name: 'AuthRepository',
      );
      throw _mapFirebaseException(e);
    } catch (e, stackTrace) {
      developer.log(
        'Unexpected error during user creation: $e',
        name: 'AuthRepository',
        error: e,
        stackTrace: stackTrace,
      );
      throw AuthException('Failed to create user: $e', code: 'unknown');
    }
  }

  void _validateEmail(String email) {
    const emailPattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
    if (!RegExp(emailPattern).hasMatch(email.trim())) {
      throw const AuthException('Invalid email format', code: 'invalid_email');
    }
  }

  void _validatePassword(String password) {
    if (password.length < 6) {
      throw const AuthException(
        'Password must be at least 6 characters long',
        code: 'weak_password',
      );
    }
  }

  AuthException _mapFirebaseException(FirebaseAuthException e) {
    switch (e.code) {
      case 'invalid-email':
        return const AuthException(
          'Invalid email address',
          code: 'invalid_email',
        );
      case 'user-not-found':
        return const AuthException(
          'No user found for this email',
          code: 'user_not_found',
        );
      case 'wrong-password':
        return const AuthException(
          'Incorrect password',
          code: 'wrong_password',
        );
      case 'email-already-in-use':
        return const AuthException(
          'Email is already in use',
          code: 'email_already_in_use',
        );
      case 'weak-password':
        return const AuthException(
          'Password is too weak',
          code: 'weak_password',
        );
      case 'network-request-failed':
        return const AuthException(
          'Network error, please try again',
          code: 'network_error',
        );
      case 'too-many-requests':
        return const AuthException(
          'Too many attempts, please try again later',
          code: 'too_many_requests',
        );
      default:
        return AuthException(
          'Authentication error: ${e.message}',
          code: e.code,
        );
    }
  }
}