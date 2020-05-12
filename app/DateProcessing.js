/**
 * http://usejsdoc.org/
 */

const parse = require('parse-duration');

module.exports = {
  simple: function (str) {
    str = str[0];
    let now = Date.now();
    let out = null;

    if (str.includes('ago')) {
      out = now - parse(str);
    } else if (str.includes('from now')) {
      out = now + parse(str);
    } else {
      throw new Error(`Don't know how to parse date '${str}' - missing 'from now' or 'ago`);
    }
    return out;
  }
}
