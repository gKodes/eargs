const eargs = require("../lib"); // eargs
const As =  eargs.As;

var substr = function() {
  var args = eargs(
    As.num("min"),
    As.b( // bundle
      As.num("min"),
      As.num("max")
    )
  );

  return function substr() {
    var kwargs = args(arguments);
    console.info(kwargs.min, kwargs.max);
  }
}();

substr(1); // 1 undefined
substr(1, 2); // 1 2
substr("Invalid args", 2, 3); // undefined undefined