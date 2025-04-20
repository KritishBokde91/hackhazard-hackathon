import 'package:json_annotation/json_annotation.dart';
part 'authentication_model.g.dart';

@JsonSerializable()
class AuthenticationModel {
  final String? accessToken;
  final String? refreshToken;
  final String? tokenType;
  final int? expiresIn;
  final String? scope;

  AuthenticationModel({
    this.accessToken,
    this.refreshToken,
    this.tokenType,
    this.expiresIn,
    this.scope,
  });

  factory AuthenticationModel.fromJson(Map<String, dynamic> json) =>
      _$AuthenticationModelFromJson(json);

  Map<String, dynamic> toJson() => _$AuthenticationModelToJson(this);
}