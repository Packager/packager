/** @jsx jsx */
/* eslint react/jsx-key: 0 */
import Highlight, { defaultProps } from "prism-react-renderer";
import { jsx, Styled } from "theme-ui";

import { usePrismTheme } from "~utils/theme";
import * as CodeStyles from "./styles";

export const Code = ({ children, className: outerClassName, usage }) => {
    const [language] = outerClassName
        ? outerClassName.replace(/language-/, "").split(" ")
        : ["text"];
    const theme = usePrismTheme();

    return (
        <Highlight
            {...defaultProps}
            code={children.trim()}
            language={language}
            theme={theme}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Styled.pre
                    className={`${outerClassName || ""} ${className}`}
                    style={{ ...style, overflowX: "auto" }}
                    sx={usage ? CodeStyles.usage : {}}
                    data-testid="code"
                >
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span
                                    {...getTokenProps({ token, key })}
                                    sx={{ display: "inline-block" }}
                                />
                            ))}
                        </div>
                    ))}
                </Styled.pre>
            )}
        </Highlight>
    );
};
