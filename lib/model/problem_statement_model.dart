import 'package:json_annotation/json_annotation.dart';
part 'problem_statement_model.g.dart';

@JsonSerializable()
class ProblemStatementModel {
  final String title;
  final String description;
  final String? imageUrl;
  final int level;
  final double acceptance;
  final List<String>? tags;

  ProblemStatementModel({
    required this.title,
    required this.description,
    this.imageUrl,
    required this.level,
    required this.acceptance,
    this.tags,
  });

  factory ProblemStatementModel.fromJson(Map<String, dynamic> json) =>
      _$ProblemStatementModelFromJson(json);

  Map<String, dynamic> toJson() => _$ProblemStatementModelToJson(this);
}