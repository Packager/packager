import { DeepMergeObjectValue, DeepMergeArrayValue } from "../types";

export default function deepMerge(
  ...sources: DeepMergeObjectValue[] | DeepMergeArrayValue[]
) {
  let acc: any = {};

  for (const source of sources) {
    if (source instanceof Array) {
      if (!(acc instanceof Array)) {
        acc = [];
      }
      acc = [...acc, ...source];
    } else if (source instanceof Object) {
      for (let [key, value] of Object.entries(source)) {
        if (value instanceof Object && key in acc) {
          value = deepMerge(acc[key], value);
        }
        acc = { ...acc, [key]: value };
      }
    }
  }
  return acc;
}
