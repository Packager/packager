/** @jsx jsx */
import { jsx } from "theme-ui";

import * as styles from "./styles";

export const ApiProps = ({ type, required, children }) => (
    <ul sx={styles.ul}>
        <li sx={styles.li}>
            <span sx={styles.liHeading}>Type</span>
            <span sx={styles.liBody}>
                <pre sx={styles.pre}>{type}</pre>
            </span>
        </li>
        <li sx={styles.li}>
            <span sx={styles.liHeading}>Required</span>
            <span sx={styles.liBody}>
                <pre sx={styles.pre}>{required}</pre>
            </span>
        </li>
        <li sx={styles.li}>
            <span sx={{ ...styles.liHeading, ...styles.liHeadingUsage }}>
                Usage
            </span>
            {children && <span sx={styles.liBodyUsage}>{children}</span>}
        </li>
    </ul>
);
