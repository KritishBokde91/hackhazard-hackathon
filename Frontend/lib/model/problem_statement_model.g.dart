// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'problem_statement_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ProblemStatementModel _$ProblemStatementModelFromJson(
  Map<String, dynamic> json,
) => ProblemStatementModel(
  title: json['title'] as String,
  description: json['description'] as String,
  imageUrl: json['imageUrl'] as String?,
  level: (json['level'] as num).toInt(),
  acceptance: (json['acceptance'] as num).toDouble(),
  tags: (json['tags'] as List<dynamic>?)?.map((e) => e as String).toList(),
);

Map<String, dynamic> _$ProblemStatementModelToJson(
  ProblemStatementModel instance,
) => <String, dynamic>{
  'title': instance.title,
  'description': instance.description,
  'imageUrl': instance.imageUrl,
  'level': instance.level,
  'acceptance': instance.acceptance,
  'tags': instance.tags,
};
