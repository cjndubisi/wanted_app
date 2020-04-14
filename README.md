# Wanted

Wanted react Navtive and Web App

## Requirements

- node@12.15
- Xcode@11
- Cocoapods
- Android Studio

## Installation

```
// install Yarn
brew install yarn

// Install packages
yarn
```

## Run

Transpile @wanted/common from ts to js
`$: yarn workspace @wanted/common watch`

### iOS

`$: yarn workspace @wanted/mobile ios:fresh`

### Android

`$: yarn workspace @wanted/mobile android`

### Web

`$: yarn workspace @wanted/web start`

### Test

Test core modules only
`$: yarn workspace @wanted/common test`
