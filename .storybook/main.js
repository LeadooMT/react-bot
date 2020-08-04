module.exports = {
    stories: ["../stories/*.stories.[tj]sx"],
    webpackFinal: config => {
        config.module.rules.push({
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "ts-loader"
                }
            ]
        });
        config.resolve.extensions.push(".ts", ".tsx");
        return config;
    }
};
