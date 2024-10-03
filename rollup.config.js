import multi from '@rollup/plugin-multi-entry';

const timestamp = new Date();

export default [
  {
    input: {
      include: ['src/**/*.js'],
      exclude: ['src/__tests__/*.test.js'],
    },
    treeshake: true,
    output: {
      format: 'cjs',
      file: './dist/bundle.js',
      banner: `/**
 * Bundle as defined from all files in src/modules/*.js
 * Copyright (c) ${timestamp.getUTCFullYear()}
 * 
 * A Google Apps Script for deploying a web application that automatically 
 * fetches the latest available IG Stories of a target Instagram user to your 
 * Google Drive.
 * 
 * Homepage: https://chriskyfung.github.io/AutoFetcher-IG-Stories-to-GDrive/
 * 
 * Build at: ${timestamp.toUTCString()}
 */

const IGSF = Object.create(null);
`,
      intro: '(function (exports, window) {',
      outro: '})(IGSF, this);\nfunction getInstance(){return IGSF};\n',
    },
    plugins: [multi()],
  },
];

console.log(`Build at:\n${timestamp.toUTCString()}`);
