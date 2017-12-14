D:
cd D:\Workspace\Ionic\Project 1\FeedbackApp
set ANDROID_HOME=C:\Users\ravaradharajan\AppData\Local\Android\sdk
set PATH=%PATH%;%ANDROID_HOME%
set JAVA_HOME= C:\Program Files\Java\jdk1.8.0_131\bin
SET PATH=%PATH%;%JAVA_HOME%

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore feedbackKey.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk feedbackApp