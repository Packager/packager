export default (packageJson: any) => {
  return {
    dependencies: {
      ...packageJson.dependencies,
      ...packageJson.peerDependencies
    }
  };
};
