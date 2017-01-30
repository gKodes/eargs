const eargs = require("eargs");
const As =  eargs.As;

function substr() {
  var args = eargs(arguments,
    As.b( // bundle
      As.num("min"),
      As.o(As.num("max")) // optional
    )
  )

  console.info(args.min, args.max);
}

substr(1); // 1 undefined
substr(1, 2); // 1 2
substr("Invalid args", 2, 3); // undefined undefined

//Prefred Use, give more performace as args matcher list is only build once
var splice = function() {
  var args = eargs(
    As.b( // bundle
      As.num("start"),
      As.o(As.num("deleteCount")), // optional
      As.any("...items") // varible length (any varible lenght arguments are optional)
    )
  );

  return function splice() {
    var kwargs = args(arguments);
    console.info(kwargs.start, kwargs.deleteCount, kwargs.items);
  }
}();

splice(1); // 1 undefined undefined
splice(1, 2); // 1 2 undefined
splice(1, 2, "a", "b", "c"); // 1 2 ["a", "b", "c"]