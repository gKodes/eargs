/**
 * Marks an argument match as optional.
 * 
 * @param {function} argu - the argument which as to be marked as optional
 */
function optional(argu) {
  return Object.assign(argu, {
    $optional: true
  });
}

module.exports = optional;