# Easy Arguments (eargs)

An utility to help capture function arguments as key:value pairs.

```javascript
const eargs = require("eargs");
const As =  eargs.As;

function substr() {
  var args = eargs(arguments,
    As.num("min"),
    As.b( // bundle
      As.num("min"),
      As.num("max")
    )
  )

  console.info(args.min, args.max);
}

substr(1); // 1 undefined
substr(1, 2); // 1 2
substr("Invalid args", 2, 3); // undefined undefined

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
```

## TODO
 - [ ] Add support for optional arguments to reduce the redundancy 
 - [ ] Add support for grouping of arguments
 - [ ] Add unitilites to check kwargs response
    - check if captured any arguments
