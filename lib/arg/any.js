/**
 * An functioner which would return an assert.
 *  The assert would always return true
 */
function any() { 
  return function() {
    return true;
  }
}

module.exports = any;