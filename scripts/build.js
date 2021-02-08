const fs = require("fs")
const path = require("path")
const webpack = require("webpack")

/**
 * @returns {void}
 */
function run() {
    // Delete the output directory if it exists
    if (isDirectory("docs")) {
        deleteDirectory("docs")
    }

    // Compile the modules
    const compilers = [
        compile("source/app/index.tsx", "docs/index.js", "web")
    ]

    // Wait for the modules to be compiled
    Promise.all(compilers).then(() => {
        // Copy the template files
        copyDirectory("template", "docs")
        // Done
    }).catch((reason) => {
        // Failed
        console.log(reason)
    })
}

setImmediate(run)

/**
 * @param {string} source
 * @param {string} output
 * @returns {Promise<void>}
 */
function compile(source, output) {
    const pluginJSX = [
        "@babel/transform-react-jsx", {
            pragma: "h"
        }
    ]

    const presetEnv = [
        "@babel/preset-env", {
            debug: false,
            modules: false,
            bugfixes: true,
            shippedProposals: true,
            useBuiltIns: "usage",
            corejs: {
                version: "3.8"
            }
        }
    ]

    const presetTypeScript = [
        "@babel/preset-typescript", {
            jsxPragma: "h"
        }
    ]

    const loaderBabel = {
        loader: "babel-loader",
        options: {
            plugins: [
                pluginJSX
            ],
            presets: [
                presetEnv,
                presetTypeScript
            ],
            cacheDirectory: path.resolve("cache")
        }
    }

    const loaderCSS = {
        loader: path.resolve("scripts/loaders/app-css-loader"),
        options: {
            outputFile: output.replace(/\.js$/, ".css")
        }
    }

    const compileModule = {
        test: /\.tsx?$/,
        use: [
            loaderBabel,
            loaderCSS
        ],
        sideEffects: false
    }

    const config = {
        mode: process.argv.includes("production") ? "production" : "development",
        entry: path.resolve(source),
        output: {
            path: path.dirname(path.resolve(output)),
            filename: path.basename(output),
            chunkFilename: "chunks/[id].js"
        },
        module: {
            rules: [
                compileModule
            ]
        },
        resolve: {
            alias: {
                app: path.resolve("source/app")
            },
            extensions: [
                ".js", ".ts", ".tsx"
            ]
        },
        devtool: "source-map",
        target: "web",
        bail: true
    }

    return new Promise((resolve, reject) => {
        webpack(config, (error, stats) => {
            if (error) {
                reject(error.message)
                return
            }

            if (stats.hasErrors()) {
                reject(stats.toJson().errors[0].message)
                return
            }

            resolve()
        })
    })
}

/**
 * @param {string} sourceDirectory
 * @param {string} outputDirectory
 * @returns {void}
 */
function copyDirectory(sourceDirectory, outputDirectory) {
    createDirectory(outputDirectory)
    fs.readdirSync(sourceDirectory).forEach((entry) => {
        const source = path.join(sourceDirectory, entry)
        const output = path.join(outputDirectory, entry)

        if (isDirectory(source)) {
            copyDirectory(source, output)
            return
        }

        copyFile(source, output)
    })
}

/**
 * @param {string} sourceFile
 * @param {string} outputFile
 * @returns {void}
 */
function copyFile(sourceFile, outputFile) {
    fs.copyFileSync(sourceFile, outputFile)
}

/**
 * @param {string} directory
 * @returns {void}
 */
function createDirectory(directory) {
    fs.mkdirSync(directory, {
        recursive: true
    })
}

/**
 * @param {string} directory
 * @returns {void}
 */
function deleteDirectory(directory) {
    fs.readdirSync(directory).forEach((entry) => {
        entry = path.join(directory, entry)

        if (isDirectory(entry)) {
            deleteDirectory(entry)
            return
        }

        deleteFile(entry)
    })
    fs.rmdirSync(directory)
}

/**
 * @param {string} file
 * @returns {void}
 */
function deleteFile(file) {
    fs.unlinkSync(file)
}

/**
 * @param {string} path
 * @returns {boolean}
 */
function isDirectory(path) {
    if (fs.existsSync(path)) {
        return fs.statSync(path).isDirectory()
    }

    return false
}
