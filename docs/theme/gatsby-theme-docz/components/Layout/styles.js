import { media } from "~theme/breakpoints";

export const base = {
    maxWidth: "1080px",
    margin: "0 auto"
};

export const main = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
};

export const wrapper = {
    display: "flex",
    minHeight: "100vh",
    px: 3,
    [media.tablet]: {
        display: "block"
    }
};
