const isModuleExternal = (moduleId: string): boolean =>
  !moduleId.startsWith(".") && !moduleId.startsWith("/");

export default isModuleExternal;
