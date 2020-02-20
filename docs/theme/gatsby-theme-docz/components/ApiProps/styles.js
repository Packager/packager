import { media } from "~theme/breakpoints";

export const ul = {
    listStyle: "none",
    pl: 2,
    [media.tablet]: {
        pl: 0
    }
};

export const li = {
    mb: 3,
    "&:last-of-type": {
        mb: 0
    }
};

export const liInline = {
    display: "flex",
    alignItems: "flex-start"
};

export const pre = {
    display: "inline",
    whiteSpace: "normal",
    m: 0
};

export const liHeading = {
    bg: "grayIsh",
    px: 2,
    py: 1,
    borderRadius: 4,
    fontSize: 1,
    fontWeight: "bold"
};

export const liHeadingUsage = {
    bg: "#edf3f9"
};

export const liBody = {
    ml: 2,
    fontStyle: "italic"
};

export const liBodyUsage = {
    fontSize: 1,
    ml: 2
};
