import makeLegalIdentifier from "./mage-legal-identifier";

const reserved = "process location abstract arguments boolean break byte case catch char class const continue debugger default delete do double else enum eval export extends false final finally float for from function goto if implements import in instanceof int interface let long native new null package private protected public return short static super switch synchronized this throw throws transient true try typeof var void volatile while with yield".split(
  " "
);
const blacklist = { __esModule: true };
reserved.forEach((word) => (blacklist[word] = true));

export default function (scope, globals, identifier) {
  let i = 1;
  let deconflicted = makeLegalIdentifier(identifier);

  while (
    scope.contains(deconflicted) ||
    globals.has(deconflicted) ||
    deconflicted in blacklist
  ) {
    deconflicted = `${identifier}_${i}`;
    i += 1;
  }
  scope.declarations[deconflicted] = true;

  return deconflicted;
}
