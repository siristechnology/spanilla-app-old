module.exports = {
	root: true,
	extends: '@react-native-community',
	plugins: ['react', 'prettier'],
	rules: {
		semi: 'off',
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
			},
		],
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		'no-tabs': 'off',
		'eol-last': 'off',
		'generator-star-spacing': 'off',
		quotes: 'warn',
		'comma-dangle': 'off',
	},
}