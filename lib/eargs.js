const As = require("./arg/as");
const VAR_ARGS = As.VAR_ARGS;
const slice = Function.prototype.call.bind(Array.prototype.slice);
const bind = Function.prototype.apply.bind(Function.prototype.bind);

const log = require("debug")("eargs:eargs");

var asFn = As(function() {
  return function(val) {
    return ((val instanceof Function) && val.$length !== undefined);
  }
}, VAR_ARGS, "matchers");

/**
 *
 *
 * @param {!Array<number>} args -
 * @returns {Object}
 */
function eargs() {
  var vargs = {};
  var args = arguments[arguments.length - 1];
  if( !asFn(arguments, vargs) ) {
    asFn(slice(arguments, 1), vargs);
    args = arguments[0];
  }

  if( !(vargs.matchers && vargs.matchers.length) )
    throw new TypeError(`missing matcher's`);

  var matchers = vargs.matchers;

  if( matchers.length === arguments.length )
    return bind(eargs, [null].concat(matchers));

  if( args.length === undefined )
    throw new TypeError(`args is ${typeof args}, Expected to be Array or Array Like`);

  var kwargs = {};

  log(`args length is ${args.length}, ${matchers.length} matches`);

  matchers
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