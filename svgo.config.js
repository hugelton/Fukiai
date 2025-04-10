module.exports = {
	plugins: [
		"removeDimensions",
		"removeAttrs",
		{
			name: "removeViewBox",
			active: false,
		},
	],
};
