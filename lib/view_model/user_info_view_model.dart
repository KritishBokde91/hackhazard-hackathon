import 'package:code_pulse_web/repositories/user_info_repository.dart';
import 'package:flutter/foundation.dart';
import '../model/user_info_model.dart';

class UserInfoViewModel extends ChangeNotifier {
  final UserInfoRepository _userInfoRepository;
  bool isLoading = false;
  String? error;
  UserInfoModel? userInfoModel;

  UserInfoViewModel({UserInfoRepository? userInfoRepository})
      : _userInfoRepository = userInfoRepository ?? UserInfoRepository();

  Future<void> init() async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      userInfoModel = await _userInfoRepository.getUserInfo();
      error = null;
    } catch (e) {
      error = e.toString();
      userInfoModel = null;
      if (kDebugMode) {
        print('Error in UserInfoViewModel: $e');
      }
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}