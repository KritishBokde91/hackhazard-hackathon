import 'package:code_pulse_web/model/user_info_model.dart';
import 'package:firebase_auth/firebase_auth.dart';

class UserInfoRepository {
  final FirebaseAuth _firebaseAuth;
  UserInfoRepository({FirebaseAuth? firebaseAuth})
      : _firebaseAuth = firebaseAuth ?? FirebaseAuth.instance;

  Stream<User?> get user => _firebaseAuth.userChanges();

  Future<UserInfoModel?> getUserInfo() async {
    final user = _firebaseAuth.currentUser;
    if (user == null) {
      return null;
    }
    return UserInfoModel(
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      uid: user.uid,
      providerId: user.providerData.isNotEmpty
          ? user.providerData[0].providerId
          : null,
    );
  }
}