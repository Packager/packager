const headingStyles = {
    color: "heading",
    "> a": {
        color: "heading"
    }
};

const styles = {
    Container: {
        py: 4,
        px: 0,
        maxWidth: 1280
    },
    root: {
        fontSize: 2,
        color: "text",
        bg: "background"
    },
    a: {
        color: "primary",
        textDecoration: "none",
        "&:hover": {
            color: "secondary",
            textDecoration: "underline"
        }
    },
    h1: {
        fontSize: 5,
        ...headingStyles
    },
    h2: {
        fontSize: 4,
        ...headingStyles
    },
    h3: {
        fontSize: 3,
        ...headingStyles
    },
    h4: {
        fontSize: 2,
        ...headingStyles
    },
    h5: {
        fontSize: 2,
        ...headingStyles
    },
    li: {
        marginBottom: 1
    },
    blockquote: {
        my: 4,
        mx: 0,
        py: 3,
        px: 4,
        bg: "blockquote.bg",
        borderLeft: t => `5px solid ${t.colors.blockquote.border}`,
        color: "blockquote.color",
        fontStyle: "italic",
        "> p": {
            m: 0
        }
    },
    code: {
        fontFamily: "monospace"
    },
    inlineCode: {
        fontFamily: "monospace",
        backgroundColor: "grayLight",
        p: "3px 5px"
    },
    pre: {
        my: "24px",
        p: 3,
        variant: "prism",
        textAlign: "left",
        fontFamily: "monospace",
        borderRadius: "radius"
    },
    table: {
        width: "100%",
        my: 4,
        borderCollapse: "separate",
        borderSpacing: 0,
        [["th", "td"]]: {
            textAlign: "left",
            py: "4px",
            pr: "4px",
            pl: 0,
            borderColor: "muted",
            borderBottomStyle: "solid"
        }
    },
    th: {
        verticalAlign: "bottom",
        borderBottomWidth: "2px"
    },
    td: {
        verticalAlign: "top",
        borderBottomWidth: "1px"
    },
    hr: {
        border: 0,
        borderBottom: t => `1px solid ${t.colors.border}`
    }
};

export default styles;
