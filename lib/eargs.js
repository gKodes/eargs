const VAR_ARGS = require("./arg/as").VAR_ARGS;
const slice = Function.prototype.call.bind(Array.prototype.slice);

const log = require("debug")("eargs:eargs");

/**
 *
 *
 * @param {!Array<number>} args -
 * @returns {Object}
 */
function eargs(args) {
  if( args.length === undefined )
    throw new TypeError(`args is ${typeof args}, Expected to be Array or Array Like`);

  if( arguments.length < 2 )
    throw new TypeError(`missing matcher's`);

  var kwargs = {};
  var matches = slice(arguments, 1);

  log(`args length is ${args.length}, ${matches.length} matches`);

  matches
    .find(function argsFind(argss) {
      return (
          (args.length === argss.$length
            || argss.$length === VAR_ARGS)
          && argss(args, kwargs)
        );
    });

  return kwargs;
}

module.exports = eargs;