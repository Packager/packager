export default (modulePath: string) =>
  !modulePath.startsWith(".") && !modulePath.startsWith("/");
