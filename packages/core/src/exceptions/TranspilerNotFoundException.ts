export default class TranspilerNotFoundException extends Error {
  constructor(pluginName: string) {
    super(
      `Transpiler for ${pluginName} plugin doesn't exist. Make sure you have correctly registered it.`
    );
  }
}
