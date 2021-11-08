import multi from '@rollup/plugin-multi-entry';

export default [{
	input: ['src/**/*.js'],
	treeshake: true,
	output: {
		format: 'cjs',
		file: './dist/bundle.js',
		banner: '/* Bundle as defined from all files in src/modules/*.js */\nconst IGSF = Object.create(null);\n',
		intro: '(function (exports, window) {',
		outro: '})(IGSF, this);\nfunction getInstance(){return IGSF};\n'
	},plugins: [
		multi(),
	]
}];
