const eargs = require("../lib"); // eargs
const As =  eargs.As;

function splice() {
  var args = eargs(arguments,
    As.b( // bundle
      As.num("start"),
      As.o(As.num("deleteCount")),
      As.o(As.any("...items"))
    )
  )

  console.info(args.start, args.deleteCount, args.items);
}

splice(1); // 1 undefined undefined
splice(1, 2); // 1 2 undefined
splice(1, 2, "a", "b", "c"); // 1 2 ["a", "b", "c"]