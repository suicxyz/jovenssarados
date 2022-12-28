module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					node: "current",
				},
			},
		],
		"@babel/preset-typescript",
	],
	plugins: [
		[
			"module-resolver",
			{
				alias: {
					"@config": "./src/app/configs",
					"@models": "./src/app/models",
					"@controllers": "./src/app/controllers",
				},
			},
		],
	],
	ignore: ["**/*.spec.ts"],
};
