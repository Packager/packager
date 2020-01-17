import resolveDependencies from "./resolve-dependencies";
import cache, { DependencyCache } from "../utils/dependency-cache";

export type File = {
    name: string;
    path: string;
    entry: boolean;
    code: string;
};

export type PluginContext = {
    cache: DependencyCache;
    files: File[];
};

export default function setup(files: File[]) {
    const context: PluginContext = {
        cache,
        files
    };

    return [resolveDependencies(context)];
}
