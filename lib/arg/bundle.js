const argAs = require("./as");
const slice = Function.prototype.call.bind(Array.prototype.slice);
const reduce = Function.prototype.call.bind(Array.prototype.reduce);

const log = require("debug")("eargs:bundle");

/**
 *
 *
 * @param {!Array<number>} args -
 * @returns {boolean}
 */
function bundle() {
  var matchers = arguments;
  var mal = reduce(matchers, function(val, matcher) {
    var len = matcher.$length;
    return val + (
      (matcher.$optional || len === argAs.VAR_ARGS)? 0 : len);
  }, 0);

  return Object.assign(function bundle(args, kwargs) {
    var aln = args.length; // arguments length
    log(`Min arguments length ${mal}, ${aln}`);

    if( aln >= mal ) {
      var bkwargs = {};
      var idx = 0;

      for(let mth=0, mtx = 0, matcher = matchers[mtx];
            matcher &&
            ( (mth = matcher(slice(args, idx), bkwargs)) 
              || matcher.$optional); idx = idx + mth, matcher = matchers[++mtx]);

      if( idx >= aln ) {
        Object.assign(kwargs, bkwargs);
        return true;
      }
    }

    return false;
  },{
    $length: argAs.VAR_ARGS
  })
}

module.exports = bundle;