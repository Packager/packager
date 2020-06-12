import { path } from "packager-pluginutils";

export default function (basedir: string, relfiles: Array<string>) {
  let files: any;
  if (relfiles) {
    files = relfiles.map((r) => path.resolve(basedir, r));
  } else {
    files = basedir;
  }

  const res = files.slice(1).reduce((ps, file) => {
    if (!file.match(/^([A-Za-z]:)?\/|\\/)) {
      throw new Error("relative path without a basedir");
    }

    const xs = file.split(/\/+|\\+/);
    for (var i = 0; ps[i] === xs[i] && i < Math.min(ps.length, xs.length); i++);
    return ps.slice(0, i);
  }, files[0].split(/\/+|\\+/));

  // Windows correctly handles paths with forward-slashes
  return res.length > 1 ? res.join("/") : "/";
}
