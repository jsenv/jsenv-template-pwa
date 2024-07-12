/*
 * This file configure the list of babel plugins enabled
 * in this codebase
 *
 * It is used by script trying to parse codebase:
 * - ESLint
 * - jsenv
 *
 * Without this file these tools would throw syntax errors on import assertion.
 */

module.exports = {
  plugins: ["@babel/plugin-syntax-import-attributes"],
}
