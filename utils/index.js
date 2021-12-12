/**
 *
 * @param {string} fileName
 * @returns {string}
 */
function fileName(fileName) {
  return process.env.NODE_ENV === 'node' ? `${fileName}.js` : `${fileName}.min.js`
}

module.exports = {
  fileName
}
