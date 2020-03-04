# wanted_pwa

## Project setup
```
nvm use `cat .nvmrc`
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### PWA for Development
```
# Note: For Development, we do not create a service worker for Development
# We will use `serve` to mimick production. 
npm install --global serve

# Create production build for service worker
npm run build

# Serve production locally
npm serve dist/
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
