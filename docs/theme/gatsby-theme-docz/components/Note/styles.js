import { media } from "~theme/breakpoints";
export const iconColor = "#535c69";

export const wrapper = {
    bg: "grayExtraLight",
    borderRadius: 4,
    display: "flex",
    m: 0,
    my: 3,
    py: 2,
    px: 3
};

export const icon = {
    fill: "#535c69",
    marginRight: "5px",
    minHeight: "16px",
    minWidth: "16px",
    height: "16px",
    width: "16px",
    paddingTop: "4px",
    [media.mobile]: {
        display: "none"
    }
};
