import 'package:flutter/material.dart';

class CodeEditorTextTheme {
  static const Map<String, TextStyle> modernMonokaiTheme = {
    'root': TextStyle(backgroundColor: Color(0xFF272822), color: Color(0xFFF8F8F2)),
    'comment': TextStyle(color: Color(0xFF8292A2)),
    'quote': TextStyle(color: Color(0xFF8292A2)),
    'variable': TextStyle(color: Color(0xFFF97583)),
    'template-variable': TextStyle(color: Color(0xFFF97583)),
    'tag': TextStyle(color: Color(0xFFF97583)),
    'name': TextStyle(color: Color(0xFFF97583)),
    'selector-id': TextStyle(color: Color(0xFFF97583)),
    'selector-class': TextStyle(color: Color(0xFFF97583)),
    'regexp': TextStyle(color: Color(0xFFF97583)),
    'deletion': TextStyle(color: Color(0xFFF97583)),
    'number': TextStyle(color: Color(0xFFAE81FF)),
    'built_in': TextStyle(color: Color(0xFFAE81FF)),
    'builtin-name': TextStyle(color: Color(0xFFAE81FF)),
    'literal': TextStyle(color: Color(0xFFAE81FF)),
    'type': TextStyle(color: Color(0xFFAE81FF)),
    'params': TextStyle(color: Color(0xFFAE81FF)),
    'meta': TextStyle(color: Color(0xFFAE81FF)),
    'link': TextStyle(color: Color(0xFFAE81FF)),
    'attribute': TextStyle(color: Color(0xFFA6E22E)),
    'string': TextStyle(color: Color(0xFFE6DB74)),
    'symbol': TextStyle(color: Color(0xFFE6DB74)),
    'bullet': TextStyle(color: Color(0xFFE6DB74)),
    'addition': TextStyle(color: Color(0xFFE6DB74)),
    'title': TextStyle(color: Color(0xFFA6E22E)),
    'section': TextStyle(color: Color(0xFFA6E22E)),
    'keyword': TextStyle(color: Color(0xFF66D9EF)),
    'selector-tag': TextStyle(color: Color(0xFF66D9EF)),
  };
}