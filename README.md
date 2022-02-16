# GmStoryMaker

# Errors

> An unhandled exception occurred: NOT SUPPORTED: keyword "id", use "$id" for schema ID #157

14.02.2022 Solution for now (local using):
in node_modules/@ngxs/schematics/src/factories/* change schematic "id" to "$id" for needed commands.
(https://github.com/ngxs/schematics/issues/157)

> Error: NG0204: Can't resolve all parameters for STATE

Add Injectable decorator for your state class/
(https://github.com/ngxs/store/issues/1223#issuecomment-591251812.
