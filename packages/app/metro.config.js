/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const fs = require('fs');
const escape = require('escape-string-regexp');
const blacklist = require('metro-config/src/defaults/blacklist');

const root = path.resolve(__dirname, '../..');
const packages = path.resolve(root, 'packages');

const pak = fs.readFileSync(path.join(packages, 'common', 'package.json'), 'utf8');

// Get the list of dependencies for all packages in the monorepo
const modules = [
  Object.keys({
    ...pak.dependencies,
    ...pak.peerDependencies,
  })
    .sort()
    // Remove duplicates and package names of the packages in the monorepo
    .filter((m, i, self) => self.lastIndexOf(m) === i),
];

module.exports = {
  // projectRoot: path.resolve(__dirname, '../../'),
  projectRoot: __dirname,

  // We need to watch the root of the monorepo
  // This lets Metro find the monorepo packages automatically using haste
  // This also lets us import modules from monorepo root
  watchFolders: [root],

  resolver: {
    // When we import a package from the monorepo, metro won't be able to find their deps
    // We need to specify them in `extraNodeModules` to tell metro where to find them
    extraNodeModules: modules,
  },

  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
