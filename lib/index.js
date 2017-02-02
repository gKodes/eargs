"use strict";

const f = require("functioner").assert;
const argAs = require("./arg/as");
var eargs = require("./eargs");
const bundle = require("./arg/bundle");
const optional = require("./arg/optional")

const As =
  {
    /**
     * Match number (int,float)
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    num: argAs.lnk( f.type.bind(null, "number") ), // argsAs.bind( argsAs, f.type.bind(null, "number") ),
    /**
     * Match string
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    str: argAs.lnk( f.type.bind(null, "string") ),
    /**
     * Match symbol
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    sym: argAs.lnk( f.type.bind(null, "symbol") ),
    /**
     * Match object
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    obj: argAs.lnk( f.type.bind(null, "object") ),
    /**
     * Match function
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    fn: argAs.lnk( f.type.bind(null, "function") ),
    /**
     * Helps compose multiple matches into one
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    compose: argAs.lnk( f.compose ),
    /**
     * Bundle matches into one
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    b: bundle,
    /**
     * Bundle matches into one
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    bundle: bundle,
    /**
     * Mark an match as optional
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    o: optional,
    /**
     * Mark an match as optional
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    optional: optional,
    /**
     * Matches any thing
     * 
     * @param {String} name - the key to which arguments should be mapped to
     */
    any: argAs.lnk( require("./arg/any") )
  };

module.exports = 
  Object.assign(eargs, { As: As });
