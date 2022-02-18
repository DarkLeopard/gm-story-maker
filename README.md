# GmStoryMaker

Assistant program for GM. In the original functionality, it is possible to create related stories, save them in the browser and files on the device.

# Already added
* add chapters (story place)
* add links between chapters
* autosave to indexDB
* manual save data to JSON on device

# Future features
* add app configuration state
* add more themes
* add editor (TinyMCE?) to chapter main text
* save images to indexDB
* save data manualy (as JSON) to online base
* add links types
* add chapters types
* add master calendar
* autosave data to google firebase as custom provider
* add auth and stand installation

# Errors

> An unhandled exception occurred: NOT SUPPORTED: keyword "id", use "$id" for schema ID #157

14.02.2022 Solution for now (local using):
in node_modules/@ngxs/schematics/src/factories/* change schematic "id" to "$id" for needed commands.
(https://github.com/ngxs/schematics/issues/157)

> Error: NG0204: Can't resolve all parameters for STATE

Add Injectable decorator for your state class/
(https://github.com/ngxs/store/issues/1223#issuecomment-591251812.
