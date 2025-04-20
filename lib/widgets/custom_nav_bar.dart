import 'package:code_pulse_web/core/constants.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

PreferredSizeWidget customNavBar(BuildContext context) {
  return AppBar(
    title: Text(Constants.webName, style: GoogleFonts.poppins(color: Colors.white),),
    backgroundColor: Colors.transparent,
    elevation: 0,
    flexibleSpace: Container(
      color: Colors.white.withValues(alpha: 0.5),
    ),
    actions: [
      IconButton(
        icon: const Icon(Icons.settings),
        onPressed: () {

        },
      ),
    ],
  );
}