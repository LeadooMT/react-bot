const path = require("path");
const ResolveTypeScriptPlugin =  require("resolve-typescript-plugin");
const pkg = require('./package.json');

module.exports = {
    entry: path.resolve(__dirname, "./source/index.js"),

    experiments: {
        outputModule: true,
    },

    externals: [
        ...Object.keys(pkg.peerDependencies)
    ],

    externalsType: "module",

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
                                    "targets": "> 0.5%, not dead",
                                    "useBuiltIns": false
                                }]
                            ]
                        }
                    },
                    {
                        loader: "ts-loader"
                    }
                ],
                resolve: {
                    fullySpecified: false
                }
            }
        ]
    },

    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "./dist"),
        environment: {
            module: true
        },
        library: {
            type: "module"
        }
    },

    resolve: {
        extensions: [".js", ".jsx"],
        plugins: [
            // Handle .ts => .js resolution
            new ResolveTypeScriptPlugin()
        ]
    },

    target: "web"
};
