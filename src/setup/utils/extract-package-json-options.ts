export default (packgeJson: any) => {
    return {
        dependencies: {
            ...packgeJson.dependencies,
            ...packgeJson.peerDependencies
        }
    };
};
