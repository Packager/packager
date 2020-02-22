/** @jsx jsx */
import { jsx } from "theme-ui";

import * as styles from "./styles";

export const ApiProps = ({
    type,
    required,
    children,
    defaultValue,
    showUsage = true
}) => (
    <ul sx={styles.ul}>
        {type && (
            <li sx={{ ...styles.li, ...styles.liInline }}>
                <span
                    sx={{
                        ...styles.liHeading,
                        height: "20px",
                        paddingTop: "2px"
                    }}
                >
                    Type
                </span>
                <span sx={styles.liBody}>
                    <pre sx={styles.pre}>{type}</pre>
                </span>
            </li>
        )}
        {defaultValue && (
            <li sx={styles.li}>
                <span sx={styles.liHeading}>Default</span>
                <span sx={styles.liBody}>
                    <pre sx={styles.pre}>{defaultValue}</pre>
                </span>
            </li>
        )}
        {required && (
            <li sx={styles.li}>
                <span sx={styles.liHeading}>Required</span>
                <span sx={styles.liBody}>
                    <pre sx={styles.pre}>{required}</pre>
                </span>
            </li>
        )}
        {(showUsage || children) && (
            <li sx={styles.li}>
                {showUsage && (
                    <span
                        sx={{
                            ...styles.liHeading,
                            ...styles.liHeadingUsage
                        }}
                    >
                        Usage
                    </span>
                )}
                {children && <span sx={styles.liBodyUsage}>{children}</span>}
            </li>
        )}
    </ul>
);
