import { BaseNode } from "estree";
import { walk } from "estree-walker";
import * as acornLoose from "acorn-loose";
import { File, PackagerContext } from "../../types/packager";
import { resolveRelative } from "../../resolvers/dependency-resolver";
import { extname } from "../../utils/path";

let dependencies: { [path: string]: any } = {};

const addDependency = (rootPath: string, path: string): void => {
    if (!path) return;

    const external = !path.startsWith(".");

    dependencies = {
        ...dependencies,
        _hasExternal: dependencies._hasExternal || external,
        [rootPath]: {
            ...(dependencies[rootPath] || {}),
            [path]: {
                external
            }
        }
    };
};

export default function findDependencies(
    file: File,
    context: PackagerContext,
    recursive: boolean = false
) {
    if (!recursive) dependencies = {}; // Cleanup incase there are any cached deps.

    const ast = acornLoose.parse(file.code);

    walk(ast, {
        enter(node: BaseNode, parent: BaseNode, prop: string, index: number) {
            // Regular import like import X from './x';
            if (node.type === "ImportDeclaration") {
                // @ts-ignore
                addDependency(file.path, node.source.value);
            }

            // @ts-ignore // Dynamic imports like const x = import('x');
            if (node.type === "Identifier" && node.name === "import") {
                // @ts-ignore
                if (parent.value && parent.value.params.length) {
                    // @ts-ignore
                    addDependency(file.path, parent.value.params[0].value);
                }
            }
        }
    });

    if (recursive && Object.keys(dependencies[file.path] || {}).length) {
        for (const dependency in dependencies[file.path]) {
            if (
                !dependencies[file.path][dependency].external &&
                notInExcludedDependencies(dependency)
            ) {
                const absolute = resolveRelative(
                    dependency,
                    file.path,
                    context
                );
                const absoluteFile = context.files.find(
                    f => f.path === absolute
                );

                if (absoluteFile && !existsInDependencies(absoluteFile))
                    findDependencies(absoluteFile, context, true);
            }
        }
    }

    return dependencies;
}

const existsInDependencies = (file: any) => Boolean(dependencies[file.path]);

const notInExcludedDependencies = (dependency: string) =>
    ![".scss", ".sass", ".less", ".styl", ".stylus"].includes(
        extname(dependency)
    );
