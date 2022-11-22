import multi from '@rollup/plugin-multi-entry';

const timestamp = new Date();

export default [
  {
    input: ['src/**/*.js'],
    treeshake: true,
    output: {
      format: 'cjs',
      file: './dist/bundle.js',
      banner: `/**
 * Bundle as defined from all files in src/modules/*.js
 *
 * Copyright (c) 2022 | Build at: ${timestamp.toUTCString()}
 *
 */

const IGSF = Object.create(null);

`,
      intro: '(function (exports, window) {',
      outro: '})(IGSF, this);\nfunction getInstance(){return IGSF};\n',
    },
    plugins: [multi()],
  },
];
