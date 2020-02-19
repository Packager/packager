/** @jsx jsx */
import { jsx } from "theme-ui";

import * as styles from "./styles";
import InfoIcon from "./InfoIcon";

export const Note = ({ type, required, children }) => {
    return (
        <blockquote sx={styles.wrapper}>
            <InfoIcon styles={styles.icon} width="16" height="16" />
            {children}
        </blockquote>
    );
};
