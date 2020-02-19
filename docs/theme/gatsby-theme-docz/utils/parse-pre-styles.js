export const parse = styles =>
    styles
        ? styles.split(";").reduce((acc, curr) => {
              if (!curr) return acc;
              if (!curr.startsWith("@media")) {
                  const splitCurr = curr.split(":");
                  return { ...acc, [splitCurr[0]]: splitCurr[1] };
              }
          }, {})
        : {};
