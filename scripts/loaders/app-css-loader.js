const fs = require("fs")
const path = require("path")

/**
 * @param {string} resource
 * @returns {string}
 */
function run(resource) {
    const options = this.getOptions()

    if (options.outputFile === undefined) {
        throw new Error("Output file path has not been defined")
    }

    if (/\.tsx$/.test(this.resourcePath)) {
        const cssPath = this.resourcePath.replace(/\.tsx$/, ".css")

        if (fs.existsSync(cssPath)) {
            fs.mkdirSync(path.dirname(options.outputFile), {
                recursive: true
            })
            fs.writeFileSync(options.outputFile, fs.readFileSync(cssPath), {
                flag: "as"
            })
        }
    }

    return resource
}

module.exports = run
