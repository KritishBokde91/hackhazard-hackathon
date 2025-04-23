import 'package:json_annotation/json_annotation.dart';
part 'user_info_model.g.dart';

@JsonSerializable()
class UserInfoModel {
  String? name;
  String? email;
  String? photoUrl;
  String? uid;
  String? providerId;

  UserInfoModel({
    this.name,
    this.email,
    this.photoUrl,
    this.uid,
    this.providerId,
  });

  factory UserInfoModel.fromJson(Map<String, dynamic> json) =>
      _$UserInfoModelFromJson(json);

  Map<String, dynamic> toJson() => _$UserInfoModelToJson(this);
}