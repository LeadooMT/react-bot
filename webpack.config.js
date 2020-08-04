const path = require("path");
const pkg = require('./package.json');

module.exports = {
    entry: path.resolve(__dirname, "./source/index.ts"),

    externals: [
        ...Object.keys(pkg.peerDependencies)
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-react",
                                ["@babel/preset-env", {
                                    "targets": {
                                        "ie": 11
                                    },
                                    "useBuiltIns": false
                                }]
                            ],
                            plugins: [
                                "jsx-control-statements"
                            ]
                        }
                    },
                    { loader: "ts-loader" }
                ]
            }
        ]
    },

    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "./dist"),
        libraryTarget: "commonjs2"
    },

    resolve: {
        extensions: [".ts", ".tsx"]
    }
};
