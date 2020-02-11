import { PackagerContext, Setup } from "../types/packager";

export const applyPreCode = () =>
    `process.env.NODE_ENV = 'development';` +
    `window.process = {}; window.process.env = {}; window.process.env.NODE_ENV = 'development'; ` +
    `window.__dependencies = {};`;

export default function(context: PackagerContext): Setup {
    return {
        name: "packager::setup::intro",
        intro: () => applyPreCode()
    };
}
