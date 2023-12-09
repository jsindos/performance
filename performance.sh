#!/bin/bash

# Step 1: adb reverse
adb reverse tcp:8080 tcp:8080

# Step 2: react-native run-android
react-native run-android --mode=release

# Step 3: maestro test
maestro test .maestro
