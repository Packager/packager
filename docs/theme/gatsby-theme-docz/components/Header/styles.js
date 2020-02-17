import * as mixins from "~utils/mixins";
import { media } from "~theme/breakpoints";

export const wrapper = {
    bg: "header.bg",
    position: "relative",
    zIndex: 1
};

export const innerContainer = {
    ...mixins.centerAlign,
    px: 3,
    position: "relative",
    justifyContent: "space-between",
    height: 80
};

export const menuIcon = {
    display: "none",
    position: "absolute",
    top: "calc(100% - 7px)",
    left: 15,
    [media.tablet]: {
        display: "block"
    }
};

export const menuButton = {
    ...mixins.ghostButton,
    color: "header.text",
    opacity: 0.5,
    cursor: "pointer"
};

export const headerButton = {
    ...mixins.centerAlign,
    outline: "none",
    p: "8px 12px",
    border: "none",
    bg: "header.button.bg",
    color: "header.button.color",
    fontSize: 0,
    fontWeight: 600,
    borderRadius: "4px",
    cursor: "pointer",
    ":hover": {
        bg: "#e1e1e1"
    }
};

export const editButton = {
    ...mixins.centerAlign,
    position: "absolute",
    bottom: -40,
    right: 30,
    bg: "transparent",
    color: "muted",
    fontSize: 1,
    textDecoration: "none",
    borderRadius: "radius"
};
