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
		// Use tabs instead of spaces
		indent: [2, "tab", {SwitchCase: 1}],
		// Enforce semicolons
		semi: [2, "always"],
		// Use quotes as needed in JS objects
		"quote-props": [2, "as-needed"],
		// Use type-safe equality operators
		eqeqeq: [2, "smart"]
	}
};