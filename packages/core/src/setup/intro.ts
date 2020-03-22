import { PackagerContext, Setup } from "../../types";

export const applyPreCode = () =>
  `window.__dependencies = { ...window.__dependencies || {} };`;

export default function(context: PackagerContext): Setup {
  return {
    name: "packager::setup::intro",
    intro: () => applyPreCode()
  };
}
