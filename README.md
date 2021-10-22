# Voice Vibration

## What is it?
Voice activated vibrator web application that runs locally in the browser using web speech API and web bluetooth. Integrates buttplug.io for toy control to be vendor agnostic. The code is a mess because it is all hacked together, but it works! 

## How does it work?
1. Select your language.
2. Load a CSV of phrases, time, and intensity. There is an example in the repository, but time is in seconds and intensity is 0-100. 
3. Connect a device via bluetooth. This will take a moment after pairing to confirm connectivity.
4. Click start to begin the speech recognition.
5. Be good and repeat after me. 

## Why did you build this?
I liked what XToys was doing, but wanted more control over where the data went and how the toy worked. This still sends data to Google's servers for speech recognition, and uses the CDN hosted version of buttplug.io, but otherwise, there is no data retention and it can be run locally in Chrome. 

## System Requirements
* Microphone
* Buttplug.io supported vibrator, plug, or other toy with vibration.
* A browser that supports Web BLE, Web Speech, and microphone access. (Read: Chrome, its just Chrome. It probably works in WebBLE on iOS too, but I haven't tested it.

## Credits
* Web Speech code lifted from: https://www.section.io/engineering-education/speech-recognition-in-javascript/
* Buttplug.io example code lifted from: https://github.com/buttplugio/buttplug-developer-guide
* CSVtoArray code lifted from a random StackOverflow post because I was too lazy to write my own.
