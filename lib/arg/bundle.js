const argAs = require("./as");
const eargs = require("../eargs");
const slice = Function.prototype.call.bind(Array.prototype.slice);

const log = require("debug")("eargs:bundle");

/**
 *
 *
 * @param {!Array<number>} args -
 * @returns {boolean}
 */
function bundle() {
  var matchers = arguments;
  var lex = matchers.length;

  return Object.assign(function bundle(args, kwargs) {
    if( args.length === lex || 
        matchers[lex - 1].$length === argAs.VAR_ARGS ) {
      var bkwargs = {};

      for(var idx = 0; idx < lex; idx++) {
        var rargs = slice(args, idx);
        var matcher = matchers[idx];

        if( (rargs.length - matcher.$length) < 0 
              || matcher(rargs, bkwargs) === false )
          return false;
      }

      Object.assign(kwargs, bkwargs);
      return true;
    }

    return false;
  },{
    $length: argAs.VAR_ARGS
  })
}

module.exports = bundle;