/*
    @license

    Packager v0.1.0
    @author baryla (Adrian Barylski)
    @github https://github.com/baryla/packager

    Released under the MIT License.
*/
var Packager=(function(){'use strict';/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

var cjs = deepmerge_1;const isObject = (value) => {
    return value && typeof value === "object" && value.constructor === Object;
};
const cacheFactory = () => {
    const cache = new Map();
    return {
        get(name) {
            return cache.get(name);
        },
        getAll() {
            return Array.from(cache.entries()).reduce((acc, val) => (Object.assign(Object.assign({}, acc), { [val[0]]: val[1] || null })), {});
        },
        set(name, value) {
            if (name == null || name == "") {
                return false;
            }
            cache.set(name, value);
            return this.has(name);
        },
        has(name) {
            return Boolean(this.get(name));
        },
        update(name, value) {
            const found = this.get(name);
            if (found) {
                if (isObject(value)) {
                    this.set(name, Object.assign(Object.assign({}, found), value));
                    return this.has(name);
                }
                else {
                    this.set(name, value);
                    return this.has(name);
                }
            }
        },
        delete(name) {
            return cache.delete(name);
        },
        clear() {
            cache.clear();
        }
    };
};var normalizeBundleOptions = (bundleOptions) => {
    return {
        dependencies: convertKeysToLowercase(bundleOptions.dependencies)
    };
};
const convertKeysToLowercase = (dependencies) => dependencies
    ? Object.keys(dependencies || {}).reduce((acc, curr) => (Object.assign(Object.assign({}, acc), { [curr.toLowerCase()]: dependencies[curr] })), {})
    : {};/**
 * This is a slightly modified version of sequential-task-queue by BalassaMarton.
 * Original repo: https://github.com/BalassaMarton/sequential-task-queue
 */
/**
 * Standard cancellation reasons. {@link SequentialTaskQueue} sets {@link CancellationToken.reason}
 * to one of these values when cancelling a task for a reason other than the user code calling
 * {@link CancellationToken.cancel}.
 */
let cancellationTokenReasons = {
    /** Used when the task was cancelled in response to a call to {@link SequentialTaskQueue.cancel} */
    cancel: "Background queue has been cancelled.",
    /** Used when the task was cancelled after its timeout has passed */
    timeout: "Background queue has timed out."
};
/**
 * Standard event names used by {@link SequentialTaskQueue}
 */
let sequentialTaskQueueEvents = {
    drained: "drained",
    error: "error",
    timeout: "timeout"
};
/**
 * FIFO task queue to run tasks in predictable order, without concurrency.
 */
class SequentialTaskQueue {
    /**
     * Creates a new instance of {@link SequentialTaskQueue}
     * @param options - Configuration options for the task queue.
     */
    constructor(options) {
        this.completed = [];
        this.failed = [];
        this.queue = [];
        this._isClosed = false;
        this.waiters = [];
        this.defaultTimeout = 300;
        this.events = {};
        if (!options)
            options = {};
        this.defaultTimeout = options.timeout || this.defaultTimeout;
        this.name = "queue-system";
        this.scheduler =
            options.scheduler || SequentialTaskQueue.defaultScheduler;
    }
    /** Indicates if the queue has been closed. Calling {@link SequentialTaskQueue.push} on a closed queue will result in an exception. */
    get isClosed() {
        return this._isClosed;
    }
    /**
     * Adds a new task to the queue.
     * @param {string} name - The name of the task being performed
     * @param {Function} task - The function to call when the task is run
     * @param {TaskOptions} options - An object containing arguments and options for the task.
     * @returns {Promise<any>>} A promise that can be used to await or cancel the task.
     */
    push(name, task, options) {
        if (this._isClosed)
            throw new Error(`${this.name} has been previously closed`);
        let taskEntry = {
            name,
            callback: task,
            args: options && options.args
                ? Array.isArray(options.args)
                    ? options.args.slice()
                    : [options.args]
                : [],
            timeout: options && options.timeout !== undefined
                ? options.timeout
                : this.defaultTimeout,
            cancellationToken: {
                cancel: (reason) => this.cancelTask(taskEntry, reason)
            },
            resolve: undefined,
            reject: undefined
        };
        taskEntry.args.push(taskEntry.cancellationToken);
        this.queue.push(taskEntry);
        this.scheduler.schedule(() => this.next());
        let result = new Promise((resolve, reject) => {
            taskEntry.resolve = resolve;
            taskEntry.reject = reject;
        });
        result.cancel = (reason) => taskEntry.cancellationToken.cancel(reason);
        return this.wait();
    }
    /**
     * Cancels the currently running task (if any), and clears the queue.
     * @returns {Promise} A Promise that is fulfilled when the queue is empty and the current task has been cancelled.
     */
    cancel() {
        if (this.currentTask)
            this.cancelTask(this.currentTask, cancellationTokenReasons.cancel);
        const queue = this.queue.splice(0);
        // Cancel all and emit a drained event if there were tasks waiting in the queue
        if (queue.length) {
            queue.forEach(task => this.cancelTask(task, cancellationTokenReasons.cancel));
            this.emit(sequentialTaskQueueEvents.drained);
        }
        return this.wait();
    }
    /**
     * Closes the queue, preventing new tasks to be added.
     * Any calls to {@link SequentialTaskQueue.push} after closing the queue will result in an exception.
     * @param {boolean} cancel - Indicates that the queue should also be cancelled.
     * @returns {Promise} A Promise that is fulfilled when the queue has finished executing remaining tasks.
     */
    close(cancel) {
        if (!this._isClosed) {
            this._isClosed = true;
            if (cancel)
                return this.cancel();
        }
        return this.wait();
    }
    /**
     * Returns a promise that is fulfilled when the queue is empty.
     * @returns {Promise}
     */
    wait() {
        if (!this.currentTask && this.queue.length === 0)
            return Promise.resolve();
        return new Promise(resolve => {
            this.waiters.push(resolve);
        });
    }
    /**
     * Adds an event handler for a named event.
     * @param {string} evt - Event name. See the readme for a list of valid events.
     * @param {Function} handler - Event handler. When invoking the handler, the queue will set itself as the `this` argument of the call.
     */
    on(evt, handler) {
        this.events = this.events || {};
        (this.events[evt] || (this.events[evt] = [])).push(handler);
    }
    /**
     * Adds a single-shot event handler for a named event.
     * @param {string} evt - Event name. See the readme for a list of valid events.
     * @param {Function} handler - Event handler. When invoking the handler, the queue will set itself as the `this` argument of the call.
     */
    once(evt, handler) {
        const cb = (...args) => {
            this.removeListener(evt, cb);
            handler.apply(this, args);
        };
        this.on(evt, cb);
    }
    /**
     * Removes an event handler.
     * @param {string} evt - Event name
     * @param {Function} handler - Event handler to be removed
     */
    removeListener(evt, handler) {
        if (this.events) {
            let list = this.events[evt];
            if (list) {
                let i = 0;
                while (i < list.length) {
                    if (list[i] === handler)
                        list.splice(i, 1);
                    else
                        i++;
                }
            }
        }
    }
    /** @see {@link SequentialTaskQueue.removeListener} */
    off(evt, handler) {
        return this.removeListener(evt, handler);
    }
    emit(evt, ...args) {
        if (this.events && this.events[evt])
            try {
                this.events[evt].forEach(fn => fn.apply(this, args));
            }
            catch (e) {
                console.error(`${this.name}: Exception in '${evt}' event handler`, e);
            }
    }
    next() {
        // Try running the next task, if not currently running one
        if (!this.currentTask) {
            let task = this.queue.shift();
            // skip cancelled tasks
            while (task && task.cancellationToken.cancelled)
                task = this.queue.shift();
            if (task) {
                try {
                    this.currentTask = task;
                    if (task.timeout) {
                        task.timeoutHandle = setTimeout(() => {
                            var _a, _b;
                            this.emit(sequentialTaskQueueEvents.timeout);
                            this.cancelTask(task, `The task took longer than ${(_a = task) === null || _a === void 0 ? void 0 : _a.timeout}ms and timed out in ${(_b = task) === null || _b === void 0 ? void 0 : _b.name}.`);
                        }, task.timeout);
                    }
                    let res = task.callback.apply(undefined, task.args);
                    if (res && isPromise(res)) {
                        res.then(result => {
                            task.result = result;
                            this.doneTask(task);
                        }, err => {
                            this.doneTask(task, err || "Task failed.");
                        });
                    }
                    else {
                        task.result = res;
                        this.doneTask(task);
                    }
                }
                catch (e) {
                    this.doneTask(task, e);
                }
            }
            else {
                // queue is empty, call waiters
                this.callWaiters();
            }
        }
    }
    cancelTask(task, reason) {
        task.cancellationToken.cancelled = true;
        task.cancellationToken.reason = reason;
        this.doneTask(task);
    }
    doneTask(task, error) {
        var _a, _b, _c;
        if (task.timeoutHandle)
            clearTimeout(task.timeoutHandle);
        task.cancellationToken.cancel = noop;
        if (error) {
            this.emit(sequentialTaskQueueEvents.error, error);
            (_a = task.reject) === null || _a === void 0 ? void 0 : _a.call(undefined, error);
            this.failed.push(task);
        }
        else if (task.cancellationToken.cancelled) {
            (_b = task.reject) === null || _b === void 0 ? void 0 : _b.call(undefined, task.cancellationToken.reason);
        }
        else
            (_c = task.resolve) === null || _c === void 0 ? void 0 : _c.call(undefined, task.result);
        if (this.currentTask === task) {
            this.currentTask = undefined;
            if (task.result) {
                this.completed.push(task.result);
            }
            else {
                this.failed.push(task);
            }
            if (!this.queue.length) {
                this.emit(sequentialTaskQueueEvents.drained);
                this.callWaiters();
            }
            else
                this.scheduler.schedule(() => this.next());
        }
    }
    callWaiters() {
        let waiters = this.waiters.splice(0);
        waiters.forEach(waiter => waiter());
    }
}
SequentialTaskQueue.defaultScheduler = {
    schedule: callback => setTimeout(callback, 0)
};
function noop() { }
function isPromise(obj) {
    return obj && typeof obj.then === "function";
}
SequentialTaskQueue.defaultScheduler = {
    schedule: callback => setTimeout(callback, 0)
};const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|\/])/;
function isAbsolute(path) {
    return absolutePath.test(path);
}
function basename(path) {
    return path.split(/(\/|\\)/).pop();
}
function dirname(path) {
    const match = /(\/|\\)[^\/\\]*$/.exec(path);
    if (!match)
        return ".";
    const dir = path.slice(0, -match[0].length);
    // If `dir` is the empty string, we're at root.
    return dir ? dir : "/";
}
function extname(path) {
    const bname = basename(path);
    if (!bname)
        return "";
    const match = /\.[^\.]+$/.exec(bname);
    if (!match)
        return "";
    return match[0];
}
function resolve(...paths) {
    let resolvedParts = paths.shift().split(/[\/\\]/);
    paths.forEach(path => {
        if (isAbsolute(path)) {
            resolvedParts = path.split(/[\/\\]/);
        }
        else {
            const parts = path.split(/[\/\\]/);
            while (parts[0] === "." || parts[0] === "..") {
                const part = parts.shift();
                if (part === "..") {
                    resolvedParts.pop();
                }
            }
            resolvedParts.push.apply(resolvedParts, parts);
        }
    });
    return normalize(resolvedParts.join("/"));
}
function normalize(path) {
    return path.replace(/\/\//gi, "/");
}
const sep = "/";var isModuleExternal = (modulePath) => !modulePath.startsWith(".") && !modulePath.startsWith("/");const resolveRelative = (childPath, parentPath, context, pathOnly = true) => {
    const retryFileFind = (path) => context.files.find(f => f.path === `${path}/index.js` ||
        f.path === `${path}/index.ts` ||
        f.path === `${path}/index.jsx` ||
        f.path === `${path}/index.tsx` ||
        f.path === `${path}.js` ||
        f.path === `${path}.ts` ||
        f.path === `${path}.jsx` ||
        f.path === `${path}.tsx`) || null;
    const resolved = resolve(dirname(parentPath), childPath).replace(/^\.\//, "");
    const foundFile = context.files.find(f => f.path === resolved);
    if (foundFile)
        return pathOnly ? foundFile.path : foundFile;
    const absolute = resolve(dirname(parentPath), childPath);
    const retriedFile = retryFileFind(absolute);
    if (!retriedFile)
        return null;
    return pathOnly ? retriedFile.path || null : retriedFile || null;
};
const resolveRelativeExternal = (childPath, parentPath, context) => {
    if (!parentPath.startsWith("@")) {
        if (!!~parentPath.indexOf("/")) {
            const cachedParent = context.cache.dependencies.get(parentPath);
            if (cachedParent) {
                const relativeExternalUrl = new URL(cachedParent.meta.url)
                    .pathname;
                return resolve(dirname(relativeExternalUrl), childPath);
            }
            return resolve(dirname(`/${parentPath}`), childPath).replace(/^\.\//, "");
        }
        return resolve(`/${parentPath}`, childPath);
    }
    throw new Error(`Module ${childPath} has a parent ${parentPath} with @.`);
};
function dependencyResolver(context) {
    return {
        name: "packager::resolver::dependency-resolver",
        resolveId(modulePath, parent) {
            if (!parent)
                return modulePath;
            if (isModuleExternal(modulePath))
                return modulePath;
            const relativePath = (resolveRelative(modulePath, parent, context));
            if (relativePath)
                return relativePath;
            if (!parent.startsWith(".") ||
                !parent.startsWith("/") ||
                isModuleExternal(parent)) {
                const pkgPath = resolveRelativeExternal(modulePath, parent, context);
                return {
                    id: pkgPath.substr(1)
                };
            }
            throw new Error(`Could not resolve '${modulePath}' from '${parent}'`);
        }
    };
}/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
const operators = {
    "==": (x) => equals(x.left, x.right, false),
    "!=": (x) => not(operators["=="](x)),
    "===": (x) => equals(x.left, x.right, true),
    "!==": (x) => not(operators["==="](x)),
    "!": (x) => isFalsy(x.argument),
    "&&": (x) => isTruthy(x.left) && isTruthy(x.right),
    "||": (x) => isTruthy(x.left) || isTruthy(x.right)
};
const extractors = {
    Identifier(names, node) {
        names.push(node.name);
    },
    ObjectPattern(names, node) {
        node.properties.forEach((prop) => {
            getExtractor(prop.value.type)(names, prop.value);
        });
    },
    ArrayPattern(names, node) {
        node.elements.forEach((element) => {
            if (!element)
                return;
            getExtractor(element.type)(names, element);
        });
    },
    RestElement(names, node) {
        getExtractor(node.argument.type)(names, node.argument);
    },
    AssignmentPattern(names, node) {
        getExtractor(node.left.type)(names, node.left);
    },
    MemberExpression() { }
};
const flatten = (node) => {
    const parts = [];
    while (node.type === "MemberExpression") {
        if (node.computed)
            return null;
        parts.unshift(node.property.name);
        // eslint-disable-next-line no-param-reassign
        node = node.object;
    }
    if (node.type !== "Identifier")
        return null;
    const { name } = node;
    parts.unshift(name);
    return { name, keypath: parts.join(".") };
};
const getExtractor = (type) => {
    const extractor = extractors[type];
    if (!extractor)
        throw new SyntaxError(`${type} pattern not supported.`);
    return extractor;
};
const isTruthy = (node) => {
    if (node.type === "Literal")
        return !!node.value;
    if (node.type === "ParenthesizedExpression")
        return isTruthy(node.expression);
    if (node.operator in operators)
        return operators[node.operator](node);
    return undefined;
};
const isFalsy = (node) => {
    return not(isTruthy(node));
};
const not = (value) => {
    return value === undefined ? value : !value;
};
const equals = (a, b, strict) => {
    if (a.type !== b.type)
        return undefined;
    // eslint-disable-next-line eqeqeq
    if (a.type === "Literal")
        return strict ? a.value === b.value : a.value == b.value;
    return undefined;
};
const isReference = (node, parent) => {
    if (node.type === "MemberExpression") {
        return !node.computed && isReference(node.object, node);
    }
    if (node.type === "Identifier") {
        if (!parent)
            return true;
        switch (parent.type) {
            // disregard `bar` in `foo.bar`
            case "MemberExpression":
                return parent.computed || node === parent.object;
            // disregard the `foo` in `class {foo(){}}` but keep it in `class {[foo](){}}`
            case "MethodDefinition":
                return parent.computed;
            // disregard the `bar` in `{ bar: foo }`, but keep it in `{ [bar]: foo }`
            case "Property":
                return parent.computed || node === parent.value;
            // disregard the `bar` in `export { foo as bar }` or
            // the foo in `import { foo as bar }`
            case "ExportSpecifier":
            case "ImportSpecifier":
                return node === parent.local;
            // disregard the `foo` in `foo: while (...) { ... break foo; ... continue foo;}`
            case "LabeledStatement":
            case "BreakStatement":
            case "ContinueStatement":
                return false;
            default:
                return true;
        }
    }
    return false;
};function walk(ast, { enter, leave }) {
	return visit(ast, null, enter, leave);
}

let should_skip = false;
let should_remove = false;
let replacement = null;
const context = {
	skip: () => should_skip = true,
	remove: () => should_remove = true,
	replace: (node) => replacement = node
};

function replace(parent, prop, index, node) {
	if (parent) {
		if (index !== null) {
			parent[prop][index] = node;
		} else {
			parent[prop] = node;
		}
	}
}

function remove(parent, prop, index) {
	if (parent) {
		if (index !== null) {
			parent[prop].splice(index, 1);
		} else {
			delete parent[prop];
		}
	}
}

function visit(
	node,
	parent,
	enter,
	leave,
	prop,
	index
) {
	if (node) {
		if (enter) {
			const _should_skip = should_skip;
			const _should_remove = should_remove;
			const _replacement = replacement;
			should_skip = false;
			should_remove = false;
			replacement = null;

			enter.call(context, node, parent, prop, index);

			if (replacement) {
				node = replacement;
				replace(parent, prop, index, node);
			}

			if (should_remove) {
				remove(parent, prop, index);
			}

			const skipped = should_skip;
			const removed = should_remove;

			should_skip = _should_skip;
			should_remove = _should_remove;
			replacement = _replacement;

			if (skipped) return node;
			if (removed) return null;
		}

		for (const key in node) {
			const value = (node )[key];

			if (typeof value !== 'object') {
				continue;
			}

			else if (Array.isArray(value)) {
				for (let j = 0, k = 0; j < value.length; j += 1, k += 1) {
					if (value[j] !== null && typeof value[j].type === 'string') {
						if (!visit(value[j], node, enter, leave, key, k)) {
							// removed
							j--;
						}
					}
				}
			}

			else if (value !== null && typeof value.type === 'string') {
				visit(value, node, enter, leave, key, null);
			}
		}

		if (leave) {
			const _replacement = replacement;
			const _should_remove = should_remove;
			replacement = null;
			should_remove = false;

			leave.call(context, node, parent, prop, index);

			if (replacement) {
				node = replacement;
				replace(parent, prop, index, node);
			}

			if (should_remove) {
				remove(parent, prop, index);
			}

			const removed = should_remove;

			replacement = _replacement;
			should_remove = _should_remove;

			if (removed) return null;
		}
	}

	return node;
}/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
const PROXY_SUFFIX = "?commonjs-proxy";
const getProxyId = (id) => `\0${id}${PROXY_SUFFIX}`;
const getIdFromProxyId = (proxyId) => proxyId.slice(1, -PROXY_SUFFIX.length);
const EXTERNAL_SUFFIX = "?commonjs-external";
const getExternalProxyId = (id) => `\0${id}${EXTERNAL_SUFFIX}`;
const getIdFromExternalProxyId = (proxyId) => proxyId.slice(1, -EXTERNAL_SUFFIX.length);
const HELPERS_ID = "\0commonjsHelpers.js";
// `x['default']` is used instead of `x.default` for backward compatibility with ES3 browsers.
// Minifiers like uglify will usually transpile it back if compatibility with ES3 is not enabled.
const HELPERS = `
export var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

export function commonjsRequire () {
    throw new Error('Dynamic requires are not currently supported.');
}

export function unwrapExports (x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

export function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

export function getCjsExportFromNamespace (n) {
    return n && n['default'] || n;
}

export default {
    commonjsRequire,
    unwrapExports,
    createCommonjsModule,
    getCjsExportFromNamespace
}`;
const extractAssignedNames = (param) => {
    const names = [];
    extractors[param.type](names, param);
    return names;
};
const blockDeclarations = {
    const: true,
    let: true
};
class Scope {
    constructor(options = {}) {
        this.parent = options.parent;
        this.isBlockScope = !!options.block;
        this.declarations = Object.create(null);
        if (options.params) {
            options.params.forEach((param) => {
                extractAssignedNames(param).forEach((name) => {
                    this.declarations[name] = true;
                });
            });
        }
    }
    addDeclaration(node, isBlockDeclaration, isVar) {
        if (!isBlockDeclaration && this.isBlockScope) {
            // it's a `var` or function node, and this
            // is a block scope, so we need to go up
            this.parent.addDeclaration(node, isBlockDeclaration, isVar);
        }
        else if (node.id) {
            extractAssignedNames(node.id).forEach((name) => {
                this.declarations[name] = true;
            });
        }
    }
    contains(name) {
        return (this.declarations[name] ||
            (this.parent ? this.parent.contains(name) : false));
    }
}
const attachScopes = (ast, propertyName = "scope") => {
    let scope = new Scope();
    walk(ast, {
        enter(n, parent) {
            const node = n;
            // function foo () {...}
            // class Foo {...}
            if (/(Function|Class)Declaration/.test(node.type)) {
                scope.addDeclaration(node, false, false);
            }
            // var foo = 1
            if (node.type === "VariableDeclaration") {
                const { kind } = node;
                const isBlockDeclaration = blockDeclarations[kind];
                // don't add const/let declarations in the body of a for loop #113
                const parentType = parent ? parent.type : "";
                if (!(isBlockDeclaration && /ForOfStatement/.test(parentType))) {
                    node.declarations.forEach((declaration) => {
                        scope.addDeclaration(declaration, isBlockDeclaration, true);
                    });
                }
            }
            let newScope;
            // create new function scope
            if (/Function/.test(node.type)) {
                const func = node;
                newScope = new Scope({
                    parent: scope,
                    block: false,
                    params: func.params
                });
                // named function expressions - the name is considered
                // part of the function's scope
                if (func.type === "FunctionExpression" && func.id) {
                    newScope.addDeclaration(func, false, false);
                }
            }
            // create new block scope
            if (node.type === "BlockStatement" &&
                !/Function/.test(parent.type)) {
                newScope = new Scope({
                    parent: scope,
                    block: true
                });
            }
            // catch clause has its own block scope
            if (node.type === "CatchClause") {
                newScope = new Scope({
                    parent: scope,
                    params: node.param ? [node.param] : [],
                    block: true
                });
            }
            if (newScope) {
                Object.defineProperty(node, propertyName, {
                    value: newScope,
                    configurable: true
                });
                scope = newScope;
            }
        },
        leave(n) {
            const node = n;
            if (node[propertyName])
                scope = scope.parent;
        }
    });
    return scope;
};
const reservedWords = "break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public";
const builtins = "arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl";
const forbiddenIdentifiers = new Set(`${reservedWords} ${builtins}`.split(" "));
forbiddenIdentifiers.add("");
const makeLegalIdentifier = (str) => {
    let identifier = str
        .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
        .replace(/[^$_a-zA-Z0-9]/g, "_");
    if (/\d/.test(identifier[0]) || forbiddenIdentifiers.has(identifier)) {
        identifier = `_${identifier}`;
    }
    return identifier || "_";
};
const getName = (id) => {
    const name = makeLegalIdentifier(basename(`${id}${extname(id)}`));
    if (name !== "index") {
        return name;
    }
    const segments = dirname(id).split(sep);
    return makeLegalIdentifier(segments[segments.length - 1]);
};/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
function getCandidatesForExtension(resolved, extension) {
    return [resolved + extension, `${resolved}${sep}index${extension}`];
}
function getCandidates(resolved, extensions) {
    return extensions.reduce((paths, extension) => paths.concat(getCandidatesForExtension(resolved, extension)), [resolved]);
}
function commonjsResolver(context) {
    const extensions = [".js"];
    function resolveExtensions(importee, importer) {
        if (importee[0] !== "." || !importer)
            return null;
        const resolved = resolve(dirname(importer), importee);
        const candidates = getCandidates(resolved, extensions);
        for (let i = 0; i < candidates.length; i += 1) {
            try {
                console.log("found candidate!");
            }
            catch (err) {
                /* noop */
            }
        }
        return null;
    }
    return {
        name: "packager::resolver::commonjs-resolver",
        resolveId(importee, importer) {
            const isProxyModule = importee.endsWith(PROXY_SUFFIX);
            if (isProxyModule) {
                importee = getIdFromProxyId(importee);
            }
            else if (importee.startsWith("\0")) {
                if (importee === HELPERS_ID) {
                    return importee;
                }
                return null;
            }
            if (importer && importer.endsWith(PROXY_SUFFIX)) {
                importer = getIdFromProxyId(importer);
            }
            // @ts-ignore
            return this.resolve(importee, importer, { skipSelf: true }).then((resolved) => {
                if (!resolved) {
                    resolved = resolveExtensions(importee, importer);
                }
                if (isProxyModule) {
                    if (!resolved) {
                        return {
                            id: getExternalProxyId(importee),
                            external: false
                        };
                    }
                    resolved.id = (resolved.external
                        ? getExternalProxyId
                        : getProxyId)(resolved.id);
                    resolved.external = false;
                    return resolved;
                }
                return resolved;
            });
        }
    };
}var resolvers = (context) => [
    commonjsResolver(),
    dependencyResolver(context)
];var verifyExtensions = (extensions) => {
    const regex = new RegExp(`\\${extensions.join("$|\\")}$`, "i");
    return (path, ignoreExternal = true) => {
        const external = isModuleExternal(path);
        return (regex.test(path) &&
            ((external && !ignoreExternal) || !external ? true : false));
    };
};/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
const blacklist = { __esModule: true };
const exportsPattern = /^(?:module\.)?exports(?:\.([a-zA-Z_$][a-zA-Z_$0-9]*))?$/;
const firstpassGlobal = /\b(?:require|module|exports|global)\b/;
const firstpassNoGlobal = /\b(?:require|module|exports)\b/;
const importExportDeclaration = /^(?:Import|Export(?:Named|Default))Declaration/;
const functionType = /^(?:FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/;
const deconflict = (scope, globals, identifier) => {
    let i = 1;
    let deconflicted = identifier;
    while (scope.contains(deconflicted) ||
        globals.has(deconflicted) ||
        deconflicted in blacklist) {
        deconflicted = `${identifier}_${i}`;
        i += 1;
    }
    scope.declarations[deconflicted] = true;
    return deconflicted;
};
const tryParse = (parse, code, id) => {
    try {
        return parse(code, { allowReturnOutsideFunction: true });
    }
    catch (err) {
        err.message += ` in ${id}`;
        throw err;
    }
};
const hasCjsKeywords = (code, ignoreGlobal) => {
    const firstpass = ignoreGlobal ? firstpassNoGlobal : firstpassGlobal;
    return firstpass.test(code);
};
const checkEsModule = (parse, code, id) => {
    const ast = tryParse(parse, code, id);
    let isEsModule = false;
    for (const node of ast.body) {
        if (node.type === "ExportDefaultDeclaration")
            return { isEsModule: true, hasDefaultExport: true, ast };
        if (node.type === "ExportNamedDeclaration") {
            isEsModule = true;
            for (const specifier of node.specifiers) {
                if (specifier.exported.name === "default") {
                    return { isEsModule: true, hasDefaultExport: true, ast };
                }
            }
        }
        else if (importExportDeclaration.test(node.type))
            isEsModule = true;
    }
    return { isEsModule, hasDefaultExport: false, ast };
};
const loadMagicString = () => new Promise(resolve => {
    const script = document.createElement("script");
    script.src =
        "https://unpkg.com/@bloxy/iife-libs@0.0.4/libs/magic-string.js";
    script.setAttribute("data-packager", "true");
    script.onload = resolve;
    document.head.appendChild(script);
});
function performTransformation (parse, code, id, isEntry, ignoreGlobal, ignoreRequire, customNamedExports, sourceMap, allowDynamicRequire, astCache, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        if (!window.magicString) {
            yield loadMagicString();
        }
        const ast = astCache || tryParse(parse, code, id);
        // @ts-ignore
        const magicString = new window.magicString.default(code);
        const required = {};
        const sources = [];
        let uid = 0;
        let scope = attachScopes(ast, "scope");
        let lexicalDepth = 0;
        let programDepth = 0;
        let shouldWrap = /__esModule/.test(code);
        const uses = {
            module: false,
            exports: false,
            global: false,
            require: false
        };
        const globals = new Set();
        const HELPERS_NAME = deconflict(scope, globals, "commonjsHelpers");
        const namedExports = {};
        function isRequireStatement(node) {
            if (!node)
                return false;
            if (node.type !== "CallExpression")
                return false;
            if (node.callee.name !== "require" || scope.contains("require"))
                return false;
            // Weird case of require() without arguments
            if (node.arguments.length === 0)
                return false;
            return true;
        }
        function hasDynamicArguments(node) {
            return (node.arguments.length > 1 ||
                (node.arguments[0].type !== "Literal" &&
                    (node.arguments[0].type !== "TemplateLiteral" ||
                        node.arguments[0].expressions.length > 0)));
        }
        function isStaticRequireStatement(node) {
            if (!isRequireStatement(node))
                return false;
            if (hasDynamicArguments(node))
                return false;
            if (ignoreRequire(node.arguments[0].value))
                return false;
            return true;
        }
        function getRequireStringArg(node) {
            return node.arguments[0].type === "Literal"
                ? node.arguments[0].value
                : node.arguments[0].quasis[0].value.cooked;
        }
        function getRequired(node, name) {
            const sourceId = getRequireStringArg(node);
            const existing = required[sourceId];
            // eslint-disable-next-line no-undefined
            if (existing === undefined) {
                if (!name) {
                    do {
                        name = `require$$${uid}`;
                        uid += 1;
                    } while (scope.contains(name));
                }
                sources.push(sourceId);
                required[sourceId] = {
                    source: sourceId,
                    name,
                    importsDefault: false
                };
            }
            return required[sourceId];
        }
        // do a first pass, see which names are assigned to. This is necessary to prevent
        // illegally replacing `var foo = require('foo')` with `import foo from 'foo'`,
        // where `foo` is later reassigned. (This happens in the wild. CommonJS, sigh)
        const assignedTo = new Set();
        walk(ast, {
            enter(node) {
                if (node.type !== "AssignmentExpression")
                    return;
                if (node.left.type === "MemberExpression")
                    return;
                extractAssignedNames(node.left).forEach((name) => {
                    assignedTo.add(name);
                });
            }
        });
        walk(ast, {
            enter(node, parent) {
                if (sourceMap) {
                    magicString.addSourcemapLocation(node.start);
                    magicString.addSourcemapLocation(node.end);
                }
                // skip dead branches
                if (parent &&
                    (parent.type === "IfStatement" ||
                        parent.type === "ConditionalExpression")) {
                    if (node === parent.consequent && isFalsy(parent.test)) {
                        this.skip();
                        return;
                    }
                    if (node === parent.alternate && isTruthy(parent.test)) {
                        this.skip();
                        return;
                    }
                }
                if (node._skip) {
                    this.skip();
                    return;
                }
                programDepth += 1;
                if (node.scope)
                    ({ scope } = node);
                if (functionType.test(node.type))
                    lexicalDepth += 1;
                // if toplevel return, we need to wrap it
                if (node.type === "ReturnStatement" && lexicalDepth === 0) {
                    shouldWrap = true;
                }
                // rewrite `this` as `commonjsHelpers.commonjsGlobal`
                if (node.type === "ThisExpression" && lexicalDepth === 0) {
                    uses.global = true;
                    if (!ignoreGlobal)
                        magicString.overwrite(node.start, node.end, `${HELPERS_NAME}.commonjsGlobal`, {
                            storeName: true
                        });
                    return;
                }
                // rewrite `typeof module`, `typeof module.exports` and `typeof exports` (https://github.com/rollup/rollup-plugin-commonjs/issues/151)
                if (node.type === "UnaryExpression" && node.operator === "typeof") {
                    const flattened = flatten(node.argument);
                    if (!flattened)
                        return;
                    if (scope.contains(flattened.name))
                        return;
                    if (flattened.keypath === "module.exports" ||
                        flattened.keypath === "module" ||
                        flattened.keypath === "exports") {
                        magicString.overwrite(node.start, node.end, `'object'`, {
                            storeName: false
                        });
                    }
                }
                // rewrite `require` (if not already handled) `global` and `define`, and handle free references to
                // `module` and `exports` as these mean we need to wrap the module in commonjsHelpers.createCommonjsModule
                if (node.type === "Identifier") {
                    if (isReference(node, parent) && !scope.contains(node.name)) {
                        if (node.name in uses) {
                            if (node.name === "require") {
                                if (allowDynamicRequire)
                                    return;
                                magicString.overwrite(node.start, node.end, `${HELPERS_NAME}.commonjsRequire`, {
                                    storeName: true
                                });
                            }
                            uses[node.name] = true;
                            if (node.name === "global" && !ignoreGlobal) {
                                magicString.overwrite(node.start, node.end, `${HELPERS_NAME}.commonjsGlobal`, {
                                    storeName: true
                                });
                            }
                            // if module or exports are used outside the context of an assignment
                            // expression, we need to wrap the module
                            if (node.name === "module" || node.name === "exports") {
                                shouldWrap = true;
                            }
                        }
                        if (node.name === "define") {
                            magicString.overwrite(node.start, node.end, "undefined", { storeName: true });
                        }
                        globals.add(node.name);
                    }
                    return;
                }
                // Is this an assignment to exports or module.exports?
                if (node.type === "AssignmentExpression") {
                    if (node.left.type !== "MemberExpression")
                        return;
                    const flattened = flatten(node.left);
                    if (!flattened)
                        return;
                    if (scope.contains(flattened.name))
                        return;
                    const match = exportsPattern.exec(flattened.keypath);
                    if (!match || flattened.keypath === "exports")
                        return;
                    uses[flattened.name] = true;
                    // we're dealing with `module.exports = ...` or `[module.]exports.foo = ...` –
                    // if this isn't top-level, we'll need to wrap the module
                    if (programDepth > 3)
                        shouldWrap = true;
                    node.left._skip = true;
                    if (flattened.keypath === "module.exports" &&
                        node.right.type === "ObjectExpression") {
                        node.right.properties.forEach((prop) => {
                            if (prop.computed ||
                                !("key" in prop) ||
                                prop.key.type !== "Identifier")
                                return;
                            const { name } = prop.key;
                            if (name === makeLegalIdentifier(name))
                                namedExports[name] = true;
                        });
                        return;
                    }
                    if (match[1])
                        namedExports[match[1]] = true;
                    return;
                }
                // if this is `var x = require('x')`, we can do `import x from 'x'`
                if (node.type === "VariableDeclarator" &&
                    node.id.type === "Identifier" &&
                    isStaticRequireStatement(node.init)) {
                    // for now, only do this for top-level requires. maybe fix this in future
                    if (scope.parent)
                        return;
                    // edge case — CJS allows you to assign to imports. ES doesn't
                    if (assignedTo.has(node.id.name))
                        return;
                    const required = getRequired(node.init, node.id.name);
                    required.importsDefault = true;
                    if (required.name === node.id.name) {
                        node._shouldRemove = true;
                    }
                }
                if (!isStaticRequireStatement(node))
                    return;
                const required = getRequired(node);
                if (parent.type === "ExpressionStatement") {
                    // is a bare import, e.g. `require('foo');`
                    magicString.remove(parent.start, parent.end);
                }
                else {
                    required.importsDefault = true;
                    magicString.overwrite(node.start, node.end, required.name);
                }
                node.callee._skip = true;
            },
            leave(node) {
                programDepth -= 1;
                if (node.scope)
                    scope = scope.parent;
                if (functionType.test(node.type))
                    lexicalDepth -= 1;
                if (node.type === "VariableDeclaration") {
                    let keepDeclaration = false;
                    let c = node.declarations[0].start;
                    for (let i = 0; i < node.declarations.length; i += 1) {
                        const declarator = node.declarations[i];
                        if (declarator._shouldRemove) {
                            magicString.remove(c, declarator.end);
                        }
                        else {
                            if (!keepDeclaration) {
                                magicString.remove(c, declarator.start);
                                keepDeclaration = true;
                            }
                            c = declarator.end;
                        }
                    }
                    if (!keepDeclaration) {
                        magicString.remove(node.start, node.end);
                    }
                }
            }
        });
        if (!sources.length &&
            !uses.module &&
            !uses.exports &&
            !uses.require &&
            (ignoreGlobal || !uses.global)) {
            if (Object.keys(namedExports).length) {
                throw new Error(`Custom named exports were specified for ${id} but it does not appear to be a CommonJS module`);
            }
            // not a CommonJS module
            return null;
        }
        const includeHelpers = shouldWrap || uses.global || uses.require;
        const importBlock = `${(includeHelpers
            ? [`import * as ${HELPERS_NAME} from '${HELPERS_ID}';`]
            : [])
            .concat(sources.map((source) => 
        // import the actual module before the proxy, so that we know
        // what kind of proxy to build
        `import '${source}';`), sources.map((source) => {
            const { name, importsDefault } = required[source];
            return `import ${importsDefault ? `${name} from ` : ``}'${getProxyId(source)}';`;
        }))
            .join("\n")}\n\n`;
        const namedExportDeclarations = [];
        let wrapperStart = "";
        let wrapperEnd = "";
        const moduleName = deconflict(scope, globals, getName(id));
        if (!isEntry) {
            const exportModuleExports = {
                str: `export { ${moduleName} as __moduleExports };`,
                name: "__moduleExports"
            };
            namedExportDeclarations.push(exportModuleExports);
        }
        const name = getName(id);
        function addExport(x) {
            const deconflicted = deconflict(scope, globals, name);
            const declaration = deconflicted === name
                ? `export var ${x} = ${moduleName}.${x};`
                : `var ${deconflicted} = ${moduleName}.${x};\nexport { ${deconflicted} as ${x} };`;
            namedExportDeclarations.push({
                str: declaration,
                name: x
            });
        }
        if (customNamedExports)
            customNamedExports.forEach(addExport);
        const defaultExportPropertyAssignments = [];
        let hasDefaultExport = false;
        if (shouldWrap) {
            const args = `module${uses.exports ? ", exports" : ""}`;
            wrapperStart = `var ${moduleName} = ${HELPERS_NAME}.createCommonjsModule(function (${args}) {\n`;
            wrapperEnd = `\n});`;
        }
        else {
            const names = [];
            ast.body.forEach((node) => {
                if (node.type === "ExpressionStatement" &&
                    node.expression.type === "AssignmentExpression") {
                    const { left } = node.expression;
                    const flattened = flatten(left);
                    if (!flattened)
                        return;
                    const match = exportsPattern.exec(flattened.keypath);
                    if (!match)
                        return;
                    if (flattened.keypath === "module.exports") {
                        hasDefaultExport = true;
                        magicString.overwrite(left.start, left.end, `var ${moduleName}`);
                    }
                    else {
                        const [, name] = match;
                        const deconflicted = deconflict(scope, globals, name);
                        names.push({ name, deconflicted });
                        magicString.overwrite(node.start, left.end, `var ${deconflicted}`);
                        const declaration = name === deconflicted
                            ? `export { ${name} };`
                            : `export { ${deconflicted} as ${name} };`;
                        if (name !== "default") {
                            namedExportDeclarations.push({
                                str: declaration,
                                name
                            });
                            delete namedExports[name];
                        }
                        defaultExportPropertyAssignments.push(`${moduleName}.${name} = ${deconflicted};`);
                    }
                }
            });
            if (!hasDefaultExport && (names.length || !isEntry)) {
                wrapperEnd = `\n\nvar ${moduleName} = {\n${names
                    .map(({ name, deconflicted }) => `\t${name}: ${deconflicted}`)
                    .join(",\n")}\n};`;
            }
        }
        Object.keys(namedExports)
            .filter(key => !blacklist[key])
            .forEach(addExport);
        const isIifeOrUmd = /__esModule/.test(code);
        const defaultExport = isIifeOrUmd
            ? `export default ${HELPERS_NAME}.unwrapExports(${moduleName});`
            : `export default ${moduleName};`;
        if (isIifeOrUmd) {
            context.cache.dependencies.update(id, { iife: true });
        }
        const named = namedExportDeclarations
            .filter(x => x.name !== "default" || !hasDefaultExport)
            .map(x => x.str);
        const exportBlock = `\n\n window.__dependencies['${id}'] = ${moduleName}; ${[
            defaultExport
        ]
            .concat(named)
            .concat(hasDefaultExport ? defaultExportPropertyAssignments : [])
            .join("\n")}`;
        magicString
            .trim()
            .prepend(importBlock + wrapperStart)
            .trim()
            .append(wrapperEnd);
        if (hasDefaultExport || named.length > 0 || shouldWrap || !isEntry) {
            magicString.append(exportBlock);
        }
        code = magicString.toString();
        const map = sourceMap ? magicString.generateMap() : null;
        return { code, map };
    });
}/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
const isCjsPromises = new Map();
const getIsCjsPromise = (id) => new Promise(resolve => resolve(isCjsPromises.get(id) || false));
const setIsCjsPromise = (id, is) => isCjsPromises.set(id, is);/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
const isNotTransformable = (modulePath, couldBeCjs) => !couldBeCjs(modulePath) &&
    !modulePath.endsWith("?commonjs-proxy") &&
    !isModuleExternal(modulePath);
function commonjsTransformer(context) {
    const transformerName = "packager::transformer::commonjs-transformer";
    const couldBeCjs = verifyExtensions([".js"]);
    return {
        name: transformerName,
        transform(code, modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isNotTransformable(modulePath, couldBeCjs))
                    return null;
                const cachedDependency = context.cache.dependencies.get(modulePath);
                if (cachedDependency && cachedDependency.transformedCode) {
                    code = `const __default = window.__dependencies['${modulePath}']; export default __default;`;
                    return { code, syntheticNamedExports: true };
                }
                const options = {};
                const ignoreGlobal = true;
                const sourceMap = true;
                const allowDynamicRequire = true;
                const ignoreRequire =  Array.isArray(options.ignore)
                        ? (modulePath) => options.ignore.includes(modulePath)
                        : () => false;
                const customNamedExports = {};
                const { isEsModule, hasDefaultExport, ast } = checkEsModule(
                // @ts-ignore
                this.parse, code, modulePath);
                if (isEsModule) {
                    (hasDefaultExport
                        ? context.cache.esModulesWithDefaultExport
                        : context.cache.esModulesWithoutDefaultExport).add(modulePath);
                    return null;
                }
                // it is not an ES module but it does not have CJS-specific elements.
                if (!hasCjsKeywords(code, ignoreGlobal)) {
                    context.cache.esModulesWithoutDefaultExport.add(modulePath);
                    return null;
                }
                const normalizedId = normalize(modulePath);
                const transformed = yield performTransformation(
                // @ts-ignore
                this.parse, code, modulePath, 
                // @ts-ignore
                this.getModuleInfo(modulePath).isEntry, ignoreGlobal, ignoreRequire, customNamedExports[normalizedId], sourceMap, allowDynamicRequire, ast, context);
                setIsCjsPromise(modulePath, Boolean(transformed));
                if (transformed) {
                    context.cache.dependencies.update(modulePath, {
                        transformedCode: transformed.code
                    });
                    return {
                        code: transformed.code || "",
                        map: transformed.map || { mappings: "" },
                        syntheticNamedExports: true
                    };
                }
            });
        }
    };
}const TRANSPILE_STATUS = {
    PREPARE_FILES: "TRANSPILER:FILE:PREPARE",
    PREPARE_ADDITIONAL: "TRANSPILER:ADDITIONAL:PREPARE",
    ADDITIONAL_TRANSPILED: "TRANSPILER:ADDITIONAL:TRANSPILED",
    TRANSPILE_COMPLETE: "TRANSPILER:TRANSPILE:COMPLETE",
    ERROR_COMPILE: "TRANSPILER:ERROR:COMPILE",
    ERROR_ADDITIONAL: "TRANSPILER:ERROR:ADDITIONAL"
};
class Transpiler {
    constructor(name, worker, context) {
        this.name = name;
        this.worker = worker;
        this.context = context;
    }
    doTranspile(file) {
        return new Promise((resolve, reject) => {
            if (!this.worker) {
                return resolve(file);
            }
            this.worker.onmessage = ({ data }) => __awaiter(this, void 0, void 0, function* () {
                const { file, type, error, additional } = data;
                if (type === TRANSPILE_STATUS.ERROR_ADDITIONAL ||
                    type === TRANSPILE_STATUS.ERROR_COMPILE) {
                    return reject(error);
                }
                if (type === TRANSPILE_STATUS.PREPARE_ADDITIONAL) {
                    try {
                        const additionalTranspiled = yield this.transpileAdditional(additional);
                        this.worker.postMessage({
                            type: TRANSPILE_STATUS.ADDITIONAL_TRANSPILED,
                            file,
                            additional: additionalTranspiled,
                            context: {
                                files: this.context.files
                            }
                        });
                    }
                    catch (error) {
                        return reject(error);
                    }
                }
                if (type === TRANSPILE_STATUS.TRANSPILE_COMPLETE) {
                    return resolve(file);
                }
            });
            this.worker.postMessage({
                type: TRANSPILE_STATUS.PREPARE_FILES,
                file,
                context: {
                    files: this.context.files
                }
            });
        });
    }
    transpileAdditional({ styles, html }) {
        return __awaiter(this, void 0, void 0, function* () {
            const stylePromises = [];
            for (const style of styles) {
                const { code, scopeId, path, lang } = style;
                const transpiler = this.fetchTranspiler(style.lang);
                stylePromises.push(transpiler.transpile({ code, scopeId, lang, path }));
            }
            return {
                styles: yield Promise.all(stylePromises)
            };
        });
    }
    fetchTranspiler(lang) {
        // @ts-ignore
        let transpiler = this.additionalTranspilers[lang];
        if (transpiler) {
            const activeTranspiler = this.context.cache.transpilers.get(`${lang}-transpiler`);
            if (activeTranspiler)
                return activeTranspiler;
            transpiler = new transpiler(this.context);
            this.context.cache.transpilers.set(`${lang}-transpiler`, transpiler);
            return transpiler;
        }
        throw Error(`Additional transpiler (${lang}-transpiler) does not exist or isn't supported for ${this.name}`);
    }
}const kIsNodeJS = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
const kRequire = kIsNodeJS && typeof module.require === 'function' ? module.require : null; // eslint-disable-line

function browserDecodeBase64(base64, enableUnicode) {
    const binaryString = atob(base64);
    if (enableUnicode) {
        const binaryView = new Uint8Array(binaryString.length);
        Array.prototype.forEach.call(binaryView, (el, idx, arr) => {
            arr[idx] = binaryString.charCodeAt(idx);
        });
        return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }
    return binaryString;
}

function nodeDecodeBase64(base64, enableUnicode) {
    return Buffer.from(base64, 'base64').toString(enableUnicode ? 'utf16' : 'utf8');
}

function createBase64WorkerFactory(base64, sourcemap = null, enableUnicode = false) {
    const source = kIsNodeJS ? nodeDecodeBase64(base64, enableUnicode) : browserDecodeBase64(base64, enableUnicode);
    const start = source.indexOf('\n', 10) + 1;
    const body = source.substring(start) + (sourcemap ? `\/\/# sourceMappingURL=${sourcemap}` : '');

    if (kRequire) {
        /* node.js */
        const Worker = kRequire('worker_threads').Worker; // eslint-disable-line
        return function WorkerFactory(options) {
            return new Worker(body, Object.assign({}, options, { eval: true }));
        };
    }

    /* browser */
    const blob = new Blob([body], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    return function WorkerFactory(options) {
        return new Worker(url, options);
    };
}/* eslint-disable */
const WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0KCmNvbnN0IGFic29sdXRlUGF0aCA9IC9eKD86XC98KD86W0EtWmEtel06KT9bXFx8XC9dKS87DQpmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGgpIHsNCiAgICByZXR1cm4gYWJzb2x1dGVQYXRoLnRlc3QocGF0aCk7DQp9DQpmdW5jdGlvbiBkaXJuYW1lKHBhdGgpIHsNCiAgICBjb25zdCBtYXRjaCA9IC8oXC98XFwpW15cL1xcXSokLy5leGVjKHBhdGgpOw0KICAgIGlmICghbWF0Y2gpDQogICAgICAgIHJldHVybiAiLiI7DQogICAgY29uc3QgZGlyID0gcGF0aC5zbGljZSgwLCAtbWF0Y2hbMF0ubGVuZ3RoKTsNCiAgICAvLyBJZiBgZGlyYCBpcyB0aGUgZW1wdHkgc3RyaW5nLCB3ZSdyZSBhdCByb290Lg0KICAgIHJldHVybiBkaXIgPyBkaXIgOiAiLyI7DQp9DQpmdW5jdGlvbiByZXNvbHZlKC4uLnBhdGhzKSB7DQogICAgbGV0IHJlc29sdmVkUGFydHMgPSBwYXRocy5zaGlmdCgpLnNwbGl0KC9bXC9cXF0vKTsNCiAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4gew0KICAgICAgICBpZiAoaXNBYnNvbHV0ZShwYXRoKSkgew0KICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cyA9IHBhdGguc3BsaXQoL1tcL1xcXS8pOw0KICAgICAgICB9DQogICAgICAgIGVsc2Ugew0KICAgICAgICAgICAgY29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KC9bXC9cXF0vKTsNCiAgICAgICAgICAgIHdoaWxlIChwYXJ0c1swXSA9PT0gIi4iIHx8IHBhcnRzWzBdID09PSAiLi4iKSB7DQogICAgICAgICAgICAgICAgY29uc3QgcGFydCA9IHBhcnRzLnNoaWZ0KCk7DQogICAgICAgICAgICAgICAgaWYgKHBhcnQgPT09ICIuLiIpIHsNCiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cy5wb3AoKTsNCiAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICB9DQogICAgICAgICAgICByZXNvbHZlZFBhcnRzLnB1c2guYXBwbHkocmVzb2x2ZWRQYXJ0cywgcGFydHMpOw0KICAgICAgICB9DQogICAgfSk7DQogICAgcmV0dXJuIG5vcm1hbGl6ZShyZXNvbHZlZFBhcnRzLmpvaW4oIi8iKSk7DQp9DQpmdW5jdGlvbiBub3JtYWxpemUocGF0aCkgew0KICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1wvXC8vZ2ksICIvIik7DQp9Cgpjb25zdCBUUkFOU1BJTEVfU1RBVFVTID0gew0KICAgIFBSRVBBUkVfRklMRVM6ICJUUkFOU1BJTEVSOkZJTEU6UFJFUEFSRSIsDQogICAgUFJFUEFSRV9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlBSRVBBUkUiLA0KICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogIlRSQU5TUElMRVI6QURESVRJT05BTDpUUkFOU1BJTEVEIiwNCiAgICBUUkFOU1BJTEVfQ09NUExFVEU6ICJUUkFOU1BJTEVSOlRSQU5TUElMRTpDT01QTEVURSIsDQogICAgRVJST1JfQ09NUElMRTogIlRSQU5TUElMRVI6RVJST1I6Q09NUElMRSIsDQogICAgRVJST1JfQURESVRJT05BTDogIlRSQU5TUElMRVI6RVJST1I6QURESVRJT05BTCINCn07CgpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vdW5wa2cuY29tL3Nhc3MuanNAbGF0ZXN0L2Rpc3Qvc2Fzcy5zeW5jLmpzIik7DQpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCAoeyBkYXRhIH0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgIGNvbnN0IHsgZmlsZSwgdHlwZSwgY29udGV4dCB9ID0gZGF0YTsNCiAgICBpZiAodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0ZJTEVTKSB7DQogICAgICAgIHRyeSB7DQogICAgICAgICAgICBzZXR1cFNhc3MoY29udGV4dCk7DQogICAgICAgICAgICBjb25zdCB0cmFuc3BpbGVkRmlsZSA9IHlpZWxkIHRyYW5zcGlsZUZpbGUoZmlsZSk7DQogICAgICAgICAgICAvLyBAdHMtaWdub3JlDQogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLlRSQU5TUElMRV9DT01QTEVURSwNCiAgICAgICAgICAgICAgICBmaWxlOiB0cmFuc3BpbGVkRmlsZQ0KICAgICAgICAgICAgfSk7DQogICAgICAgIH0NCiAgICAgICAgY2F0Y2ggKGVycm9yKSB7DQogICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlDQogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX0NPTVBJTEUsDQogICAgICAgICAgICAgICAgZXJyb3INCiAgICAgICAgICAgIH0pOw0KICAgICAgICB9DQogICAgfQ0KfSkpOw0KY29uc3Qgc2V0dXBTYXNzID0gKGNvbnRleHQpID0+IHsNCiAgICBjb25zdCBzYXNzRmlsZXMgPSBjb250ZXh0LmZpbGVzLmZpbHRlcigoZikgPT4gZi5wYXRoLmVuZHNXaXRoKCIuc2FzcyIpIHx8IGYucGF0aC5lbmRzV2l0aCgiLnNjc3MiKSk7DQogICAgU2Fzcy53cml0ZUZpbGUoc2Fzc0ZpbGVzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhY2MpLCB7IFtjdXJyLnBhdGhdOiBjdXJyLmNvZGUgfSkpLCB7fSkpOw0KICAgIGZvciAoY29uc3QgZmlsZSBvZiBzYXNzRmlsZXMpIHsNCiAgICAgICAgU2Fzcy5pbXBvcnRlcigocmVxdWVzdCwgZG9uZSkgPT4gaW1wb3J0ZXIoZmlsZSwgc2Fzc0ZpbGVzLCByZXF1ZXN0LCBkb25lKSk7DQogICAgfQ0KfTsNCmNvbnN0IGltcG9ydGVyID0gKGZpbGUsIHNhc3NGaWxlcywgcmVxdWVzdCwgZG9uZSkgPT4gew0KICAgIGNvbnN0IHBhdGggPSByZXNvbHZlKGRpcm5hbWUoZmlsZS5wYXRoKSwgcmVxdWVzdC5jdXJyZW50KTsNCiAgICBjb25zdCBwb3RlbnRpYWxQYXRocyA9IFNhc3MuZ2V0UGF0aFZhcmlhdGlvbnMocGF0aCk7DQogICAgY29uc3QgYWN0dWFsRmlsZSA9IHNhc3NGaWxlcy5maW5kKChmaWxlKSA9PiB+cG90ZW50aWFsUGF0aHMuaW5kZXhPZihmaWxlLnBhdGgpKTsNCiAgICBpZiAoYWN0dWFsRmlsZSAmJiBhY3R1YWxGaWxlLnBhdGgpIHsNCiAgICAgICAgcmV0dXJuIGRvbmUoew0KICAgICAgICAgICAgcGF0aDogYWN0dWFsRmlsZS5wYXRoLA0KICAgICAgICAgICAgY29udGVudHM6IGFjdHVhbEZpbGUuY29kZQ0KICAgICAgICB9KTsNCiAgICB9DQogICAgZWxzZSB7DQogICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGZpbGUgJHtyZXF1ZXN0LmN1cnJlbnR9IGRvZXMgbm90IGV4aXN0YCk7DQogICAgfQ0KfTsNCmNvbnN0IHRyYW5zcGlsZUZpbGUgPSAoZmlsZSkgPT4gew0KICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7DQogICAgICAgIFNhc3Mub3B0aW9ucyh7DQogICAgICAgICAgICBpbmRlbnRlZFN5bnRheDogZmlsZS5wYXRoLmVuZHNXaXRoKCIuc2FzcyIpIHx8IGZpbGUubGFuZyA9PT0gInNhc3MiDQogICAgICAgIH0pOw0KICAgICAgICBTYXNzLmNvbXBpbGUoZmlsZS5jb2RlLCAocmVzdWx0KSA9PiB7DQogICAgICAgICAgICBpZiAocmVzdWx0LmZvcm1hdHRlZCkgew0KICAgICAgICAgICAgICAgIHJlamVjdChyZXN1bHQuZm9ybWF0dGVkKTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIGVsc2Ugew0KICAgICAgICAgICAgICAgIHJlc29sdmUoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiByZXN1bHQudGV4dCwgbWFwOiByZXN1bHQubWFwIH0pKTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfSk7DQogICAgfSk7DQp9OwoK', null, false);
/* eslint-enable */class SassTranspiler extends Transpiler {
    constructor(context) {
        super("sass-transpiler", new WorkerFactory(), context);
        this.additionalTranspilers = {};
    }
    transpile(file) {
        return this.doTranspile(file);
    }
}const generateExport = (file, prependExportDefault = true) => {
    return (`${prependExportDefault ? "export default " : ""}function addStyles () {` +
        `const tag = document.createElement('style');` +
        `tag.type = 'text/css';` +
        `tag.appendChild(document.createTextNode(\`${file.code}\`));` +
        `tag.setAttribute('data-src', '${file.path}');` +
        `document.head.appendChild(tag);` +
        `} addStyles();`);
};class TransformationException extends Error {
    constructor(filePath, transformerName) {
        super(`Failed to transform ${filePath}${transformerName ? " in " + transformerName : ""}.`);
    }
}function sassTransformer(context) {
    const transformerName = "packager::transformer::sass-transformer";
    const isSass = verifyExtensions([".sass", ".scss"]);
    let transpiler;
    return {
        name: transformerName,
        transform(code, modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isSass(modulePath)) {
                    transpiler = context.cache.transpilers.get("sass-transpiler");
                    if (!transpiler) {
                        transpiler = new SassTranspiler(context);
                        context.cache.transpilers.set("sass-transpiler", transpiler);
                    }
                    const file = context.files.find(f => f.path === modulePath);
                    yield context.transpileQueue.push("Sass-Transpiler", () => transpiler.transpile(Object.assign(Object.assign({}, file), { code })));
                    const completed = context.transpileQueue.completed.find(c => c.path === modulePath);
                    if (completed) {
                        return {
                            code: generateExport(completed),
                            map: completed.map || { mappings: "" }
                        };
                    }
                    throw new TransformationException(modulePath, transformerName);
                }
            });
        }
    };
}/* eslint-disable */
const WorkerFactory$1 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0KCmNvbnN0IFRSQU5TUElMRV9TVEFUVVMgPSB7DQogICAgUFJFUEFSRV9GSUxFUzogIlRSQU5TUElMRVI6RklMRTpQUkVQQVJFIiwNCiAgICBQUkVQQVJFX0FERElUSU9OQUw6ICJUUkFOU1BJTEVSOkFERElUSU9OQUw6UFJFUEFSRSIsDQogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlRSQU5TUElMRUQiLA0KICAgIFRSQU5TUElMRV9DT01QTEVURTogIlRSQU5TUElMRVI6VFJBTlNQSUxFOkNPTVBMRVRFIiwNCiAgICBFUlJPUl9DT01QSUxFOiAiVFJBTlNQSUxFUjpFUlJPUjpDT01QSUxFIiwNCiAgICBFUlJPUl9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpFUlJPUjpBRERJVElPTkFMIg0KfTsKCnNlbGYuaW1wb3J0U2NyaXB0cygiaHR0cHM6Ly91bnBrZy5jb20vQGJsb3h5L2lpZmUtbGlic0BsYXRlc3QvbGlicy9zdHlsdXMuanMiKTsNCnNlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsICh7IGRhdGEgfSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7DQogICAgY29uc3QgeyBmaWxlLCB0eXBlLCBjb250ZXh0IH0gPSBkYXRhOw0KICAgIGlmICh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLlBSRVBBUkVfRklMRVMpIHsNCiAgICAgICAgdHJ5IHsNCiAgICAgICAgICAgIGNvbnN0IHRyYW5zcGlsZWRGaWxlID0geWllbGQgdHJhbnNwaWxlRmlsZShmaWxlKTsNCiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUNCiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoew0KICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLA0KICAgICAgICAgICAgICAgIGZpbGU6IHRyYW5zcGlsZWRGaWxlDQogICAgICAgICAgICB9KTsNCiAgICAgICAgfQ0KICAgICAgICBjYXRjaCAoZXJyb3IpIHsNCiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUNCiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoew0KICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuRVJST1JfQ09NUElMRSwNCiAgICAgICAgICAgICAgICBlcnJvcg0KICAgICAgICAgICAgfSk7DQogICAgICAgIH0NCiAgICB9DQp9KSk7DQpjb25zdCB0cmFuc3BpbGVGaWxlID0gKGZpbGUpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsNCiAgICBzdHlsdXMoZmlsZS5jb2RlKQ0KICAgICAgICAuc2V0KCJmaWxlbmFtZSIsIGZpbGUucGF0aCkNCiAgICAgICAgLnJlbmRlcigoZXJyLCBjc3MpID0+IHsNCiAgICAgICAgaWYgKGVycikgew0KICAgICAgICAgICAgcmVqZWN0KGVycik7DQogICAgICAgIH0NCiAgICAgICAgZWxzZSB7DQogICAgICAgICAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZmlsZSksIHsgY29kZTogY3NzIH0pKTsNCiAgICAgICAgfQ0KICAgIH0pOw0KfSk7Cgo=', null, false);
/* eslint-enable */class StylusTranspiler extends Transpiler {
    constructor(context) {
        super("stylus-transpiler", new WorkerFactory$1(), context);
        this.additionalTranspilers = {};
    }
    transpile(file) {
        return this.doTranspile(file);
    }
}function stylusTransformer(context) {
    const transformerName = "packager::transformer::stylus-transformer";
    const isStylus = verifyExtensions([".styl", ".stylus"]);
    let transpiler;
    return {
        name: transformerName,
        transform(code, modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isStylus(modulePath)) {
                    transpiler = context.cache.transpilers.get("stylus-transpiler");
                    if (!transpiler) {
                        transpiler = new StylusTranspiler(context);
                        context.cache.transpilers.set("stylus-transpiler", transpiler);
                    }
                    const file = context.files.find(f => f.path === modulePath);
                    yield context.transpileQueue.push("Stylus-Transpiler", () => transpiler.transpile(Object.assign(Object.assign({}, file), { code })));
                    const completed = context.transpileQueue.completed.find(c => c.path === modulePath);
                    if (completed) {
                        return {
                            code: generateExport(completed),
                            map: completed.map || { mappings: "" }
                        };
                    }
                    throw new TransformationException(modulePath, transformerName);
                }
            });
        }
    };
}/* eslint-disable */
const WorkerFactory$2 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0KCmNvbnN0IGFic29sdXRlUGF0aCA9IC9eKD86XC98KD86W0EtWmEtel06KT9bXFx8XC9dKS87DQpmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGgpIHsNCiAgICByZXR1cm4gYWJzb2x1dGVQYXRoLnRlc3QocGF0aCk7DQp9DQpmdW5jdGlvbiByZXNvbHZlKC4uLnBhdGhzKSB7DQogICAgbGV0IHJlc29sdmVkUGFydHMgPSBwYXRocy5zaGlmdCgpLnNwbGl0KC9bXC9cXF0vKTsNCiAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4gew0KICAgICAgICBpZiAoaXNBYnNvbHV0ZShwYXRoKSkgew0KICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cyA9IHBhdGguc3BsaXQoL1tcL1xcXS8pOw0KICAgICAgICB9DQogICAgICAgIGVsc2Ugew0KICAgICAgICAgICAgY29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KC9bXC9cXF0vKTsNCiAgICAgICAgICAgIHdoaWxlIChwYXJ0c1swXSA9PT0gIi4iIHx8IHBhcnRzWzBdID09PSAiLi4iKSB7DQogICAgICAgICAgICAgICAgY29uc3QgcGFydCA9IHBhcnRzLnNoaWZ0KCk7DQogICAgICAgICAgICAgICAgaWYgKHBhcnQgPT09ICIuLiIpIHsNCiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cy5wb3AoKTsNCiAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICB9DQogICAgICAgICAgICByZXNvbHZlZFBhcnRzLnB1c2guYXBwbHkocmVzb2x2ZWRQYXJ0cywgcGFydHMpOw0KICAgICAgICB9DQogICAgfSk7DQogICAgcmV0dXJuIG5vcm1hbGl6ZShyZXNvbHZlZFBhcnRzLmpvaW4oIi8iKSk7DQp9DQpmdW5jdGlvbiBub3JtYWxpemUocGF0aCkgew0KICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1wvXC8vZ2ksICIvIik7DQp9Cgpjb25zdCBUUkFOU1BJTEVfU1RBVFVTID0gew0KICAgIFBSRVBBUkVfRklMRVM6ICJUUkFOU1BJTEVSOkZJTEU6UFJFUEFSRSIsDQogICAgUFJFUEFSRV9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlBSRVBBUkUiLA0KICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogIlRSQU5TUElMRVI6QURESVRJT05BTDpUUkFOU1BJTEVEIiwNCiAgICBUUkFOU1BJTEVfQ09NUExFVEU6ICJUUkFOU1BJTEVSOlRSQU5TUElMRTpDT01QTEVURSIsDQogICAgRVJST1JfQ09NUElMRTogIlRSQU5TUElMRVI6RVJST1I6Q09NUElMRSIsDQogICAgRVJST1JfQURESVRJT05BTDogIlRSQU5TUElMRVI6RVJST1I6QURESVRJT05BTCINCn07CgovLyBAdHMtaWdub3JlDQpzZWxmLndpbmRvdyA9IHNlbGY7DQovLyBAdHMtaWdub3JlDQpzZWxmLndpbmRvdy5kb2N1bWVudCA9IHsNCiAgICBjdXJyZW50U2NyaXB0OiB7IGFzeW5jOiB0cnVlIH0sDQogICAgY3JlYXRlRWxlbWVudDogKCkgPT4gKHsgYXBwZW5kQ2hpbGQ6ICgpID0+IHsgfSB9KSwNCiAgICBjcmVhdGVUZXh0Tm9kZTogKCkgPT4gKHt9KSwNCiAgICBnZXRFbGVtZW50c0J5VGFnTmFtZTogKCkgPT4gW10sDQogICAgaGVhZDogeyBhcHBlbmRDaGlsZDogKCkgPT4geyB9LCByZW1vdmVDaGlsZDogKCkgPT4geyB9IH0NCn07DQpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbGVzcyIpOw0Kc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgKHsgZGF0YSB9KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsNCiAgICBjb25zdCB7IGZpbGUsIHR5cGUsIGNvbnRleHQgfSA9IGRhdGE7DQogICAgaWYgKHR5cGUgPT09IFRSQU5TUElMRV9TVEFUVVMuUFJFUEFSRV9GSUxFUykgew0KICAgICAgICB0cnkgew0KICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsNCiAgICAgICAgICAgICAgICBwbHVnaW5zOiBbbWFuYWdlcihjb250ZXh0LCBmaWxlLnBhdGgpXSwNCiAgICAgICAgICAgICAgICByZWxhdGl2ZVVybHM6IHRydWUsDQogICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGUucGF0aA0KICAgICAgICAgICAgfTsNCiAgICAgICAgICAgIGNvbnN0IHRyYW5zcGlsZWRGaWxlID0geWllbGQgdHJhbnNwaWxlRmlsZShmaWxlLCBvcHRpb25zKTsNCiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUNCiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoew0KICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLA0KICAgICAgICAgICAgICAgIGZpbGU6IHRyYW5zcGlsZWRGaWxlDQogICAgICAgICAgICB9KTsNCiAgICAgICAgfQ0KICAgICAgICBjYXRjaCAoZXJyb3IpIHsNCiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUNCiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoew0KICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuRVJST1JfQ09NUElMRSwNCiAgICAgICAgICAgICAgICBlcnJvcg0KICAgICAgICAgICAgfSk7DQogICAgICAgIH0NCiAgICB9DQp9KSk7DQpjb25zdCB0cmFuc3BpbGVGaWxlID0gKGZpbGUsIG9wdGlvbnMpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsNCiAgICBsZXNzLnJlbmRlcihmaWxlLmNvZGUsIG9wdGlvbnMsIChlcnIsIGRhdGEpID0+IHsNCiAgICAgICAgaWYgKGVycikgew0KICAgICAgICAgICAgcmVqZWN0KGVycik7DQogICAgICAgIH0NCiAgICAgICAgZWxzZSB7DQogICAgICAgICAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZmlsZSksIHsgY29kZTogZGF0YS5jc3MgfSkpOw0KICAgICAgICB9DQogICAgfSk7DQp9KTsNCmNvbnN0IG1hbmFnZXIgPSAoY29udGV4dCwgcGFyZW50UGF0aCkgPT4gew0KICAgIGNvbnN0IGxlc3NNYW5hZ2VyID0gbmV3IGxlc3MuRmlsZU1hbmFnZXIoKTsNCiAgICBsZXNzTWFuYWdlci5sb2FkRmlsZSA9IChmaWxlbmFtZSwgY3VycmVudERpcmVjdG9yeSkgPT4gew0KICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUkMSwgcmVqZWN0KSA9PiB7DQogICAgICAgICAgICB0cnkgew0KICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHJlc29sdmUoY3VycmVudERpcmVjdG9yeSwgZmlsZW5hbWUpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kRmlsZSA9IGNvbnRleHQuZmlsZXMuZmluZChmaWxlID0+IGZpbGUucGF0aCA9PT0gcmVsYXRpdmVQYXRoKTsNCiAgICAgICAgICAgICAgICBpZiAoZm91bmRGaWxlKSB7DQogICAgICAgICAgICAgICAgICAgIHJlc29sdmUkMSh7IGNvbnRlbnRzOiBmb3VuZEZpbGUuY29kZSwgZmlsZW5hbWUgfSk7DQogICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgICAgIGVsc2Ugew0KICAgICAgICAgICAgICAgICAgICBjb25zdCByZXRyaWVkRmlsZSA9IHJldHJ5RmlsZXMocmVsYXRpdmVQYXRoLCBjb250ZXh0KTsNCiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHJpZWRGaWxlKSB7DQogICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlJDEoeyBjb250ZW50czogcmV0cmllZEZpbGUuY29kZSwgZmlsZW5hbWUgfSk7DQogICAgICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICAgICAgZWxzZSB7DQogICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBsb2FkICR7ZmlsZW5hbWV9IGZyb20gJHtwYXJlbnRQYXRofWApOw0KICAgICAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgfQ0KICAgICAgICAgICAgY2F0Y2ggKGUpIHsNCiAgICAgICAgICAgICAgICByZWplY3QoZSk7DQogICAgICAgICAgICB9DQogICAgICAgIH0pOw0KICAgIH07DQogICAgcmV0dXJuIHsNCiAgICAgICAgaW5zdGFsbChpbnN0YW5jZSwgcGx1Z2luTWFuYWdlcikgew0KICAgICAgICAgICAgcGx1Z2luTWFuYWdlci5hZGRGaWxlTWFuYWdlcihsZXNzTWFuYWdlcik7DQogICAgICAgIH0NCiAgICB9Ow0KfTsNCmNvbnN0IHJldHJ5RmlsZXMgPSAocGF0aCwgY29udGV4dCkgPT4gY29udGV4dC5maWxlcy5maW5kKGZpbGUgPT4gZmlsZS5wYXRoID09PSBwYXRoIHx8DQogICAgZmlsZS5wYXRoID09PSBgJHtwYXRofS5sZXNzYCB8fA0KICAgIGZpbGUucGF0aCA9PT0gYCR7cGF0aH0uY3NzYCk7Cgo=', null, false);
/* eslint-enable */class LessTranspiler extends Transpiler {
    constructor(context) {
        super("less-transpiler", new WorkerFactory$2(), context);
        this.additionalTranspilers = {};
    }
    transpile(file) {
        return this.doTranspile(file);
    }
}function lessTransformer(context) {
    const transformerName = "packager::transformer::less-transformer";
    const isLess = verifyExtensions([".less"]);
    let transpiler;
    return {
        name: transformerName,
        transform(code, modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isLess(modulePath)) {
                    transpiler = context.cache.transpilers.get("less-transpiler");
                    if (!transpiler) {
                        transpiler = new LessTranspiler(context);
                        context.cache.transpilers.set("less-transpiler", transpiler);
                    }
                    const file = context.files.find(f => f.path === modulePath);
                    yield context.transpileQueue.push("Less-Transpiler", () => transpiler.transpile(Object.assign(Object.assign({}, file), { code })));
                    const completed = context.transpileQueue.completed.find(c => c.path === modulePath);
                    if (completed) {
                        return {
                            code: generateExport(completed),
                            map: completed.map || { mappings: "" }
                        };
                    }
                    throw new TransformationException(modulePath, transformerName);
                }
            });
        }
    };
}/* eslint-disable */
const WorkerFactory$3 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0KCmNvbnN0IGdlbmVyYXRlRXhwb3J0ID0gKGZpbGUsIHByZXBlbmRFeHBvcnREZWZhdWx0ID0gdHJ1ZSkgPT4gew0KICAgIHJldHVybiAoYCR7cHJlcGVuZEV4cG9ydERlZmF1bHQgPyAiZXhwb3J0IGRlZmF1bHQgIiA6ICIifWZ1bmN0aW9uIGFkZFN0eWxlcyAoKSB7YCArDQogICAgICAgIGBjb25zdCB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO2AgKw0KICAgICAgICBgdGFnLnR5cGUgPSAndGV4dC9jc3MnO2AgKw0KICAgICAgICBgdGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFxgJHtmaWxlLmNvZGV9XGApKTtgICsNCiAgICAgICAgYHRhZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJyR7ZmlsZS5wYXRofScpO2AgKw0KICAgICAgICBgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWcpO2AgKw0KICAgICAgICBgfSBhZGRTdHlsZXMoKTtgKTsNCn07DQpjb25zdCBnZW5lcmF0ZUV4cG9ydHNGb3JBbGxTdHlsZXMgPSAoc3R5bGVzLCBmaWxlUGF0aCkgPT4gZ2VuZXJhdGVFeHBvcnQoeyBwYXRoOiBmaWxlUGF0aCwgY29kZTogc3R5bGVzLmpvaW4oIlxuXG4iKSB9LCBmYWxzZSk7Cgpjb25zdCBUUkFOU1BJTEVfU1RBVFVTID0gew0KICAgIFBSRVBBUkVfRklMRVM6ICJUUkFOU1BJTEVSOkZJTEU6UFJFUEFSRSIsDQogICAgUFJFUEFSRV9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlBSRVBBUkUiLA0KICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogIlRSQU5TUElMRVI6QURESVRJT05BTDpUUkFOU1BJTEVEIiwNCiAgICBUUkFOU1BJTEVfQ09NUExFVEU6ICJUUkFOU1BJTEVSOlRSQU5TUElMRTpDT01QTEVURSIsDQogICAgRVJST1JfQ09NUElMRTogIlRSQU5TUElMRVI6RVJST1I6Q09NUElMRSIsDQogICAgRVJST1JfQURESVRJT05BTDogIlRSQU5TUElMRVI6RVJST1I6QURESVRJT05BTCINCn07CgovKioNCiAqIEB0b2RvIEZpeCBzb3VyY2VtYXBzIGJlY2F1c2UgdGhleSdyZSBpbmFjY3VyYXRlLg0KICovDQpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vdW5wa2cuY29tL3NvdXJjZS1tYXAvZGlzdC9zb3VyY2UtbWFwLmpzIik7DQpjb25zdCBnZW5lcmF0ZVNvdXJjZU1hcCQxID0gKGZpbGVQYXRoLCBvcmlnaW5hbENvZGUsIGdlbmVyYXRlZENvZGUpID0+IHsNCiAgICAvLyBAdHMtaWdub3JlDQogICAgY29uc3QgbWFwID0gbmV3IHNlbGYuc291cmNlTWFwLlNvdXJjZU1hcEdlbmVyYXRvcih7IGZpbGU6IGZpbGVQYXRoIH0pOw0KICAgIG1hcC5zZXRTb3VyY2VDb250ZW50KGZpbGVQYXRoLCBvcmlnaW5hbENvZGUpOw0KICAgIGdlbmVyYXRlZENvZGUuc3BsaXQoL1xyP1xuL2cpLmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7DQogICAgICAgIGlmIChsaW5lKSB7DQogICAgICAgICAgICBtYXAuYWRkTWFwcGluZyh7DQogICAgICAgICAgICAgICAgc291cmNlOiBmaWxlUGF0aCwNCiAgICAgICAgICAgICAgICBvcmlnaW5hbDogeyBsaW5lOiBpbmRleCArIDEsIGNvbHVtbjogMCB9LA0KICAgICAgICAgICAgICAgIGdlbmVyYXRlZDogeyBsaW5lOiBpbmRleCArIDEsIGNvbHVtbjogMCB9DQogICAgICAgICAgICB9KTsNCiAgICAgICAgfQ0KICAgIH0pOw0KICAgIHJldHVybiBtYXAudG9KU09OKCk7DQp9Ow0KLy8gQHRzLWlnbm9yZQ0Kc2VsZi5nZW5lcmF0ZVNvdXJjZU1hcCA9IGdlbmVyYXRlU291cmNlTWFwJDE7CgpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vdW5wa2cuY29tL3Z1ZS10ZW1wbGF0ZS1jb21waWxlci9icm93c2VyLmpzIiwgImh0dHBzOi8vdW5wa2cuY29tL2hhc2gtc3VtLWJyb3dzZXIvZGlzdC9pbmRleC5taW4uanMiLCAiaHR0cHM6Ly91bnBrZy5jb20vQGJsb3h5L2lpZmUtbGlic0BsYXRlc3QvbGlicy9idWJsZS5qcyIsICJodHRwczovL3VucGtnLmNvbS9AYmxveHkvaWlmZS1saWJzQGxhdGVzdC9saWJzL2Nzcy5qcyIsICJodHRwczovL3VucGtnLmNvbS9AYmxveHkvaWlmZS1saWJzQGxhdGVzdC9saWJzL3Bvc3Rjc3Mtc2VsZWN0b3ItcGFyc2VyLmpzIik7DQpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCAoeyBkYXRhIH0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgIGNvbnN0IHsgZmlsZSwgdHlwZSwgYWRkaXRpb25hbCB9ID0gZGF0YTsNCiAgICBpZiAodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0ZJTEVTKSB7DQogICAgICAgIHRyeSB7DQogICAgICAgICAgICBpZiAoIWZpbGUgfHwgIWZpbGUucGF0aCkNCiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkZpbGUgaXNuJ3Qgc3VwcGxpZWQgb3IgaXQgaGFzIGFuIGluY29ycmVjdCBmb3JtYXQuIik7DQogICAgICAgICAgICBjb25zdCB7IHN0eWxlcywgc2NyaXB0LCBodG1sIH0gPSBwcmVwYXJlRmlsZUFuZENvbXBpbGVUZW1wbGF0ZShmaWxlKTsNCiAgICAgICAgICAgIGlmICgoc3R5bGVzIHx8IGh0bWwpICYmIChzdHlsZXMubGVuZ3RoIHx8IGh0bWwubGVuZ3RoKSkgew0KICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWwgPSB7IHN0eWxlcywgaHRtbCB9Ow0KICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUNCiAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0FERElUSU9OQUwsDQogICAgICAgICAgICAgICAgICAgIGZpbGU6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZmlsZSksIHsgY29kZTogc2NyaXB0IH0pLA0KICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsDQogICAgICAgICAgICAgICAgfSk7DQogICAgICAgICAgICB9DQogICAgICAgICAgICBlbHNlIHsNCiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlDQogICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7DQogICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLA0KICAgICAgICAgICAgICAgICAgICBmaWxlOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGU6IHNjcmlwdCwgbWFwOiBnZW5lcmF0ZVNvdXJjZU1hcChmaWxlLnBhdGgsIGZpbGUuY29kZSwgc2NyaXB0KSB9KQ0KICAgICAgICAgICAgICAgIH0pOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgICAgIGNhdGNoIChlcnJvcikgew0KICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQ0KICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7DQogICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9DT01QSUxFLA0KICAgICAgICAgICAgICAgIGVycm9yDQogICAgICAgICAgICB9KTsNCiAgICAgICAgfQ0KICAgICAgICByZXR1cm47DQogICAgfQ0KICAgIGlmICh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLkFERElUSU9OQUxfVFJBTlNQSUxFRCkgew0KICAgICAgICBsZXQgY29kZSA9IGZpbGUuY29kZTsNCiAgICAgICAgaWYgKGFkZGl0aW9uYWwpIHsNCiAgICAgICAgICAgIHRyeSB7DQogICAgICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSBzdHlsZSBpbmplY3RvciBoZXJlDQogICAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5nIHdpdGggaHRtbCBzdHVmZiBoZXJlIGxpa2UgdnVlIHB1Zy4gYnV0IGxhdGVyLg0KICAgICAgICAgICAgICAgIC8vIGNvZGUgKyBzdHlsZXMNCiAgICAgICAgICAgICAgICBjb2RlICs9IGFwcGVuZFN0eWxlcyhhZGRpdGlvbmFsLnN0eWxlcywgZmlsZS5wYXRoKTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIGNhdGNoIChlcnJvcikgew0KICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUNCiAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9BRERJVElPTkFMLA0KICAgICAgICAgICAgICAgICAgICBlcnJvcg0KICAgICAgICAgICAgICAgIH0pOw0KICAgICAgICAgICAgICAgIHJldHVybjsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfQ0KICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlDQogICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoew0KICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5UUkFOU1BJTEVfQ09NUExFVEUsDQogICAgICAgICAgICBmaWxlOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGUsIG1hcDogZ2VuZXJhdGVTb3VyY2VNYXAoZmlsZS5wYXRoLCBmaWxlLmNvZGUsIGNvZGUpIH0pDQogICAgICAgIH0pOw0KICAgICAgICByZXR1cm47DQogICAgfQ0KfSkpOw0KY29uc3QgcHJlcGFyZUZpbGVBbmRDb21waWxlVGVtcGxhdGUgPSAoZmlsZSkgPT4gew0KICAgIGNvbnN0IHsgdGVtcGxhdGUsIHNjcmlwdCwgc3R5bGVzIH0gPSBWdWVUZW1wbGF0ZUNvbXBpbGVyLnBhcnNlQ29tcG9uZW50KGZpbGUuY29kZSwgeyBwYWQ6ICJsaW5lIiB9KTsNCiAgICBjb25zdCBzY29wZUlkID0gYGRhdGEtdi0ke2hhc2hTdW0oZmlsZS5wYXRoKX1gOw0KICAgIGNvbnN0IHNjb3BlZCA9IHN0eWxlcy5zb21lKChzdHlsZSkgPT4gc3R5bGUuc2NvcGVkID09PSB0cnVlKTsNCiAgICByZXR1cm4gew0KICAgICAgICBzdHlsZXM6IHByZXBhcmVTdHlsZXMoc3R5bGVzLCBzY29wZWQgPyBzY29wZUlkIDogbnVsbCwgZmlsZSksDQogICAgICAgIGh0bWw6IFtdLA0KICAgICAgICBzY3JpcHQ6IGNvbXBpbGVUZW1wbGF0ZShzY3JpcHQuY29udGVudCwgdGVtcGxhdGUsIHNjb3BlSWQsIHNjb3BlZCkNCiAgICB9Ow0KfTsNCmNvbnN0IHByZXBhcmVTdHlsZXMgPSAoc3R5bGVzID0gW10sIHNjb3BlSWQsIGZpbGUpID0+IHN0eWxlcy5tYXAoc3R5bGUgPT4gKHsNCiAgICBjb2RlOiBzdHlsZS5jb250ZW50LA0KICAgIGxhbmc6IHN0eWxlLmxhbmcgfHwgImNzcyIsDQogICAgc2NvcGVJZDogc3R5bGUuc2NvcGVkID8gc2NvcGVJZCA6IG51bGwsDQogICAgcGF0aDogZmlsZS5wYXRoDQp9KSk7DQpjb25zdCBhcHBlbmRTdHlsZXMgPSAoc3R5bGVzLCBmaWxlUGF0aCkgPT4gew0KICAgIGNvbnN0IHBhcnNlZFN0eWxlcyA9IFtdOw0KICAgIGZvciAoY29uc3Qgc3R5bGUgb2Ygc3R5bGVzKSB7DQogICAgICAgIHBhcnNlZFN0eWxlcy5wdXNoKHBhcnNlQ3NzU3R5bGUoc3R5bGUuY29kZSwgc3R5bGUuc2NvcGVJZCkpOw0KICAgIH0NCiAgICByZXR1cm4gZ2VuZXJhdGVFeHBvcnRzRm9yQWxsU3R5bGVzKHBhcnNlZFN0eWxlcywgZmlsZVBhdGgpOw0KfTsNCmNvbnN0IHBhcnNlQ3NzU3R5bGUgPSAoY29kZSwgc2NvcGVJZCA9ICIiKSA9PiB7DQogICAgY29uc3QgcGFyc2VkID0gY3NzLnBhcnNlKGNvZGUpOw0KICAgIHJldHVybiBjc3Muc3RyaW5naWZ5KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyc2VkKSwgeyBzdHlsZXNoZWV0OiBhcHBseUF0dHJpYnV0ZVRvU2VsZWN0b3IocGFyc2VkLnN0eWxlc2hlZXQsIHNjb3BlSWQpIH0pKTsNCn07DQpjb25zdCBhcHBseUF0dHJpYnV0ZVRvU2VsZWN0b3IgPSAodHJlZSwgc2NvcGVJZCkgPT4gew0KICAgIGlmICgic2VsZWN0b3JzIiBpbiB0cmVlKSB7DQogICAgICAgIGZvciAoY29uc3QgaSBpbiB0cmVlLnNlbGVjdG9ycykgew0KICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0cmVlLnNlbGVjdG9yc1tpXTsNCiAgICAgICAgICAgIHRyZWUuc2VsZWN0b3JzW2ldID0gcG9zdGNzc1NlbGVjdG9yUGFyc2VyKChzZWxlY3RvcnMpID0+IHsNCiAgICAgICAgICAgICAgICBzZWxlY3RvcnMuZWFjaCgoc2VsZWN0b3IpID0+IHsNCiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBudWxsOw0KICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvci5lYWNoKChuKSA9PiB7DQogICAgICAgICAgICAgICAgICAgICAgICBpZiAobi50eXBlICE9PSAicHNldWRvIikNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbjsNCiAgICAgICAgICAgICAgICAgICAgfSk7DQogICAgICAgICAgICAgICAgICAgIGlmIChzY29wZUlkICYmIHNjb3BlSWQgIT0gIiIpIHsNCiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLmluc2VydEFmdGVyKG5vZGUsIHBvc3Rjc3NTZWxlY3RvclBhcnNlci5hdHRyaWJ1dGUoew0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogc2NvcGVJZA0KICAgICAgICAgICAgICAgICAgICAgICAgfSkpOw0KICAgICAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICAgICAgfSk7DQogICAgICAgICAgICB9KS5wcm9jZXNzU3luYyhzZWxlY3Rvcik7DQogICAgICAgIH0NCiAgICB9DQogICAgaWYgKCJydWxlcyIgaW4gdHJlZSkgew0KICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdHJlZS5ydWxlcykgew0KICAgICAgICAgICAgY29uc3QgcnVsZSA9IHRyZWUucnVsZXNbaV07DQogICAgICAgICAgICB0cmVlLnJ1bGVzW2ldID0gYXBwbHlBdHRyaWJ1dGVUb1NlbGVjdG9yKHJ1bGUsIHNjb3BlSWQpOw0KICAgICAgICB9DQogICAgfQ0KICAgIHJldHVybiB0cmVlOw0KfTsNCi8qKg0KICogQ29tcGlsZWQgdGhlIHRlbXBsYXRlIHVzaW5nIHZ1ZS10ZW1wbGF0ZS1jb21waWxlcg0KICogYW5kIGNyZWF0ZXMgYW4gb2JqZWN0IGxhdGVyIHRvIGJlIHVzZWQgYnkgU3lzdGVtSlMgdG8gcmVuZGVyDQogKiB0aGUgdGVtcGxhdGUuDQogKi8NCmNvbnN0IGNvbXBpbGVUZW1wbGF0ZSA9IChjb250ZW50LCB0ZW1wbGF0ZSwgc2NvcGVJZCwgc2NvcGVkKSA9PiB7DQogICAgY29uc3QgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9ID0gVnVlVGVtcGxhdGVDb21waWxlci5jb21waWxlVG9GdW5jdGlvbnModGVtcGxhdGUuY29udGVudCk7DQogICAgY29udGVudCA9IGluc2VydFRlbXBsYXRlSW5FeHBvcnQoY29udGVudCwgdGVtcGxhdGUuY29udGVudCwgc2NvcGVJZCwgc2NvcGVkKTsNCiAgICByZXR1cm4gYHZhciBfX3JlbmRlckZuc19fID0geyAKICAgICAgICByZW5kZXI6ICR7dG9GbihyZW5kZXIpfSwKICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IFsKICAgICAgICAgICAgJHtzdGF0aWNSZW5kZXJGbnMubWFwKHRvRm4pLmpvaW4oIiwiKX0KICAgICAgICBdIAogICAgfTsgJHtjb250ZW50fWA7DQp9Ow0KLyoqDQogKiBUcmFuc2Zvcm0gdGhlIGdpdmVuIGNvZGUgd2l0aCBidWJsZQ0KICogYW5kIHB1dCBpdCBpbnRvIGEgcmVuZGVyIGZ1bmN0aW9uIGZvciBsYXRlciB1c2UuDQogKg0KICogU29tZSB3ZWlyZCBzdHVmZiBhdCB0aGUgZW5kIG9mIHRoaXMgZnVuY3Rpb24gYnV0DQogKiB0aGF0J3MgYmVjYXVzZSB0aGUgYnVibGUudHJhbnNmb3JtIHJldHVybnMgYW4NCiAqIGFub255bW91cyBmdW5jdGlvbiB3aGljaCBtZXNzZXMgdXAgdGhlIHJlbmRlci4NCiAqIFNvIHdlIGFyZSBlc3NlbnRpYWxseSByZW1vdmluZyB0aGF0IGZ1bmN0aW9uIDopDQogKiBAdG9kbyBmaW5kIGEgYmV0dGVyIHdheSBmb3IgdGhpcy4gdGhpcyBpcyBob3JyaWJsZS4NCiAqLw0KY29uc3QgdG9GbiA9IChjb2RlKSA9PiBidWJsZQ0KICAgIC50cmFuc2Zvcm0oYGZ1bmN0aW9uIHJlbmRlciAoKSB7ICR7Y29kZX0gfWAsIHsNCiAgICBvYmplY3RBc3NpZ246ICJPYmplY3QuYXNzaWduIiwNCiAgICB0cmFuc2Zvcm1zOiB7DQogICAgICAgIHN0cmlwV2l0aDogdHJ1ZSwNCiAgICAgICAgc3RyaXBXaXRoRnVuY3Rpb25hbDogZmFsc2UNCiAgICB9DQp9KQ0KICAgIC5jb2RlLnJlcGxhY2UoYGZ1bmN0aW9uIGFub255bW91cygKKSB7YCwgIiIpDQogICAgLnNsaWNlKDAsIC0xKTsNCi8qKg0KICogRmluZCB3aGVyZSB0aGUgZXhwb3J0IGRlZmF1bHQgaXMgaW4gdGhlIGNvZGUNCiAqIGFuZCBpbnNlcnQgdGhlIHRlbXBsYXRlIHByb3BlcnR5IHdpdGggY29udGVudC4NCiAqLw0KY29uc3QgaW5zZXJ0VGVtcGxhdGVJbkV4cG9ydCA9IChjb250ZW50LCB0ZW1wbGF0ZSwgc2NvcGVJZCwgc2NvcGVkID0gZmFsc2UpID0+IHsNCiAgICBjb25zdCBleHBvcnRSZWdleCA9IC9eZXhwb3J0IGRlZmF1bHQuKi9nbTsNCiAgICBpZiAoZXhwb3J0UmVnZXgudGVzdChjb250ZW50KSkgew0KICAgICAgICBjb25zdCBpbnNpZGVFeHBvcnQgPSAvXHsoLiopXH0vZ21zLmV4ZWMoY29udGVudCk7DQogICAgICAgIGNvbnN0IF90ZW1wbGF0ZSA9ICJgIiArIHRlbXBsYXRlICsgImAiOw0KICAgICAgICBjb250ZW50ID0gYGV4cG9ydCBkZWZhdWx0IHsKICAgICAgICAgICAgdGVtcGxhdGU6ICR7X3RlbXBsYXRlfSwKICAgICAgICAgICAgcmVuZGVyOiBfX3JlbmRlckZuc19fLnJlbmRlciwKICAgICAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBfX3JlbmRlckZuc19fLnN0YXRpY1JlbmRlckZucywgCiAgICAgICAgICAgICR7c2NvcGVkID8gYF9zY29wZUlkOiJgICsgc2NvcGVJZCArIGAiLGAgOiAiIn0KICAgICAgICAgICAgJHtpbnNpZGVFeHBvcnQgJiYgaW5zaWRlRXhwb3J0Lmxlbmd0aCA/IGluc2lkZUV4cG9ydFsxXSA6ICIifSB9OyBgOw0KICAgIH0NCiAgICByZXR1cm4gY29udGVudDsNCn07Cgo=', null, false);
/* eslint-enable *//* eslint-disable */
const WorkerFactory$4 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0KCmNvbnN0IFRSQU5TUElMRV9TVEFUVVMgPSB7DQogICAgUFJFUEFSRV9GSUxFUzogIlRSQU5TUElMRVI6RklMRTpQUkVQQVJFIiwNCiAgICBQUkVQQVJFX0FERElUSU9OQUw6ICJUUkFOU1BJTEVSOkFERElUSU9OQUw6UFJFUEFSRSIsDQogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlRSQU5TUElMRUQiLA0KICAgIFRSQU5TUElMRV9DT01QTEVURTogIlRSQU5TUElMRVI6VFJBTlNQSUxFOkNPTVBMRVRFIiwNCiAgICBFUlJPUl9DT01QSUxFOiAiVFJBTlNQSUxFUjpFUlJPUjpDT01QSUxFIiwNCiAgICBFUlJPUl9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpFUlJPUjpBRERJVElPTkFMIg0KfTsKCmNvbnN0IGFic29sdXRlUGF0aCA9IC9eKD86XC98KD86W0EtWmEtel06KT9bXFx8XC9dKS87DQpmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGgpIHsNCiAgICByZXR1cm4gYWJzb2x1dGVQYXRoLnRlc3QocGF0aCk7DQp9DQpmdW5jdGlvbiBkaXJuYW1lKHBhdGgpIHsNCiAgICBjb25zdCBtYXRjaCA9IC8oXC98XFwpW15cL1xcXSokLy5leGVjKHBhdGgpOw0KICAgIGlmICghbWF0Y2gpDQogICAgICAgIHJldHVybiAiLiI7DQogICAgY29uc3QgZGlyID0gcGF0aC5zbGljZSgwLCAtbWF0Y2hbMF0ubGVuZ3RoKTsNCiAgICAvLyBJZiBgZGlyYCBpcyB0aGUgZW1wdHkgc3RyaW5nLCB3ZSdyZSBhdCByb290Lg0KICAgIHJldHVybiBkaXIgPyBkaXIgOiAiLyI7DQp9DQpmdW5jdGlvbiByZXNvbHZlKC4uLnBhdGhzKSB7DQogICAgbGV0IHJlc29sdmVkUGFydHMgPSBwYXRocy5zaGlmdCgpLnNwbGl0KC9bXC9cXF0vKTsNCiAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4gew0KICAgICAgICBpZiAoaXNBYnNvbHV0ZShwYXRoKSkgew0KICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cyA9IHBhdGguc3BsaXQoL1tcL1xcXS8pOw0KICAgICAgICB9DQogICAgICAgIGVsc2Ugew0KICAgICAgICAgICAgY29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KC9bXC9cXF0vKTsNCiAgICAgICAgICAgIHdoaWxlIChwYXJ0c1swXSA9PT0gIi4iIHx8IHBhcnRzWzBdID09PSAiLi4iKSB7DQogICAgICAgICAgICAgICAgY29uc3QgcGFydCA9IHBhcnRzLnNoaWZ0KCk7DQogICAgICAgICAgICAgICAgaWYgKHBhcnQgPT09ICIuLiIpIHsNCiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cy5wb3AoKTsNCiAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICB9DQogICAgICAgICAgICByZXNvbHZlZFBhcnRzLnB1c2guYXBwbHkocmVzb2x2ZWRQYXJ0cywgcGFydHMpOw0KICAgICAgICB9DQogICAgfSk7DQogICAgcmV0dXJuIG5vcm1hbGl6ZShyZXNvbHZlZFBhcnRzLmpvaW4oIi8iKSk7DQp9DQpmdW5jdGlvbiBub3JtYWxpemUocGF0aCkgew0KICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1wvXC8vZ2ksICIvIik7DQp9Cgpjb25zdCByZXNvbHZlUmVsYXRpdmUgPSAoY2hpbGRQYXRoLCBwYXJlbnRQYXRoLCBjb250ZXh0LCBwYXRoT25seSA9IHRydWUpID0+IHsNCiAgICBjb25zdCByZXRyeUZpbGVGaW5kID0gKHBhdGgpID0+IGNvbnRleHQuZmlsZXMuZmluZChmID0+IGYucGF0aCA9PT0gYCR7cGF0aH0vaW5kZXguanNgIHx8DQogICAgICAgIGYucGF0aCA9PT0gYCR7cGF0aH0vaW5kZXgudHNgIHx8DQogICAgICAgIGYucGF0aCA9PT0gYCR7cGF0aH0vaW5kZXguanN4YCB8fA0KICAgICAgICBmLnBhdGggPT09IGAke3BhdGh9L2luZGV4LnRzeGAgfHwNCiAgICAgICAgZi5wYXRoID09PSBgJHtwYXRofS5qc2AgfHwNCiAgICAgICAgZi5wYXRoID09PSBgJHtwYXRofS50c2AgfHwNCiAgICAgICAgZi5wYXRoID09PSBgJHtwYXRofS5qc3hgIHx8DQogICAgICAgIGYucGF0aCA9PT0gYCR7cGF0aH0udHN4YCkgfHwgbnVsbDsNCiAgICBjb25zdCByZXNvbHZlZCA9IHJlc29sdmUoZGlybmFtZShwYXJlbnRQYXRoKSwgY2hpbGRQYXRoKS5yZXBsYWNlKC9eXC5cLy8sICIiKTsNCiAgICBjb25zdCBmb3VuZEZpbGUgPSBjb250ZXh0LmZpbGVzLmZpbmQoZiA9PiBmLnBhdGggPT09IHJlc29sdmVkKTsNCiAgICBpZiAoZm91bmRGaWxlKQ0KICAgICAgICByZXR1cm4gcGF0aE9ubHkgPyBmb3VuZEZpbGUucGF0aCA6IGZvdW5kRmlsZTsNCiAgICBjb25zdCBhYnNvbHV0ZSA9IHJlc29sdmUoZGlybmFtZShwYXJlbnRQYXRoKSwgY2hpbGRQYXRoKTsNCiAgICBjb25zdCByZXRyaWVkRmlsZSA9IHJldHJ5RmlsZUZpbmQoYWJzb2x1dGUpOw0KICAgIGlmICghcmV0cmllZEZpbGUpDQogICAgICAgIHJldHVybiBudWxsOw0KICAgIHJldHVybiBwYXRoT25seSA/IHJldHJpZWRGaWxlLnBhdGggfHwgbnVsbCA6IHJldHJpZWRGaWxlIHx8IG51bGw7DQp9OwoKLyoqDQogKiBTbGlnaHRseSBtb2RpZmllZCB2ZXJzaW9uIG9mOg0KICogICAgICBodHRwczovL2dpdGh1Yi5jb20va2V2dmEvcGFyc2UtaW1wb3J0L2Jsb2IvbWFzdGVyL2luZGV4LmpzDQogKiBieSBodHRwczovL2dpdGh1Yi5jb20va2V2dmENCiAqLw0KY29uc3QgZ2V0UGF0aCA9IChzdHIpID0+IC8oPzp1cmxcKCkoPzouKj8pKD86XCkpfChbIiddKSg/OlteIicpXSspXDEvZ2kNCiAgICAuZXhlYyhzdHIpWzBdDQogICAgLnJlcGxhY2UoLyg/OnVybFwoKS9naSwgIiIpDQogICAgLnJlcGxhY2UoLyg/OlwpKS9nLCAiIikNCiAgICAucmVwbGFjZSgvKD86WyInXSkvZywgIiIpDQogICAgLnRyaW0oKTsNCmNvbnN0IGdldENvbmRpdGlvbiA9IChzdHIpID0+IHN0cg0KICAgIC5yZXBsYWNlKC8oPzp1cmxcKCkoPzouKj8pKD86XCkpfChbIiddKSg/OlteIicpXSspXDEvZ2ksICIiKQ0KICAgIC5yZXBsYWNlKC8oPzpAaW1wb3J0KSg/OlxzKSovZywgIiIpDQogICAgLnRyaW0oKTsNCnZhciBwYXJzZUNzc0ltcG9ydCA9IChjc3NJbXBvcnQpID0+IHsNCiAgICBjc3NJbXBvcnQgPSBjc3NJbXBvcnQucmVwbGFjZSgvKD86OykkL2csICIiKTsNCiAgICByZXR1cm4gew0KICAgICAgICBwYXRoOiBnZXRQYXRoKGNzc0ltcG9ydCksDQogICAgICAgIGNvbmRpdGlvbjogZ2V0Q29uZGl0aW9uKGNzc0ltcG9ydCkgfHwgbnVsbCwNCiAgICAgICAgcnVsZTogY3NzSW1wb3J0DQogICAgfTsNCn07CgpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vdW5wa2cuY29tL0BibG94eS9paWZlLWxpYnNAbGF0ZXN0L2xpYnMvY3NzLmpzIik7DQpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCAoeyBkYXRhIH0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgIGNvbnN0IHsgZmlsZSwgdHlwZSwgY29udGV4dCB9ID0gZGF0YTsNCiAgICBpZiAodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0ZJTEVTKSB7DQogICAgICAgIHRyeSB7DQogICAgICAgICAgICBjb25zdCB0cmFuc3BpbGVkRmlsZSA9IHByZXBhcmVBbmRUcmFuc3BpbGVGaWxlKGZpbGUsIGNvbnRleHQpOw0KICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQ0KICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7DQogICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5UUkFOU1BJTEVfQ09NUExFVEUsDQogICAgICAgICAgICAgICAgZmlsZTogdHJhbnNwaWxlZEZpbGUNCiAgICAgICAgICAgIH0pOw0KICAgICAgICB9DQogICAgICAgIGNhdGNoIChlcnJvcikgew0KICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQ0KICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7DQogICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9DT01QSUxFLA0KICAgICAgICAgICAgICAgIGVycm9yDQogICAgICAgICAgICB9KTsNCiAgICAgICAgfQ0KICAgIH0NCn0pKTsNCmNvbnN0IHByZXBhcmVBbmRUcmFuc3BpbGVGaWxlID0gKGZpbGUsIGNvbnRleHQpID0+IHsNCiAgICBjb25zdCBvcmlnaW5hbEFzdCA9IGdldEFzdEZyb21GaWxlKGZpbGUpOw0KICAgIGNvbnN0IHJ1bGVzID0gYXBwZW5kSW1wb3J0ZWRGaWxlc1dpdGhBc3QoZmlsZS5wYXRoLCBvcmlnaW5hbEFzdCwgY29udGV4dCk7DQogICAgb3JpZ2luYWxBc3Quc3R5bGVzaGVldC5ydWxlcyA9IHJ1bGVzOw0KICAgIGNvbnN0IGNvbXBpbGVkQ29kZSA9IGNzcy5zdHJpbmdpZnkob3JpZ2luYWxBc3QpOw0KICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGU6IGNvbXBpbGVkQ29kZSB9KTsNCn07DQpjb25zdCBnZXRBc3RGcm9tRmlsZSA9IChmaWxlKSA9PiBjc3MucGFyc2UoZmlsZS5jb2RlLCB7IHNvdXJjZTogZmlsZS5wYXRoIH0pOw0KY29uc3QgYXBwZW5kSW1wb3J0ZWRGaWxlc1dpdGhBc3QgPSAoY3VycmVudFBhdGgsIGN1cnJlbnRBc3QsIGNvbnRleHQsIGxvb3BlZFJ1bGVzID0gW10pID0+IHsNCiAgICBjb25zdCBydWxlcyA9IGN1cnJlbnRBc3Quc3R5bGVzaGVldC5ydWxlcyB8fCBbXTsNCiAgICBmb3IgKGxldCBydWxlIG9mIHJ1bGVzKSB7DQogICAgICAgIGlmIChydWxlLnR5cGUgIT0gImltcG9ydCIpIHsNCiAgICAgICAgICAgIGxvb3BlZFJ1bGVzLnB1c2gocnVsZSk7DQogICAgICAgIH0NCiAgICAgICAgaWYgKHJ1bGUuaW1wb3J0KSB7DQogICAgICAgICAgICBjb25zdCBpbXBvcnRSdWxlID0gYEBpbXBvcnQgJHtydWxlLmltcG9ydH07YDsNCiAgICAgICAgICAgIGNvbnN0IHBhcnNlZEltcG9ydCA9IHBhcnNlQ3NzSW1wb3J0KGltcG9ydFJ1bGUpOw0KICAgICAgICAgICAgaWYgKHBhcnNlZEltcG9ydC5wYXRoKSB7DQogICAgICAgICAgICAgICAgY29uc3QgZm91bmRGaWxlID0gKHJlc29sdmVSZWxhdGl2ZShwYXJzZWRJbXBvcnQucGF0aCwgY3VycmVudFBhdGgsIGNvbnRleHQsIGZhbHNlKSk7DQogICAgICAgICAgICAgICAgaWYgKGZvdW5kRmlsZSkgew0KICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kRmlsZS5wYXRoLmVuZHNXaXRoKCIuY3NzIikpIHsNCiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgWW91IGNhbid0IGltcG9ydCAke2ZvdW5kRmlsZS5wYXRofSBpbiAke2N1cnJlbnRQYXRofSBiZWNhdXNlIGl0J3Mgbm90IGEgQ1NTIGZpbGUuYCk7DQogICAgICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkQWRkaXRpb25hbEZpbGUgPSBjc3MucGFyc2UoZm91bmRGaWxlLmNvZGUsIHsNCiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZm91bmRGaWxlLnBhdGgNCiAgICAgICAgICAgICAgICAgICAgfSk7DQogICAgICAgICAgICAgICAgICAgIGlmICghcGFyc2VkSW1wb3J0LmNvbmRpdGlvbiB8fA0KICAgICAgICAgICAgICAgICAgICAgICAgIXBhcnNlZEltcG9ydC5jb25kaXRpb24ubGVuZ3RoKSB7DQogICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRJbXBvcnRlZEZpbGVzV2l0aEFzdChmb3VuZEZpbGUucGF0aCwgcGFyc2VkQWRkaXRpb25hbEZpbGUsIGNvbnRleHQsIGxvb3BlZFJ1bGVzKTsNCiAgICAgICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgICAgICAgICBlbHNlIHsNCiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltcG9ydFJ1bGVzID0gcGFyc2VkQWRkaXRpb25hbEZpbGUuc3R5bGVzaGVldC5ydWxlcy5maWx0ZXIoKHIpID0+IHIudHlwZSA9PT0gImltcG9ydCIpOw0KICAgICAgICAgICAgICAgICAgICAgICAgbG9vcGVkUnVsZXMucHVzaCh7DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWE6IHBhcnNlZEltcG9ydC5jb25kaXRpb24sDQogICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXM6IHBhcnNlZEFkZGl0aW9uYWxGaWxlLnN0eWxlc2hlZXQucnVsZXMuZmlsdGVyKChyKSA9PiByLnR5cGUgIT09ICJpbXBvcnQiKSwNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAibWVkaWEiDQogICAgICAgICAgICAgICAgICAgICAgICB9KTsNCiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbXBvcnRSdWxlcy5sZW5ndGgpIHsNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXBwZW5kQWRkaXRpb25hbEltcG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJzZWRBZGRpdGlvbmFsRmlsZSk7DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kQWRkaXRpb25hbEltcG9ydHMuc3R5bGVzaGVldC5ydWxlcyA9IGltcG9ydFJ1bGVzOw0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZEltcG9ydGVkRmlsZXNXaXRoQXN0KGZvdW5kRmlsZS5wYXRoLCBhcHBlbmRBZGRpdGlvbmFsSW1wb3J0cywgY29udGV4dCwgbG9vcGVkUnVsZXMpOw0KICAgICAgICAgICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgfQ0KICAgIHJldHVybiBsb29wZWRSdWxlczsNCn07Cgo=', null, false);
/* eslint-enable */class CssTranspiler extends Transpiler {
    constructor(context) {
        super("css-transpiler", new WorkerFactory$4(), context);
        this.additionalTranspilers = {};
    }
    transpile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doTranspile(file);
        });
    }
}class VueTranspiler extends Transpiler {
    constructor(context) {
        super("vue-transpiler", new WorkerFactory$3(), context);
        this.additionalTranspilers = {
            sass: SassTranspiler,
            scss: SassTranspiler,
            styl: StylusTranspiler,
            less: LessTranspiler,
            css: CssTranspiler
        };
    }
    transpile(file) {
        return this.doTranspile(file);
    }
}function vueTransformer(context) {
    const transformerName = "packager::transformer::vue-transformer";
    const isVue = verifyExtensions([".vue"]);
    let transpiler;
    return {
        name: transformerName,
        transform(code, modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isVue(modulePath)) {
                    transpiler = context.cache.transpilers.get("vue-transpiler");
                    if (!transpiler) {
                        transpiler = new VueTranspiler(context);
                        context.cache.transpilers.set("vue-transpiler", transpiler);
                    }
                    const file = context.files.find(f => f.path === modulePath);
                    yield context.transpileQueue.push("Vue-Transpiler", () => transpiler.transpile(Object.assign(Object.assign({}, file), { code })));
                    const completed = context.transpileQueue.completed.find(c => c.path === modulePath);
                    if (completed) {
                        return {
                            code: completed.code,
                            map: completed.map || { mappings: "" }
                        };
                    }
                    throw new TransformationException(modulePath, transformerName);
                }
            });
        }
    };
}/* eslint-disable */
const WorkerFactory$5 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0KCmNvbnN0IFRSQU5TUElMRV9TVEFUVVMgPSB7DQogICAgUFJFUEFSRV9GSUxFUzogIlRSQU5TUElMRVI6RklMRTpQUkVQQVJFIiwNCiAgICBQUkVQQVJFX0FERElUSU9OQUw6ICJUUkFOU1BJTEVSOkFERElUSU9OQUw6UFJFUEFSRSIsDQogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlRSQU5TUElMRUQiLA0KICAgIFRSQU5TUElMRV9DT01QTEVURTogIlRSQU5TUElMRVI6VFJBTlNQSUxFOkNPTVBMRVRFIiwNCiAgICBFUlJPUl9DT01QSUxFOiAiVFJBTlNQSUxFUjpFUlJPUjpDT01QSUxFIiwNCiAgICBFUlJPUl9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpFUlJPUjpBRERJVElPTkFMIg0KfTsKCi8vIHNlbGYuaW1wb3J0U2NyaXB0cygNCi8vICAgICAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS90eXBlc2NyaXB0QGxhdGVzdC9saWIvdHlwZXNjcmlwdC5qcyINCi8vICk7DQpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vdW5wa2cuY29tL0BibG94eS9paWZlLWxpYnNAbGF0ZXN0L2xpYnMvc3VjcmFzZS5qcyIpOw0Kc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgKHsgZGF0YSB9KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsNCiAgICBjb25zdCB7IGZpbGUsIHR5cGUsIGNvbnRleHQgfSA9IGRhdGE7DQogICAgaWYgKHR5cGUgPT09IFRSQU5TUElMRV9TVEFUVVMuUFJFUEFSRV9GSUxFUykgew0KICAgICAgICB0cnkgew0KICAgICAgICAgICAgY29uc3QgdHJhbnNwaWxlZEZpbGUgPSB5aWVsZCB0cmFuc3BpbGVGaWxlKGZpbGUpOw0KICAgICAgICAgICAgLy8gQHRzLWlnbm9yZQ0KICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7DQogICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5UUkFOU1BJTEVfQ09NUExFVEUsDQogICAgICAgICAgICAgICAgZmlsZTogdHJhbnNwaWxlZEZpbGUNCiAgICAgICAgICAgIH0pOw0KICAgICAgICB9DQogICAgICAgIGNhdGNoIChlcnJvcikgew0KICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQ0KICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7DQogICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9DT01QSUxFLA0KICAgICAgICAgICAgICAgIGVycm9yDQogICAgICAgICAgICB9KTsNCiAgICAgICAgfQ0KICAgIH0NCn0pKTsNCmNvbnN0IHRyYW5zcGlsZUZpbGUgPSAoZmlsZSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gew0KICAgIGNvbnN0IHRyYW5zcGlsZWQgPSBzdWNyYXNlLnRyYW5zZm9ybShmaWxlLmNvZGUsIHsNCiAgICAgICAgdHJhbnNmb3JtczogWyJ0eXBlc2NyaXB0IiwgImpzeCJdLA0KICAgICAgICBmaWxlUGF0aDogZmlsZS5wYXRoLA0KICAgICAgICBlbmFibGVMZWdhY3lUeXBlU2NyaXB0TW9kdWxlSW50ZXJvcDogdHJ1ZSwNCiAgICAgICAgc291cmNlTWFwT3B0aW9uczogew0KICAgICAgICAgICAgY29tcGlsZWRGaWxlbmFtZTogZmlsZS5wYXRoDQogICAgICAgIH0NCiAgICB9KTsNCiAgICAvLyBjb25zdCB0cmFuc3BpbGVkID0gdHMudHJhbnNwaWxlTW9kdWxlKGZpbGUuY29kZSwgew0KICAgIC8vICAgICBmaWxlTmFtZTogZmlsZS5uYW1lLA0KICAgIC8vICAgICBjb21waWxlck9wdGlvbnM6IHsNCiAgICAvLyAgICAgICAgIGFsbG93U3ludGhldGljRGVmYXVsdEltcG9ydHM6IHRydWUsDQogICAgLy8gICAgICAgICB0YXJnZXQ6IHRzLlNjcmlwdFRhcmdldC5FUzUsDQogICAgLy8gICAgICAgICBtb2R1bGU6IHRzLk1vZHVsZUtpbmQuRVNOZXh0LA0KICAgIC8vICAgICAgICAgaW1wb3J0SGVscGVyczogdHJ1ZSwNCiAgICAvLyAgICAgICAgIG5vRW1pdEhlbHBlcnM6IGZhbHNlLA0KICAgIC8vICAgICAgICAgbW9kdWxlUmVzb2x1dGlvbjogdHMuTW9kdWxlUmVzb2x1dGlvbktpbmQuTm9kZUpzLA0KICAgIC8vICAgICAgICAganN4OiB0cy5Kc3hFbWl0LlJlYWN0LA0KICAgIC8vICAgICAgICAgc291cmNlTWFwOiB0cnVlDQogICAgLy8gICAgIH0NCiAgICAvLyB9KTsNCiAgICBpZiAodHJhbnNwaWxlZCAmJiB0cmFuc3BpbGVkLmNvZGUpIHsNCiAgICAgICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGU6IHRyYW5zcGlsZWQuY29kZSwgbWFwOiB0cmFuc3BpbGVkLnNvdXJjZU1hcCB8fCB7fSB9KSk7DQogICAgfQ0KICAgIGVsc2Ugew0KICAgICAgICByZWplY3QoYEZhaWxlZCB0byB0cmFuc3BpbGUgJHtmaWxlLnBhdGh9YCk7DQogICAgfQ0KICAgIC8vIGlmICh0cmFuc3BpbGVkLm91dHB1dFRleHQpIHsNCiAgICAvLyAgICAgcmVzb2x2ZSh7DQogICAgLy8gICAgICAgICAuLi5maWxlLA0KICAgIC8vICAgICAgICAgY29kZTogdHJhbnNwaWxlZC5vdXRwdXRUZXh0LA0KICAgIC8vICAgICAgICAgbWFwOiBKU09OLnBhcnNlKHRyYW5zcGlsZWQuc291cmNlTWFwVGV4dCB8fCAie30iKQ0KICAgIC8vICAgICB9KTsNCiAgICAvLyB9IGVsc2Ugew0KICAgIC8vICAgICByZWplY3QoYEZhaWxlZCB0byB0cmFuc3BpbGUgJHtmaWxlLnBhdGh9YCk7DQogICAgLy8gfQ0KfSk7Cgo=', null, false);
/* eslint-enable */class TypescriptTranspiler extends Transpiler {
    constructor(context) {
        super("typescript-transpiler", new WorkerFactory$5(), context);
        this.additionalTranspilers = {};
    }
    transpile(file) {
        return this.doTranspile(file);
    }
}function typescriptTransformer(context) {
    const transformerName = "packager::transformer::typescript-transformer";
    const isTypescriptOrJavascript = verifyExtensions([
        ".js",
        ".jsx",
        ".ts",
        ".tsx"
    ]);
    let transpiler;
    return {
        name: transformerName,
        transform(code, modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isTypescriptOrJavascript(modulePath)) {
                    transpiler = context.cache.transpilers.get("typescript-transpiler");
                    if (!transpiler) {
                        transpiler = new TypescriptTranspiler(context);
                        context.cache.transpilers.set("typescript-transpiler", transpiler);
                    }
                    const file = context.files.find(f => f.path === modulePath);
                    yield context.transpileQueue.push("Typescript-Transpiler", () => transpiler.transpile(Object.assign(Object.assign({}, file), { code })));
                    const completed = context.transpileQueue.completed.find(c => c.path === modulePath);
                    if (completed) {
                        return {
                            code: completed.code,
                            map: completed.map || { mappings: "" },
                            syntheticNamedExports: true
                        };
                    }
                    throw new TransformationException(modulePath, transformerName);
                }
            });
        }
    };
}/* eslint-disable */
const WorkerFactory$6 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0KCmNvbnN0IGdlbmVyYXRlRXhwb3J0ID0gKGZpbGUsIHByZXBlbmRFeHBvcnREZWZhdWx0ID0gdHJ1ZSkgPT4gew0KICAgIHJldHVybiAoYCR7cHJlcGVuZEV4cG9ydERlZmF1bHQgPyAiZXhwb3J0IGRlZmF1bHQgIiA6ICIifWZ1bmN0aW9uIGFkZFN0eWxlcyAoKSB7YCArDQogICAgICAgIGBjb25zdCB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO2AgKw0KICAgICAgICBgdGFnLnR5cGUgPSAndGV4dC9jc3MnO2AgKw0KICAgICAgICBgdGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFxgJHtmaWxlLmNvZGV9XGApKTtgICsNCiAgICAgICAgYHRhZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJyR7ZmlsZS5wYXRofScpO2AgKw0KICAgICAgICBgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWcpO2AgKw0KICAgICAgICBgfSBhZGRTdHlsZXMoKTtgKTsNCn07DQpjb25zdCBnZW5lcmF0ZUV4cG9ydHNGb3JBbGxTdHlsZXMgPSAoc3R5bGVzLCBmaWxlUGF0aCkgPT4gZ2VuZXJhdGVFeHBvcnQoeyBwYXRoOiBmaWxlUGF0aCwgY29kZTogc3R5bGVzLmpvaW4oIlxuXG4iKSB9LCBmYWxzZSk7Cgpjb25zdCBUUkFOU1BJTEVfU1RBVFVTID0gew0KICAgIFBSRVBBUkVfRklMRVM6ICJUUkFOU1BJTEVSOkZJTEU6UFJFUEFSRSIsDQogICAgUFJFUEFSRV9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlBSRVBBUkUiLA0KICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogIlRSQU5TUElMRVI6QURESVRJT05BTDpUUkFOU1BJTEVEIiwNCiAgICBUUkFOU1BJTEVfQ09NUExFVEU6ICJUUkFOU1BJTEVSOlRSQU5TUElMRTpDT01QTEVURSIsDQogICAgRVJST1JfQ09NUElMRTogIlRSQU5TUElMRVI6RVJST1I6Q09NUElMRSIsDQogICAgRVJST1JfQURESVRJT05BTDogIlRSQU5TUElMRVI6RVJST1I6QURESVRJT05BTCINCn07CgpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vc3ZlbHRlQGxhdGVzdC9jb21waWxlci5taW4uanMiKTsNCnNlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsICh7IGRhdGEgfSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7DQogICAgY29uc3QgeyBmaWxlLCB0eXBlLCBhZGRpdGlvbmFsIH0gPSBkYXRhOw0KICAgIGlmICh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLlBSRVBBUkVfRklMRVMpIHsNCiAgICAgICAgdHJ5IHsNCiAgICAgICAgICAgIGNvbnN0IHsgc3R5bGVzLCByZXN0IH0gPSB5aWVsZCBleHRyYWN0RnJvbUZpbGUoZmlsZSk7DQogICAgICAgICAgICBjb25zdCB0cmFuc3BpbGVkRmlsZSA9IHlpZWxkIHRyYW5zcGlsZUZpbGUoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiByZXN0IH0pKTsNCiAgICAgICAgICAgIGlmIChzdHlsZXMgJiYgc3R5bGVzLmxlbmd0aCkgew0KICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWwgPSB7IHN0eWxlcyB9Ow0KICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUNCiAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0FERElUSU9OQUwsDQogICAgICAgICAgICAgICAgICAgIGZpbGU6IHRyYW5zcGlsZWRGaWxlLA0KICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsDQogICAgICAgICAgICAgICAgfSk7DQogICAgICAgICAgICB9DQogICAgICAgICAgICBlbHNlIHsNCiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlDQogICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7DQogICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLA0KICAgICAgICAgICAgICAgICAgICBmaWxlOiB0cmFuc3BpbGVkRmlsZQ0KICAgICAgICAgICAgICAgIH0pOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgICAgIGNhdGNoIChlcnJvcikgew0KICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQ0KICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7DQogICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9DT01QSUxFLA0KICAgICAgICAgICAgICAgIGVycm9yDQogICAgICAgICAgICB9KTsNCiAgICAgICAgfQ0KICAgIH0NCiAgICBpZiAodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5BRERJVElPTkFMX1RSQU5TUElMRUQpIHsNCiAgICAgICAgbGV0IGNvZGUgPSBmaWxlLmNvZGU7DQogICAgICAgIGlmIChhZGRpdGlvbmFsKSB7DQogICAgICAgICAgICB0cnkgew0KICAgICAgICAgICAgICAgIGNvZGUgKz0gZ2VuZXJhdGVFeHBvcnRzRm9yQWxsU3R5bGVzKGFkZGl0aW9uYWwuc3R5bGVzLm1hcCgocykgPT4gcy5jb2RlKSwgZmlsZS5wYXRoKTsNCiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlDQogICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7DQogICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLA0KICAgICAgICAgICAgICAgICAgICBmaWxlOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGUgfSkNCiAgICAgICAgICAgICAgICB9KTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIGNhdGNoIChlcnJvcikgew0KICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUNCiAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9BRERJVElPTkFMLA0KICAgICAgICAgICAgICAgICAgICBlcnJvcg0KICAgICAgICAgICAgICAgIH0pOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgfQ0KfSkpOw0KY29uc3QgZXh0cmFjdEZyb21GaWxlID0gKGZpbGUpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgIGNvbnN0IGV4dHJhY3RlZCA9IHsNCiAgICAgICAgc3R5bGVzOiBbXQ0KICAgIH07DQogICAgY29uc3QgeyBjb2RlIH0gPSB5aWVsZCBzdmVsdGUucHJlcHJvY2VzcyhmaWxlLmNvZGUsIHsNCiAgICAgICAgc3R5bGU6ICh7IGNvbnRlbnQ6IGNvZGUsIGF0dHJpYnV0ZXMgfSkgPT4gew0KICAgICAgICAgICAgZXh0cmFjdGVkLnN0eWxlcy5wdXNoKHsNCiAgICAgICAgICAgICAgICBjb2RlLA0KICAgICAgICAgICAgICAgIGxhbmc6IGF0dHJpYnV0ZXMubGFuZyB8fCAiY3NzIiwNCiAgICAgICAgICAgICAgICBwYXRoOiBmaWxlLnBhdGgNCiAgICAgICAgICAgIH0pOw0KICAgICAgICAgICAgcmV0dXJuIHsgY29kZTogIiIgfTsNCiAgICAgICAgfQ0KICAgIH0sIHsgZmlsZW5hbWU6IGZpbGUucGF0aCB9KTsNCiAgICByZXR1cm4gew0KICAgICAgICBzdHlsZXM6IGV4dHJhY3RlZC5zdHlsZXMsDQogICAgICAgIHJlc3Q6IGNvZGUNCiAgICB9Ow0KfSk7DQpjb25zdCB0cmFuc3BpbGVGaWxlID0gKGZpbGUpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgIHRyeSB7DQogICAgICAgIGNvbnN0IHRyYW5zcGlsZWQgPSBzdmVsdGUuY29tcGlsZShmaWxlLmNvZGUsIHsNCiAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlLnBhdGgNCiAgICAgICAgfSk7DQogICAgICAgIHJlc29sdmUoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiB0cmFuc3BpbGVkLmpzLmNvZGUgfSkpOw0KICAgIH0NCiAgICBjYXRjaCAoZXJyb3IpIHsNCiAgICAgICAgcmVqZWN0KGVycm9yKTsNCiAgICB9DQp9KSk7Cgo=', null, false);
/* eslint-enable */class SvelteTranspiler extends Transpiler {
    constructor(context) {
        super("svelte-transpiler", new WorkerFactory$6(), context);
        this.additionalTranspilers = {
            sass: SassTranspiler,
            scss: SassTranspiler,
            styl: StylusTranspiler,
            less: LessTranspiler,
            css: CssTranspiler
        };
    }
    transpile(file) {
        return this.doTranspile(file);
    }
}
SvelteTranspiler.forceExternal = true;function svelteTransformer(context) {
    const transformerName = "packager::transformer::svelte-transformer";
    const isSvelte = verifyExtensions([".svelte"]);
    let transpiler;
    return {
        name: transformerName,
        transform(code, modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isSvelte(modulePath)) {
                    transpiler = context.cache.transpilers.get("svelte-transpiler");
                    if (!transpiler) {
                        transpiler = new SvelteTranspiler(context);
                        context.cache.transpilers.set("svelte-transpiler", transpiler);
                    }
                    const file = context.files.find(f => f.path === modulePath);
                    yield context.transpileQueue.push("Svelte-Transpiler", () => transpiler.transpile(Object.assign(Object.assign({}, file), { code })));
                    const completed = context.transpileQueue.completed.find(c => c.path === modulePath);
                    if (completed) {
                        return {
                            code: completed.code,
                            map: completed.map || { mappings: "" }
                        };
                    }
                    throw new TransformationException(modulePath, transformerName);
                }
            });
        }
    };
}class JsonTranspiler extends Transpiler {
    constructor(context) {
        super("json-transpiler", null, context);
        this.additionalTranspilers = {};
    }
    transpile(file) {
        return this.doTranspile(file);
    }
}function jsonTransformer(context) {
    const transformerName = "packager::transformer::json-transformer";
    const isJson = verifyExtensions([".json"]);
    let transpiler;
    return {
        name: transformerName,
        transform(code, modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isJson(modulePath)) {
                    transpiler = context.cache.transpilers.get("json-transpiler");
                    if (!transpiler) {
                        transpiler = new JsonTranspiler(context);
                        context.cache.transpilers.set("json-transpiler", transpiler);
                    }
                    const file = context.files.find(f => f.path === modulePath);
                    yield context.transpileQueue.push("Json-Transpiler", () => transpiler.transpile(Object.assign(Object.assign({}, file), { code })));
                    const completed = context.transpileQueue.completed.find(c => c.path === modulePath);
                    if (completed) {
                        return {
                            code: `export default ${completed.code}`
                        };
                    }
                }
            });
        }
    };
}function cssTransformer(context) {
    const transformerName = "packager::transformer::css-transformer";
    const isCss = verifyExtensions([".css"]);
    let transpiler;
    return {
        name: transformerName,
        transform(code, modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isCss(modulePath)) {
                    transpiler = context.cache.transpilers.get("css-transpiler");
                    if (!transpiler) {
                        transpiler = new CssTranspiler(context);
                        context.cache.transpilers.set("css-transpiler", transpiler);
                    }
                    const file = context.files.find(f => f.path === modulePath);
                    yield context.transpileQueue.push("Css-Transpiler", () => transpiler.transpile(Object.assign(Object.assign({}, file), { code })));
                    const completed = context.transpileQueue.completed.find(c => c.path === modulePath);
                    if (completed) {
                        return {
                            code: generateExport(Object.assign(Object.assign({}, file), { code: completed.code }))
                        };
                    }
                }
            });
        }
    };
}/* eslint-disable */
const WorkerFactory$7 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0KCmNvbnN0IFRSQU5TUElMRV9TVEFUVVMgPSB7DQogICAgUFJFUEFSRV9GSUxFUzogIlRSQU5TUElMRVI6RklMRTpQUkVQQVJFIiwNCiAgICBQUkVQQVJFX0FERElUSU9OQUw6ICJUUkFOU1BJTEVSOkFERElUSU9OQUw6UFJFUEFSRSIsDQogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlRSQU5TUElMRUQiLA0KICAgIFRSQU5TUElMRV9DT01QTEVURTogIlRSQU5TUElMRVI6VFJBTlNQSUxFOkNPTVBMRVRFIiwNCiAgICBFUlJPUl9DT01QSUxFOiAiVFJBTlNQSUxFUjpFUlJPUjpDT01QSUxFIiwNCiAgICBFUlJPUl9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpFUlJPUjpBRERJVElPTkFMIg0KfTsKCnNlbGYuaW1wb3J0U2NyaXB0cygiaHR0cHM6Ly91bnBrZy5jb20vY29mZmVlc2NyaXB0L2xpYi9jb2ZmZWVzY3JpcHQtYnJvd3Nlci1jb21waWxlci1sZWdhY3kvY29mZmVlc2NyaXB0LmpzIik7DQpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCAoeyBkYXRhIH0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgIGNvbnN0IHsgZmlsZSwgdHlwZSwgY29udGV4dCB9ID0gZGF0YTsNCiAgICBpZiAodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0ZJTEVTKSB7DQogICAgICAgIHRyeSB7DQogICAgICAgICAgICBjb25zdCB0cmFuc3BpbGVkRmlsZSA9IHlpZWxkIHRyYW5zcGlsZUZpbGUoZmlsZSk7DQogICAgICAgICAgICAvLyBAdHMtaWdub3JlDQogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLlRSQU5TUElMRV9DT01QTEVURSwNCiAgICAgICAgICAgICAgICBmaWxlOiB0cmFuc3BpbGVkRmlsZQ0KICAgICAgICAgICAgfSk7DQogICAgICAgIH0NCiAgICAgICAgY2F0Y2ggKGVycm9yKSB7DQogICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlDQogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX0NPTVBJTEUsDQogICAgICAgICAgICAgICAgZXJyb3INCiAgICAgICAgICAgIH0pOw0KICAgICAgICB9DQogICAgfQ0KfSkpOw0KY29uc3QgdHJhbnNwaWxlRmlsZSA9IChmaWxlKSA9PiB7DQogICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsNCiAgICAgICAgdHJ5IHsNCiAgICAgICAgICAgIGNvbnN0IHRyYW5zcGlsZWQgPSBDb2ZmZWVTY3JpcHQuY29tcGlsZShmaWxlLmNvZGUsIHsNCiAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZS5wYXRoLA0KICAgICAgICAgICAgICAgIHNvdXJjZU1hcDogdHJ1ZQ0KICAgICAgICAgICAgfSk7DQogICAgICAgICAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZmlsZSksIHsgY29kZTogdHJhbnNwaWxlZC5qcywgbWFwOiBKU09OLnBhcnNlKHRyYW5zcGlsZWQudjNTb3VyY2VNYXAgfHwgInt9IikgfSkpOw0KICAgICAgICB9DQogICAgICAgIGNhdGNoIChlKSB7DQogICAgICAgICAgICByZWplY3QoZSk7DQogICAgICAgIH0NCiAgICB9KTsNCn07Cgo=', null, false);
/* eslint-enable */class CoffeescriptTranspiler extends Transpiler {
    constructor(context) {
        super("coffeescript-transpiler", new WorkerFactory$7(), context);
        this.additionalTranspilers = {};
    }
    transpile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doTranspile(file);
        });
    }
}function coffeescriptTransformer(context) {
    const transformerName = "packager::transformer::coffeescript-transformer";
    const isCoffeescript = verifyExtensions([".coffee"]);
    let transpiler;
    return {
        name: transformerName,
        transform(code, modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isCoffeescript(modulePath)) {
                    transpiler = context.cache.transpilers.get("coffeescript-transpiler");
                    if (!transpiler) {
                        transpiler = new CoffeescriptTranspiler(context);
                        context.cache.transpilers.set("coffeescript-transpiler", transpiler);
                    }
                    const file = context.files.find(f => f.path === modulePath);
                    yield context.transpileQueue.push("Coffeescript-Transpiler", () => transpiler.transpile(Object.assign(Object.assign({}, file), { code })));
                    const completed = context.transpileQueue.completed.find(c => c.path === modulePath);
                    if (completed) {
                        return {
                            code: completed.code,
                            map: completed.map || { mappings: "" }
                        };
                    }
                    throw new TransformationException(modulePath, transformerName);
                }
            });
        }
    };
}var transformers = (context) => [
    // General
    typescriptTransformer(context),
    commonjsTransformer(context),
    // JS Frameworks
    vueTransformer(context),
    svelteTransformer(context),
    // Styles
    sassTransformer(context),
    stylusTransformer(context),
    lessTransformer(context),
    cssTransformer(context),
    // Other
    jsonTransformer(context),
    coffeescriptTransformer(context)
];var parsePackagePath = (name) => {
    var _a, _b, _c;
    if (!name || name == "") {
        return {
            name: null,
            version: null,
            path: null
        };
    }
    const scopedRegex = /^(@[^/]+\/[^/@]+)(?:([\s\S]+))?/;
    const regRegex = /^([^/@]+)(?:([\s\S]+))?/;
    const extracted = name.startsWith("@")
        ? (_a = scopedRegex.exec(name)) === null || _a === void 0 ? void 0 : _a.slice(1) : (_b = regRegex.exec(name)) === null || _b === void 0 ? void 0 : _b.slice(1);
    if ((_c = extracted) === null || _c === void 0 ? void 0 : _c.length) {
        const rest = extractRest(extracted[1] || null);
        return Object.assign({ name: extracted[0] || null }, rest);
    }
    return {
        name: null,
        version: null,
        path: null
    };
};
const extractRest = (rest) => {
    if (!rest || rest == "") {
        return {
            version: null,
            path: null
        };
    }
    if (rest.startsWith("@")) {
        const extractedVersion = /@(.*?)\/(.*)/.exec(rest);
        if (extractedVersion) {
            const version = extractedVersion[1] || null;
            const path = extractedVersion[2] || null;
            return { version, path };
        }
        return {
            version: rest.substring(1) || null,
            path: null
        };
    }
    else if (!!rest && !!~rest.indexOf("@")) {
        const splitRest = rest.split("@");
        return {
            version: splitRest[1],
            path: splitRest[0].indexOf("/") === 0
                ? splitRest[0].substring(1)
                : splitRest[0]
        };
    }
    return {
        version: null,
        path: rest && rest.startsWith("/") ? rest.slice(1) : null
    };
};const resolver = (path, retries = 1, maxRetries = 3) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(path).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            return ({
                code: yield res.text(),
                meta: {
                    url: res.url,
                    status: res.status
                }
            });
        }));
        return data;
    }
    catch ({ response }) {
        if (response.status === 404) {
            throw Error("Not found.");
        }
        if (retries < maxRetries) {
            return resolver(path, retries + 1);
        }
        else {
            throw Error("Error retrieving data.");
        }
    }
});const services = {
    unpkg: {
        url: "https://unpkg.com"
    },
    jsdelivr: {
        url: "https://cdn.jsdelivr.net"
    }
};
const getNextService = (currentService) => {
    const serviceNames = Object.keys(services);
    const currentIndex = serviceNames.indexOf(currentService);
    // If current service is last, return null
    if (currentIndex >= serviceNames.length - 1) {
        return null;
    }
    return serviceNames[currentIndex + 1];
};
function fetchNpmDependency(name, version = "latest", path = "", service = "unpkg") {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _service = services[service];
            const fullPath = `${_service.url}/${name}@${version}${path != "" && !path.startsWith("/") ? `/${path}` : path}`;
            const data = yield resolver(fullPath);
            return data;
        }
        catch (e) {
            const nextService = getNextService(service);
            if (nextService) {
                return fetchNpmDependency(name, version, path, nextService);
            }
            else {
                return null;
            }
        }
    });
}const cleanupExternalDependency = (code) => code.replace(/process.env.NODE_ENV/g, "'development'");
function dependencyLoader(context) {
    return {
        name: "packager::loader::dependency-loader",
        load(modulePath) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const file = context.files.find(f => f.path === modulePath);
                if (modulePath && !file) {
                    const moduleMeta = parsePackagePath(modulePath);
                    const moduleName = (_a = moduleMeta.name) === null || _a === void 0 ? void 0 : _a.split("__")[0];
                    if (!moduleName)
                        throw new Error("There was an issue with loading deps for " + modulePath);
                    const version = moduleMeta.version ||
                        context.bundleOptions.dependencies[moduleName] ||
                        "latest";
                    const cachedNpmDependency = context.cache.dependencies.get(modulePath);
                    if (!cachedNpmDependency) {
                        const npmDependency = (yield fetchNpmDependency(moduleName, version, moduleMeta.path || "")) || "";
                        if (npmDependency) {
                            const cleanUpCode = cleanupExternalDependency(npmDependency.code);
                            context.cache.dependencies.set(modulePath, Object.assign(Object.assign({}, npmDependency), { code: cleanUpCode, name: modulePath }));
                            return {
                                code: cleanUpCode,
                                syntheticNamedExports: true
                            };
                        }
                        return null;
                    }
                    return {
                        code: ""
                    };
                }
                else if (modulePath && file) {
                    return {
                        code: file.code,
                        syntheticNamedExports: true
                    };
                }
                return null;
            });
        }
    };
}/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
function commonjsLoader(context) {
    return {
        name: "packager::loader::commonjs-loader",
        load(modulePath) {
            return __awaiter(this, void 0, void 0, function* () {
                if (modulePath === HELPERS_ID)
                    return HELPERS;
                // generate proxy modules
                if (modulePath.endsWith(EXTERNAL_SUFFIX)) {
                    const actualId = getIdFromExternalProxyId(modulePath);
                    const name = getName(actualId);
                    return `import ${name} from ${JSON.stringify(actualId)}; export default ${name};`;
                }
                if (modulePath.endsWith(PROXY_SUFFIX)) {
                    const actualId = getIdFromProxyId(modulePath);
                    const name = getName(actualId);
                    return getIsCjsPromise(actualId).then((isCjs) => {
                        if (isCjs)
                            return `import { __moduleExports } from ${JSON.stringify(actualId)}; export default __moduleExports;`;
                        else if (context.cache.esModulesWithoutDefaultExport.has(actualId))
                            return `import * as ${name} from ${JSON.stringify(actualId)}; export default ${name};`;
                        else if (context.cache.esModulesWithDefaultExport.has(actualId)) {
                            return `export {default} from ${JSON.stringify(actualId)};`;
                        }
                        return `import * as ${name} from ${JSON.stringify(actualId)}; import {getCjsExportFromNamespace} from "${HELPERS_ID}"; export default getCjsExportFromNamespace(${name})`;
                    });
                }
                return null;
            });
        }
    };
}var loaders = (context) => [
    commonjsLoader(context),
    dependencyLoader(context)
];class HtmlTranspiler extends Transpiler {
    constructor(context) {
        super("html-transpiler", null, context);
        this.additionalTranspilers = {};
    }
    transpile(file) {
        return this.doTranspile(file);
    }
}var transpilers = {
    ts: TypescriptTranspiler,
    tsx: TypescriptTranspiler,
    js: TypescriptTranspiler,
    jsx: TypescriptTranspiler,
    less: LessTranspiler,
    sass: SassTranspiler,
    scss: SassTranspiler,
    stylus: StylusTranspiler,
    styl: StylusTranspiler,
    css: CssTranspiler,
    svelte: SvelteTranspiler,
    vue: VueTranspiler,
    coffee: CoffeescriptTranspiler,
    html: HtmlTranspiler,
    json: JsonTranspiler
};function initialSetup(context) {
    const getAllLangsFromFiles = () => context.files.reduce((acc, curr) => {
        const extension = extname(curr.path).slice(1);
        if (!acc.includes(extension)) {
            acc.push(extension);
            return acc;
        }
        return acc;
    }, []);
    const usingUnsupportedFiles = () => {
        const givenLangs = getAllLangsFromFiles();
        const unsupportedExtensions = givenLangs.reduce((acc, curr) => {
            if (!transpilers[curr]) {
                acc.push(curr);
                return acc;
            }
            return acc;
        }, []);
        return {
            extensions: unsupportedExtensions,
            unsupportedFiles: !!unsupportedExtensions.length
        };
    };
    return {
        name: "packager::setup::build-start",
        buildStart() {
            return __awaiter(this, void 0, void 0, function* () {
                const { unsupportedFiles, extensions } = usingUnsupportedFiles();
                if (unsupportedFiles) {
                    throw Error(`Files with the following extensions are not supported yet: ${extensions.join(", ")}.`);
                }
            });
        }
    };
}const applyPreCode = () => `window.__dependencies = { ...window.__dependencies || {} };`;
function intro (context) {
    return {
        name: "packager::setup::intro",
        intro: () => applyPreCode()
    };
}var setup = (context) => [
    initialSetup(context),
    intro()
];const defaultBundleOptions = {
    dependencies: {}
};
const cache = {
    dependencies: cacheFactory(),
    transpilers: cacheFactory(),
    esModulesWithoutDefaultExport: new Set(),
    esModulesWithDefaultExport: new Set()
};
function pluginFactory (
// this: Packager,
files, bundleOptions = defaultBundleOptions, pluginManager) {
    const context = {
        cache,
        files,
        transpileQueue: new SequentialTaskQueue({ timeout: 30000 }),
        bundleOptions: normalizeBundleOptions(bundleOptions)
    };
    pluginManager.setContext(context);
    const registeredPlugins = pluginManager.prepareAndGetPlugins();
    return [
        ...registeredPlugins,
        ...setup(context),
        ...resolvers(context),
        ...loaders(context),
        ...transformers(context)
    ];
}const loadRollup = () => new Promise(resolve => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/rollup@latest/dist/rollup.browser.js";
    script.setAttribute("data-packager", "true");
    script.onload = resolve;
    document.head.appendChild(script);
});
const loadMagicString$1 = () => new Promise(resolve => {
    const script = document.createElement("script");
    script.src =
        "https://cdn.jsdelivr.net/npm/magic-string@latest/dist/magic-string.umd.min.js";
    script.setAttribute("data-packager", "true");
    script.onload = resolve;
    document.head.appendChild(script);
});var findEntryFile = (files, forcePath) => {
    const pkgMain = files.find(f => f.path === forcePath);
    const foundFile = pkgMain || files.find(f => f.entry);
    if (!foundFile) {
        throw Error("You haven't specific an entry file. You can do so by adding 'entry: true' to one of your files or use the 'main' in a package.json file..");
    }
    return foundFile;
};var extractPackageJsonOptions = (packgeJson) => {
    return {
        dependencies: Object.assign(Object.assign({}, packgeJson.dependencies), packgeJson.peerDependencies)
    };
};var handleBuildWarnings = (warning) => {
    if (warning.code === "THIS_IS_UNDEFINED")
        return;
};var resolverProxyHook = (plugin, context) => {
    const canBeResolved = verifyExtensions(plugin.extensions);
    const resolverFunction = (moduleId, parentId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!canBeResolved(moduleId))
            return null;
        return moduleId;
    });
    return new Proxy(resolverFunction, {
        apply(target, thisArg, argumentsList) {
            return __awaiter(this, void 0, void 0, function* () {
                const handledResolverFunction = yield Reflect.apply(target, context, argumentsList);
                if (!handledResolverFunction) {
                    return Promise.resolve();
                }
                return ((yield plugin.resolver.bind(context)(argumentsList[0], argumentsList[1])) || null);
            });
        }
    });
};var loaderProxyHook = (plugin, context) => {
    const canBeLoaded = verifyExtensions(plugin.extensions);
    const loaderFunction = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!canBeLoaded(moduleId))
            return null;
        return moduleId;
    });
    return new Proxy(loaderFunction, {
        apply(target, thisArg, argumentsList) {
            return __awaiter(this, void 0, void 0, function* () {
                const handledLoaderFunction = yield Reflect.apply(target, context, argumentsList);
                if (!handledLoaderFunction) {
                    return Promise.resolve();
                }
                return ((yield plugin.loader.bind(context)(argumentsList[0])) || null);
            });
        }
    });
};var transformProxyHook = (plugin, context) => {
    const transpilerName = `${plugin.name}-transpiler`;
    const canBeTransformed = verifyExtensions(plugin.extensions);
    const transformFunction = (code, moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!canBeTransformed(moduleId))
            return null;
        let transpiler;
        transpiler = context.cache.transpilers.get(transpilerName);
        if (!transpiler) {
            transpiler =
                typeof plugin.transpiler === "function"
                    ? new plugin.transpiler(context)
                    : plugin.transpiler;
            context.cache.transpilers.set(transpilerName, transpiler);
        }
        const file = context.files.find(f => f.path === moduleId);
        yield context.transpileQueue.push(transpilerName, () => transpiler.transpile(Object.assign(Object.assign({}, file), { code })));
        const completed = context.transpileQueue.completed.find(c => c.path === moduleId);
        if (completed) {
            return {
                code: completed.code,
                map: completed.map || { mappings: "" }
            };
        }
        throw new TransformationException(moduleId, transpilerName);
    });
    return new Proxy(transformFunction, {
        apply(target, thisArg, argumentsList) {
            return __awaiter(this, void 0, void 0, function* () {
                const handledTransformFunction = yield Reflect.apply(target, context, argumentsList);
                if (!handledTransformFunction) {
                    return Promise.resolve();
                }
                if (!plugin.beforeBundle) {
                    return handledTransformFunction;
                }
                const { code, map } = handledTransformFunction;
                return {
                    code: plugin.beforeBundle.bind(context)(code) || code,
                    map
                };
            });
        }
    });
};var beforeBundleProxyHook = (plugin, context) => {
    const canBeBeforeBundled = verifyExtensions(plugin.extensions);
    const checkIfFileIsAlreadyTranspiler = (path) => context.transpileQueue.completed.find(f => f.path === path);
    const beforeBundleFunction = (code, moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!canBeBeforeBundled(moduleId))
            return null;
        const file = checkIfFileIsAlreadyTranspiler(moduleId);
        if (file) {
            return {
                code: file.code,
                map: file.map || { mappings: "" }
            };
        }
        return { code, map: { mappings: "" } };
    });
    return new Proxy(beforeBundleFunction, {
        apply(target, thisArg, argumentsList) {
            return __awaiter(this, void 0, void 0, function* () {
                const handledTransformFunction = yield Reflect.apply(target, context, argumentsList);
                if (!handledTransformFunction) {
                    return Promise.resolve();
                }
                const { code, map } = handledTransformFunction;
                return {
                    code: (yield plugin.beforeBundle.bind(context)(code)) || code,
                    map
                };
            });
        }
    });
};var normalizePlugin = (plugin) => ({
    // Meta
    name: plugin.name,
    extensions: plugin.extensions,
    transpiler: plugin.transpiler,
    // Hooks
    resolver: plugin.resolver,
    loader: plugin.loader,
    beforeBundle: plugin.beforeBundle
});const MISSING_NAME_FIELD = `'name' is a required field on a plugin.`;
const MISSING_FIELD = (pluginName, field) => `${pluginName} is missing '${field}'.`;
var validatePlugin = (plugin) => {
    if (!plugin.name) {
        throw new Error(MISSING_NAME_FIELD);
    }
    if (!plugin.extensions) {
        throw new Error(MISSING_FIELD(plugin.name, "extensions"));
    }
};const pluginRegistry = new Map();
const transformPluginAsProxy = (plugin, context) => {
    let propertiesAndHooks = {
        name: plugin.name
    };
    if (plugin.resolver) {
        propertiesAndHooks = Object.assign(Object.assign({}, propertiesAndHooks), { resolveId: resolverProxyHook(plugin, context) });
    }
    if (plugin.loader) {
        propertiesAndHooks = Object.assign(Object.assign({}, propertiesAndHooks), { load: loaderProxyHook(plugin, context) });
    }
    if (plugin.transpiler) {
        propertiesAndHooks = Object.assign(Object.assign({}, propertiesAndHooks), { transform: transformProxyHook(plugin, context) });
    }
    if (!plugin.transpiler && plugin.beforeBundle) {
        propertiesAndHooks = Object.assign(Object.assign({}, propertiesAndHooks), { transform: beforeBundleProxyHook(plugin, context) });
    }
    return propertiesAndHooks;
};
const createPluginManager = () => ({
    context: {},
    setContext(context) {
        this.context = context;
    },
    registerPlugin(plugin) {
        validatePlugin(plugin);
        pluginRegistry.set(plugin.name || null, Object.assign(Object.assign({}, normalizePlugin(plugin)), { transformed: false }));
    },
    prepareAndGetPlugins() {
        for (const plugin of this.getRegisteredPlugins(false)) {
            pluginRegistry.set(plugin.name, Object.assign(Object.assign({}, transformPluginAsProxy(plugin, this.context)), { transformed: true }));
        }
        return this.getRegisteredPlugins(true);
    },
    getRegisteredPlugins(onlyTransformed = true) {
        const plugins = Array.from(pluginRegistry.entries()).map((p) => (Object.assign({}, p[1])));
        return onlyTransformed ? plugins.filter(p => p.transformed) : plugins;
    }
});const pluginManager = createPluginManager();
class Packager {
    constructor(options, inputOptions = {}, outputOptions = {}) {
        this.files = [];
        this.packagerOptions = {
            cache: true,
            sourcemaps: false
        };
        this.bundleOptions = {
            dependencies: {}
        };
        this.cachedBundle = { modules: [] };
        this.packagerOptions = Object.assign(Object.assign({}, this.packagerOptions), options);
        this.inputOptions = Object.assign(Object.assign({}, inputOptions), { inlineDynamicImports: true, cache: this.packagerOptions.cache && this.cachedBundle });
        this.outputOptions = Object.assign(Object.assign({}, outputOptions), { format: "iife", sourcemap: this.packagerOptions.sourcemaps ? "inline" : false, freeze: false });
    }
    registerPlugin(plugin) {
        pluginManager.registerPlugin(plugin);
    }
    bundle(files, bundleOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.files = files;
            this.bundleOptions = Object.assign(Object.assign({}, this.bundleOptions), bundleOptions);
            try {
                // @ts-ignore
                if (!this.rollup || !window.rollup) {
                    yield loadRollup();
                    yield loadMagicString$1();
                    //@ts-ignore
                    this.rollup = window.rollup;
                }
                let entryFile;
                const packageJson = this.files.find(f => f.path === "/package.json");
                if (packageJson && packageJson.code != "") {
                    const parsed = typeof packageJson.code === "string"
                        ? JSON.parse(packageJson.code)
                        : packageJson.code;
                    const pkgBundleOptions = extractPackageJsonOptions(parsed);
                    this.bundleOptions = cjs(pkgBundleOptions, this.bundleOptions || {});
                    if (parsed.main) {
                        entryFile = findEntryFile(this.files, parsed.main.startsWith("/")
                            ? parsed.main
                            : `/${parsed.main}`);
                    }
                }
                entryFile = entryFile || findEntryFile(this.files);
                this.inputOptions = Object.assign(Object.assign({}, this.inputOptions), { input: (_a = entryFile) === null || _a === void 0 ? void 0 : _a.path, onwarn: handleBuildWarnings, plugins: pluginFactory(this.files, bundleOptions, pluginManager) });
                const bundle = yield this.rollup.rollup(this.inputOptions);
                this.cachedBundle = this.packagerOptions.cache && bundle.cache;
                const { output } = yield bundle.generate(this.outputOptions);
                return {
                    code: `${output[0].code} ${this.outputOptions.sourcemap && output[0].map
                        ? ` \n //# sourceMappingURL=${output[0].map.toUrl()}`
                        : ""}`
                };
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}return Packager;}());