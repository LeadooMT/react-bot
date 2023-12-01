const path = require("node:path");
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");

// Some workarounds:
// - https://github.com/storybookjs/storybook/issues/14877#issuecomment-1000441696
async function handleWebpack(config, {
    configType
}) {
    {
        // Find the plugin instance that needs to be mutated
        const virtualModulesPlugin = config.plugins.find(
            (plugin) => plugin.constructor.name === "VirtualModulesPlugin"
        );
        // Change the file extension to .cjs for all files that end with "generated-stories-entry.js"
        virtualModulesPlugin._staticModules = Object.fromEntries(
            Object.entries(virtualModulesPlugin._staticModules).map(
                ([key, value]) => {
                    if (key.endsWith("generated-stories-entry.js")) {
                        return [replaceFileExtension(key, ".cjs"), value];
                    }
                    return [key, value];
                }
            )
        );
        // Change the entry points to point to the appropriate .cjs files
        config.entry = config.entry.map((entry) => {
            if (entry.endsWith("generated-stories-entry.js")) {
                return replaceFileExtension(entry, ".cjs");
            }
            return entry;
        });
    } {
        config.module.rules.push({
            test: /\.tsx?$/,
            exclude: /(node_modules|dist)/,
            use: [
                {
                    loader: "ts-loader"
                }
            ],
            resolve: {
                fullySpecified: false
            }
        });
        config.resolve.extensions.push(".js", ".jsx");
        config.resolve.plugins = config.resolve.plugins || [];
        config.resolve.plugins.push(new ResolveTypeScriptPlugin());
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            "@": path.resolve(__dirname, "../src")
        };
    }
    return config;
}

function replaceFileExtension(filePath, newExtension) {
    const {
        name,
        root,
        dir
    } = path.parse(filePath);
    return path.format({
        name,
        root,
        dir,
        ext: newExtension,
    });
}

module.exports = {
    features: {
        storyStoreV7: false // Required for earlier workaround
    },

    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    },

    stories: ["../stories/*.stories.[tj]sx"],

    webpackFinal: handleWebpack
};
