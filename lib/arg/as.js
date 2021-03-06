"use strict";

const ELLIPSIS = "...";
const VAR_ARGS = Number.POSITIVE_INFINITY;

const slice = Function.prototype.call.bind(Array.prototype.slice);
const log = require("debug")("eargs:argAs");

/**
 * this is BaseClass.
 *
 * @param {!function(value): boolean} functioner - this is the .
 * @param {!number} siz - initial value.
 * @param {!string} name - initial value.
 * @returns {function(args: Array<>, kwargs: Object): boolean} repeated Hello
 */
function argAs(functioner, siz, name) {
  log("argument as name `%s`", name);
  var assert = functioner.apply(null, slice(arguments, 3));

  if(0 === name.indexOf(ELLIPSIS)) {
    siz = VAR_ARGS;
    name = name.substr(3);
  }

  log("assert is %s", typeof assert);
  if( ! (assert instanceof Function) ) {
    throw new TypeError(`functioner returned ${typeof ast}, Expected an assert function`);
  }

  return Object.assign(
    function arg(args, kwargs) {
      var ctx = 0;
      var aln = siz === VAR_ARGS? args.length: siz;
      for(ctx = 0; assert(args[ctx]) !== false && ctx < aln; ctx++);

      if(ctx) {
        log(`${name} ${ctx}`);
        kwargs[name] = (
            (siz === 1 && args[0]) || 
            slice(args, 0, ctx)
          );
      }

      return ctx;
    },
    {
      $length: siz
    }
  )
}

Object.assign(
  argAs,
  {
    /**
     * this
     *
     * @param {function(value): boolean} fn -
     * @param {number} [siz=1] -
     * @returns {function(name: string): bind(argAs(fn, siz))}
     */
    lnk: function lnk(fn, siz) {
      return argAs.bind( argAs, fn, siz || 1);
    },
    VAR_ARGS: VAR_ARGS
  }
)

module.exports = argAs;