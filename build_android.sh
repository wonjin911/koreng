# Build Android (release)
ionic cordova build --release --prod android

# Sign (use own .keystore)
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name

# optimize the apk
# ~/Library/Android/sdk/build-tools/27.0.3/zipalign -v 4 a-unsigned.apk a.apk
zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk