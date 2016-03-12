module.exports = {

	// http://eslint.org/docs/user-guide/configuring.html#extending-configuration-files
	extends: "eslint:recommended",

	// http://eslint.org/docs/user-guide/configuring#specifying-environments
	env: {
		browser: true,
		node: true
	},

	// http://eslint.org/docs/rules/
	rules: {
		indent: [2, "tab", {SwitchCase: 1}], // Use tabs instead of spaces
		semi: [2, "always"], // Enforce semicolons
		"quote-props": [2, "as-needed"], // Be consistent with quotes
		eqeqeq: [2, "smart"] // Use type-safe equality operators
	}
};