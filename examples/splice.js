const eargs = require("../lib"); // eargs
const As =  eargs.As;

function splice() {
  var args = eargs(arguments,
    As.num("start"),
    As.b( // bundle
      As.num("start"),
      As.any("deleteCount")
    ),
    As.b( // bundle
      As.num("start"),
      As.num("deleteCount"),
      As.any("...items")
    ),
    As.b( // bundle
      As.num("start"),
      As.any("...items")
    )
  )

  console.info(args.start, args.deleteCount, args.items);
}

splice(1); // 1 undefined undefined
splice(1, 2); // 1 2 undefined
splice(1, 2, "a", "b", "c"); // 1 2 ["a", "b", "c"]
