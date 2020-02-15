import { PackagerContext, Setup } from "packager/types/packager";

export const applyPreCode = () =>
    `window.__dependencies = { ...window.__dependencies || {} };`;

export default function(context: PackagerContext): Setup {
    return {
        name: "packager::setup::intro",
        intro: () => applyPreCode()
    };
}
