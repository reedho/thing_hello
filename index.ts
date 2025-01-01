import { HashMap, defEquivMap } from "@thi.ng/associative";
import { defAtom } from "@thi.ng/atom";
import { comp } from "@thi.ng/compose";
import { getIn } from "@thi.ng/paths";
import { filter, map, push, transduce } from "@thi.ng/transducers";
import { hash } from "@thi.ng/vectors";

const m = new HashMap([], { hash });
m.set([1], 1);
m.set([2], 2);

const c = defEquivMap<string, number>();
c.set("c", 1);

const b = defEquivMap([["b", c]]);
const a = defEquivMap([["a", b]]);

console.log(a.get("a")?.get("b")?.get("c"));

const deepObj = defEquivMap([
  [
    "user",
    defEquivMap([
      ["name", "ridho"],
      ["age", "30"],
    ]),
  ],
]);

console.log(deepObj.get("user")?.get("name"));

const atom = defAtom({
  user: {
    name: "Ridho",
    address: {
      city: "Cilegon",
      province: "Banten",
    },
  },
});

const jsDeepObj = {
  user: {
    name: "Ridho",
  },
};

console.log(getIn(atom.deref(), ["user", "address", "city"]));
console.log(getIn(jsDeepObj, ["user", "name"]));

const deepObj2 = {
  users: [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 16 },
  ],
};

const names = transduce(
  comp(
    filter((user: any) => user.age > 17),
    map((user: any) => user.name)
  ),
  push(),
  deepObj2.users
);

console.log(names);
