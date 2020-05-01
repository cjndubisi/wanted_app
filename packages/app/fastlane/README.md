fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios certificates
```
fastlane ios certificates
```
Fetch certificates and provisioning profiles
### ios bundle_ios
```
fastlane ios bundle_ios
```

### ios alpha
```
fastlane ios alpha
```
Ship to AppCenter

----

## Android
### android alpha
```
fastlane android alpha
```
Ship to AppCenter
### android build_keystore
```
fastlane android build_keystore
```


----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
