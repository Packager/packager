import * as colors from "./colors";
import prismDark from "./prism/dark";
import prismLight from "./prism/light";

export const light = {
    ...colors,
    primary: colors.black,
    text: colors.grayDark,
    muted: colors.gray,
    link: colors.blue,
    background: colors.white,
    border: colors.grayLight,
    heading: colors.black,
    sidebar: {
        bg: colors.white,
        navGroup: colors.grayDark,
        navLink: colors.grayDark,
        navLinkActive: colors.black,
        tocLink: colors.gray,
        tocLinkActive: colors.grayExtraDark
    },
    header: {
        bg: colors.white,
        text: colors.grayDark,
        border: colors.grayLight,
        button: {
            bg: colors.grayLight,
            color: colors.black
        }
    },
    props: {
        bg: colors.grayUltraLight,
        text: colors.grayDark,
        highlight: colors.blue,
        defaultValue: colors.gray,
        descriptionText: colors.grayDark,
        descriptionBg: colors.white
    },
    playground: {
        bg: colors.white,
        border: colors.grayLight
    },
    blockquote: {
        bg: colors.grayExtraLight,
        border: colors.grayLight,
        color: colors.gray
    },
    prism: {
        ...prismLight
    }
};

export const dark = {
    ...colors,
    primary: colors.skyBlue,
    text: colors.grayExtraLight,
    muted: colors.gray,
    link: colors.skyBlue,
    background: colors.black,
    border: colors.grayDark,
    heading: colors.white,
    sidebar: {
        bg: colors.black,
        navGroup: colors.gray,
        navLink: colors.grayLight,
        navLinkActive: colors.skyBlue,
        tocLink: colors.gray,
        tocLinkActive: colors.grayLight
    },
    header: {
        bg: colors.black,
        text: colors.grayLight,
        button: {
            bg: colors.white,
            color: colors.black
        }
    },
    props: {
        bg: colors.dark,
        text: colors.gray,
        highlight: colors.skyBlue,
        defaultValue: colors.grayDark,
        descriptionText: colors.gray,
        descriptionBg: colors.grayExtraDark
    },
    playground: {
        bg: colors.dark,
        border: colors.grayDark
    },
    blockquote: {
        bg: colors.grayDark,
        border: colors.gray,
        color: colors.gray
    },
    prism: {
        ...prismDark
    }
};
