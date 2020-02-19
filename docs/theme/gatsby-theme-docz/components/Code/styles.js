import { media } from "~theme/breakpoints";

export const editor = {
    borderRadius: "radius",
    border: t => `1px solid ${t.colors.border}`,
    fontFamily: "monospace"
};

export const usage = {
    marginLeft: "8px",
    marginTop: "-10px",
    [media.tablet]: {
        marginLeft: 0
    }
};
