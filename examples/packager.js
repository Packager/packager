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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
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

var cjs = deepmerge_1;var isObject = function (value) {
    return value && typeof value === "object" && value.constructor === Object;
};
var cacheFactory = function () {
    var cache = new Map();
    return {
        get: function (name) {
            return cache.get(name);
        },
        getAll: function () {
            return Array.from(cache.entries()).reduce(function (acc, val) {
                var _a;
                return (__assign(__assign({}, acc), (_a = {}, _a[val[0]] = val[1] || null, _a)));
            }, {});
        },
        set: function (name, value) {
            if (name == null || name == "") {
                return false;
            }
            cache.set(name, value);
            return this.has(name);
        },
        has: function (name) {
            return Boolean(this.get(name));
        },
        update: function (name, value) {
            var found = this.get(name);
            if (found) {
                if (isObject(value)) {
                    this.set(name, __assign(__assign({}, found), value));
                    return this.has(name);
                }
                else {
                    this.set(name, value);
                    return this.has(name);
                }
            }
        },
        delete: function (name) {
            return cache.delete(name);
        },
        clear: function () {
            cache.clear();
        }
    };
};
//# sourceMappingURL=application-cache.js.map
var normalizeBundleOptions = (function (bundleOptions) {
    return {
        dependencies: convertKeysToLowercase(bundleOptions.dependencies)
    };
});
var convertKeysToLowercase = function (dependencies) {
    return dependencies
        ? Object.keys(dependencies || {}).reduce(function (acc, curr) {
            var _a;
            return (__assign(__assign({}, acc), (_a = {}, _a[curr.toLowerCase()] = dependencies[curr], _a)));
        }, {})
        : {};
};
//# sourceMappingURL=normalize-bundle-options.js.map
/**
 * This is a slightly modified version of sequential-task-queue by BalassaMarton.
 * Original repo: https://github.com/BalassaMarton/sequential-task-queue
 */
/**
 * Standard cancellation reasons. {@link SequentialTaskQueue} sets {@link CancellationToken.reason}
 * to one of these values when cancelling a task for a reason other than the user code calling
 * {@link CancellationToken.cancel}.
 */
var cancellationTokenReasons = {
    /** Used when the task was cancelled in response to a call to {@link SequentialTaskQueue.cancel} */
    cancel: "Background queue has been cancelled.",
    /** Used when the task was cancelled after its timeout has passed */
    timeout: "Background queue has timed out."
};
/**
 * Standard event names used by {@link SequentialTaskQueue}
 */
var sequentialTaskQueueEvents = {
    drained: "drained",
    error: "error",
    timeout: "timeout"
};
/**
 * FIFO task queue to run tasks in predictable order, without concurrency.
 */
var SequentialTaskQueue = /** @class */ (function () {
    /**
     * Creates a new instance of {@link SequentialTaskQueue}
     * @param options - Configuration options for the task queue.
     */
    function SequentialTaskQueue(options) {
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
    Object.defineProperty(SequentialTaskQueue.prototype, "isClosed", {
        /** Indicates if the queue has been closed. Calling {@link SequentialTaskQueue.push} on a closed queue will result in an exception. */
        get: function () {
            return this._isClosed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a new task to the queue.
     * @param {string} name - The name of the task being performed
     * @param {Function} task - The function to call when the task is run
     * @param {TaskOptions} options - An object containing arguments and options for the task.
     * @returns {Promise<any>>} A promise that can be used to await or cancel the task.
     */
    SequentialTaskQueue.prototype.push = function (name, task, options) {
        var _this = this;
        if (this._isClosed)
            throw new Error(this.name + " has been previously closed");
        var taskEntry = {
            name: name,
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
                cancel: function (reason) { return _this.cancelTask(taskEntry, reason); }
            },
            resolve: undefined,
            reject: undefined
        };
        taskEntry.args.push(taskEntry.cancellationToken);
        this.queue.push(taskEntry);
        this.scheduler.schedule(function () { return _this.next(); });
        var result = new Promise(function (resolve, reject) {
            taskEntry.resolve = resolve;
            taskEntry.reject = reject;
        });
        result.cancel = function (reason) {
            return taskEntry.cancellationToken.cancel(reason);
        };
        return this.wait();
    };
    /**
     * Cancels the currently running task (if any), and clears the queue.
     * @returns {Promise} A Promise that is fulfilled when the queue is empty and the current task has been cancelled.
     */
    SequentialTaskQueue.prototype.cancel = function () {
        var _this = this;
        if (this.currentTask)
            this.cancelTask(this.currentTask, cancellationTokenReasons.cancel);
        var queue = this.queue.splice(0);
        // Cancel all and emit a drained event if there were tasks waiting in the queue
        if (queue.length) {
            queue.forEach(function (task) {
                return _this.cancelTask(task, cancellationTokenReasons.cancel);
            });
            this.emit(sequentialTaskQueueEvents.drained);
        }
        return this.wait();
    };
    /**
     * Closes the queue, preventing new tasks to be added.
     * Any calls to {@link SequentialTaskQueue.push} after closing the queue will result in an exception.
     * @param {boolean} cancel - Indicates that the queue should also be cancelled.
     * @returns {Promise} A Promise that is fulfilled when the queue has finished executing remaining tasks.
     */
    SequentialTaskQueue.prototype.close = function (cancel) {
        if (!this._isClosed) {
            this._isClosed = true;
            if (cancel)
                return this.cancel();
        }
        return this.wait();
    };
    /**
     * Returns a promise that is fulfilled when the queue is empty.
     * @returns {Promise}
     */
    SequentialTaskQueue.prototype.wait = function () {
        var _this = this;
        if (!this.currentTask && this.queue.length === 0)
            return Promise.resolve();
        return new Promise(function (resolve) {
            _this.waiters.push(resolve);
        });
    };
    /**
     * Adds an event handler for a named event.
     * @param {string} evt - Event name. See the readme for a list of valid events.
     * @param {Function} handler - Event handler. When invoking the handler, the queue will set itself as the `this` argument of the call.
     */
    SequentialTaskQueue.prototype.on = function (evt, handler) {
        this.events = this.events || {};
        (this.events[evt] || (this.events[evt] = [])).push(handler);
    };
    /**
     * Adds a single-shot event handler for a named event.
     * @param {string} evt - Event name. See the readme for a list of valid events.
     * @param {Function} handler - Event handler. When invoking the handler, the queue will set itself as the `this` argument of the call.
     */
    SequentialTaskQueue.prototype.once = function (evt, handler) {
        var _this = this;
        var cb = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.removeListener(evt, cb);
            handler.apply(_this, args);
        };
        this.on(evt, cb);
    };
    /**
     * Removes an event handler.
     * @param {string} evt - Event name
     * @param {Function} handler - Event handler to be removed
     */
    SequentialTaskQueue.prototype.removeListener = function (evt, handler) {
        if (this.events) {
            var list = this.events[evt];
            if (list) {
                var i = 0;
                while (i < list.length) {
                    if (list[i] === handler)
                        list.splice(i, 1);
                    else
                        i++;
                }
            }
        }
    };
    /** @see {@link SequentialTaskQueue.removeListener} */
    SequentialTaskQueue.prototype.off = function (evt, handler) {
        return this.removeListener(evt, handler);
    };
    SequentialTaskQueue.prototype.emit = function (evt) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.events && this.events[evt])
            try {
                this.events[evt].forEach(function (fn) { return fn.apply(_this, args); });
            }
            catch (e) {
                console.error(this.name + ": Exception in '" + evt + "' event handler", e);
            }
    };
    SequentialTaskQueue.prototype.next = function () {
        var _this = this;
        // Try running the next task, if not currently running one
        if (!this.currentTask) {
            var task_1 = this.queue.shift();
            // skip cancelled tasks
            while (task_1 && task_1.cancellationToken.cancelled)
                task_1 = this.queue.shift();
            if (task_1) {
                try {
                    this.currentTask = task_1;
                    if (task_1.timeout) {
                        task_1.timeoutHandle = setTimeout(function () {
                            var _a, _b;
                            _this.emit(sequentialTaskQueueEvents.timeout);
                            _this.cancelTask(task_1, "The task took longer than " + ((_a = task_1) === null || _a === void 0 ? void 0 : _a.timeout) + "ms and timed out in " + ((_b = task_1) === null || _b === void 0 ? void 0 : _b.name) + ".");
                        }, task_1.timeout);
                    }
                    var res = task_1.callback.apply(undefined, task_1.args);
                    if (res && isPromise(res)) {
                        res.then(function (result) {
                            task_1.result = result;
                            _this.doneTask(task_1);
                        }, function (err) {
                            _this.doneTask(task_1, err || "Task failed.");
                        });
                    }
                    else {
                        task_1.result = res;
                        this.doneTask(task_1);
                    }
                }
                catch (e) {
                    this.doneTask(task_1, e);
                }
            }
            else {
                // queue is empty, call waiters
                this.callWaiters();
            }
        }
    };
    SequentialTaskQueue.prototype.cancelTask = function (task, reason) {
        task.cancellationToken.cancelled = true;
        task.cancellationToken.reason = reason;
        this.doneTask(task);
    };
    SequentialTaskQueue.prototype.doneTask = function (task, error) {
        var _this = this;
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
                this.scheduler.schedule(function () { return _this.next(); });
        }
    };
    SequentialTaskQueue.prototype.callWaiters = function () {
        var waiters = this.waiters.splice(0);
        waiters.forEach(function (waiter) { return waiter(); });
    };
    SequentialTaskQueue.defaultScheduler = {
        schedule: function (callback) { return setTimeout(callback, 0); }
    };
    return SequentialTaskQueue;
}());
function noop() { }
function isPromise(obj) {
    return obj && typeof obj.then === "function";
}
SequentialTaskQueue.defaultScheduler = {
    schedule: typeof setImmediate === "function"
        ? function (callback) { return setImmediate(callback); }
        : function (callback) { return setTimeout(callback, 0); }
};
//# sourceMappingURL=queue-system.js.map
var absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|\/])/;
function isAbsolute(path) {
    return absolutePath.test(path);
}
function basename(path) {
    return path.split(/(\/|\\)/).pop();
}
function dirname(path) {
    var match = /(\/|\\)[^\/\\]*$/.exec(path);
    if (!match)
        return ".";
    var dir = path.slice(0, -match[0].length);
    // If `dir` is the empty string, we're at root.
    return dir ? dir : "/";
}
function extname(path) {
    var bname = basename(path);
    if (!bname)
        return "";
    var match = /\.[^\.]+$/.exec(bname);
    if (!match)
        return "";
    return match[0];
}
function resolve() {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    var resolvedParts = paths.shift().split(/[\/\\]/);
    paths.forEach(function (path) {
        if (isAbsolute(path)) {
            resolvedParts = path.split(/[\/\\]/);
        }
        else {
            var parts = path.split(/[\/\\]/);
            while (parts[0] === "." || parts[0] === "..") {
                var part = parts.shift();
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
var sep = "/";
//# sourceMappingURL=path.js.map
var isModuleExternal = (function (modulePath) {
    return !modulePath.startsWith(".") && !modulePath.startsWith("/");
});
//# sourceMappingURL=is-module-external.js.map
var resolveRelative = function (childPath, parentPath, context, pathOnly) {
    if (pathOnly === void 0) { pathOnly = true; }
    var retryFileFind = function (path) {
        return context.files.find(function (f) {
            return f.path === path + "/index.js" ||
                f.path === path + "/index.ts" ||
                f.path === path + "/index.jsx" ||
                f.path === path + "/index.tsx" ||
                f.path === path + ".js" ||
                f.path === path + ".ts" ||
                f.path === path + ".jsx" ||
                f.path === path + ".tsx";
        }) || null;
    };
    var resolved = resolve(dirname(parentPath), childPath).replace(/^\.\//, "");
    var foundFile = context.files.find(function (f) { return f.path === resolved; });
    if (foundFile)
        return pathOnly ? foundFile.path : foundFile;
    var absolute = resolve(dirname(parentPath), childPath);
    var retriedFile = retryFileFind(absolute);
    if (!retriedFile)
        return null;
    return pathOnly ? retriedFile.path || null : retriedFile || null;
};
var resolveRelativeExternal = function (childPath, parentPath, context) {
    if (!parentPath.startsWith("@")) {
        if (!!~parentPath.indexOf("/")) {
            var cachedParent = context.cache.dependencies.get(parentPath);
            if (cachedParent) {
                var relativeExternalUrl = new URL(cachedParent.meta.url)
                    .pathname;
                return resolve(dirname(relativeExternalUrl), childPath);
            }
            return resolve(dirname("/" + parentPath), childPath).replace(/^\.\//, "");
        }
        return resolve("/" + parentPath, childPath);
    }
    throw new Error("Module " + childPath + " has a parent " + parentPath + " with @.");
};
function dependencyResolver(context) {
    return {
        name: "packager::resolver::dependency-resolver",
        resolveId: function (modulePath, parent) {
            if (!parent)
                return modulePath;
            if (isModuleExternal(modulePath))
                return modulePath;
            var relativePath = (resolveRelative(modulePath, parent, context));
            if (relativePath)
                return relativePath;
            if (!parent.startsWith(".") ||
                !parent.startsWith("/") ||
                isModuleExternal(parent)) {
                var pkgPath = resolveRelativeExternal(modulePath, parent, context);
                return {
                    id: pkgPath.substr(1)
                };
            }
            throw new Error("Could not resolve '" + modulePath + "' from '" + parent + "'");
        }
    };
}
//# sourceMappingURL=dependency-resolver.js.map
/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
var operators = {
    "==": function (x) { return equals(x.left, x.right, false); },
    "!=": function (x) { return not(operators["=="](x)); },
    "===": function (x) { return equals(x.left, x.right, true); },
    "!==": function (x) { return not(operators["==="](x)); },
    "!": function (x) { return isFalsy(x.argument); },
    "&&": function (x) { return isTruthy(x.left) && isTruthy(x.right); },
    "||": function (x) { return isTruthy(x.left) || isTruthy(x.right); }
};
var extractors = {
    Identifier: function (names, node) {
        names.push(node.name);
    },
    ObjectPattern: function (names, node) {
        node.properties.forEach(function (prop) {
            getExtractor(prop.value.type)(names, prop.value);
        });
    },
    ArrayPattern: function (names, node) {
        node.elements.forEach(function (element) {
            if (!element)
                return;
            getExtractor(element.type)(names, element);
        });
    },
    RestElement: function (names, node) {
        getExtractor(node.argument.type)(names, node.argument);
    },
    AssignmentPattern: function (names, node) {
        getExtractor(node.left.type)(names, node.left);
    },
    MemberExpression: function () { }
};
var flatten = function (node) {
    var parts = [];
    while (node.type === "MemberExpression") {
        if (node.computed)
            return null;
        parts.unshift(node.property.name);
        // eslint-disable-next-line no-param-reassign
        node = node.object;
    }
    if (node.type !== "Identifier")
        return null;
    var name = node.name;
    parts.unshift(name);
    return { name: name, keypath: parts.join(".") };
};
var getExtractor = function (type) {
    var extractor = extractors[type];
    if (!extractor)
        throw new SyntaxError(type + " pattern not supported.");
    return extractor;
};
var isTruthy = function (node) {
    if (node.type === "Literal")
        return !!node.value;
    if (node.type === "ParenthesizedExpression")
        return isTruthy(node.expression);
    if (node.operator in operators)
        return operators[node.operator](node);
    return undefined;
};
var isFalsy = function (node) {
    return not(isTruthy(node));
};
var not = function (value) {
    return value === undefined ? value : !value;
};
var equals = function (a, b, strict) {
    if (a.type !== b.type)
        return undefined;
    // eslint-disable-next-line eqeqeq
    if (a.type === "Literal")
        return strict ? a.value === b.value : a.value == b.value;
    return undefined;
};
var isReference = function (node, parent) {
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
};
//# sourceMappingURL=ast-utils.js.map
function walk(ast, { enter, leave }) {
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
var PROXY_SUFFIX = "?commonjs-proxy";
var getProxyId = function (id) { return "\0" + id + PROXY_SUFFIX; };
var getIdFromProxyId = function (proxyId) {
    return proxyId.slice(1, -PROXY_SUFFIX.length);
};
var EXTERNAL_SUFFIX = "?commonjs-external";
var getExternalProxyId = function (id) { return "\0" + id + EXTERNAL_SUFFIX; };
var getIdFromExternalProxyId = function (proxyId) {
    return proxyId.slice(1, -EXTERNAL_SUFFIX.length);
};
var HELPERS_ID = "\0commonjsHelpers.js";
// `x['default']` is used instead of `x.default` for backward compatibility with ES3 browsers.
// Minifiers like uglify will usually transpile it back if compatibility with ES3 is not enabled.
var HELPERS = "\nexport var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};\n\nexport function commonjsRequire () {\n    throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');\n}\n\nexport function unwrapExports (x) {\n    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;\n}\n\nexport function createCommonjsModule(fn, module) {\n    return module = { exports: {} }, fn(module, module.exports), module.exports;\n}\n\nexport function getCjsExportFromNamespace (n) {\n    return n && n['default'] || n;\n}\n\nexport default {\n    commonjsRequire,\n    unwrapExports,\n    createCommonjsModule,\n    getCjsExportFromNamespace\n}";
var extractAssignedNames = function (param) {
    var names = [];
    extractors[param.type](names, param);
    return names;
};
var blockDeclarations = {
    const: true,
    let: true
};
var Scope = /** @class */ (function () {
    function Scope(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.parent = options.parent;
        this.isBlockScope = !!options.block;
        this.declarations = Object.create(null);
        if (options.params) {
            options.params.forEach(function (param) {
                extractAssignedNames(param).forEach(function (name) {
                    _this.declarations[name] = true;
                });
            });
        }
    }
    Scope.prototype.addDeclaration = function (node, isBlockDeclaration, isVar) {
        var _this = this;
        if (!isBlockDeclaration && this.isBlockScope) {
            // it's a `var` or function node, and this
            // is a block scope, so we need to go up
            this.parent.addDeclaration(node, isBlockDeclaration, isVar);
        }
        else if (node.id) {
            extractAssignedNames(node.id).forEach(function (name) {
                _this.declarations[name] = true;
            });
        }
    };
    Scope.prototype.contains = function (name) {
        return (this.declarations[name] ||
            (this.parent ? this.parent.contains(name) : false));
    };
    return Scope;
}());
var attachScopes = function (ast, propertyName) {
    if (propertyName === void 0) { propertyName = "scope"; }
    var scope = new Scope();
    walk(ast, {
        enter: function (n, parent) {
            var node = n;
            // function foo () {...}
            // class Foo {...}
            if (/(Function|Class)Declaration/.test(node.type)) {
                scope.addDeclaration(node, false, false);
            }
            // var foo = 1
            if (node.type === "VariableDeclaration") {
                var kind = node.kind;
                var isBlockDeclaration_1 = blockDeclarations[kind];
                // don't add const/let declarations in the body of a for loop #113
                var parentType = parent ? parent.type : "";
                if (!(isBlockDeclaration_1 && /ForOfStatement/.test(parentType))) {
                    node.declarations.forEach(function (declaration) {
                        scope.addDeclaration(declaration, isBlockDeclaration_1, true);
                    });
                }
            }
            var newScope;
            // create new function scope
            if (/Function/.test(node.type)) {
                var func = node;
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
        leave: function (n) {
            var node = n;
            if (node[propertyName])
                scope = scope.parent;
        }
    });
    return scope;
};
var reservedWords = "break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public";
var builtins = "arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl";
var forbiddenIdentifiers = new Set((reservedWords + " " + builtins).split(" "));
forbiddenIdentifiers.add("");
var makeLegalIdentifier = function (str) {
    var identifier = str
        .replace(/-(\w)/g, function (_, letter) { return letter.toUpperCase(); })
        .replace(/[^$_a-zA-Z0-9]/g, "_");
    if (/\d/.test(identifier[0]) || forbiddenIdentifiers.has(identifier)) {
        identifier = "_" + identifier;
    }
    return identifier || "_";
};
var getName = function (id) {
    var name = makeLegalIdentifier(basename("" + id + extname(id)));
    if (name !== "index") {
        return name;
    }
    var segments = dirname(id).split(sep);
    return makeLegalIdentifier(segments[segments.length - 1]);
};
//# sourceMappingURL=helpers.js.map
/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
function getCandidatesForExtension(resolved, extension) {
    return [resolved + extension, "" + resolved + sep + "index" + extension];
}
function getCandidates(resolved, extensions) {
    return extensions.reduce(function (paths, extension) {
        return paths.concat(getCandidatesForExtension(resolved, extension));
    }, [resolved]);
}
function commonjsResolver(context) {
    var extensions = [".js"];
    function resolveExtensions(importee, importer) {
        if (importee[0] !== "." || !importer)
            return null;
        var resolved = resolve(dirname(importer), importee);
        var candidates = getCandidates(resolved, extensions);
        for (var i = 0; i < candidates.length; i += 1) {
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
        resolveId: function (importee, importer) {
            var isProxyModule = importee.endsWith(PROXY_SUFFIX);
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
            return this.resolve(importee, importer, { skipSelf: true }).then(function (resolved) {
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
}
//# sourceMappingURL=commonjs-resolver.js.map
var resolvers = (function (context) { return [
    commonjsResolver(),
    dependencyResolver(context)
]; });
//# sourceMappingURL=index.js.map
var verifyExtensions = (function (extensions) {
    var regex = new RegExp("\\" + extensions.join("$|\\") + "$", "i");
    return function (path, ignoreExternal) {
        if (ignoreExternal === void 0) { ignoreExternal = true; }
        var external = isModuleExternal(path);
        return (regex.test(path) &&
            ((external && !ignoreExternal) || !external ? true : false));
    };
});
//# sourceMappingURL=verify-extensions.js.map
/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
var blacklist = { __esModule: true };
var exportsPattern = /^(?:module\.)?exports(?:\.([a-zA-Z_$][a-zA-Z_$0-9]*))?$/;
var firstpassGlobal = /\b(?:require|module|exports|global)\b/;
var firstpassNoGlobal = /\b(?:require|module|exports)\b/;
var importExportDeclaration = /^(?:Import|Export(?:Named|Default))Declaration/;
var functionType = /^(?:FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/;
var deconflict = function (scope, globals, identifier) {
    var i = 1;
    var deconflicted = identifier;
    while (scope.contains(deconflicted) ||
        globals.has(deconflicted) ||
        deconflicted in blacklist) {
        deconflicted = identifier + "_" + i;
        i += 1;
    }
    scope.declarations[deconflicted] = true;
    return deconflicted;
};
var tryParse = function (parse, code, id) {
    try {
        return parse(code, { allowReturnOutsideFunction: true });
    }
    catch (err) {
        err.message += " in " + id;
        throw err;
    }
};
var hasCjsKeywords = function (code, ignoreGlobal) {
    var firstpass = ignoreGlobal ? firstpassNoGlobal : firstpassGlobal;
    return firstpass.test(code);
};
var checkEsModule = function (parse, code, id) {
    var e_1, _a, e_2, _b;
    var ast = tryParse(parse, code, id);
    var isEsModule = false;
    try {
        for (var _c = __values(ast.body), _d = _c.next(); !_d.done; _d = _c.next()) {
            var node = _d.value;
            if (node.type === "ExportDefaultDeclaration")
                return { isEsModule: true, hasDefaultExport: true, ast: ast };
            if (node.type === "ExportNamedDeclaration") {
                isEsModule = true;
                try {
                    for (var _e = (e_2 = void 0, __values(node.specifiers)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var specifier = _f.value;
                        if (specifier.exported.name === "default") {
                            return { isEsModule: true, hasDefaultExport: true, ast: ast };
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else if (importExportDeclaration.test(node.type))
                isEsModule = true;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return { isEsModule: isEsModule, hasDefaultExport: false, ast: ast };
};
var loadMagicString = function () {
    return new Promise(function (resolve) {
        var script = document.createElement("script");
        script.src =
            "https://unpkg.com/@bloxy/iife-libs@0.0.4/libs/magic-string.js";
        script.setAttribute("data-packager", "true");
        script.onload = resolve;
        document.head.appendChild(script);
    });
};
function performTransformation (parse, code, id, isEntry, ignoreGlobal, ignoreRequire, customNamedExports, sourceMap, allowDynamicRequire, astCache, context) {
    return __awaiter(this, void 0, void 0, function () {
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
            var sourceId = getRequireStringArg(node);
            var existing = required[sourceId];
            // eslint-disable-next-line no-undefined
            if (existing === undefined) {
                if (!name) {
                    do {
                        name = "require$$" + uid;
                        uid += 1;
                    } while (scope.contains(name));
                }
                sources.push(sourceId);
                required[sourceId] = {
                    source: sourceId,
                    name: name,
                    importsDefault: false
                };
            }
            return required[sourceId];
        }
        function addExport(x) {
            var deconflicted = deconflict(scope, globals, name);
            var declaration = deconflicted === name
                ? "export var " + x + " = " + moduleName + "." + x + ";"
                : "var " + deconflicted + " = " + moduleName + "." + x + ";\nexport { " + deconflicted + " as " + x + " };";
            namedExportDeclarations.push({
                str: declaration,
                name: x
            });
        }
        var ast, magicString, required, sources, uid, scope, lexicalDepth, programDepth, shouldWrap, uses, globals, HELPERS_NAME, namedExports, assignedTo, includeHelpers, importBlock, namedExportDeclarations, wrapperStart, wrapperEnd, moduleName, exportModuleExports, name, defaultExportPropertyAssignments, hasDefaultExport, args, names_1, isIifeOrUmd, defaultExport, named, exportBlock, map;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!window.magicString) return [3 /*break*/, 2];
                    return [4 /*yield*/, loadMagicString()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    ast = astCache || tryParse(parse, code, id);
                    magicString = new window.magicString.default(code);
                    required = {};
                    sources = [];
                    uid = 0;
                    scope = attachScopes(ast, "scope");
                    lexicalDepth = 0;
                    programDepth = 0;
                    shouldWrap = /__esModule/.test(code);
                    uses = {
                        module: false,
                        exports: false,
                        global: false,
                        require: false
                    };
                    globals = new Set();
                    HELPERS_NAME = deconflict(scope, globals, "commonjsHelpers");
                    namedExports = {};
                    assignedTo = new Set();
                    walk(ast, {
                        enter: function (node) {
                            if (node.type !== "AssignmentExpression")
                                return;
                            if (node.left.type === "MemberExpression")
                                return;
                            extractAssignedNames(node.left).forEach(function (name) {
                                assignedTo.add(name);
                            });
                        }
                    });
                    walk(ast, {
                        enter: function (node, parent) {
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
                                (scope = node.scope);
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
                                    magicString.overwrite(node.start, node.end, HELPERS_NAME + ".commonjsGlobal", {
                                        storeName: true
                                    });
                                return;
                            }
                            // rewrite `typeof module`, `typeof module.exports` and `typeof exports` (https://github.com/rollup/rollup-plugin-commonjs/issues/151)
                            if (node.type === "UnaryExpression" && node.operator === "typeof") {
                                var flattened = flatten(node.argument);
                                if (!flattened)
                                    return;
                                if (scope.contains(flattened.name))
                                    return;
                                if (flattened.keypath === "module.exports" ||
                                    flattened.keypath === "module" ||
                                    flattened.keypath === "exports") {
                                    magicString.overwrite(node.start, node.end, "'object'", {
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
                                            magicString.overwrite(node.start, node.end, HELPERS_NAME + ".commonjsRequire", {
                                                storeName: true
                                            });
                                        }
                                        uses[node.name] = true;
                                        if (node.name === "global" && !ignoreGlobal) {
                                            magicString.overwrite(node.start, node.end, HELPERS_NAME + ".commonjsGlobal", {
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
                                var flattened = flatten(node.left);
                                if (!flattened)
                                    return;
                                if (scope.contains(flattened.name))
                                    return;
                                var match = exportsPattern.exec(flattened.keypath);
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
                                    node.right.properties.forEach(function (prop) {
                                        if (prop.computed ||
                                            !("key" in prop) ||
                                            prop.key.type !== "Identifier")
                                            return;
                                        var name = prop.key.name;
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
                                var required_1 = getRequired(node.init, node.id.name);
                                required_1.importsDefault = true;
                                if (required_1.name === node.id.name) {
                                    node._shouldRemove = true;
                                }
                            }
                            if (!isStaticRequireStatement(node))
                                return;
                            var required = getRequired(node);
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
                        leave: function (node) {
                            programDepth -= 1;
                            if (node.scope)
                                scope = scope.parent;
                            if (functionType.test(node.type))
                                lexicalDepth -= 1;
                            if (node.type === "VariableDeclaration") {
                                var keepDeclaration = false;
                                var c = node.declarations[0].start;
                                for (var i = 0; i < node.declarations.length; i += 1) {
                                    var declarator = node.declarations[i];
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
                            throw new Error("Custom named exports were specified for " + id + " but it does not appear to be a CommonJS module");
                        }
                        // not a CommonJS module
                        return [2 /*return*/, null];
                    }
                    includeHelpers = shouldWrap || uses.global || uses.require;
                    importBlock = (includeHelpers
                        ? ["import * as " + HELPERS_NAME + " from '" + HELPERS_ID + "';"]
                        : [])
                        .concat(sources.map(function (source) {
                        // import the actual module before the proxy, so that we know
                        // what kind of proxy to build
                        return "import '" + source + "';";
                    }), sources.map(function (source) {
                        var _a = required[source], name = _a.name, importsDefault = _a.importsDefault;
                        return "import " + (importsDefault ? name + " from " : "") + "'" + getProxyId(source) + "';";
                    }))
                        .join("\n") + "\n\n";
                    namedExportDeclarations = [];
                    wrapperStart = "";
                    wrapperEnd = "";
                    moduleName = deconflict(scope, globals, getName(id));
                    if (!isEntry) {
                        exportModuleExports = {
                            str: "export { " + moduleName + " as __moduleExports };",
                            name: "__moduleExports"
                        };
                        namedExportDeclarations.push(exportModuleExports);
                    }
                    name = getName(id);
                    if (customNamedExports)
                        customNamedExports.forEach(addExport);
                    defaultExportPropertyAssignments = [];
                    hasDefaultExport = false;
                    if (shouldWrap) {
                        args = "module" + (uses.exports ? ", exports" : "");
                        wrapperStart = "var " + moduleName + " = " + HELPERS_NAME + ".createCommonjsModule(function (" + args + ") {\n";
                        wrapperEnd = "\n});";
                    }
                    else {
                        names_1 = [];
                        ast.body.forEach(function (node) {
                            if (node.type === "ExpressionStatement" &&
                                node.expression.type === "AssignmentExpression") {
                                var left = node.expression.left;
                                var flattened = flatten(left);
                                if (!flattened)
                                    return;
                                var match = exportsPattern.exec(flattened.keypath);
                                if (!match)
                                    return;
                                if (flattened.keypath === "module.exports") {
                                    hasDefaultExport = true;
                                    magicString.overwrite(left.start, left.end, "var " + moduleName);
                                }
                                else {
                                    var _a = __read(match, 2), name_1 = _a[1];
                                    var deconflicted = deconflict(scope, globals, name_1);
                                    names_1.push({ name: name_1, deconflicted: deconflicted });
                                    magicString.overwrite(node.start, left.end, "var " + deconflicted);
                                    var declaration = name_1 === deconflicted
                                        ? "export { " + name_1 + " };"
                                        : "export { " + deconflicted + " as " + name_1 + " };";
                                    if (name_1 !== "default") {
                                        namedExportDeclarations.push({
                                            str: declaration,
                                            name: name_1
                                        });
                                        delete namedExports[name_1];
                                    }
                                    defaultExportPropertyAssignments.push(moduleName + "." + name_1 + " = " + deconflicted + ";");
                                }
                            }
                        });
                        if (!hasDefaultExport && (names_1.length || !isEntry)) {
                            wrapperEnd = "\n\nvar " + moduleName + " = {\n" + names_1
                                .map(function (_a) {
                                var name = _a.name, deconflicted = _a.deconflicted;
                                return "\t" + name + ": " + deconflicted;
                            })
                                .join(",\n") + "\n};";
                        }
                    }
                    Object.keys(namedExports)
                        .filter(function (key) { return !blacklist[key]; })
                        .forEach(addExport);
                    isIifeOrUmd = /__esModule/.test(code);
                    defaultExport = isIifeOrUmd
                        ? "export default " + HELPERS_NAME + ".unwrapExports(" + moduleName + ");"
                        : "export default " + moduleName + ";";
                    if (isIifeOrUmd) {
                        context.cache.dependencies.update(id, { iife: true });
                    }
                    named = namedExportDeclarations
                        .filter(function (x) { return x.name !== "default" || !hasDefaultExport; })
                        .map(function (x) { return x.str; });
                    exportBlock = "\n\n window.__dependencies['" + id + "'] = " + moduleName + "; " + [
                        defaultExport
                    ]
                        .concat(named)
                        .concat(hasDefaultExport ? defaultExportPropertyAssignments : [])
                        .join("\n");
                    magicString
                        .trim()
                        .prepend(importBlock + wrapperStart)
                        .trim()
                        .append(wrapperEnd);
                    if (hasDefaultExport || named.length > 0 || shouldWrap || !isEntry) {
                        magicString.append(exportBlock);
                    }
                    code = magicString.toString();
                    map = sourceMap ? magicString.generateMap() : null;
                    return [2 /*return*/, { code: code, map: map }];
            }
        });
    });
}
//# sourceMappingURL=perform-transform.js.map
/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
var isCjsPromises = new Map();
var getIsCjsPromise = function (id) {
    return new Promise(function (resolve) { return resolve(isCjsPromises.get(id) || false); });
};
var setIsCjsPromise = function (id, is) {
    return isCjsPromises.set(id, is);
};
//# sourceMappingURL=is-cjs-promise.js.map
/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
var isNotTransformable = function (modulePath, couldBeCjs) {
    return !couldBeCjs(modulePath) &&
        !modulePath.endsWith("?commonjs-proxy") &&
        !isModuleExternal(modulePath);
};
function commonjsTransformer(context) {
    var transformerName = "packager::transformer::commonjs-transformer";
    var couldBeCjs = verifyExtensions([".js"]);
    return {
        name: transformerName,
        transform: function (code, modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var cachedDependency, options, ignoreGlobal, sourceMap, allowDynamicRequire, ignoreRequire, customNamedExports, _a, isEsModule, hasDefaultExport, ast, normalizedId, transformed;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (isNotTransformable(modulePath, couldBeCjs))
                                return [2 /*return*/, null];
                            cachedDependency = context.cache.dependencies.get(modulePath);
                            if (cachedDependency && cachedDependency.transformedCode) {
                                code = "const __default = window.__dependencies['" + modulePath + "']; export default __default;";
                                return [2 /*return*/, { code: code, syntheticNamedExports: true }];
                            }
                            options = {};
                            ignoreGlobal = true;
                            sourceMap = true;
                            allowDynamicRequire = true;
                            ignoreRequire = typeof options.ignore === "function"
                                ? options.ignore
                                : Array.isArray(options.ignore)
                                    ? function (modulePath) {
                                        return options.ignore.includes(modulePath);
                                    }
                                    : function () { return false; };
                            customNamedExports = {};
                            _a = checkEsModule(
                            // @ts-ignore
                            this.parse, code, modulePath), isEsModule = _a.isEsModule, hasDefaultExport = _a.hasDefaultExport, ast = _a.ast;
                            if (isEsModule) {
                                (hasDefaultExport
                                    ? context.cache.esModulesWithDefaultExport
                                    : context.cache.esModulesWithoutDefaultExport).add(modulePath);
                                return [2 /*return*/, null];
                            }
                            // it is not an ES module but it does not have CJS-specific elements.
                            if (!hasCjsKeywords(code, ignoreGlobal)) {
                                context.cache.esModulesWithoutDefaultExport.add(modulePath);
                                return [2 /*return*/, null];
                            }
                            normalizedId = normalize(modulePath);
                            return [4 /*yield*/, performTransformation(
                                // @ts-ignore
                                this.parse, code, modulePath, 
                                // @ts-ignore
                                this.getModuleInfo(modulePath).isEntry, ignoreGlobal, ignoreRequire, customNamedExports[normalizedId], sourceMap, allowDynamicRequire, ast, context)];
                        case 1:
                            transformed = _b.sent();
                            setIsCjsPromise(modulePath, Boolean(transformed));
                            if (transformed) {
                                context.cache.dependencies.update(modulePath, {
                                    transformedCode: transformed.code
                                });
                                return [2 /*return*/, {
                                        code: transformed.code || "",
                                        map: transformed.map || { mappings: "" },
                                        syntheticNamedExports: true
                                    }];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map
var TRANSPILE_STATUS = {
    PREPARE_FILES: "transpiler:file:prepare",
    PREPARE_ADDITIONAL: "transpiler:additional:prepare",
    ADDITIONAL_TRANSPILED: "transpiler:additional:transpiled",
    TRANSPILE_COMPLETE: "transpiler:transpile:complete",
    ERROR_PREPARING_AND_COMPILING: "transpiler:error:compile",
    ERROR_ADDITIONAL: "transpiler:error:additional"
};
var Transpiler = /** @class */ (function () {
    function Transpiler(name, worker, context) {
        this.name = name;
        this.worker = worker;
        this.context = context;
    }
    Transpiler.prototype.doTranspile = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.worker) {
                return resolve(file);
            }
            _this.worker.onmessage = function (_a) {
                var data = _a.data;
                return __awaiter(_this, void 0, void 0, function () {
                    var file, type, error, additional, additionalTranspiled, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                file = data.file, type = data.type, error = data.error, additional = data.additional;
                                if (type === TRANSPILE_STATUS.ERROR_ADDITIONAL ||
                                    type === TRANSPILE_STATUS.ERROR_PREPARING_AND_COMPILING) {
                                    return [2 /*return*/, reject(error)];
                                }
                                if (!(type === TRANSPILE_STATUS.PREPARE_ADDITIONAL)) return [3 /*break*/, 4];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, this.transpileAdditional(additional)];
                            case 2:
                                additionalTranspiled = _b.sent();
                                this.worker.postMessage({
                                    type: TRANSPILE_STATUS.ADDITIONAL_TRANSPILED,
                                    file: file,
                                    additional: additionalTranspiled,
                                    context: {
                                        files: this.context.files
                                    }
                                });
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _b.sent();
                                return [2 /*return*/, reject(error_1)];
                            case 4:
                                if (type === TRANSPILE_STATUS.TRANSPILE_COMPLETE) {
                                    return [2 /*return*/, resolve(file)];
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            };
            _this.worker.postMessage({
                type: TRANSPILE_STATUS.PREPARE_FILES,
                file: file,
                context: {
                    files: _this.context.files
                }
            });
        });
    };
    Transpiler.prototype.transpileAdditional = function (_a) {
        var styles = _a.styles, html = _a.html;
        return __awaiter(this, void 0, void 0, function () {
            var stylePromises, styles_1, styles_1_1, style, code, scopeId, path, lang, transpiler, _b;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        stylePromises = [];
                        try {
                            for (styles_1 = __values(styles), styles_1_1 = styles_1.next(); !styles_1_1.done; styles_1_1 = styles_1.next()) {
                                style = styles_1_1.value;
                                code = style.code, scopeId = style.scopeId, path = style.path, lang = style.lang;
                                transpiler = this.fetchTranspiler(style.lang);
                                stylePromises.push(transpiler.transpile({ code: code, scopeId: scopeId, lang: lang, path: path }));
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (styles_1_1 && !styles_1_1.done && (_c = styles_1.return)) _c.call(styles_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        _b = {};
                        return [4 /*yield*/, Promise.all(stylePromises)];
                    case 1: return [2 /*return*/, (_b.styles = _d.sent(),
                            _b)];
                }
            });
        });
    };
    Transpiler.prototype.fetchTranspiler = function (lang) {
        // @ts-ignore
        var transpiler = this.additionalTranspilers[lang];
        if (transpiler) {
            var activeTranspiler = this.context.cache.transpilers.get(lang + "-transpiler");
            if (activeTranspiler)
                return activeTranspiler;
            transpiler = new transpiler(this.context);
            this.context.cache.transpilers.set(lang + "-transpiler", transpiler);
            return transpiler;
        }
        throw Error("Additional transpiler (" + lang + "-transpiler) does not exist or isn't supported for " + this.name);
    };
    return Transpiler;
}());
//# sourceMappingURL=transpiler.js.map
const kIsNodeJS = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
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
const WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0NCg0KZnVuY3Rpb24gX192YWx1ZXMobykgew0KICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gImZ1bmN0aW9uIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwOw0KICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pOw0KICAgIHJldHVybiB7DQogICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHsNCiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7DQogICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07DQogICAgICAgIH0NCiAgICB9Ow0KfQoKdmFyIGFic29sdXRlUGF0aCA9IC9eKD86XC98KD86W0EtWmEtel06KT9bXFx8XC9dKS87CmZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aCkgewogICAgcmV0dXJuIGFic29sdXRlUGF0aC50ZXN0KHBhdGgpOwp9CmZ1bmN0aW9uIGRpcm5hbWUocGF0aCkgewogICAgdmFyIG1hdGNoID0gLyhcL3xcXClbXlwvXFxdKiQvLmV4ZWMocGF0aCk7CiAgICBpZiAoIW1hdGNoKQogICAgICAgIHJldHVybiAiLiI7CiAgICB2YXIgZGlyID0gcGF0aC5zbGljZSgwLCAtbWF0Y2hbMF0ubGVuZ3RoKTsKICAgIC8vIElmIGBkaXJgIGlzIHRoZSBlbXB0eSBzdHJpbmcsIHdlJ3JlIGF0IHJvb3QuCiAgICByZXR1cm4gZGlyID8gZGlyIDogIi8iOwp9CmZ1bmN0aW9uIHJlc29sdmUoKSB7CiAgICB2YXIgcGF0aHMgPSBbXTsKICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7CiAgICAgICAgcGF0aHNbX2ldID0gYXJndW1lbnRzW19pXTsKICAgIH0KICAgIHZhciByZXNvbHZlZFBhcnRzID0gcGF0aHMuc2hpZnQoKS5zcGxpdCgvW1wvXFxdLyk7CiAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uIChwYXRoKSB7CiAgICAgICAgaWYgKGlzQWJzb2x1dGUocGF0aCkpIHsKICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cyA9IHBhdGguc3BsaXQoL1tcL1xcXS8pOwogICAgICAgIH0KICAgICAgICBlbHNlIHsKICAgICAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgvW1wvXFxdLyk7CiAgICAgICAgICAgIHdoaWxlIChwYXJ0c1swXSA9PT0gIi4iIHx8IHBhcnRzWzBdID09PSAiLi4iKSB7CiAgICAgICAgICAgICAgICB2YXIgcGFydCA9IHBhcnRzLnNoaWZ0KCk7CiAgICAgICAgICAgICAgICBpZiAocGFydCA9PT0gIi4uIikgewogICAgICAgICAgICAgICAgICAgIHJlc29sdmVkUGFydHMucG9wKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cy5wdXNoLmFwcGx5KHJlc29sdmVkUGFydHMsIHBhcnRzKTsKICAgICAgICB9CiAgICB9KTsKICAgIHJldHVybiBub3JtYWxpemUocmVzb2x2ZWRQYXJ0cy5qb2luKCIvIikpOwp9CmZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoKSB7CiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cL1wvL2dpLCAiLyIpOwp9Cgp2YXIgVFJBTlNQSUxFX1NUQVRVUyA9IHsKICAgIFBSRVBBUkVfRklMRVM6ICJ0cmFuc3BpbGVyOmZpbGU6cHJlcGFyZSIsCiAgICBQUkVQQVJFX0FERElUSU9OQUw6ICJ0cmFuc3BpbGVyOmFkZGl0aW9uYWw6cHJlcGFyZSIsCiAgICBBRERJVElPTkFMX1RSQU5TUElMRUQ6ICJ0cmFuc3BpbGVyOmFkZGl0aW9uYWw6dHJhbnNwaWxlZCIsCiAgICBUUkFOU1BJTEVfQ09NUExFVEU6ICJ0cmFuc3BpbGVyOnRyYW5zcGlsZTpjb21wbGV0ZSIsCiAgICBFUlJPUl9QUkVQQVJJTkdfQU5EX0NPTVBJTElORzogInRyYW5zcGlsZXI6ZXJyb3I6Y29tcGlsZSIsCiAgICBFUlJPUl9BRERJVElPTkFMOiAidHJhbnNwaWxlcjplcnJvcjphZGRpdGlvbmFsIgp9OwoKc2VsZi5pbXBvcnRTY3JpcHRzKCJodHRwczovL3VucGtnLmNvbS9zYXNzLmpzQGxhdGVzdC9kaXN0L3Nhc3Muc3luYy5qcyIpOwpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiAoX2EpIHsKICAgIHZhciBkYXRhID0gX2EuZGF0YTsKICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBmaWxlLCB0eXBlLCBjb250ZXh0LCB0cmFuc3BpbGVkRmlsZSwgZXJyb3JfMTsKICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7CiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHsKICAgICAgICAgICAgICAgIGNhc2UgMDoKICAgICAgICAgICAgICAgICAgICBmaWxlID0gZGF0YS5maWxlLCB0eXBlID0gZGF0YS50eXBlLCBjb250ZXh0ID0gZGF0YS5jb250ZXh0OwogICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGUgPT09IFRSQU5TUElMRV9TVEFUVVMuUFJFUEFSRV9GSUxFUykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTsKICAgICAgICAgICAgICAgIGNhc2UgMToKICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsIDMsICwgNF0pOwogICAgICAgICAgICAgICAgICAgIHNldHVwU2Fzcyhjb250ZXh0KTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0cmFuc3BpbGVGaWxlKGZpbGUpXTsKICAgICAgICAgICAgICAgIGNhc2UgMjoKICAgICAgICAgICAgICAgICAgICB0cmFuc3BpbGVkRmlsZSA9IF9iLnNlbnQoKTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLAogICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiB0cmFuc3BpbGVkRmlsZQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgY2FzZSAzOgogICAgICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYi5zZW50KCk7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX1BSRVBBUklOR19BTkRfQ09NUElMSU5HLAogICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JfMQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgIH0pOwp9KTsKdmFyIHNldHVwU2FzcyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7CiAgICB2YXIgZV8xLCBfYTsKICAgIHZhciBzYXNzRmlsZXMgPSBjb250ZXh0LmZpbGVzLmZpbHRlcihmdW5jdGlvbiAoZikgeyByZXR1cm4gZi5wYXRoLmVuZHNXaXRoKCIuc2FzcyIpIHx8IGYucGF0aC5lbmRzV2l0aCgiLnNjc3MiKTsgfSk7CiAgICBTYXNzLndyaXRlRmlsZShzYXNzRmlsZXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGN1cnIpIHsKICAgICAgICB2YXIgX2E7CiAgICAgICAgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgYWNjKSwgKF9hID0ge30sIF9hW2N1cnIucGF0aF0gPSBjdXJyLmNvZGUsIF9hKSkpOwogICAgfSwge30pKTsKICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGZpbGUpIHsKICAgICAgICBTYXNzLmltcG9ydGVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBkb25lKSB7CiAgICAgICAgICAgIHJldHVybiBpbXBvcnRlcihmaWxlLCBzYXNzRmlsZXMsIHJlcXVlc3QsIGRvbmUpOwogICAgICAgIH0pOwogICAgfTsKICAgIHRyeSB7CiAgICAgICAgZm9yICh2YXIgc2Fzc0ZpbGVzXzEgPSBfX3ZhbHVlcyhzYXNzRmlsZXMpLCBzYXNzRmlsZXNfMV8xID0gc2Fzc0ZpbGVzXzEubmV4dCgpOyAhc2Fzc0ZpbGVzXzFfMS5kb25lOyBzYXNzRmlsZXNfMV8xID0gc2Fzc0ZpbGVzXzEubmV4dCgpKSB7CiAgICAgICAgICAgIHZhciBmaWxlID0gc2Fzc0ZpbGVzXzFfMS52YWx1ZTsKICAgICAgICAgICAgX2xvb3BfMShmaWxlKTsKICAgICAgICB9CiAgICB9CiAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfQogICAgZmluYWxseSB7CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgaWYgKHNhc3NGaWxlc18xXzEgJiYgIXNhc3NGaWxlc18xXzEuZG9uZSAmJiAoX2EgPSBzYXNzRmlsZXNfMS5yZXR1cm4pKSBfYS5jYWxsKHNhc3NGaWxlc18xKTsKICAgICAgICB9CiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfQogICAgfQp9Owp2YXIgaW1wb3J0ZXIgPSBmdW5jdGlvbiAoZmlsZSwgc2Fzc0ZpbGVzLCByZXF1ZXN0LCBkb25lKSB7CiAgICB2YXIgcGF0aCA9IHJlc29sdmUoZGlybmFtZShmaWxlLnBhdGgpLCByZXF1ZXN0LmN1cnJlbnQpOwogICAgdmFyIHBvdGVudGlhbFBhdGhzID0gU2Fzcy5nZXRQYXRoVmFyaWF0aW9ucyhwYXRoKTsKICAgIHZhciBhY3R1YWxGaWxlID0gc2Fzc0ZpbGVzLmZpbmQoZnVuY3Rpb24gKGZpbGUpIHsgcmV0dXJuIH5wb3RlbnRpYWxQYXRocy5pbmRleE9mKGZpbGUucGF0aCk7IH0pOwogICAgaWYgKGFjdHVhbEZpbGUgJiYgYWN0dWFsRmlsZS5wYXRoKSB7CiAgICAgICAgcmV0dXJuIGRvbmUoewogICAgICAgICAgICBwYXRoOiBhY3R1YWxGaWxlLnBhdGgsCiAgICAgICAgICAgIGNvbnRlbnRzOiBhY3R1YWxGaWxlLmNvZGUKICAgICAgICB9KTsKICAgIH0KICAgIGVsc2UgewogICAgICAgIHRocm93IG5ldyBFcnJvcigiVGhlIGZpbGUgIiArIHJlcXVlc3QuY3VycmVudCArICIgZG9lcyBub3QgZXhpc3QiKTsKICAgIH0KfTsKdmFyIHRyYW5zcGlsZUZpbGUgPSBmdW5jdGlvbiAoZmlsZSkgewogICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsKICAgICAgICBTYXNzLm9wdGlvbnMoewogICAgICAgICAgICBpbmRlbnRlZFN5bnRheDogZmlsZS5wYXRoLmVuZHNXaXRoKCIuc2FzcyIpIHx8IGZpbGUubGFuZyA9PT0gInNhc3MiCiAgICAgICAgfSk7CiAgICAgICAgU2Fzcy5jb21waWxlKGZpbGUuY29kZSwgZnVuY3Rpb24gKHJlc3VsdCkgewogICAgICAgICAgICBpZiAocmVzdWx0LmZvcm1hdHRlZCkgewogICAgICAgICAgICAgICAgcmVqZWN0KHJlc3VsdC5mb3JtYXR0ZWQpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgcmVzb2x2ZShfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZmlsZSksIHsgY29kZTogcmVzdWx0LnRleHQsIG1hcDogcmVzdWx0Lm1hcCB9KSk7CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgIH0pOwp9OwoK', null, false);
/* eslint-enable */var SassTranspiler = /** @class */ (function (_super) {
    __extends(SassTranspiler, _super);
    function SassTranspiler(context) {
        var _this = _super.call(this, "sass-transpiler", new WorkerFactory(), context) || this;
        _this.additionalTranspilers = {};
        return _this;
    }
    SassTranspiler.prototype.transpile = function (file) {
        return this.doTranspile(file);
    };
    return SassTranspiler;
}(Transpiler));
//# sourceMappingURL=index.js.map
var generateExport = function (file, prependExportDefault) {
    if (prependExportDefault === void 0) { prependExportDefault = true; }
    return ((prependExportDefault ? "export default " : "") + "function addStyles () {" +
        "const tag = document.createElement('style');" +
        "tag.type = 'text/css';" +
        ("tag.appendChild(document.createTextNode(`" + file.code + "`));") +
        ("tag.setAttribute('data-src', '" + file.path + "');") +
        "document.head.appendChild(tag);" +
        "} addStyles();");
};
//# sourceMappingURL=style-plugin-helpers.js.map
var TransformationException = /** @class */ (function (_super) {
    __extends(TransformationException, _super);
    function TransformationException(filePath, transformerName) {
        return _super.call(this, "Failed to transform " + filePath + (transformerName ? " in " + transformerName : "") + ".") || this;
    }
    return TransformationException;
}(Error));
//# sourceMappingURL=TransformationException.js.map
function sassTransformer(context) {
    var transformerName = "packager::transformer::sass-transformer";
    var isSass = verifyExtensions([".sass", ".scss"]);
    var transpiler;
    return {
        name: transformerName,
        transform: function (code, modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var file_1, completed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isSass(modulePath)) return [3 /*break*/, 2];
                            transpiler = context.cache.transpilers.get("sass-transpiler");
                            if (!transpiler) {
                                transpiler = new SassTranspiler(context);
                                context.cache.transpilers.set("sass-transpiler", transpiler);
                            }
                            file_1 = context.files.find(function (f) { return f.path === modulePath; });
                            return [4 /*yield*/, context.transpileQueue.push("Sass-Transpiler", function () {
                                    return transpiler.transpile(__assign(__assign({}, file_1), { code: code }));
                                })];
                        case 1:
                            _a.sent();
                            completed = context.transpileQueue.completed.find(function (c) { return c.path === modulePath; });
                            if (completed) {
                                return [2 /*return*/, {
                                        code: generateExport(completed),
                                        map: completed.map || { mappings: "" }
                                    }];
                            }
                            throw new TransformationException(modulePath, transformerName);
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map
/* eslint-disable */
const WorkerFactory$1 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0KCnZhciBUUkFOU1BJTEVfU1RBVFVTID0gewogICAgUFJFUEFSRV9GSUxFUzogInRyYW5zcGlsZXI6ZmlsZTpwcmVwYXJlIiwKICAgIFBSRVBBUkVfQURESVRJT05BTDogInRyYW5zcGlsZXI6YWRkaXRpb25hbDpwcmVwYXJlIiwKICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogInRyYW5zcGlsZXI6YWRkaXRpb25hbDp0cmFuc3BpbGVkIiwKICAgIFRSQU5TUElMRV9DT01QTEVURTogInRyYW5zcGlsZXI6dHJhbnNwaWxlOmNvbXBsZXRlIiwKICAgIEVSUk9SX1BSRVBBUklOR19BTkRfQ09NUElMSU5HOiAidHJhbnNwaWxlcjplcnJvcjpjb21waWxlIiwKICAgIEVSUk9SX0FERElUSU9OQUw6ICJ0cmFuc3BpbGVyOmVycm9yOmFkZGl0aW9uYWwiCn07CgpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vdW5wa2cuY29tL0BibG94eS9paWZlLWxpYnNAbGF0ZXN0L2xpYnMvc3R5bHVzLmpzIik7CnNlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsIGZ1bmN0aW9uIChfYSkgewogICAgdmFyIGRhdGEgPSBfYS5kYXRhOwogICAgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgdmFyIGZpbGUsIHR5cGUsIGNvbnRleHQsIHRyYW5zcGlsZWRGaWxlLCBlcnJvcl8xOwogICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHsKICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkgewogICAgICAgICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICAgICAgICAgIGZpbGUgPSBkYXRhLmZpbGUsIHR5cGUgPSBkYXRhLnR5cGUsIGNvbnRleHQgPSBkYXRhLmNvbnRleHQ7CiAgICAgICAgICAgICAgICAgICAgaWYgKCEodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0ZJTEVTKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07CiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxOwogICAgICAgICAgICAgICAgY2FzZSAxOgogICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgMywgLCA0XSk7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdHJhbnNwaWxlRmlsZShmaWxlKV07CiAgICAgICAgICAgICAgICBjYXNlIDI6CiAgICAgICAgICAgICAgICAgICAgdHJhbnNwaWxlZEZpbGUgPSBfYi5zZW50KCk7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLlRSQU5TUElMRV9DT01QTEVURSwKICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogdHJhbnNwaWxlZEZpbGUKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTsKICAgICAgICAgICAgICAgIGNhc2UgMzoKICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Iuc2VudCgpOwogICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9QUkVQQVJJTkdfQU5EX0NPTVBJTElORywKICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXzEKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTsKICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dOwogICAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICB9KTsKfSk7CnZhciB0cmFuc3BpbGVGaWxlID0gZnVuY3Rpb24gKGZpbGUpIHsKICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7CiAgICAgICAgc3R5bHVzKGZpbGUuY29kZSkKICAgICAgICAgICAgLnNldCgiZmlsZW5hbWUiLCBmaWxlLnBhdGgpCiAgICAgICAgICAgIC5yZW5kZXIoZnVuY3Rpb24gKGVyciwgY3NzKSB7CiAgICAgICAgICAgIGlmIChlcnIpIHsKICAgICAgICAgICAgICAgIHJlamVjdChlcnIpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgcmVzb2x2ZShfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZmlsZSksIHsgY29kZTogY3NzIH0pKTsKICAgICAgICAgICAgfQogICAgICAgIH0pOwogICAgfSk7Cn07Cgo=', null, false);
/* eslint-enable */var StylusTranspiler = /** @class */ (function (_super) {
    __extends(StylusTranspiler, _super);
    function StylusTranspiler(context) {
        var _this = _super.call(this, "stylus-transpiler", new WorkerFactory$1(), context) || this;
        _this.additionalTranspilers = {};
        return _this;
    }
    StylusTranspiler.prototype.transpile = function (file) {
        return this.doTranspile(file);
    };
    return StylusTranspiler;
}(Transpiler));
//# sourceMappingURL=index.js.map
function stylusTransformer(context) {
    var transformerName = "packager::transformer::stylus-transformer";
    var isStylus = verifyExtensions([".styl", ".stylus"]);
    var transpiler;
    return {
        name: transformerName,
        transform: function (code, modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var file_1, completed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isStylus(modulePath)) return [3 /*break*/, 2];
                            transpiler = context.cache.transpilers.get("stylus-transpiler");
                            if (!transpiler) {
                                transpiler = new StylusTranspiler(context);
                                context.cache.transpilers.set("stylus-transpiler", transpiler);
                            }
                            file_1 = context.files.find(function (f) { return f.path === modulePath; });
                            return [4 /*yield*/, context.transpileQueue.push("Stylus-Transpiler", function () {
                                    return transpiler.transpile(__assign(__assign({}, file_1), { code: code }));
                                })];
                        case 1:
                            _a.sent();
                            completed = context.transpileQueue.completed.find(function (c) { return c.path === modulePath; });
                            if (completed) {
                                return [2 /*return*/, {
                                        code: generateExport(completed),
                                        map: completed.map || { mappings: "" }
                                    }];
                            }
                            throw new TransformationException(modulePath, transformerName);
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map
/* eslint-disable */
const WorkerFactory$2 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0KCnZhciBhYnNvbHV0ZVBhdGggPSAvXig/OlwvfCg/OltBLVphLXpdOik/W1xcfFwvXSkvOwpmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGgpIHsKICAgIHJldHVybiBhYnNvbHV0ZVBhdGgudGVzdChwYXRoKTsKfQpmdW5jdGlvbiByZXNvbHZlKCkgewogICAgdmFyIHBhdGhzID0gW107CiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykgewogICAgICAgIHBhdGhzW19pXSA9IGFyZ3VtZW50c1tfaV07CiAgICB9CiAgICB2YXIgcmVzb2x2ZWRQYXJ0cyA9IHBhdGhzLnNoaWZ0KCkuc3BsaXQoL1tcL1xcXS8pOwogICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbiAocGF0aCkgewogICAgICAgIGlmIChpc0Fic29sdXRlKHBhdGgpKSB7CiAgICAgICAgICAgIHJlc29sdmVkUGFydHMgPSBwYXRoLnNwbGl0KC9bXC9cXF0vKTsKICAgICAgICB9CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoL1tcL1xcXS8pOwogICAgICAgICAgICB3aGlsZSAocGFydHNbMF0gPT09ICIuIiB8fCBwYXJ0c1swXSA9PT0gIi4uIikgewogICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0cy5zaGlmdCgpOwogICAgICAgICAgICAgICAgaWYgKHBhcnQgPT09ICIuLiIpIHsKICAgICAgICAgICAgICAgICAgICByZXNvbHZlZFBhcnRzLnBvcCgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJlc29sdmVkUGFydHMucHVzaC5hcHBseShyZXNvbHZlZFBhcnRzLCBwYXJ0cyk7CiAgICAgICAgfQogICAgfSk7CiAgICByZXR1cm4gbm9ybWFsaXplKHJlc29sdmVkUGFydHMuam9pbigiLyIpKTsKfQpmdW5jdGlvbiBub3JtYWxpemUocGF0aCkgewogICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXC9cLy9naSwgIi8iKTsKfQoKdmFyIFRSQU5TUElMRV9TVEFUVVMgPSB7CiAgICBQUkVQQVJFX0ZJTEVTOiAidHJhbnNwaWxlcjpmaWxlOnByZXBhcmUiLAogICAgUFJFUEFSRV9BRERJVElPTkFMOiAidHJhbnNwaWxlcjphZGRpdGlvbmFsOnByZXBhcmUiLAogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAidHJhbnNwaWxlcjphZGRpdGlvbmFsOnRyYW5zcGlsZWQiLAogICAgVFJBTlNQSUxFX0NPTVBMRVRFOiAidHJhbnNwaWxlcjp0cmFuc3BpbGU6Y29tcGxldGUiLAogICAgRVJST1JfUFJFUEFSSU5HX0FORF9DT01QSUxJTkc6ICJ0cmFuc3BpbGVyOmVycm9yOmNvbXBpbGUiLAogICAgRVJST1JfQURESVRJT05BTDogInRyYW5zcGlsZXI6ZXJyb3I6YWRkaXRpb25hbCIKfTsKCi8vIEB0cy1pZ25vcmUKc2VsZi53aW5kb3cgPSBzZWxmOwovLyBAdHMtaWdub3JlCnNlbGYud2luZG93LmRvY3VtZW50ID0gewogICAgY3VycmVudFNjcmlwdDogeyBhc3luYzogdHJ1ZSB9LAogICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKCkgeyByZXR1cm4gKHsgYXBwZW5kQ2hpbGQ6IGZ1bmN0aW9uICgpIHsgfSB9KTsgfSwKICAgIGNyZWF0ZVRleHROb2RlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAoe30pOyB9LAogICAgZ2V0RWxlbWVudHNCeVRhZ05hbWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9LAogICAgaGVhZDogeyBhcHBlbmRDaGlsZDogZnVuY3Rpb24gKCkgeyB9LCByZW1vdmVDaGlsZDogZnVuY3Rpb24gKCkgeyB9IH0KfTsKc2VsZi5pbXBvcnRTY3JpcHRzKCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2xlc3MiKTsKc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZnVuY3Rpb24gKF9hKSB7CiAgICB2YXIgZGF0YSA9IF9hLmRhdGE7CiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgZmlsZSwgdHlwZSwgY29udGV4dCwgb3B0aW9ucywgdHJhbnNwaWxlZEZpbGUsIGVycm9yXzE7CiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikgewogICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7CiAgICAgICAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgICAgICAgICAgZmlsZSA9IGRhdGEuZmlsZSwgdHlwZSA9IGRhdGEudHlwZSwgY29udGV4dCA9IGRhdGEuY29udGV4dDsKICAgICAgICAgICAgICAgICAgICBpZiAoISh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLlBSRVBBUkVfRklMRVMpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTsKICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7CiAgICAgICAgICAgICAgICBjYXNlIDE6CiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTsKICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gewogICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5zOiBbbWFuYWdlcihjb250ZXh0LCBmaWxlLnBhdGgpXSwKICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVVcmxzOiB0cnVlLAogICAgICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZS5wYXRoCiAgICAgICAgICAgICAgICAgICAgfTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0cmFuc3BpbGVGaWxlKGZpbGUsIG9wdGlvbnMpXTsKICAgICAgICAgICAgICAgIGNhc2UgMjoKICAgICAgICAgICAgICAgICAgICB0cmFuc3BpbGVkRmlsZSA9IF9iLnNlbnQoKTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLAogICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiB0cmFuc3BpbGVkRmlsZQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgY2FzZSAzOgogICAgICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYi5zZW50KCk7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX1BSRVBBUklOR19BTkRfQ09NUElMSU5HLAogICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JfMQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgIH0pOwp9KTsKdmFyIHRyYW5zcGlsZUZpbGUgPSBmdW5jdGlvbiAoZmlsZSwgb3B0aW9ucykgewogICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsKICAgICAgICBsZXNzLnJlbmRlcihmaWxlLmNvZGUsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHsKICAgICAgICAgICAgaWYgKGVycikgewogICAgICAgICAgICAgICAgcmVqZWN0KGVycik7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICByZXNvbHZlKF9fYXNzaWduKF9fYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiBkYXRhLmNzcyB9KSk7CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgIH0pOwp9Owp2YXIgbWFuYWdlciA9IGZ1bmN0aW9uIChjb250ZXh0LCBwYXJlbnRQYXRoKSB7CiAgICB2YXIgbGVzc01hbmFnZXIgPSBuZXcgbGVzcy5GaWxlTWFuYWdlcigpOwogICAgbGVzc01hbmFnZXIubG9hZEZpbGUgPSBmdW5jdGlvbiAoZmlsZW5hbWUsIGN1cnJlbnREaXJlY3RvcnkpIHsKICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUkMSwgcmVqZWN0KSB7CiAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICB2YXIgcmVsYXRpdmVQYXRoXzEgPSByZXNvbHZlKGN1cnJlbnREaXJlY3RvcnksIGZpbGVuYW1lKTsKICAgICAgICAgICAgICAgIHZhciBmb3VuZEZpbGUgPSBjb250ZXh0LmZpbGVzLmZpbmQoZnVuY3Rpb24gKGZpbGUpIHsgcmV0dXJuIGZpbGUucGF0aCA9PT0gcmVsYXRpdmVQYXRoXzE7IH0pOwogICAgICAgICAgICAgICAgaWYgKGZvdW5kRmlsZSkgewogICAgICAgICAgICAgICAgICAgIHJlc29sdmUkMSh7IGNvbnRlbnRzOiBmb3VuZEZpbGUuY29kZSwgZmlsZW5hbWU6IGZpbGVuYW1lIH0pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHJpZWRGaWxlID0gcmV0cnlGaWxlcyhyZWxhdGl2ZVBhdGhfMSwgY29udGV4dCk7CiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHJpZWRGaWxlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUkMSh7IGNvbnRlbnRzOiByZXRyaWVkRmlsZS5jb2RlLCBmaWxlbmFtZTogZmlsZW5hbWUgfSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkNvdWxkIG5vdCBsb2FkICIgKyBmaWxlbmFtZSArICIgZnJvbSAiICsgcGFyZW50UGF0aCk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGNhdGNoIChlKSB7CiAgICAgICAgICAgICAgICByZWplY3QoZSk7CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgIH07CiAgICByZXR1cm4gewogICAgICAgIGluc3RhbGw6IGZ1bmN0aW9uIChpbnN0YW5jZSwgcGx1Z2luTWFuYWdlcikgewogICAgICAgICAgICBwbHVnaW5NYW5hZ2VyLmFkZEZpbGVNYW5hZ2VyKGxlc3NNYW5hZ2VyKTsKICAgICAgICB9CiAgICB9Owp9Owp2YXIgcmV0cnlGaWxlcyA9IGZ1bmN0aW9uIChwYXRoLCBjb250ZXh0KSB7CiAgICByZXR1cm4gY29udGV4dC5maWxlcy5maW5kKGZ1bmN0aW9uIChmaWxlKSB7CiAgICAgICAgcmV0dXJuIGZpbGUucGF0aCA9PT0gcGF0aCB8fAogICAgICAgICAgICBmaWxlLnBhdGggPT09IHBhdGggKyAiLmxlc3MiIHx8CiAgICAgICAgICAgIGZpbGUucGF0aCA9PT0gcGF0aCArICIuY3NzIjsKICAgIH0pOwp9OwoK', null, false);
/* eslint-enable */var LessTranspiler = /** @class */ (function (_super) {
    __extends(LessTranspiler, _super);
    function LessTranspiler(context) {
        var _this = _super.call(this, "less-transpiler", new WorkerFactory$2(), context) || this;
        _this.additionalTranspilers = {};
        return _this;
    }
    LessTranspiler.prototype.transpile = function (file) {
        return this.doTranspile(file);
    };
    return LessTranspiler;
}(Transpiler));
//# sourceMappingURL=index.js.map
function lessTransformer(context) {
    var transformerName = "packager::transformer::less-transformer";
    var isLess = verifyExtensions([".less"]);
    var transpiler;
    return {
        name: transformerName,
        transform: function (code, modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var file_1, completed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isLess(modulePath)) return [3 /*break*/, 2];
                            transpiler = context.cache.transpilers.get("less-transpiler");
                            if (!transpiler) {
                                transpiler = new LessTranspiler(context);
                                context.cache.transpilers.set("less-transpiler", transpiler);
                            }
                            file_1 = context.files.find(function (f) { return f.path === modulePath; });
                            return [4 /*yield*/, context.transpileQueue.push("Less-Transpiler", function () {
                                    return transpiler.transpile(__assign(__assign({}, file_1), { code: code }));
                                })];
                        case 1:
                            _a.sent();
                            completed = context.transpileQueue.completed.find(function (c) { return c.path === modulePath; });
                            if (completed) {
                                return [2 /*return*/, {
                                        code: generateExport(completed),
                                        map: completed.map || { mappings: "" }
                                    }];
                            }
                            throw new TransformationException(modulePath, transformerName);
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map
/* eslint-disable */
const WorkerFactory$3 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0NCg0KZnVuY3Rpb24gX192YWx1ZXMobykgew0KICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gImZ1bmN0aW9uIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwOw0KICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pOw0KICAgIHJldHVybiB7DQogICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHsNCiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7DQogICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07DQogICAgICAgIH0NCiAgICB9Ow0KfQoKdmFyIGdlbmVyYXRlRXhwb3J0ID0gZnVuY3Rpb24gKGZpbGUsIHByZXBlbmRFeHBvcnREZWZhdWx0KSB7CiAgICBpZiAocHJlcGVuZEV4cG9ydERlZmF1bHQgPT09IHZvaWQgMCkgeyBwcmVwZW5kRXhwb3J0RGVmYXVsdCA9IHRydWU7IH0KICAgIHJldHVybiAoKHByZXBlbmRFeHBvcnREZWZhdWx0ID8gImV4cG9ydCBkZWZhdWx0ICIgOiAiIikgKyAiZnVuY3Rpb24gYWRkU3R5bGVzICgpIHsiICsKICAgICAgICAiY29uc3QgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTsiICsKICAgICAgICAidGFnLnR5cGUgPSAndGV4dC9jc3MnOyIgKwogICAgICAgICgidGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAiICsgZmlsZS5jb2RlICsgImApKTsiKSArCiAgICAgICAgKCJ0YWcuc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsICciICsgZmlsZS5wYXRoICsgIicpOyIpICsKICAgICAgICAiZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWcpOyIgKwogICAgICAgICJ9IGFkZFN0eWxlcygpOyIpOwp9Owp2YXIgZ2VuZXJhdGVFeHBvcnRzRm9yQWxsU3R5bGVzID0gZnVuY3Rpb24gKHN0eWxlcywgZmlsZVBhdGgpIHsgcmV0dXJuIGdlbmVyYXRlRXhwb3J0KHsgcGF0aDogZmlsZVBhdGgsIGNvZGU6IHN0eWxlcy5qb2luKCJcblxuIikgfSwgZmFsc2UpOyB9OwoKdmFyIFRSQU5TUElMRV9TVEFUVVMgPSB7CiAgICBQUkVQQVJFX0ZJTEVTOiAidHJhbnNwaWxlcjpmaWxlOnByZXBhcmUiLAogICAgUFJFUEFSRV9BRERJVElPTkFMOiAidHJhbnNwaWxlcjphZGRpdGlvbmFsOnByZXBhcmUiLAogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAidHJhbnNwaWxlcjphZGRpdGlvbmFsOnRyYW5zcGlsZWQiLAogICAgVFJBTlNQSUxFX0NPTVBMRVRFOiAidHJhbnNwaWxlcjp0cmFuc3BpbGU6Y29tcGxldGUiLAogICAgRVJST1JfUFJFUEFSSU5HX0FORF9DT01QSUxJTkc6ICJ0cmFuc3BpbGVyOmVycm9yOmNvbXBpbGUiLAogICAgRVJST1JfQURESVRJT05BTDogInRyYW5zcGlsZXI6ZXJyb3I6YWRkaXRpb25hbCIKfTsKCi8qKgogKiBAdG9kbyBGaXggc291cmNlbWFwcyBiZWNhdXNlIHRoZXkncmUgaW5hY2N1cmF0ZS4KICovCnNlbGYuaW1wb3J0U2NyaXB0cygiaHR0cHM6Ly91bnBrZy5jb20vc291cmNlLW1hcC9kaXN0L3NvdXJjZS1tYXAuanMiKTsKdmFyIGdlbmVyYXRlU291cmNlTWFwJDEgPSBmdW5jdGlvbiAoZmlsZVBhdGgsIG9yaWdpbmFsQ29kZSwgZ2VuZXJhdGVkQ29kZSkgewogICAgLy8gQHRzLWlnbm9yZQogICAgdmFyIG1hcCA9IG5ldyBzZWxmLnNvdXJjZU1hcC5Tb3VyY2VNYXBHZW5lcmF0b3IoeyBmaWxlOiBmaWxlUGF0aCB9KTsKICAgIG1hcC5zZXRTb3VyY2VDb250ZW50KGZpbGVQYXRoLCBvcmlnaW5hbENvZGUpOwogICAgZ2VuZXJhdGVkQ29kZS5zcGxpdCgvXHI/XG4vZykuZm9yRWFjaChmdW5jdGlvbiAobGluZSwgaW5kZXgpIHsKICAgICAgICBpZiAobGluZSkgewogICAgICAgICAgICBtYXAuYWRkTWFwcGluZyh7CiAgICAgICAgICAgICAgICBzb3VyY2U6IGZpbGVQYXRoLAogICAgICAgICAgICAgICAgb3JpZ2luYWw6IHsgbGluZTogaW5kZXggKyAxLCBjb2x1bW46IDAgfSwKICAgICAgICAgICAgICAgIGdlbmVyYXRlZDogeyBsaW5lOiBpbmRleCArIDEsIGNvbHVtbjogMCB9CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgIH0pOwogICAgcmV0dXJuIG1hcC50b0pTT04oKTsKfTsKLy8gQHRzLWlnbm9yZQpzZWxmLmdlbmVyYXRlU291cmNlTWFwID0gZ2VuZXJhdGVTb3VyY2VNYXAkMTsKCnNlbGYuaW1wb3J0U2NyaXB0cygiaHR0cHM6Ly91bnBrZy5jb20vdnVlLXRlbXBsYXRlLWNvbXBpbGVyL2Jyb3dzZXIuanMiLCAiaHR0cHM6Ly91bnBrZy5jb20vaGFzaC1zdW0tYnJvd3Nlci9kaXN0L2luZGV4Lm1pbi5qcyIsICJodHRwczovL3VucGtnLmNvbS9AYmxveHkvaWlmZS1saWJzQGxhdGVzdC9saWJzL2J1YmxlLmpzIiwgImh0dHBzOi8vdW5wa2cuY29tL0BibG94eS9paWZlLWxpYnNAbGF0ZXN0L2xpYnMvY3NzLmpzIiwgImh0dHBzOi8vdW5wa2cuY29tL0BibG94eS9paWZlLWxpYnNAbGF0ZXN0L2xpYnMvcG9zdGNzcy1zZWxlY3Rvci1wYXJzZXIuanMiKTsKc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZnVuY3Rpb24gKF9hKSB7CiAgICB2YXIgZGF0YSA9IF9hLmRhdGE7CiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgZmlsZSwgdHlwZSwgYWRkaXRpb25hbCwgX2IsIHN0eWxlcywgc2NyaXB0LCBodG1sLCBhZGRpdGlvbmFsXzEsIGNvZGU7CiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykgewogICAgICAgICAgICBmaWxlID0gZGF0YS5maWxlLCB0eXBlID0gZGF0YS50eXBlLCBhZGRpdGlvbmFsID0gZGF0YS5hZGRpdGlvbmFsOwogICAgICAgICAgICBpZiAodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0ZJTEVTKSB7CiAgICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgICAgIGlmICghZmlsZSB8fCAhZmlsZS5wYXRoKQogICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkZpbGUgaXNuJ3Qgc3VwcGxpZWQgb3IgaXQgaGFzIGFuIGluY29ycmVjdCBmb3JtYXQuIik7CiAgICAgICAgICAgICAgICAgICAgX2IgPSBwcmVwYXJlRmlsZUFuZENvbXBpbGVUZW1wbGF0ZShmaWxlKSwgc3R5bGVzID0gX2Iuc3R5bGVzLCBzY3JpcHQgPSBfYi5zY3JpcHQsIGh0bWwgPSBfYi5odG1sOwogICAgICAgICAgICAgICAgICAgIGlmICgoc3R5bGVzIHx8IGh0bWwpICYmIChzdHlsZXMubGVuZ3RoIHx8IGh0bWwubGVuZ3RoKSkgewogICAgICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsXzEgPSB7IHN0eWxlczogc3R5bGVzLCBodG1sOiBodG1sIH07CiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLlBSRVBBUkVfQURESVRJT05BTCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiBzY3JpcHQgfSksCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsOiBhZGRpdGlvbmFsXzEKICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlCiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5UUkFOU1BJTEVfQ09NUExFVEUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZmlsZSksIHsgY29kZTogc2NyaXB0LCBtYXA6IGdlbmVyYXRlU291cmNlTWFwKGZpbGUucGF0aCwgZmlsZS5jb2RlLCBzY3JpcHQpIH0pCiAgICAgICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikgewogICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9QUkVQQVJJTkdfQU5EX0NPTVBJTElORywKICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yCiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKHR5cGUgPT09IFRSQU5TUElMRV9TVEFUVVMuQURESVRJT05BTF9UUkFOU1BJTEVEKSB7CiAgICAgICAgICAgICAgICBjb2RlID0gZmlsZS5jb2RlOwogICAgICAgICAgICAgICAgaWYgKGFkZGl0aW9uYWwpIHsKICAgICAgICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgICAgICAgICAvLyBhcHBlbmQgdGhlIHN0eWxlIGluamVjdG9yIGhlcmUKICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5nIHdpdGggaHRtbCBzdHVmZiBoZXJlIGxpa2UgdnVlIHB1Zy4gYnV0IGxhdGVyLgogICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2RlICsgc3R5bGVzCiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUgKz0gYXBwZW5kU3R5bGVzKGFkZGl0aW9uYWwuc3R5bGVzLCBmaWxlLnBhdGgpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHsKICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuRVJST1JfQURESVRJT05BTCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcgogICAgICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLAogICAgICAgICAgICAgICAgICAgIGZpbGU6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiBjb2RlLCBtYXA6IGdlbmVyYXRlU291cmNlTWFwKGZpbGUucGF0aCwgZmlsZS5jb2RlLCBjb2RlKSB9KQogICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dOwogICAgICAgIH0pOwogICAgfSk7Cn0pOwp2YXIgcHJlcGFyZUZpbGVBbmRDb21waWxlVGVtcGxhdGUgPSBmdW5jdGlvbiAoZmlsZSkgewogICAgdmFyIF9hID0gVnVlVGVtcGxhdGVDb21waWxlci5wYXJzZUNvbXBvbmVudChmaWxlLmNvZGUsIHsgcGFkOiAibGluZSIgfSksIHRlbXBsYXRlID0gX2EudGVtcGxhdGUsIHNjcmlwdCA9IF9hLnNjcmlwdCwgc3R5bGVzID0gX2Euc3R5bGVzOwogICAgdmFyIHNjb3BlSWQgPSAiZGF0YS12LSIgKyBoYXNoU3VtKGZpbGUucGF0aCk7CiAgICB2YXIgc2NvcGVkID0gc3R5bGVzLnNvbWUoZnVuY3Rpb24gKHN0eWxlKSB7IHJldHVybiBzdHlsZS5zY29wZWQgPT09IHRydWU7IH0pOwogICAgcmV0dXJuIHsKICAgICAgICBzdHlsZXM6IHByZXBhcmVTdHlsZXMoc3R5bGVzLCBzY29wZWQgPyBzY29wZUlkIDogbnVsbCwgZmlsZSksCiAgICAgICAgaHRtbDogW10sCiAgICAgICAgc2NyaXB0OiBjb21waWxlVGVtcGxhdGUoc2NyaXB0LmNvbnRlbnQsIHRlbXBsYXRlLCBzY29wZUlkLCBzY29wZWQpCiAgICB9Owp9Owp2YXIgcHJlcGFyZVN0eWxlcyA9IGZ1bmN0aW9uIChzdHlsZXMsIHNjb3BlSWQsIGZpbGUpIHsKICAgIGlmIChzdHlsZXMgPT09IHZvaWQgMCkgeyBzdHlsZXMgPSBbXTsgfQogICAgcmV0dXJuIHN0eWxlcy5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7IHJldHVybiAoewogICAgICAgIGNvZGU6IHN0eWxlLmNvbnRlbnQsCiAgICAgICAgbGFuZzogc3R5bGUubGFuZyB8fCAiY3NzIiwKICAgICAgICBzY29wZUlkOiBzdHlsZS5zY29wZWQgPyBzY29wZUlkIDogbnVsbCwKICAgICAgICBwYXRoOiBmaWxlLnBhdGgKICAgIH0pOyB9KTsKfTsKdmFyIGFwcGVuZFN0eWxlcyA9IGZ1bmN0aW9uIChzdHlsZXMsIGZpbGVQYXRoKSB7CiAgICB2YXIgZV8xLCBfYTsKICAgIHZhciBwYXJzZWRTdHlsZXMgPSBbXTsKICAgIHRyeSB7CiAgICAgICAgZm9yICh2YXIgc3R5bGVzXzEgPSBfX3ZhbHVlcyhzdHlsZXMpLCBzdHlsZXNfMV8xID0gc3R5bGVzXzEubmV4dCgpOyAhc3R5bGVzXzFfMS5kb25lOyBzdHlsZXNfMV8xID0gc3R5bGVzXzEubmV4dCgpKSB7CiAgICAgICAgICAgIHZhciBzdHlsZSA9IHN0eWxlc18xXzEudmFsdWU7CiAgICAgICAgICAgIHBhcnNlZFN0eWxlcy5wdXNoKHBhcnNlQ3NzU3R5bGUoc3R5bGUuY29kZSwgc3R5bGUuc2NvcGVJZCkpOwogICAgICAgIH0KICAgIH0KICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9CiAgICBmaW5hbGx5IHsKICAgICAgICB0cnkgewogICAgICAgICAgICBpZiAoc3R5bGVzXzFfMSAmJiAhc3R5bGVzXzFfMS5kb25lICYmIChfYSA9IHN0eWxlc18xLnJldHVybikpIF9hLmNhbGwoc3R5bGVzXzEpOwogICAgICAgIH0KICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9CiAgICB9CiAgICByZXR1cm4gZ2VuZXJhdGVFeHBvcnRzRm9yQWxsU3R5bGVzKHBhcnNlZFN0eWxlcywgZmlsZVBhdGgpOwp9Owp2YXIgcGFyc2VDc3NTdHlsZSA9IGZ1bmN0aW9uIChjb2RlLCBzY29wZUlkKSB7CiAgICBpZiAoc2NvcGVJZCA9PT0gdm9pZCAwKSB7IHNjb3BlSWQgPSAiIjsgfQogICAgdmFyIHBhcnNlZCA9IGNzcy5wYXJzZShjb2RlKTsKICAgIHJldHVybiBjc3Muc3RyaW5naWZ5KF9fYXNzaWduKF9fYXNzaWduKHt9LCBwYXJzZWQpLCB7IHN0eWxlc2hlZXQ6IGFwcGx5QXR0cmlidXRlVG9TZWxlY3RvcihwYXJzZWQuc3R5bGVzaGVldCwgc2NvcGVJZCkgfSkpOwp9Owp2YXIgYXBwbHlBdHRyaWJ1dGVUb1NlbGVjdG9yID0gZnVuY3Rpb24gKHRyZWUsIHNjb3BlSWQpIHsKICAgIGlmICgic2VsZWN0b3JzIiBpbiB0cmVlKSB7CiAgICAgICAgZm9yICh2YXIgaSBpbiB0cmVlLnNlbGVjdG9ycykgewogICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSB0cmVlLnNlbGVjdG9yc1tpXTsKICAgICAgICAgICAgdHJlZS5zZWxlY3RvcnNbaV0gPSBwb3N0Y3NzU2VsZWN0b3JQYXJzZXIoZnVuY3Rpb24gKHNlbGVjdG9ycykgewogICAgICAgICAgICAgICAgc2VsZWN0b3JzLmVhY2goZnVuY3Rpb24gKHNlbGVjdG9yKSB7CiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBudWxsOwogICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLmVhY2goZnVuY3Rpb24gKG4pIHsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4udHlwZSAhPT0gInBzZXVkbyIpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbjsKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGVJZCAmJiBzY29wZUlkICE9ICIiKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLmluc2VydEFmdGVyKG5vZGUsIHBvc3Rjc3NTZWxlY3RvclBhcnNlci5hdHRyaWJ1dGUoewogICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlOiBzY29wZUlkCiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSkucHJvY2Vzc1N5bmMoc2VsZWN0b3IpOwogICAgICAgIH0KICAgIH0KICAgIGlmICgicnVsZXMiIGluIHRyZWUpIHsKICAgICAgICBmb3IgKHZhciBpIGluIHRyZWUucnVsZXMpIHsKICAgICAgICAgICAgdmFyIHJ1bGUgPSB0cmVlLnJ1bGVzW2ldOwogICAgICAgICAgICB0cmVlLnJ1bGVzW2ldID0gYXBwbHlBdHRyaWJ1dGVUb1NlbGVjdG9yKHJ1bGUsIHNjb3BlSWQpOwogICAgICAgIH0KICAgIH0KICAgIHJldHVybiB0cmVlOwp9OwovKioKICogQ29tcGlsZWQgdGhlIHRlbXBsYXRlIHVzaW5nIHZ1ZS10ZW1wbGF0ZS1jb21waWxlcgogKiBhbmQgY3JlYXRlcyBhbiBvYmplY3QgbGF0ZXIgdG8gYmUgdXNlZCBieSBTeXN0ZW1KUyB0byByZW5kZXIKICogdGhlIHRlbXBsYXRlLgogKi8KdmFyIGNvbXBpbGVUZW1wbGF0ZSA9IGZ1bmN0aW9uIChjb250ZW50LCB0ZW1wbGF0ZSwgc2NvcGVJZCwgc2NvcGVkKSB7CiAgICB2YXIgX2EgPSBWdWVUZW1wbGF0ZUNvbXBpbGVyLmNvbXBpbGVUb0Z1bmN0aW9ucyh0ZW1wbGF0ZS5jb250ZW50KSwgcmVuZGVyID0gX2EucmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgPSBfYS5zdGF0aWNSZW5kZXJGbnM7CiAgICBjb250ZW50ID0gaW5zZXJ0VGVtcGxhdGVJbkV4cG9ydChjb250ZW50LCB0ZW1wbGF0ZS5jb250ZW50LCBzY29wZUlkLCBzY29wZWQpOwogICAgcmV0dXJuICJ2YXIgX19yZW5kZXJGbnNfXyA9IHsgXG4gICAgICAgIHJlbmRlcjogIiArIHRvRm4ocmVuZGVyKSArICIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogW1xuICAgICAgICAgICAgIiArIHN0YXRpY1JlbmRlckZucy5tYXAodG9Gbikuam9pbigiLCIpICsgIlxuICAgICAgICBdIFxuICAgIH07ICIgKyBjb250ZW50Owp9OwovKioKICogVHJhbnNmb3JtIHRoZSBnaXZlbiBjb2RlIHdpdGggYnVibGUKICogYW5kIHB1dCBpdCBpbnRvIGEgcmVuZGVyIGZ1bmN0aW9uIGZvciBsYXRlciB1c2UuCiAqCiAqIFNvbWUgd2VpcmQgc3R1ZmYgYXQgdGhlIGVuZCBvZiB0aGlzIGZ1bmN0aW9uIGJ1dAogKiB0aGF0J3MgYmVjYXVzZSB0aGUgYnVibGUudHJhbnNmb3JtIHJldHVybnMgYW4KICogYW5vbnltb3VzIGZ1bmN0aW9uIHdoaWNoIG1lc3NlcyB1cCB0aGUgcmVuZGVyLgogKiBTbyB3ZSBhcmUgZXNzZW50aWFsbHkgcmVtb3ZpbmcgdGhhdCBmdW5jdGlvbiA6KQogKiBAdG9kbyBmaW5kIGEgYmV0dGVyIHdheSBmb3IgdGhpcy4gdGhpcyBpcyBob3JyaWJsZS4KICovCnZhciB0b0ZuID0gZnVuY3Rpb24gKGNvZGUpIHsKICAgIHJldHVybiBidWJsZQogICAgICAgIC50cmFuc2Zvcm0oImZ1bmN0aW9uIHJlbmRlciAoKSB7ICIgKyBjb2RlICsgIiB9IiwgewogICAgICAgIG9iamVjdEFzc2lnbjogIk9iamVjdC5hc3NpZ24iLAogICAgICAgIHRyYW5zZm9ybXM6IHsKICAgICAgICAgICAgc3RyaXBXaXRoOiB0cnVlLAogICAgICAgICAgICBzdHJpcFdpdGhGdW5jdGlvbmFsOiBmYWxzZQogICAgICAgIH0KICAgIH0pCiAgICAgICAgLmNvZGUucmVwbGFjZSgiZnVuY3Rpb24gYW5vbnltb3VzKFxuKSB7IiwgIiIpCiAgICAgICAgLnNsaWNlKDAsIC0xKTsKfTsKLyoqCiAqIEZpbmQgd2hlcmUgdGhlIGV4cG9ydCBkZWZhdWx0IGlzIGluIHRoZSBjb2RlCiAqIGFuZCBpbnNlcnQgdGhlIHRlbXBsYXRlIHByb3BlcnR5IHdpdGggY29udGVudC4KICovCnZhciBpbnNlcnRUZW1wbGF0ZUluRXhwb3J0ID0gZnVuY3Rpb24gKGNvbnRlbnQsIHRlbXBsYXRlLCBzY29wZUlkLCBzY29wZWQpIHsKICAgIGlmIChzY29wZWQgPT09IHZvaWQgMCkgeyBzY29wZWQgPSBmYWxzZTsgfQogICAgdmFyIGV4cG9ydFJlZ2V4ID0gL15leHBvcnQgZGVmYXVsdC4qL2dtOwogICAgaWYgKGV4cG9ydFJlZ2V4LnRlc3QoY29udGVudCkpIHsKICAgICAgICB2YXIgaW5zaWRlRXhwb3J0ID0gL1x7KC4qKVx9L2dtcy5leGVjKGNvbnRlbnQpOwogICAgICAgIHZhciBfdGVtcGxhdGUgPSAiYCIgKyB0ZW1wbGF0ZSArICJgIjsKICAgICAgICBjb250ZW50ID0gImV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAiICsgX3RlbXBsYXRlICsgIixcbiAgICAgICAgICAgIHJlbmRlcjogX19yZW5kZXJGbnNfXy5yZW5kZXIsXG4gICAgICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IF9fcmVuZGVyRm5zX18uc3RhdGljUmVuZGVyRm5zLCBcbiAgICAgICAgICAgICIgKyAoc2NvcGVkID8gIl9zY29wZUlkOlwiIiArIHNjb3BlSWQgKyAiXCIsIiA6ICIiKSArICJcbiAgICAgICAgICAgICIgKyAoaW5zaWRlRXhwb3J0ICYmIGluc2lkZUV4cG9ydC5sZW5ndGggPyBpbnNpZGVFeHBvcnRbMV0gOiAiIikgKyAiIH07ICI7CiAgICB9CiAgICByZXR1cm4gY29udGVudDsKfTsKCg==', null, false);
/* eslint-enable *//* eslint-disable */
const WorkerFactory$4 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0NCg0KZnVuY3Rpb24gX192YWx1ZXMobykgew0KICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gImZ1bmN0aW9uIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwOw0KICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pOw0KICAgIHJldHVybiB7DQogICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHsNCiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7DQogICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07DQogICAgICAgIH0NCiAgICB9Ow0KfQoKdmFyIFRSQU5TUElMRV9TVEFUVVMgPSB7CiAgICBQUkVQQVJFX0ZJTEVTOiAidHJhbnNwaWxlcjpmaWxlOnByZXBhcmUiLAogICAgUFJFUEFSRV9BRERJVElPTkFMOiAidHJhbnNwaWxlcjphZGRpdGlvbmFsOnByZXBhcmUiLAogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAidHJhbnNwaWxlcjphZGRpdGlvbmFsOnRyYW5zcGlsZWQiLAogICAgVFJBTlNQSUxFX0NPTVBMRVRFOiAidHJhbnNwaWxlcjp0cmFuc3BpbGU6Y29tcGxldGUiLAogICAgRVJST1JfUFJFUEFSSU5HX0FORF9DT01QSUxJTkc6ICJ0cmFuc3BpbGVyOmVycm9yOmNvbXBpbGUiLAogICAgRVJST1JfQURESVRJT05BTDogInRyYW5zcGlsZXI6ZXJyb3I6YWRkaXRpb25hbCIKfTsKCnZhciBhYnNvbHV0ZVBhdGggPSAvXig/OlwvfCg/OltBLVphLXpdOik/W1xcfFwvXSkvOwpmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGgpIHsKICAgIHJldHVybiBhYnNvbHV0ZVBhdGgudGVzdChwYXRoKTsKfQpmdW5jdGlvbiBkaXJuYW1lKHBhdGgpIHsKICAgIHZhciBtYXRjaCA9IC8oXC98XFwpW15cL1xcXSokLy5leGVjKHBhdGgpOwogICAgaWYgKCFtYXRjaCkKICAgICAgICByZXR1cm4gIi4iOwogICAgdmFyIGRpciA9IHBhdGguc2xpY2UoMCwgLW1hdGNoWzBdLmxlbmd0aCk7CiAgICAvLyBJZiBgZGlyYCBpcyB0aGUgZW1wdHkgc3RyaW5nLCB3ZSdyZSBhdCByb290LgogICAgcmV0dXJuIGRpciA/IGRpciA6ICIvIjsKfQpmdW5jdGlvbiByZXNvbHZlKCkgewogICAgdmFyIHBhdGhzID0gW107CiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykgewogICAgICAgIHBhdGhzW19pXSA9IGFyZ3VtZW50c1tfaV07CiAgICB9CiAgICB2YXIgcmVzb2x2ZWRQYXJ0cyA9IHBhdGhzLnNoaWZ0KCkuc3BsaXQoL1tcL1xcXS8pOwogICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbiAocGF0aCkgewogICAgICAgIGlmIChpc0Fic29sdXRlKHBhdGgpKSB7CiAgICAgICAgICAgIHJlc29sdmVkUGFydHMgPSBwYXRoLnNwbGl0KC9bXC9cXF0vKTsKICAgICAgICB9CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoL1tcL1xcXS8pOwogICAgICAgICAgICB3aGlsZSAocGFydHNbMF0gPT09ICIuIiB8fCBwYXJ0c1swXSA9PT0gIi4uIikgewogICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0cy5zaGlmdCgpOwogICAgICAgICAgICAgICAgaWYgKHBhcnQgPT09ICIuLiIpIHsKICAgICAgICAgICAgICAgICAgICByZXNvbHZlZFBhcnRzLnBvcCgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJlc29sdmVkUGFydHMucHVzaC5hcHBseShyZXNvbHZlZFBhcnRzLCBwYXJ0cyk7CiAgICAgICAgfQogICAgfSk7CiAgICByZXR1cm4gbm9ybWFsaXplKHJlc29sdmVkUGFydHMuam9pbigiLyIpKTsKfQpmdW5jdGlvbiBub3JtYWxpemUocGF0aCkgewogICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXC9cLy9naSwgIi8iKTsKfQoKdmFyIHJlc29sdmVSZWxhdGl2ZSA9IGZ1bmN0aW9uIChjaGlsZFBhdGgsIHBhcmVudFBhdGgsIGNvbnRleHQsIHBhdGhPbmx5KSB7CiAgICBpZiAocGF0aE9ubHkgPT09IHZvaWQgMCkgeyBwYXRoT25seSA9IHRydWU7IH0KICAgIHZhciByZXRyeUZpbGVGaW5kID0gZnVuY3Rpb24gKHBhdGgpIHsKICAgICAgICByZXR1cm4gY29udGV4dC5maWxlcy5maW5kKGZ1bmN0aW9uIChmKSB7CiAgICAgICAgICAgIHJldHVybiBmLnBhdGggPT09IHBhdGggKyAiL2luZGV4LmpzIiB8fAogICAgICAgICAgICAgICAgZi5wYXRoID09PSBwYXRoICsgIi9pbmRleC50cyIgfHwKICAgICAgICAgICAgICAgIGYucGF0aCA9PT0gcGF0aCArICIvaW5kZXguanN4IiB8fAogICAgICAgICAgICAgICAgZi5wYXRoID09PSBwYXRoICsgIi9pbmRleC50c3giIHx8CiAgICAgICAgICAgICAgICBmLnBhdGggPT09IHBhdGggKyAiLmpzIiB8fAogICAgICAgICAgICAgICAgZi5wYXRoID09PSBwYXRoICsgIi50cyIgfHwKICAgICAgICAgICAgICAgIGYucGF0aCA9PT0gcGF0aCArICIuanN4IiB8fAogICAgICAgICAgICAgICAgZi5wYXRoID09PSBwYXRoICsgIi50c3giOwogICAgICAgIH0pIHx8IG51bGw7CiAgICB9OwogICAgdmFyIHJlc29sdmVkID0gcmVzb2x2ZShkaXJuYW1lKHBhcmVudFBhdGgpLCBjaGlsZFBhdGgpLnJlcGxhY2UoL15cLlwvLywgIiIpOwogICAgdmFyIGZvdW5kRmlsZSA9IGNvbnRleHQuZmlsZXMuZmluZChmdW5jdGlvbiAoZikgeyByZXR1cm4gZi5wYXRoID09PSByZXNvbHZlZDsgfSk7CiAgICBpZiAoZm91bmRGaWxlKQogICAgICAgIHJldHVybiBwYXRoT25seSA/IGZvdW5kRmlsZS5wYXRoIDogZm91bmRGaWxlOwogICAgdmFyIGFic29sdXRlID0gcmVzb2x2ZShkaXJuYW1lKHBhcmVudFBhdGgpLCBjaGlsZFBhdGgpOwogICAgdmFyIHJldHJpZWRGaWxlID0gcmV0cnlGaWxlRmluZChhYnNvbHV0ZSk7CiAgICBpZiAoIXJldHJpZWRGaWxlKQogICAgICAgIHJldHVybiBudWxsOwogICAgcmV0dXJuIHBhdGhPbmx5ID8gcmV0cmllZEZpbGUucGF0aCB8fCBudWxsIDogcmV0cmllZEZpbGUgfHwgbnVsbDsKfTsKCi8qKgogKiBTbGlnaHRseSBtb2RpZmllZCB2ZXJzaW9uIG9mOgogKiAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9rZXZ2YS9wYXJzZS1pbXBvcnQvYmxvYi9tYXN0ZXIvaW5kZXguanMKICogYnkgaHR0cHM6Ly9naXRodWIuY29tL2tldnZhCiAqLwp2YXIgZ2V0UGF0aCA9IGZ1bmN0aW9uIChzdHIpIHsKICAgIHJldHVybiAvKD86dXJsXCgpKD86Lio/KSg/OlwpKXwoWyInXSkoPzpbXiInKV0rKVwxL2dpCiAgICAgICAgLmV4ZWMoc3RyKVswXQogICAgICAgIC5yZXBsYWNlKC8oPzp1cmxcKCkvZ2ksICIiKQogICAgICAgIC5yZXBsYWNlKC8oPzpcKSkvZywgIiIpCiAgICAgICAgLnJlcGxhY2UoLyg/OlsiJ10pL2csICIiKQogICAgICAgIC50cmltKCk7Cn07CnZhciBnZXRDb25kaXRpb24gPSBmdW5jdGlvbiAoc3RyKSB7CiAgICByZXR1cm4gc3RyCiAgICAgICAgLnJlcGxhY2UoLyg/OnVybFwoKSg/Oi4qPykoPzpcKSl8KFsiJ10pKD86W14iJyldKylcMS9naSwgIiIpCiAgICAgICAgLnJlcGxhY2UoLyg/OkBpbXBvcnQpKD86XHMpKi9nLCAiIikKICAgICAgICAudHJpbSgpOwp9Owp2YXIgcGFyc2VDc3NJbXBvcnQgPSAoZnVuY3Rpb24gKGNzc0ltcG9ydCkgewogICAgY3NzSW1wb3J0ID0gY3NzSW1wb3J0LnJlcGxhY2UoLyg/OjspJC9nLCAiIik7CiAgICByZXR1cm4gewogICAgICAgIHBhdGg6IGdldFBhdGgoY3NzSW1wb3J0KSwKICAgICAgICBjb25kaXRpb246IGdldENvbmRpdGlvbihjc3NJbXBvcnQpIHx8IG51bGwsCiAgICAgICAgcnVsZTogY3NzSW1wb3J0CiAgICB9Owp9KTsKCnNlbGYuaW1wb3J0U2NyaXB0cygiaHR0cHM6Ly91bnBrZy5jb20vQGJsb3h5L2lpZmUtbGlic0BsYXRlc3QvbGlicy9jc3MuanMiLCAiaHR0cHM6Ly91bnBrZy5jb20vQGJsb3h5L2lpZmUtbGlic0BsYXRlc3QvbGlicy9wb3N0Y3NzLXNlbGVjdG9yLXBhcnNlci5qcyIpOwpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiAoX2EpIHsKICAgIHZhciBkYXRhID0gX2EuZGF0YTsKICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBmaWxlLCB0eXBlLCBjb250ZXh0LCB0cmFuc3BpbGVkRmlsZTsKICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7CiAgICAgICAgICAgIGZpbGUgPSBkYXRhLmZpbGUsIHR5cGUgPSBkYXRhLnR5cGUsIGNvbnRleHQgPSBkYXRhLmNvbnRleHQ7CiAgICAgICAgICAgIGlmICh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLlBSRVBBUkVfRklMRVMpIHsKICAgICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICAgICAgdHJhbnNwaWxlZEZpbGUgPSBwcmVwYXJlQW5kVHJhbnNwaWxlRmlsZShmaWxlLCBjb250ZXh0KTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLAogICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiB0cmFuc3BpbGVkRmlsZQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX1BSRVBBUklOR19BTkRfQ09NUElMSU5HLAogICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgfSk7CiAgICB9KTsKfSk7CnZhciBwcmVwYXJlQW5kVHJhbnNwaWxlRmlsZSA9IGZ1bmN0aW9uIChmaWxlLCBjb250ZXh0KSB7CiAgICB2YXIgb3JpZ2luYWxBc3QgPSBnZXRBc3RGcm9tRmlsZShmaWxlKTsKICAgIHZhciBydWxlcyA9IGFwcGVuZEltcG9ydGVkRmlsZXNXaXRoQXN0KGZpbGUucGF0aCwgb3JpZ2luYWxBc3QsIGNvbnRleHQpOwogICAgb3JpZ2luYWxBc3Quc3R5bGVzaGVldC5ydWxlcyA9IHJ1bGVzOwogICAgdmFyIGNvbXBpbGVkQ29kZSA9IGNzcy5zdHJpbmdpZnkob3JpZ2luYWxBc3QpOwogICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiBjb21waWxlZENvZGUgfSk7Cn07CnZhciBnZXRBc3RGcm9tRmlsZSA9IGZ1bmN0aW9uIChmaWxlKSB7CiAgICByZXR1cm4gY3NzLnBhcnNlKGZpbGUuY29kZSwgeyBzb3VyY2U6IGZpbGUucGF0aCB9KTsKfTsKdmFyIGFwcGVuZEltcG9ydGVkRmlsZXNXaXRoQXN0ID0gZnVuY3Rpb24gKGN1cnJlbnRQYXRoLCBjdXJyZW50QXN0LCBjb250ZXh0LCBsb29wZWRSdWxlcykgewogICAgdmFyIGVfMSwgX2E7CiAgICBpZiAobG9vcGVkUnVsZXMgPT09IHZvaWQgMCkgeyBsb29wZWRSdWxlcyA9IFtdOyB9CiAgICB2YXIgY3VycmVuZXRMb29wID0gW107CiAgICB2YXIgcnVsZXMgPSBjdXJyZW50QXN0LnN0eWxlc2hlZXQucnVsZXMgfHwgW107CiAgICB0cnkgewogICAgICAgIGZvciAodmFyIHJ1bGVzXzEgPSBfX3ZhbHVlcyhydWxlcyksIHJ1bGVzXzFfMSA9IHJ1bGVzXzEubmV4dCgpOyAhcnVsZXNfMV8xLmRvbmU7IHJ1bGVzXzFfMSA9IHJ1bGVzXzEubmV4dCgpKSB7CiAgICAgICAgICAgIHZhciBydWxlID0gcnVsZXNfMV8xLnZhbHVlOwogICAgICAgICAgICBpZiAocnVsZS50eXBlICE9ICJpbXBvcnQiKSB7CiAgICAgICAgICAgICAgICBjdXJyZW5ldExvb3AucHVzaChydWxlKTsKICAgICAgICAgICAgICAgIGxvb3BlZFJ1bGVzLnB1c2gocnVsZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKHJ1bGUuaW1wb3J0KSB7CiAgICAgICAgICAgICAgICB2YXIgaW1wb3J0UnVsZSA9ICJAaW1wb3J0ICIgKyBydWxlLmltcG9ydCArICI7IjsKICAgICAgICAgICAgICAgIHZhciBwYXJzZWRJbXBvcnQgPSBwYXJzZUNzc0ltcG9ydChpbXBvcnRSdWxlKTsKICAgICAgICAgICAgICAgIGlmIChwYXJzZWRJbXBvcnQucGF0aCkgewogICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZEZpbGUgPSAocmVzb2x2ZVJlbGF0aXZlKHBhcnNlZEltcG9ydC5wYXRoLCBjdXJyZW50UGF0aCwgY29udGV4dCwgZmFsc2UpKTsKICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmRGaWxlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZm91bmRGaWxlLnBhdGguZW5kc1dpdGgoIi5jc3MiKSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJZb3UgY2FuJ3QgaW1wb3J0ICIgKyBmb3VuZEZpbGUucGF0aCArICIgaW4gIiArIGN1cnJlbnRQYXRoICsgIiBiZWNhdXNlIGl0J3Mgbm90IGEgQ1NTIGZpbGUuIik7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnNlZEFkZGl0aW9uYWxGaWxlID0gY3NzLnBhcnNlKGZvdW5kRmlsZS5jb2RlLCB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGZvdW5kRmlsZS5wYXRoCiAgICAgICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnNlZEltcG9ydC5jb25kaXRpb24gfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICFwYXJzZWRJbXBvcnQuY29uZGl0aW9uLmxlbmd0aCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kSW1wb3J0ZWRGaWxlc1dpdGhBc3QoZm91bmRGaWxlLnBhdGgsIHBhcnNlZEFkZGl0aW9uYWxGaWxlLCBjb250ZXh0LCBsb29wZWRSdWxlcyk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1wb3J0UnVsZXMgPSBwYXJzZWRBZGRpdGlvbmFsRmlsZS5zdHlsZXNoZWV0LnJ1bGVzLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gci50eXBlID09PSAiaW1wb3J0IjsgfSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29wZWRSdWxlcy5wdXNoKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWRpYTogcGFyc2VkSW1wb3J0LmNvbmRpdGlvbiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlczogcGFyc2VkQWRkaXRpb25hbEZpbGUuc3R5bGVzaGVldC5ydWxlcy5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIudHlwZSAhPT0gImltcG9ydCI7IH0pLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICJtZWRpYSIKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydFJ1bGVzLmxlbmd0aCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcHBlbmRBZGRpdGlvbmFsSW1wb3J0cyA9IF9fYXNzaWduKHt9LCBwYXJzZWRBZGRpdGlvbmFsRmlsZSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kQWRkaXRpb25hbEltcG9ydHMuc3R5bGVzaGVldC5ydWxlcyA9IGltcG9ydFJ1bGVzOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZEltcG9ydGVkRmlsZXNXaXRoQXN0KGZvdW5kRmlsZS5wYXRoLCBhcHBlbmRBZGRpdGlvbmFsSW1wb3J0cywgY29udGV4dCwgbG9vcGVkUnVsZXMpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQogICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH0KICAgIGZpbmFsbHkgewogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGlmIChydWxlc18xXzEgJiYgIXJ1bGVzXzFfMS5kb25lICYmIChfYSA9IHJ1bGVzXzEucmV0dXJuKSkgX2EuY2FsbChydWxlc18xKTsKICAgICAgICB9CiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfQogICAgfQogICAgcmV0dXJuIGxvb3BlZFJ1bGVzOwp9OwoK', null, false);
/* eslint-enable */var CssTranspiler = /** @class */ (function (_super) {
    __extends(CssTranspiler, _super);
    function CssTranspiler(context) {
        var _this = _super.call(this, "css-transpiler", new WorkerFactory$4(), context) || this;
        _this.additionalTranspilers = {};
        return _this;
    }
    CssTranspiler.prototype.transpile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doTranspile(file)];
            });
        });
    };
    return CssTranspiler;
}(Transpiler));
//# sourceMappingURL=index.js.map
var VueTranspiler = /** @class */ (function (_super) {
    __extends(VueTranspiler, _super);
    function VueTranspiler(context) {
        var _this = _super.call(this, "vue-transpiler", new WorkerFactory$3(), context) || this;
        _this.additionalTranspilers = {
            sass: SassTranspiler,
            scss: SassTranspiler,
            styl: StylusTranspiler,
            less: LessTranspiler,
            css: CssTranspiler
        };
        return _this;
    }
    VueTranspiler.prototype.transpile = function (file) {
        return this.doTranspile(file);
    };
    return VueTranspiler;
}(Transpiler));
//# sourceMappingURL=index.js.map
function vueTransformer(context) {
    var transformerName = "packager::transformer::vue-transformer";
    var isVue = verifyExtensions([".vue"]);
    var transpiler;
    return {
        name: transformerName,
        transform: function (code, modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var file_1, completed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isVue(modulePath)) return [3 /*break*/, 2];
                            transpiler = context.cache.transpilers.get("vue-transpiler");
                            if (!transpiler) {
                                transpiler = new VueTranspiler(context);
                                context.cache.transpilers.set("vue-transpiler", transpiler);
                            }
                            file_1 = context.files.find(function (f) { return f.path === modulePath; });
                            return [4 /*yield*/, context.transpileQueue.push("Vue-Transpiler", function () {
                                    return transpiler.transpile(__assign(__assign({}, file_1), { code: code }));
                                })];
                        case 1:
                            _a.sent();
                            completed = context.transpileQueue.completed.find(function (c) { return c.path === modulePath; });
                            if (completed) {
                                return [2 /*return*/, {
                                        code: completed.code,
                                        map: completed.map || { mappings: "" }
                                    }];
                            }
                            throw new TransformationException(modulePath, transformerName);
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map
/* eslint-disable */
const WorkerFactory$5 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0KCnZhciBUUkFOU1BJTEVfU1RBVFVTID0gewogICAgUFJFUEFSRV9GSUxFUzogInRyYW5zcGlsZXI6ZmlsZTpwcmVwYXJlIiwKICAgIFBSRVBBUkVfQURESVRJT05BTDogInRyYW5zcGlsZXI6YWRkaXRpb25hbDpwcmVwYXJlIiwKICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogInRyYW5zcGlsZXI6YWRkaXRpb25hbDp0cmFuc3BpbGVkIiwKICAgIFRSQU5TUElMRV9DT01QTEVURTogInRyYW5zcGlsZXI6dHJhbnNwaWxlOmNvbXBsZXRlIiwKICAgIEVSUk9SX1BSRVBBUklOR19BTkRfQ09NUElMSU5HOiAidHJhbnNwaWxlcjplcnJvcjpjb21waWxlIiwKICAgIEVSUk9SX0FERElUSU9OQUw6ICJ0cmFuc3BpbGVyOmVycm9yOmFkZGl0aW9uYWwiCn07CgovLyBzZWxmLmltcG9ydFNjcmlwdHMoCi8vICAgICAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS90eXBlc2NyaXB0QGxhdGVzdC9saWIvdHlwZXNjcmlwdC5qcyIKLy8gKTsKc2VsZi5pbXBvcnRTY3JpcHRzKCJodHRwczovL3VucGtnLmNvbS9AYmxveHkvaWlmZS1saWJzQGxhdGVzdC9saWJzL3N1Y3Jhc2UuanMiKTsKc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZnVuY3Rpb24gKF9hKSB7CiAgICB2YXIgZGF0YSA9IF9hLmRhdGE7CiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgZmlsZSwgdHlwZSwgY29udGV4dCwgdHJhbnNwaWxlZEZpbGUsIGVycm9yXzE7CiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikgewogICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7CiAgICAgICAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgICAgICAgICAgZmlsZSA9IGRhdGEuZmlsZSwgdHlwZSA9IGRhdGEudHlwZSwgY29udGV4dCA9IGRhdGEuY29udGV4dDsKICAgICAgICAgICAgICAgICAgICBpZiAoISh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLlBSRVBBUkVfRklMRVMpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTsKICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7CiAgICAgICAgICAgICAgICBjYXNlIDE6CiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0cmFuc3BpbGVGaWxlKGZpbGUpXTsKICAgICAgICAgICAgICAgIGNhc2UgMjoKICAgICAgICAgICAgICAgICAgICB0cmFuc3BpbGVkRmlsZSA9IF9iLnNlbnQoKTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLAogICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiB0cmFuc3BpbGVkRmlsZQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgY2FzZSAzOgogICAgICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYi5zZW50KCk7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX1BSRVBBUklOR19BTkRfQ09NUElMSU5HLAogICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JfMQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgIH0pOwp9KTsKdmFyIHRyYW5zcGlsZUZpbGUgPSBmdW5jdGlvbiAoZmlsZSkgewogICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsKICAgICAgICB2YXIgdHJhbnNwaWxlZCA9IHN1Y3Jhc2UudHJhbnNmb3JtKGZpbGUuY29kZSwgewogICAgICAgICAgICB0cmFuc2Zvcm1zOiBbInR5cGVzY3JpcHQiLCAianN4Il0sCiAgICAgICAgICAgIGZpbGVQYXRoOiBmaWxlLnBhdGgsCiAgICAgICAgICAgIGVuYWJsZUxlZ2FjeVR5cGVTY3JpcHRNb2R1bGVJbnRlcm9wOiB0cnVlLAogICAgICAgICAgICBzb3VyY2VNYXBPcHRpb25zOiB7CiAgICAgICAgICAgICAgICBjb21waWxlZEZpbGVuYW1lOiBmaWxlLnBhdGgKICAgICAgICAgICAgfQogICAgICAgIH0pOwogICAgICAgIC8vIGNvbnN0IHRyYW5zcGlsZWQgPSB0cy50cmFuc3BpbGVNb2R1bGUoZmlsZS5jb2RlLCB7CiAgICAgICAgLy8gICAgIGZpbGVOYW1lOiBmaWxlLm5hbWUsCiAgICAgICAgLy8gICAgIGNvbXBpbGVyT3B0aW9uczogewogICAgICAgIC8vICAgICAgICAgYWxsb3dTeW50aGV0aWNEZWZhdWx0SW1wb3J0czogdHJ1ZSwKICAgICAgICAvLyAgICAgICAgIHRhcmdldDogdHMuU2NyaXB0VGFyZ2V0LkVTNSwKICAgICAgICAvLyAgICAgICAgIG1vZHVsZTogdHMuTW9kdWxlS2luZC5FU05leHQsCiAgICAgICAgLy8gICAgICAgICBpbXBvcnRIZWxwZXJzOiB0cnVlLAogICAgICAgIC8vICAgICAgICAgbm9FbWl0SGVscGVyczogZmFsc2UsCiAgICAgICAgLy8gICAgICAgICBtb2R1bGVSZXNvbHV0aW9uOiB0cy5Nb2R1bGVSZXNvbHV0aW9uS2luZC5Ob2RlSnMsCiAgICAgICAgLy8gICAgICAgICBqc3g6IHRzLkpzeEVtaXQuUmVhY3QsCiAgICAgICAgLy8gICAgICAgICBzb3VyY2VNYXA6IHRydWUKICAgICAgICAvLyAgICAgfQogICAgICAgIC8vIH0pOwogICAgICAgIGlmICh0cmFuc3BpbGVkICYmIHRyYW5zcGlsZWQuY29kZSkgewogICAgICAgICAgICByZXNvbHZlKF9fYXNzaWduKF9fYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiB0cmFuc3BpbGVkLmNvZGUsIG1hcDogdHJhbnNwaWxlZC5zb3VyY2VNYXAgfHwge30gfSkpOwogICAgICAgIH0KICAgICAgICBlbHNlIHsKICAgICAgICAgICAgcmVqZWN0KCJGYWlsZWQgdG8gdHJhbnNwaWxlICIgKyBmaWxlLnBhdGgpOwogICAgICAgIH0KICAgICAgICAvLyBpZiAodHJhbnNwaWxlZC5vdXRwdXRUZXh0KSB7CiAgICAgICAgLy8gICAgIHJlc29sdmUoewogICAgICAgIC8vICAgICAgICAgLi4uZmlsZSwKICAgICAgICAvLyAgICAgICAgIGNvZGU6IHRyYW5zcGlsZWQub3V0cHV0VGV4dCwKICAgICAgICAvLyAgICAgICAgIG1hcDogSlNPTi5wYXJzZSh0cmFuc3BpbGVkLnNvdXJjZU1hcFRleHQgfHwgInt9IikKICAgICAgICAvLyAgICAgfSk7CiAgICAgICAgLy8gfSBlbHNlIHsKICAgICAgICAvLyAgICAgcmVqZWN0KGBGYWlsZWQgdG8gdHJhbnNwaWxlICR7ZmlsZS5wYXRofWApOwogICAgICAgIC8vIH0KICAgIH0pOwp9OwoK', null, false);
/* eslint-enable */var TypescriptTranspiler = /** @class */ (function (_super) {
    __extends(TypescriptTranspiler, _super);
    function TypescriptTranspiler(context) {
        var _this = _super.call(this, "typescript-transpiler", new WorkerFactory$5(), context) || this;
        _this.additionalTranspilers = {};
        return _this;
    }
    TypescriptTranspiler.prototype.transpile = function (file) {
        return this.doTranspile(file);
    };
    return TypescriptTranspiler;
}(Transpiler));
//# sourceMappingURL=index.js.map
function typescriptTransformer(context) {
    var transformerName = "packager::transformer::typescript-transformer";
    var isTypescriptOrJavascript = verifyExtensions([
        ".js",
        ".jsx",
        ".ts",
        ".tsx"
    ]);
    var transpiler;
    return {
        name: transformerName,
        transform: function (code, modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var file_1, completed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isTypescriptOrJavascript(modulePath)) return [3 /*break*/, 2];
                            transpiler = context.cache.transpilers.get("typescript-transpiler");
                            if (!transpiler) {
                                transpiler = new TypescriptTranspiler(context);
                                context.cache.transpilers.set("typescript-transpiler", transpiler);
                            }
                            file_1 = context.files.find(function (f) { return f.path === modulePath; });
                            return [4 /*yield*/, context.transpileQueue.push("Typescript-Transpiler", function () {
                                    return transpiler.transpile(__assign(__assign({}, file_1), { code: code }));
                                })];
                        case 1:
                            _a.sent();
                            completed = context.transpileQueue.completed.find(function (c) { return c.path === modulePath; });
                            if (completed) {
                                return [2 /*return*/, {
                                        code: completed.code,
                                        map: completed.map || { mappings: "" },
                                        syntheticNamedExports: true
                                    }];
                            }
                            throw new TransformationException(modulePath, transformerName);
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map
/* eslint-disable */
const WorkerFactory$6 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0KCnZhciBnZW5lcmF0ZUV4cG9ydCA9IGZ1bmN0aW9uIChmaWxlLCBwcmVwZW5kRXhwb3J0RGVmYXVsdCkgewogICAgaWYgKHByZXBlbmRFeHBvcnREZWZhdWx0ID09PSB2b2lkIDApIHsgcHJlcGVuZEV4cG9ydERlZmF1bHQgPSB0cnVlOyB9CiAgICByZXR1cm4gKChwcmVwZW5kRXhwb3J0RGVmYXVsdCA/ICJleHBvcnQgZGVmYXVsdCAiIDogIiIpICsgImZ1bmN0aW9uIGFkZFN0eWxlcyAoKSB7IiArCiAgICAgICAgImNvbnN0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7IiArCiAgICAgICAgInRhZy50eXBlID0gJ3RleHQvY3NzJzsiICsKICAgICAgICAoInRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgIiArIGZpbGUuY29kZSArICJgKSk7IikgKwogICAgICAgICgidGFnLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCAnIiArIGZpbGUucGF0aCArICInKTsiKSArCiAgICAgICAgImRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGFnKTsiICsKICAgICAgICAifSBhZGRTdHlsZXMoKTsiKTsKfTsKdmFyIGdlbmVyYXRlRXhwb3J0c0ZvckFsbFN0eWxlcyA9IGZ1bmN0aW9uIChzdHlsZXMsIGZpbGVQYXRoKSB7IHJldHVybiBnZW5lcmF0ZUV4cG9ydCh7IHBhdGg6IGZpbGVQYXRoLCBjb2RlOiBzdHlsZXMuam9pbigiXG5cbiIpIH0sIGZhbHNlKTsgfTsKCnZhciBUUkFOU1BJTEVfU1RBVFVTID0gewogICAgUFJFUEFSRV9GSUxFUzogInRyYW5zcGlsZXI6ZmlsZTpwcmVwYXJlIiwKICAgIFBSRVBBUkVfQURESVRJT05BTDogInRyYW5zcGlsZXI6YWRkaXRpb25hbDpwcmVwYXJlIiwKICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogInRyYW5zcGlsZXI6YWRkaXRpb25hbDp0cmFuc3BpbGVkIiwKICAgIFRSQU5TUElMRV9DT01QTEVURTogInRyYW5zcGlsZXI6dHJhbnNwaWxlOmNvbXBsZXRlIiwKICAgIEVSUk9SX1BSRVBBUklOR19BTkRfQ09NUElMSU5HOiAidHJhbnNwaWxlcjplcnJvcjpjb21waWxlIiwKICAgIEVSUk9SX0FERElUSU9OQUw6ICJ0cmFuc3BpbGVyOmVycm9yOmFkZGl0aW9uYWwiCn07CgpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vc3ZlbHRlQGxhdGVzdC9jb21waWxlci5taW4uanMiKTsKc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZnVuY3Rpb24gKF9hKSB7CiAgICB2YXIgZGF0YSA9IF9hLmRhdGE7CiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgZmlsZSwgdHlwZSwgYWRkaXRpb25hbCwgX2IsIHN0eWxlcywgcmVzdCwgdHJhbnNwaWxlZEZpbGUsIGFkZGl0aW9uYWxfMSwgZXJyb3JfMSwgY29kZTsKICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7CiAgICAgICAgICAgIHN3aXRjaCAoX2MubGFiZWwpIHsKICAgICAgICAgICAgICAgIGNhc2UgMDoKICAgICAgICAgICAgICAgICAgICBmaWxlID0gZGF0YS5maWxlLCB0eXBlID0gZGF0YS50eXBlLCBhZGRpdGlvbmFsID0gZGF0YS5hZGRpdGlvbmFsOwogICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGUgPT09IFRSQU5TUElMRV9TVEFUVVMuUFJFUEFSRV9GSUxFUykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdOwogICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gMTsKICAgICAgICAgICAgICAgIGNhc2UgMToKICAgICAgICAgICAgICAgICAgICBfYy50cnlzLnB1c2goWzEsIDQsICwgNV0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGV4dHJhY3RGcm9tRmlsZShmaWxlKV07CiAgICAgICAgICAgICAgICBjYXNlIDI6CiAgICAgICAgICAgICAgICAgICAgX2IgPSBfYy5zZW50KCksIHN0eWxlcyA9IF9iLnN0eWxlcywgcmVzdCA9IF9iLnJlc3Q7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdHJhbnNwaWxlRmlsZShfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZmlsZSksIHsgY29kZTogcmVzdCB9KSldOwogICAgICAgICAgICAgICAgY2FzZSAzOgogICAgICAgICAgICAgICAgICAgIHRyYW5zcGlsZWRGaWxlID0gX2Muc2VudCgpOwogICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZXMgJiYgc3R5bGVzLmxlbmd0aCkgewogICAgICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsXzEgPSB7IHN0eWxlczogc3R5bGVzIH07CiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLlBSRVBBUkVfQURESVRJT05BTCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IHRyYW5zcGlsZWRGaWxlLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbDogYWRkaXRpb25hbF8xCiAgICAgICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZQogICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogdHJhbnNwaWxlZEZpbGUKICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdOwogICAgICAgICAgICAgICAgY2FzZSA0OgogICAgICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYy5zZW50KCk7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX1BSRVBBUklOR19BTkRfQ09NUElMSU5HLAogICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JfMQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdOwogICAgICAgICAgICAgICAgY2FzZSA1OgogICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLkFERElUSU9OQUxfVFJBTlNQSUxFRCkgewogICAgICAgICAgICAgICAgICAgICAgICBjb2RlID0gZmlsZS5jb2RlOwogICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWRkaXRpb25hbCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlICs9IGdlbmVyYXRlRXhwb3J0c0ZvckFsbFN0eWxlcyhhZGRpdGlvbmFsLnN0eWxlcy5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMuY29kZTsgfSksIGZpbGUucGF0aCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLlRSQU5TUElMRV9DT01QTEVURSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogX19hc3NpZ24oX19hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGU6IGNvZGUgfSkKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9BRERJVElPTkFMLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgIH0pOwp9KTsKdmFyIGV4dHJhY3RGcm9tRmlsZSA9IGZ1bmN0aW9uIChmaWxlKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkgewogICAgdmFyIGV4dHJhY3RlZCwgY29kZTsKICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHsKICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7CiAgICAgICAgICAgIGNhc2UgMDoKICAgICAgICAgICAgICAgIGV4dHJhY3RlZCA9IHsKICAgICAgICAgICAgICAgICAgICBzdHlsZXM6IFtdCiAgICAgICAgICAgICAgICB9OwogICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgc3ZlbHRlLnByZXByb2Nlc3MoZmlsZS5jb2RlLCB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBmdW5jdGlvbiAoX2EpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2RlID0gX2EuY29udGVudCwgYXR0cmlidXRlcyA9IF9hLmF0dHJpYnV0ZXM7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0ZWQuc3R5bGVzLnB1c2goewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGNvZGUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZzogYXR0cmlidXRlcy5sYW5nIHx8ICJjc3MiLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGZpbGUucGF0aAogICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBjb2RlOiAiIiB9OwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfSwgeyBmaWxlbmFtZTogZmlsZS5wYXRoIH0pXTsKICAgICAgICAgICAgY2FzZSAxOgogICAgICAgICAgICAgICAgY29kZSA9IChfYS5zZW50KCkpLmNvZGU7CiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgewogICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXM6IGV4dHJhY3RlZC5zdHlsZXMsCiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3Q6IGNvZGUKICAgICAgICAgICAgICAgICAgICB9XTsKICAgICAgICB9CiAgICB9KTsKfSk7IH07CnZhciB0cmFuc3BpbGVGaWxlID0gZnVuY3Rpb24gKGZpbGUpIHsKICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciB0cmFuc3BpbGVkOwogICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHsKICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHRyYW5zcGlsZWQgPSBzdmVsdGUuY29tcGlsZShmaWxlLmNvZGUsIHsKICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZS5wYXRoCiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIHJlc29sdmUoX19hc3NpZ24oX19hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGU6IHRyYW5zcGlsZWQuanMuY29kZSB9KSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7CiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTsKICAgICAgICB9KTsKICAgIH0pOyB9KTsKfTsKCg==', null, false);
/* eslint-enable */var SvelteTranspiler = /** @class */ (function (_super) {
    __extends(SvelteTranspiler, _super);
    function SvelteTranspiler(context) {
        var _this = _super.call(this, "svelte-transpiler", new WorkerFactory$6(), context) || this;
        _this.additionalTranspilers = {
            sass: SassTranspiler,
            scss: SassTranspiler,
            styl: StylusTranspiler,
            less: LessTranspiler,
            css: CssTranspiler
        };
        return _this;
    }
    SvelteTranspiler.prototype.transpile = function (file) {
        return this.doTranspile(file);
    };
    SvelteTranspiler.forceExternal = true;
    return SvelteTranspiler;
}(Transpiler));
//# sourceMappingURL=index.js.map
function svelteTransformer(context) {
    var transformerName = "packager::transformer::svelte-transformer";
    var isSvelte = verifyExtensions([".svelte"]);
    var transpiler;
    return {
        name: transformerName,
        transform: function (code, modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var file_1, completed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isSvelte(modulePath)) return [3 /*break*/, 2];
                            transpiler = context.cache.transpilers.get("svelte-transpiler");
                            if (!transpiler) {
                                transpiler = new SvelteTranspiler(context);
                                context.cache.transpilers.set("svelte-transpiler", transpiler);
                            }
                            file_1 = context.files.find(function (f) { return f.path === modulePath; });
                            return [4 /*yield*/, context.transpileQueue.push("Svelte-Transpiler", function () {
                                    return transpiler.transpile(__assign(__assign({}, file_1), { code: code }));
                                })];
                        case 1:
                            _a.sent();
                            completed = context.transpileQueue.completed.find(function (c) { return c.path === modulePath; });
                            if (completed) {
                                return [2 /*return*/, {
                                        code: completed.code,
                                        map: completed.map || { mappings: "" }
                                    }];
                            }
                            throw new TransformationException(modulePath, transformerName);
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map
var JsonTranspiler = /** @class */ (function (_super) {
    __extends(JsonTranspiler, _super);
    function JsonTranspiler(context) {
        var _this = _super.call(this, "json-transpiler", null, context) || this;
        _this.additionalTranspilers = {};
        return _this;
    }
    JsonTranspiler.prototype.transpile = function (file) {
        return this.doTranspile(file);
    };
    return JsonTranspiler;
}(Transpiler));
//# sourceMappingURL=index.js.map
function jsonTransformer(context) {
    var transformerName = "packager::transformer::json-transformer";
    var isJson = verifyExtensions([".json"]);
    var transpiler;
    return {
        name: transformerName,
        transform: function (code, modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var file_1, completed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isJson(modulePath)) return [3 /*break*/, 2];
                            transpiler = context.cache.transpilers.get("json-transpiler");
                            if (!transpiler) {
                                transpiler = new JsonTranspiler(context);
                                context.cache.transpilers.set("json-transpiler", transpiler);
                            }
                            file_1 = context.files.find(function (f) { return f.path === modulePath; });
                            return [4 /*yield*/, context.transpileQueue.push("Json-Transpiler", function () {
                                    return transpiler.transpile(__assign(__assign({}, file_1), { code: code }));
                                })];
                        case 1:
                            _a.sent();
                            completed = context.transpileQueue.completed.find(function (c) { return c.path === modulePath; });
                            if (completed) {
                                return [2 /*return*/, {
                                        code: "export default " + completed.code
                                    }];
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map
function cssTransformer(context) {
    var transformerName = "packager::transformer::css-transformer";
    var isCss = verifyExtensions([".css"]);
    var transpiler;
    return {
        name: transformerName,
        transform: function (code, modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var file_1, completed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isCss(modulePath)) return [3 /*break*/, 2];
                            transpiler = context.cache.transpilers.get("css-transpiler");
                            if (!transpiler) {
                                transpiler = new CssTranspiler(context);
                                context.cache.transpilers.set("css-transpiler", transpiler);
                            }
                            file_1 = context.files.find(function (f) { return f.path === modulePath; });
                            return [4 /*yield*/, context.transpileQueue.push("Css-Transpiler", function () {
                                    return transpiler.transpile(__assign(__assign({}, file_1), { code: code }));
                                })];
                        case 1:
                            _a.sent();
                            completed = context.transpileQueue.completed.find(function (c) { return c.path === modulePath; });
                            if (completed) {
                                return [2 /*return*/, {
                                        code: generateExport(__assign(__assign({}, file_1), { code: completed.code }))
                                    }];
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map
var transformers = (function (context) { return [
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
    jsonTransformer(context)
]; });var parsePackagePath = (function (name) {
    var _a, _b, _c;
    if (!name || name == "") {
        return {
            name: null,
            version: null,
            path: null
        };
    }
    var scopedRegex = /^(@[^/]+\/[^/@]+)(?:([\s\S]+))?/;
    var regRegex = /^([^/@]+)(?:([\s\S]+))?/;
    var extracted = name.startsWith("@")
        ? (_a = scopedRegex.exec(name)) === null || _a === void 0 ? void 0 : _a.slice(1) : (_b = regRegex.exec(name)) === null || _b === void 0 ? void 0 : _b.slice(1);
    if ((_c = extracted) === null || _c === void 0 ? void 0 : _c.length) {
        var rest = extractRest(extracted[1] || null);
        return __assign({ name: extracted[0] || null }, rest);
    }
    return {
        name: null,
        version: null,
        path: null
    };
});
var extractRest = function (rest) {
    if (!rest || rest == "") {
        return {
            version: null,
            path: null
        };
    }
    if (rest.startsWith("@")) {
        var extractedVersion = /@(.*?)\/(.*)/.exec(rest);
        if (extractedVersion) {
            var version = extractedVersion[1] || null;
            var path = extractedVersion[2] || null;
            return { version: version, path: path };
        }
        return {
            version: rest.substring(1) || null,
            path: null
        };
    }
    else if (!!rest && !!~rest.indexOf("@")) {
        var splitRest = rest.split("@");
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
};
//# sourceMappingURL=parse-package-path.js.map
var resolver = function (path, retries, maxRetries) {
    if (retries === void 0) { retries = 1; }
    if (maxRetries === void 0) { maxRetries = 3; }
    return __awaiter(void 0, void 0, Promise, function () {
        var data, _a, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch(path).then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = {};
                                        return [4 /*yield*/, res.text()];
                                    case 1: return [2 /*return*/, (_a.code = _b.sent(),
                                            _a.meta = {
                                                url: res.url,
                                                status: res.status
                                            },
                                            _a)];
                                }
                            });
                        }); })];
                case 1:
                    data = _b.sent();
                    return [2 /*return*/, data];
                case 2:
                    _a = _b.sent();
                    response = _a.response;
                    if (response.status === 404) {
                        throw Error("Not found.");
                    }
                    if (retries < maxRetries) {
                        return [2 /*return*/, resolver(path, retries + 1)];
                    }
                    else {
                        throw Error("Error retrieving data.");
                    }
                case 3: return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=external-resolver.js.map
var services = {
    unpkg: {
        url: "https://unpkg.com"
    },
    jsdelivr: {
        url: "https://cdn.jsdelivr.net"
    }
};
var getNextService = function (currentService) {
    var serviceNames = Object.keys(services);
    var currentIndex = serviceNames.indexOf(currentService);
    // If current service is last, return null
    if (currentIndex >= serviceNames.length - 1) {
        return null;
    }
    return serviceNames[currentIndex + 1];
};
function fetchNpmDependency(name, version, path, service) {
    if (version === void 0) { version = "latest"; }
    if (path === void 0) { path = ""; }
    if (service === void 0) { service = "unpkg"; }
    return __awaiter(this, void 0, Promise, function () {
        var _service, fullPath, data, e_1, nextService;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _service = services[service];
                    fullPath = _service.url + "/" + name + "@" + version + (path != "" && !path.startsWith("/") ? "/" + path : path);
                    return [4 /*yield*/, resolver(fullPath)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 2:
                    e_1 = _a.sent();
                    nextService = getNextService(service);
                    if (nextService) {
                        return [2 /*return*/, fetchNpmDependency(name, version, path, nextService)];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=fetch-npm-dependency.js.map
// Reserved word lists for various dialects of the language

var reservedWords$1 = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
};

// And the keywords

var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

var keywords = {
  5: ecma5AndLessKeywords,
  "5module": ecma5AndLessKeywords + " export import",
  6: ecma5AndLessKeywords + " const class extends export import super"
};

var keywordRelationalOperator = /^in(stanceof)?$/;

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.
// Generated by `bin/generate-identifier-regex.js`.
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u08a0-\u08b4\u08b6-\u08bd\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fef\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7bf\ua7c2-\ua7c6\ua7f7-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab67\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08d3-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1df9\u1dfb-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";

var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

// These are a run-length and offset encoded representation of the
// >0xffff code points that are a valid part of identifiers. The
// offset starts at 0x10000, and each pair of numbers represents an
// offset to the next range, and then a size of the range. They were
// generated by bin/generate-identifier-regex.js

// eslint-disable-next-line comma-spacing
var astralIdentifierStartCodes = [0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,477,28,11,0,9,21,155,22,13,52,76,44,33,24,27,35,30,0,12,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,21,0,33,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,230,43,117,63,32,0,161,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,35,56,264,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,328,18,270,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,689,63,129,74,6,0,67,12,65,1,2,0,29,6135,9,754,9486,286,50,2,18,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,2357,44,11,6,17,0,370,43,1301,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,15,7472,3104,541];

// eslint-disable-next-line comma-spacing
var astralIdentifierCodes = [509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,525,10,176,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,4,9,83,11,7,0,161,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,243,14,166,9,232,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,406,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,330,3,19306,9,135,4,60,6,26,9,1014,0,2,54,8,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,262,6,10,9,419,13,1495,6,110,6,6,9,792487,239];

// This has a complexity linear to the value of the code. The
// assumption is that looking up astral identifier characters is
// rare.
function isInAstralSet(code, set) {
  var pos = 0x10000;
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i];
    if (pos > code) { return false }
    pos += set[i + 1];
    if (pos >= code) { return true }
  }
}

// Test whether a given character code starts an identifier.

function isIdentifierStart(code, astral) {
  if (code < 65) { return code === 36 }
  if (code < 91) { return true }
  if (code < 97) { return code === 95 }
  if (code < 123) { return true }
  if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code)) }
  if (astral === false) { return false }
  return isInAstralSet(code, astralIdentifierStartCodes)
}

// Test whether a given character is part of an identifier.

function isIdentifierChar(code, astral) {
  if (code < 48) { return code === 36 }
  if (code < 58) { return true }
  if (code < 65) { return false }
  if (code < 91) { return true }
  if (code < 97) { return code === 95 }
  if (code < 123) { return true }
  if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code)) }
  if (astral === false) { return false }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes)
}

// ## Token types

// The assignment of fine-grained, information-carrying type objects
// allows the tokenizer to store the information it has about a
// token in a way that is very cheap for the parser to look up.

// All token type variables start with an underscore, to make them
// easy to recognize.

// The `beforeExpr` property is used to disambiguate between regular
// expressions and divisions. It is set on all token types that can
// be followed by an expression (thus, a slash after them would be a
// regular expression).
//
// The `startsExpr` property is used to check if the token ends a
// `yield` expression. It is set on all token types that either can
// directly start an expression (like a quotation mark) or can
// continue an expression (like the body of a string).
//
// `isLoop` marks a keyword as starting a loop, which is important
// to know when parsing a label, in order to allow or disallow
// continue jumps to that label.

var TokenType = function TokenType(label, conf) {
  if ( conf === void 0 ) conf = {};

  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};

function binop(name, prec) {
  return new TokenType(name, {beforeExpr: true, binop: prec})
}
var beforeExpr = {beforeExpr: true}, startsExpr = {startsExpr: true};

// Map keyword names to token types.

var keywords$1 = {};

// Succinct definitions of keyword token types
function kw(name, options) {
  if ( options === void 0 ) options = {};

  options.keyword = name;
  return keywords$1[name] = new TokenType(name, options)
}

var types = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", {beforeExpr: true, startsExpr: true}),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", {beforeExpr: true, startsExpr: true}),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", {beforeExpr: true, startsExpr: true}),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  invalidTemplate: new TokenType("invalidTemplate"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", {beforeExpr: true, startsExpr: true}),

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  eq: new TokenType("=", {beforeExpr: true, isAssign: true}),
  assign: new TokenType("_=", {beforeExpr: true, isAssign: true}),
  incDec: new TokenType("++/--", {prefix: true, postfix: true, startsExpr: true}),
  prefix: new TokenType("!/~", {beforeExpr: true, prefix: true, startsExpr: true}),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=/===/!==", 6),
  relational: binop("</>/<=/>=", 7),
  bitShift: binop("<</>>/>>>", 8),
  plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  starstar: new TokenType("**", {beforeExpr: true}),

  // Keyword token types.
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _catch: kw("catch"),
  _continue: kw("continue"),
  _debugger: kw("debugger"),
  _default: kw("default", beforeExpr),
  _do: kw("do", {isLoop: true, beforeExpr: true}),
  _else: kw("else", beforeExpr),
  _finally: kw("finally"),
  _for: kw("for", {isLoop: true}),
  _function: kw("function", startsExpr),
  _if: kw("if"),
  _return: kw("return", beforeExpr),
  _switch: kw("switch"),
  _throw: kw("throw", beforeExpr),
  _try: kw("try"),
  _var: kw("var"),
  _const: kw("const"),
  _while: kw("while", {isLoop: true}),
  _with: kw("with"),
  _new: kw("new", {beforeExpr: true, startsExpr: true}),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _class: kw("class", startsExpr),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import", startsExpr),
  _null: kw("null", startsExpr),
  _true: kw("true", startsExpr),
  _false: kw("false", startsExpr),
  _in: kw("in", {beforeExpr: true, binop: 7}),
  _instanceof: kw("instanceof", {beforeExpr: true, binop: 7}),
  _typeof: kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true}),
  _void: kw("void", {beforeExpr: true, prefix: true, startsExpr: true}),
  _delete: kw("delete", {beforeExpr: true, prefix: true, startsExpr: true})
};

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

var lineBreak = /\r\n?|\n|\u2028|\u2029/;
var lineBreakG = new RegExp(lineBreak.source, "g");

function isNewLine(code, ecma2019String) {
  return code === 10 || code === 13 || (!ecma2019String && (code === 0x2028 || code === 0x2029))
}

var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

var ref = Object.prototype;
var hasOwnProperty = ref.hasOwnProperty;
var toString = ref.toString;

// Checks if an object has a property.

function has(obj, propName) {
  return hasOwnProperty.call(obj, propName)
}

var isArray = Array.isArray || (function (obj) { return (
  toString.call(obj) === "[object Array]"
); });

function wordsRegexp(words) {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$")
}

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

var Position = function Position(line, col) {
  this.line = line;
  this.column = col;
};

Position.prototype.offset = function offset (n) {
  return new Position(this.line, this.column + n)
};

var SourceLocation = function SourceLocation(p, start, end) {
  this.start = start;
  this.end = end;
  if (p.sourceFile !== null) { this.source = p.sourceFile; }
};

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

function getLineInfo(input, offset) {
  for (var line = 1, cur = 0;;) {
    lineBreakG.lastIndex = cur;
    var match = lineBreakG.exec(input);
    if (match && match.index < offset) {
      ++line;
      cur = match.index + match[0].length;
    } else {
      return new Position(line, offset - cur)
    }
  }
}

// A second optional argument can be given to further configure
// the parser process. These options are recognized:

var defaultOptions = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must be
  // either 3, 5, 6 (2015), 7 (2016), 8 (2017), 9 (2018), or 10
  // (2019). This influences support for strict mode, the set of
  // reserved words, and support for new syntax features. The default
  // is 10.
  ecmaVersion: 10,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called
  // when a semicolon is automatically inserted. It will be passed
  // the position of the comma as an offset, and if `locations` is
  // enabled, it is given the location as a `{line, column}` object
  // as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  // When enabled, await identifiers are allowed to appear at the top-level scope,
  // but they are still not allowed in non-async functions.
  allowAwaitOutsideFunction: false,
  // When enabled, hashbang directive in the beginning of file
  // is allowed and treated as a line comment.
  allowHashBang: false,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: false,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: false,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: false
};

// Interpret and default an options object

function getOptions(opts) {
  var options = {};

  for (var opt in defaultOptions)
    { options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt]; }

  if (options.ecmaVersion >= 2015)
    { options.ecmaVersion -= 2009; }

  if (options.allowReserved == null)
    { options.allowReserved = options.ecmaVersion < 5; }

  if (isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function (token) { return tokens.push(token); };
  }
  if (isArray(options.onComment))
    { options.onComment = pushComment(options, options.onComment); }

  return options
}

function pushComment(options, array) {
  return function(block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text,
      start: start,
      end: end
    };
    if (options.locations)
      { comment.loc = new SourceLocation(this, startLoc, endLoc); }
    if (options.ranges)
      { comment.range = [start, end]; }
    array.push(comment);
  }
}

// Each scope gets a bitset that may contain these flags
var
    SCOPE_TOP = 1,
    SCOPE_FUNCTION = 2,
    SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION,
    SCOPE_ASYNC = 4,
    SCOPE_GENERATOR = 8,
    SCOPE_ARROW = 16,
    SCOPE_SIMPLE_CATCH = 32,
    SCOPE_SUPER = 64,
    SCOPE_DIRECT_SUPER = 128;

function functionFlags(async, generator) {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0)
}

// Used in checkLVal and declareName to determine the type of a binding
var
    BIND_NONE = 0, // Not a binding
    BIND_VAR = 1, // Var-style binding
    BIND_LEXICAL = 2, // Let- or const-style binding
    BIND_FUNCTION = 3, // Function declaration
    BIND_SIMPLE_CATCH = 4, // Simple (identifier pattern) catch binding
    BIND_OUTSIDE = 5; // Special case for function names as bound inside the function

var Parser = function Parser(options, input, startPos) {
  this.options = options = getOptions(options);
  this.sourceFile = options.sourceFile;
  this.keywords = wordsRegexp(keywords[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
  var reserved = "";
  if (options.allowReserved !== true) {
    for (var v = options.ecmaVersion;; v--)
      { if (reserved = reservedWords$1[v]) { break } }
    if (options.sourceType === "module") { reserved += " await"; }
  }
  this.reservedWords = wordsRegexp(reserved);
  var reservedStrict = (reserved ? reserved + " " : "") + reservedWords$1.strict;
  this.reservedWordsStrict = wordsRegexp(reservedStrict);
  this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords$1.strictBind);
  this.input = String(input);

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.
  this.containsEsc = false;

  // Set up token state

  // The current position of the tokenizer in the input.
  if (startPos) {
    this.pos = startPos;
    this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
    this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
  } else {
    this.pos = this.lineStart = 0;
    this.curLine = 1;
  }

  // Properties of the current token:
  // Its type
  this.type = types.eof;
  // For tokens that include more information than their type, the value
  this.value = null;
  // Its start and end offset
  this.start = this.end = this.pos;
  // And, if locations are used, the {line, column} object
  // corresponding to those offsets
  this.startLoc = this.endLoc = this.curPosition();

  // Position information for the previous token
  this.lastTokEndLoc = this.lastTokStartLoc = null;
  this.lastTokStart = this.lastTokEnd = this.pos;

  // The context stack is used to superficially track syntactic
  // context to predict whether a regular expression is allowed in a
  // given position.
  this.context = this.initialContext();
  this.exprAllowed = true;

  // Figure out if it's a module code.
  this.inModule = options.sourceType === "module";
  this.strict = this.inModule || this.strictDirective(this.pos);

  // Used to signify the start of a potential arrow function
  this.potentialArrowAt = -1;

  // Positions to delayed-check that yield/await does not exist in default parameters.
  this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
  // Labels in scope.
  this.labels = [];
  // Thus-far undefined exports.
  this.undefinedExports = {};

  // If enabled, skip leading hashbang line.
  if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!")
    { this.skipLineComment(2); }

  // Scope tracking for duplicate variable names (see scope.js)
  this.scopeStack = [];
  this.enterScope(SCOPE_TOP);

  // For RegExp validation
  this.regexpState = null;
};

var prototypeAccessors = { inFunction: { configurable: true },inGenerator: { configurable: true },inAsync: { configurable: true },allowSuper: { configurable: true },allowDirectSuper: { configurable: true },treatFunctionsAsVar: { configurable: true } };

Parser.prototype.parse = function parse () {
  var node = this.options.program || this.startNode();
  this.nextToken();
  return this.parseTopLevel(node)
};

prototypeAccessors.inFunction.get = function () { return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0 };
prototypeAccessors.inGenerator.get = function () { return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 };
prototypeAccessors.inAsync.get = function () { return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 };
prototypeAccessors.allowSuper.get = function () { return (this.currentThisScope().flags & SCOPE_SUPER) > 0 };
prototypeAccessors.allowDirectSuper.get = function () { return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0 };
prototypeAccessors.treatFunctionsAsVar.get = function () { return this.treatFunctionsAsVarInScope(this.currentScope()) };

// Switch to a getter for 7.0.0.
Parser.prototype.inNonArrowFunction = function inNonArrowFunction () { return (this.currentThisScope().flags & SCOPE_FUNCTION) > 0 };

Parser.extend = function extend () {
    var plugins = [], len = arguments.length;
    while ( len-- ) plugins[ len ] = arguments[ len ];

  var cls = this;
  for (var i = 0; i < plugins.length; i++) { cls = plugins[i](cls); }
  return cls
};

Parser.parse = function parse (input, options) {
  return new this(options, input).parse()
};

Parser.parseExpressionAt = function parseExpressionAt (input, pos, options) {
  var parser = new this(options, input, pos);
  parser.nextToken();
  return parser.parseExpression()
};

Parser.tokenizer = function tokenizer (input, options) {
  return new this(options, input)
};

Object.defineProperties( Parser.prototype, prototypeAccessors );

var pp = Parser.prototype;

// ## Parser utilities

var literal = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/;
pp.strictDirective = function(start) {
  for (;;) {
    // Try to find string literal.
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this.input)[0].length;
    var match = literal.exec(this.input.slice(start));
    if (!match) { return false }
    if ((match[1] || match[2]) === "use strict") { return true }
    start += match[0].length;

    // Skip semicolon, if any.
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this.input)[0].length;
    if (this.input[start] === ";")
      { start++; }
  }
};

// Predicate that tests whether the next token is of the given
// type, and if yes, consumes it as a side effect.

pp.eat = function(type) {
  if (this.type === type) {
    this.next();
    return true
  } else {
    return false
  }
};

// Tests whether parsed token is a contextual keyword.

pp.isContextual = function(name) {
  return this.type === types.name && this.value === name && !this.containsEsc
};

// Consumes contextual keyword if possible.

pp.eatContextual = function(name) {
  if (!this.isContextual(name)) { return false }
  this.next();
  return true
};

// Asserts that following token is given contextual keyword.

pp.expectContextual = function(name) {
  if (!this.eatContextual(name)) { this.unexpected(); }
};

// Test whether a semicolon can be inserted at the current position.

pp.canInsertSemicolon = function() {
  return this.type === types.eof ||
    this.type === types.braceR ||
    lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
};

pp.insertSemicolon = function() {
  if (this.canInsertSemicolon()) {
    if (this.options.onInsertedSemicolon)
      { this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc); }
    return true
  }
};

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

pp.semicolon = function() {
  if (!this.eat(types.semi) && !this.insertSemicolon()) { this.unexpected(); }
};

pp.afterTrailingComma = function(tokType, notNext) {
  if (this.type === tokType) {
    if (this.options.onTrailingComma)
      { this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc); }
    if (!notNext)
      { this.next(); }
    return true
  }
};

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error.

pp.expect = function(type) {
  this.eat(type) || this.unexpected();
};

// Raise an unexpected token error.

pp.unexpected = function(pos) {
  this.raise(pos != null ? pos : this.start, "Unexpected token");
};

function DestructuringErrors() {
  this.shorthandAssign =
  this.trailingComma =
  this.parenthesizedAssign =
  this.parenthesizedBind =
  this.doubleProto =
    -1;
}

pp.checkPatternErrors = function(refDestructuringErrors, isAssign) {
  if (!refDestructuringErrors) { return }
  if (refDestructuringErrors.trailingComma > -1)
    { this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element"); }
  var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
  if (parens > -1) { this.raiseRecoverable(parens, "Parenthesized pattern"); }
};

pp.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
  if (!refDestructuringErrors) { return false }
  var shorthandAssign = refDestructuringErrors.shorthandAssign;
  var doubleProto = refDestructuringErrors.doubleProto;
  if (!andThrow) { return shorthandAssign >= 0 || doubleProto >= 0 }
  if (shorthandAssign >= 0)
    { this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns"); }
  if (doubleProto >= 0)
    { this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property"); }
};

pp.checkYieldAwaitInDefaultParams = function() {
  if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos))
    { this.raise(this.yieldPos, "Yield expression cannot be a default value"); }
  if (this.awaitPos)
    { this.raise(this.awaitPos, "Await expression cannot be a default value"); }
};

pp.isSimpleAssignTarget = function(expr) {
  if (expr.type === "ParenthesizedExpression")
    { return this.isSimpleAssignTarget(expr.expression) }
  return expr.type === "Identifier" || expr.type === "MemberExpression"
};

var pp$1 = Parser.prototype;

// ### Statement parsing

// Parse a program. Initializes the parser, reads any number of
// statements, and wraps them in a Program node.  Optionally takes a
// `program` argument.  If present, the statements will be appended
// to its body instead of creating a new node.

pp$1.parseTopLevel = function(node) {
  var exports = {};
  if (!node.body) { node.body = []; }
  while (this.type !== types.eof) {
    var stmt = this.parseStatement(null, true, exports);
    node.body.push(stmt);
  }
  if (this.inModule)
    { for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1)
      {
        var name = list[i];

        this.raiseRecoverable(this.undefinedExports[name].start, ("Export '" + name + "' is not defined"));
      } }
  this.adaptDirectivePrologue(node.body);
  this.next();
  node.sourceType = this.options.sourceType;
  return this.finishNode(node, "Program")
};

var loopLabel = {kind: "loop"}, switchLabel = {kind: "switch"};

pp$1.isLet = function(context) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let")) { return false }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
  // For ambiguous cases, determine if a LexicalDeclaration (or only a
  // Statement) is allowed here. If context is not empty then only a Statement
  // is allowed. However, `let [` is an explicit negative lookahead for
  // ExpressionStatement, so special-case it first.
  if (nextCh === 91) { return true } // '['
  if (context) { return false }

  if (nextCh === 123) { return true } // '{'
  if (isIdentifierStart(nextCh, true)) {
    var pos = next + 1;
    while (isIdentifierChar(this.input.charCodeAt(pos), true)) { ++pos; }
    var ident = this.input.slice(next, pos);
    if (!keywordRelationalOperator.test(ident)) { return true }
  }
  return false
};

// check 'async [no LineTerminator here] function'
// - 'async /*foo*/ function' is OK.
// - 'async /*\n*/ function' is invalid.
pp$1.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    { return false }

  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length;
  return !lineBreak.test(this.input.slice(this.pos, next)) &&
    this.input.slice(next, next + 8) === "function" &&
    (next + 8 === this.input.length || !isIdentifierChar(this.input.charAt(next + 8)))
};

// Parse a single statement.
//
// If expecting a statement and finding a slash operator, parse a
// regular expression literal. This is to handle cases like
// `if (foo) /blah/.exec(foo)`, where looking at the previous token
// does not help.

pp$1.parseStatement = function(context, topLevel, exports) {
  var starttype = this.type, node = this.startNode(), kind;

  if (this.isLet(context)) {
    starttype = types._var;
    kind = "let";
  }

  // Most types of statements are recognized by the keyword they
  // start with. Many are trivial to parse, some require a bit of
  // complexity.

  switch (starttype) {
  case types._break: case types._continue: return this.parseBreakContinueStatement(node, starttype.keyword)
  case types._debugger: return this.parseDebuggerStatement(node)
  case types._do: return this.parseDoStatement(node)
  case types._for: return this.parseForStatement(node)
  case types._function:
    // Function as sole body of either an if statement or a labeled statement
    // works, but not when it is part of a labeled statement that is the sole
    // body of an if statement.
    if ((context && (this.strict || context !== "if" && context !== "label")) && this.options.ecmaVersion >= 6) { this.unexpected(); }
    return this.parseFunctionStatement(node, false, !context)
  case types._class:
    if (context) { this.unexpected(); }
    return this.parseClass(node, true)
  case types._if: return this.parseIfStatement(node)
  case types._return: return this.parseReturnStatement(node)
  case types._switch: return this.parseSwitchStatement(node)
  case types._throw: return this.parseThrowStatement(node)
  case types._try: return this.parseTryStatement(node)
  case types._const: case types._var:
    kind = kind || this.value;
    if (context && kind !== "var") { this.unexpected(); }
    return this.parseVarStatement(node, kind)
  case types._while: return this.parseWhileStatement(node)
  case types._with: return this.parseWithStatement(node)
  case types.braceL: return this.parseBlock(true, node)
  case types.semi: return this.parseEmptyStatement(node)
  case types._export:
  case types._import:
    if (this.options.ecmaVersion > 10 && starttype === types._import) {
      skipWhiteSpace.lastIndex = this.pos;
      var skip = skipWhiteSpace.exec(this.input);
      var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
      if (nextCh === 40) // '('
        { return this.parseExpressionStatement(node, this.parseExpression()) }
    }

    if (!this.options.allowImportExportEverywhere) {
      if (!topLevel)
        { this.raise(this.start, "'import' and 'export' may only appear at the top level"); }
      if (!this.inModule)
        { this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'"); }
    }
    return starttype === types._import ? this.parseImport(node) : this.parseExport(node, exports)

    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
  default:
    if (this.isAsyncFunction()) {
      if (context) { this.unexpected(); }
      this.next();
      return this.parseFunctionStatement(node, true, !context)
    }

    var maybeName = this.value, expr = this.parseExpression();
    if (starttype === types.name && expr.type === "Identifier" && this.eat(types.colon))
      { return this.parseLabeledStatement(node, maybeName, expr, context) }
    else { return this.parseExpressionStatement(node, expr) }
  }
};

pp$1.parseBreakContinueStatement = function(node, keyword) {
  var isBreak = keyword === "break";
  this.next();
  if (this.eat(types.semi) || this.insertSemicolon()) { node.label = null; }
  else if (this.type !== types.name) { this.unexpected(); }
  else {
    node.label = this.parseIdent();
    this.semicolon();
  }

  // Verify that there is an actual destination to break or
  // continue to.
  var i = 0;
  for (; i < this.labels.length; ++i) {
    var lab = this.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) { break }
      if (node.label && isBreak) { break }
    }
  }
  if (i === this.labels.length) { this.raise(node.start, "Unsyntactic " + keyword); }
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement")
};

pp$1.parseDebuggerStatement = function(node) {
  this.next();
  this.semicolon();
  return this.finishNode(node, "DebuggerStatement")
};

pp$1.parseDoStatement = function(node) {
  this.next();
  this.labels.push(loopLabel);
  node.body = this.parseStatement("do");
  this.labels.pop();
  this.expect(types._while);
  node.test = this.parseParenExpression();
  if (this.options.ecmaVersion >= 6)
    { this.eat(types.semi); }
  else
    { this.semicolon(); }
  return this.finishNode(node, "DoWhileStatement")
};

// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
// loop is non-trivial. Basically, we have to parse the init `var`
// statement or expression, disallowing the `in` operator (see
// the second parameter to `parseExpression`), and then check
// whether the next token is `in` or `of`. When there is no init
// part (semicolon immediately after the opening parenthesis), it
// is a regular `for` loop.

pp$1.parseForStatement = function(node) {
  this.next();
  var awaitAt = (this.options.ecmaVersion >= 9 && (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction)) && this.eatContextual("await")) ? this.lastTokStart : -1;
  this.labels.push(loopLabel);
  this.enterScope(0);
  this.expect(types.parenL);
  if (this.type === types.semi) {
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, null)
  }
  var isLet = this.isLet();
  if (this.type === types._var || this.type === types._const || isLet) {
    var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
    this.next();
    this.parseVar(init$1, true, kind);
    this.finishNode(init$1, "VariableDeclaration");
    if ((this.type === types._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) && init$1.declarations.length === 1) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types._in) {
          if (awaitAt > -1) { this.unexpected(awaitAt); }
        } else { node.await = awaitAt > -1; }
      }
      return this.parseForIn(node, init$1)
    }
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, init$1)
  }
  var refDestructuringErrors = new DestructuringErrors;
  var init = this.parseExpression(true, refDestructuringErrors);
  if (this.type === types._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
    if (this.options.ecmaVersion >= 9) {
      if (this.type === types._in) {
        if (awaitAt > -1) { this.unexpected(awaitAt); }
      } else { node.await = awaitAt > -1; }
    }
    this.toAssignable(init, false, refDestructuringErrors);
    this.checkLVal(init);
    return this.parseForIn(node, init)
  } else {
    this.checkExpressionErrors(refDestructuringErrors, true);
  }
  if (awaitAt > -1) { this.unexpected(awaitAt); }
  return this.parseFor(node, init)
};

pp$1.parseFunctionStatement = function(node, isAsync, declarationPosition) {
  this.next();
  return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync)
};

pp$1.parseIfStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  // allow function declarations in branches, but only in non-strict mode
  node.consequent = this.parseStatement("if");
  node.alternate = this.eat(types._else) ? this.parseStatement("if") : null;
  return this.finishNode(node, "IfStatement")
};

pp$1.parseReturnStatement = function(node) {
  if (!this.inFunction && !this.options.allowReturnOutsideFunction)
    { this.raise(this.start, "'return' outside of function"); }
  this.next();

  // In `return` (and `break`/`continue`), the keywords with
  // optional arguments, we eagerly look for a semicolon or the
  // possibility to insert one.

  if (this.eat(types.semi) || this.insertSemicolon()) { node.argument = null; }
  else { node.argument = this.parseExpression(); this.semicolon(); }
  return this.finishNode(node, "ReturnStatement")
};

pp$1.parseSwitchStatement = function(node) {
  this.next();
  node.discriminant = this.parseParenExpression();
  node.cases = [];
  this.expect(types.braceL);
  this.labels.push(switchLabel);
  this.enterScope(0);

  // Statements under must be grouped (by label) in SwitchCase
  // nodes. `cur` is used to keep the node that we are currently
  // adding statements to.

  var cur;
  for (var sawDefault = false; this.type !== types.braceR;) {
    if (this.type === types._case || this.type === types._default) {
      var isCase = this.type === types._case;
      if (cur) { this.finishNode(cur, "SwitchCase"); }
      node.cases.push(cur = this.startNode());
      cur.consequent = [];
      this.next();
      if (isCase) {
        cur.test = this.parseExpression();
      } else {
        if (sawDefault) { this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"); }
        sawDefault = true;
        cur.test = null;
      }
      this.expect(types.colon);
    } else {
      if (!cur) { this.unexpected(); }
      cur.consequent.push(this.parseStatement(null));
    }
  }
  this.exitScope();
  if (cur) { this.finishNode(cur, "SwitchCase"); }
  this.next(); // Closing brace
  this.labels.pop();
  return this.finishNode(node, "SwitchStatement")
};

pp$1.parseThrowStatement = function(node) {
  this.next();
  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
    { this.raise(this.lastTokEnd, "Illegal newline after throw"); }
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement")
};

// Reused empty array added for node fields that are always empty.

var empty = [];

pp$1.parseTryStatement = function(node) {
  this.next();
  node.block = this.parseBlock();
  node.handler = null;
  if (this.type === types._catch) {
    var clause = this.startNode();
    this.next();
    if (this.eat(types.parenL)) {
      clause.param = this.parseBindingAtom();
      var simple = clause.param.type === "Identifier";
      this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
      this.checkLVal(clause.param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
      this.expect(types.parenR);
    } else {
      if (this.options.ecmaVersion < 10) { this.unexpected(); }
      clause.param = null;
      this.enterScope(0);
    }
    clause.body = this.parseBlock(false);
    this.exitScope();
    node.handler = this.finishNode(clause, "CatchClause");
  }
  node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;
  if (!node.handler && !node.finalizer)
    { this.raise(node.start, "Missing catch or finally clause"); }
  return this.finishNode(node, "TryStatement")
};

pp$1.parseVarStatement = function(node, kind) {
  this.next();
  this.parseVar(node, false, kind);
  this.semicolon();
  return this.finishNode(node, "VariableDeclaration")
};

pp$1.parseWhileStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  this.labels.push(loopLabel);
  node.body = this.parseStatement("while");
  this.labels.pop();
  return this.finishNode(node, "WhileStatement")
};

pp$1.parseWithStatement = function(node) {
  if (this.strict) { this.raise(this.start, "'with' in strict mode"); }
  this.next();
  node.object = this.parseParenExpression();
  node.body = this.parseStatement("with");
  return this.finishNode(node, "WithStatement")
};

pp$1.parseEmptyStatement = function(node) {
  this.next();
  return this.finishNode(node, "EmptyStatement")
};

pp$1.parseLabeledStatement = function(node, maybeName, expr, context) {
  for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1)
    {
    var label = list[i$1];

    if (label.name === maybeName)
      { this.raise(expr.start, "Label '" + maybeName + "' is already declared");
  } }
  var kind = this.type.isLoop ? "loop" : this.type === types._switch ? "switch" : null;
  for (var i = this.labels.length - 1; i >= 0; i--) {
    var label$1 = this.labels[i];
    if (label$1.statementStart === node.start) {
      // Update information about previous labels on this node
      label$1.statementStart = this.start;
      label$1.kind = kind;
    } else { break }
  }
  this.labels.push({name: maybeName, kind: kind, statementStart: this.start});
  node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
  this.labels.pop();
  node.label = expr;
  return this.finishNode(node, "LabeledStatement")
};

pp$1.parseExpressionStatement = function(node, expr) {
  node.expression = expr;
  this.semicolon();
  return this.finishNode(node, "ExpressionStatement")
};

// Parse a semicolon-enclosed block of statements, handling `"use
// strict"` declarations when `allowStrict` is true (used for
// function bodies).

pp$1.parseBlock = function(createNewLexicalScope, node) {
  if ( createNewLexicalScope === void 0 ) createNewLexicalScope = true;
  if ( node === void 0 ) node = this.startNode();

  node.body = [];
  this.expect(types.braceL);
  if (createNewLexicalScope) { this.enterScope(0); }
  while (!this.eat(types.braceR)) {
    var stmt = this.parseStatement(null);
    node.body.push(stmt);
  }
  if (createNewLexicalScope) { this.exitScope(); }
  return this.finishNode(node, "BlockStatement")
};

// Parse a regular `for` loop. The disambiguation code in
// `parseStatement` will already have parsed the init statement or
// expression.

pp$1.parseFor = function(node, init) {
  node.init = init;
  this.expect(types.semi);
  node.test = this.type === types.semi ? null : this.parseExpression();
  this.expect(types.semi);
  node.update = this.type === types.parenR ? null : this.parseExpression();
  this.expect(types.parenR);
  node.body = this.parseStatement("for");
  this.exitScope();
  this.labels.pop();
  return this.finishNode(node, "ForStatement")
};

// Parse a `for`/`in` and `for`/`of` loop, which are almost
// same from parser's perspective.

pp$1.parseForIn = function(node, init) {
  var isForIn = this.type === types._in;
  this.next();

  if (
    init.type === "VariableDeclaration" &&
    init.declarations[0].init != null &&
    (
      !isForIn ||
      this.options.ecmaVersion < 8 ||
      this.strict ||
      init.kind !== "var" ||
      init.declarations[0].id.type !== "Identifier"
    )
  ) {
    this.raise(
      init.start,
      ((isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer")
    );
  } else if (init.type === "AssignmentPattern") {
    this.raise(init.start, "Invalid left-hand side in for-loop");
  }
  node.left = init;
  node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
  this.expect(types.parenR);
  node.body = this.parseStatement("for");
  this.exitScope();
  this.labels.pop();
  return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement")
};

// Parse a list of variable declarations.

pp$1.parseVar = function(node, isFor, kind) {
  node.declarations = [];
  node.kind = kind;
  for (;;) {
    var decl = this.startNode();
    this.parseVarId(decl, kind);
    if (this.eat(types.eq)) {
      decl.init = this.parseMaybeAssign(isFor);
    } else if (kind === "const" && !(this.type === types._in || (this.options.ecmaVersion >= 6 && this.isContextual("of")))) {
      this.unexpected();
    } else if (decl.id.type !== "Identifier" && !(isFor && (this.type === types._in || this.isContextual("of")))) {
      this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
    if (!this.eat(types.comma)) { break }
  }
  return node
};

pp$1.parseVarId = function(decl, kind) {
  decl.id = this.parseBindingAtom();
  this.checkLVal(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
};

var FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4;

// Parse a function declaration or literal (depending on the
// `statement & FUNC_STATEMENT`).

// Remove `allowExpressionBody` for 7.0.0, as it is only called with false
pp$1.parseFunction = function(node, statement, allowExpressionBody, isAsync) {
  this.initFunction(node);
  if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
    if (this.type === types.star && (statement & FUNC_HANGING_STATEMENT))
      { this.unexpected(); }
    node.generator = this.eat(types.star);
  }
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }

  if (statement & FUNC_STATEMENT) {
    node.id = (statement & FUNC_NULLABLE_ID) && this.type !== types.name ? null : this.parseIdent();
    if (node.id && !(statement & FUNC_HANGING_STATEMENT))
      // If it is a regular function declaration in sloppy mode, then it is
      // subject to Annex B semantics (BIND_FUNCTION). Otherwise, the binding
      // mode depends on properties of the current scope (see
      // treatFunctionsAsVar).
      { this.checkLVal(node.id, (this.strict || node.generator || node.async) ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION); }
  }

  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  this.enterScope(functionFlags(node.async, node.generator));

  if (!(statement & FUNC_STATEMENT))
    { node.id = this.type === types.name ? this.parseIdent() : null; }

  this.parseFunctionParams(node);
  this.parseFunctionBody(node, allowExpressionBody, false);

  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, (statement & FUNC_STATEMENT) ? "FunctionDeclaration" : "FunctionExpression")
};

pp$1.parseFunctionParams = function(node) {
  this.expect(types.parenL);
  node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
};

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseClass = function(node, isStatement) {
  this.next();

  // ecma-262 14.6 Class Definitions
  // A class definition is always strict mode code.
  var oldStrict = this.strict;
  this.strict = true;

  this.parseClassId(node, isStatement);
  this.parseClassSuper(node);
  var classBody = this.startNode();
  var hadConstructor = false;
  classBody.body = [];
  this.expect(types.braceL);
  while (!this.eat(types.braceR)) {
    var element = this.parseClassElement(node.superClass !== null);
    if (element) {
      classBody.body.push(element);
      if (element.type === "MethodDefinition" && element.kind === "constructor") {
        if (hadConstructor) { this.raise(element.start, "Duplicate constructor in the same class"); }
        hadConstructor = true;
      }
    }
  }
  node.body = this.finishNode(classBody, "ClassBody");
  this.strict = oldStrict;
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression")
};

pp$1.parseClassElement = function(constructorAllowsSuper) {
  var this$1 = this;

  if (this.eat(types.semi)) { return null }

  var method = this.startNode();
  var tryContextual = function (k, noLineBreak) {
    if ( noLineBreak === void 0 ) noLineBreak = false;

    var start = this$1.start, startLoc = this$1.startLoc;
    if (!this$1.eatContextual(k)) { return false }
    if (this$1.type !== types.parenL && (!noLineBreak || !this$1.canInsertSemicolon())) { return true }
    if (method.key) { this$1.unexpected(); }
    method.computed = false;
    method.key = this$1.startNodeAt(start, startLoc);
    method.key.name = k;
    this$1.finishNode(method.key, "Identifier");
    return false
  };

  method.kind = "method";
  method.static = tryContextual("static");
  var isGenerator = this.eat(types.star);
  var isAsync = false;
  if (!isGenerator) {
    if (this.options.ecmaVersion >= 8 && tryContextual("async", true)) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
    } else if (tryContextual("get")) {
      method.kind = "get";
    } else if (tryContextual("set")) {
      method.kind = "set";
    }
  }
  if (!method.key) { this.parsePropertyName(method); }
  var key = method.key;
  var allowsDirectSuper = false;
  if (!method.computed && !method.static && (key.type === "Identifier" && key.name === "constructor" ||
      key.type === "Literal" && key.value === "constructor")) {
    if (method.kind !== "method") { this.raise(key.start, "Constructor can't have get/set modifier"); }
    if (isGenerator) { this.raise(key.start, "Constructor can't be a generator"); }
    if (isAsync) { this.raise(key.start, "Constructor can't be an async method"); }
    method.kind = "constructor";
    allowsDirectSuper = constructorAllowsSuper;
  } else if (method.static && key.type === "Identifier" && key.name === "prototype") {
    this.raise(key.start, "Classes may not have a static property named prototype");
  }
  this.parseClassMethod(method, isGenerator, isAsync, allowsDirectSuper);
  if (method.kind === "get" && method.value.params.length !== 0)
    { this.raiseRecoverable(method.value.start, "getter should have no params"); }
  if (method.kind === "set" && method.value.params.length !== 1)
    { this.raiseRecoverable(method.value.start, "setter should have exactly one param"); }
  if (method.kind === "set" && method.value.params[0].type === "RestElement")
    { this.raiseRecoverable(method.value.params[0].start, "Setter cannot use rest params"); }
  return method
};

pp$1.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
  method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
  return this.finishNode(method, "MethodDefinition")
};

pp$1.parseClassId = function(node, isStatement) {
  if (this.type === types.name) {
    node.id = this.parseIdent();
    if (isStatement)
      { this.checkLVal(node.id, BIND_LEXICAL, false); }
  } else {
    if (isStatement === true)
      { this.unexpected(); }
    node.id = null;
  }
};

pp$1.parseClassSuper = function(node) {
  node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
};

// Parses module export declaration.

pp$1.parseExport = function(node, exports) {
  this.next();
  // export * from '...'
  if (this.eat(types.star)) {
    this.expectContextual("from");
    if (this.type !== types.string) { this.unexpected(); }
    node.source = this.parseExprAtom();
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration")
  }
  if (this.eat(types._default)) { // export default ...
    this.checkExport(exports, "default", this.lastTokStart);
    var isAsync;
    if (this.type === types._function || (isAsync = this.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) { this.next(); }
      node.declaration = this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
    } else if (this.type === types._class) {
      var cNode = this.startNode();
      node.declaration = this.parseClass(cNode, "nullableID");
    } else {
      node.declaration = this.parseMaybeAssign();
      this.semicolon();
    }
    return this.finishNode(node, "ExportDefaultDeclaration")
  }
  // export var|const|let|function|class ...
  if (this.shouldParseExportStatement()) {
    node.declaration = this.parseStatement(null);
    if (node.declaration.type === "VariableDeclaration")
      { this.checkVariableExport(exports, node.declaration.declarations); }
    else
      { this.checkExport(exports, node.declaration.id.name, node.declaration.id.start); }
    node.specifiers = [];
    node.source = null;
  } else { // export { x, y as z } [from '...']
    node.declaration = null;
    node.specifiers = this.parseExportSpecifiers(exports);
    if (this.eatContextual("from")) {
      if (this.type !== types.string) { this.unexpected(); }
      node.source = this.parseExprAtom();
    } else {
      for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
        // check for keywords used as local names
        var spec = list[i];

        this.checkUnreserved(spec.local);
        // check if export is defined
        this.checkLocalExport(spec.local);
      }

      node.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration")
};

pp$1.checkExport = function(exports, name, pos) {
  if (!exports) { return }
  if (has(exports, name))
    { this.raiseRecoverable(pos, "Duplicate export '" + name + "'"); }
  exports[name] = true;
};

pp$1.checkPatternExport = function(exports, pat) {
  var type = pat.type;
  if (type === "Identifier")
    { this.checkExport(exports, pat.name, pat.start); }
  else if (type === "ObjectPattern")
    { for (var i = 0, list = pat.properties; i < list.length; i += 1)
      {
        var prop = list[i];

        this.checkPatternExport(exports, prop);
      } }
  else if (type === "ArrayPattern")
    { for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
      var elt = list$1[i$1];

        if (elt) { this.checkPatternExport(exports, elt); }
    } }
  else if (type === "Property")
    { this.checkPatternExport(exports, pat.value); }
  else if (type === "AssignmentPattern")
    { this.checkPatternExport(exports, pat.left); }
  else if (type === "RestElement")
    { this.checkPatternExport(exports, pat.argument); }
  else if (type === "ParenthesizedExpression")
    { this.checkPatternExport(exports, pat.expression); }
};

pp$1.checkVariableExport = function(exports, decls) {
  if (!exports) { return }
  for (var i = 0, list = decls; i < list.length; i += 1)
    {
    var decl = list[i];

    this.checkPatternExport(exports, decl.id);
  }
};

pp$1.shouldParseExportStatement = function() {
  return this.type.keyword === "var" ||
    this.type.keyword === "const" ||
    this.type.keyword === "class" ||
    this.type.keyword === "function" ||
    this.isLet() ||
    this.isAsyncFunction()
};

// Parses a comma-separated list of module exports.

pp$1.parseExportSpecifiers = function(exports) {
  var nodes = [], first = true;
  // export { x, y as z } [from '...']
  this.expect(types.braceL);
  while (!this.eat(types.braceR)) {
    if (!first) {
      this.expect(types.comma);
      if (this.afterTrailingComma(types.braceR)) { break }
    } else { first = false; }

    var node = this.startNode();
    node.local = this.parseIdent(true);
    node.exported = this.eatContextual("as") ? this.parseIdent(true) : node.local;
    this.checkExport(exports, node.exported.name, node.exported.start);
    nodes.push(this.finishNode(node, "ExportSpecifier"));
  }
  return nodes
};

// Parses import declaration.

pp$1.parseImport = function(node) {
  this.next();
  // import '...'
  if (this.type === types.string) {
    node.specifiers = empty;
    node.source = this.parseExprAtom();
  } else {
    node.specifiers = this.parseImportSpecifiers();
    this.expectContextual("from");
    node.source = this.type === types.string ? this.parseExprAtom() : this.unexpected();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration")
};

// Parses a comma-separated list of module imports.

pp$1.parseImportSpecifiers = function() {
  var nodes = [], first = true;
  if (this.type === types.name) {
    // import defaultObj, { x, y as z } from '...'
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLVal(node.local, BIND_LEXICAL);
    nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
    if (!this.eat(types.comma)) { return nodes }
  }
  if (this.type === types.star) {
    var node$1 = this.startNode();
    this.next();
    this.expectContextual("as");
    node$1.local = this.parseIdent();
    this.checkLVal(node$1.local, BIND_LEXICAL);
    nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
    return nodes
  }
  this.expect(types.braceL);
  while (!this.eat(types.braceR)) {
    if (!first) {
      this.expect(types.comma);
      if (this.afterTrailingComma(types.braceR)) { break }
    } else { first = false; }

    var node$2 = this.startNode();
    node$2.imported = this.parseIdent(true);
    if (this.eatContextual("as")) {
      node$2.local = this.parseIdent();
    } else {
      this.checkUnreserved(node$2.imported);
      node$2.local = node$2.imported;
    }
    this.checkLVal(node$2.local, BIND_LEXICAL);
    nodes.push(this.finishNode(node$2, "ImportSpecifier"));
  }
  return nodes
};

// Set `ExpressionStatement#directive` property for directive prologues.
pp$1.adaptDirectivePrologue = function(statements) {
  for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
    statements[i].directive = statements[i].expression.raw.slice(1, -1);
  }
};
pp$1.isDirectiveCandidate = function(statement) {
  return (
    statement.type === "ExpressionStatement" &&
    statement.expression.type === "Literal" &&
    typeof statement.expression.value === "string" &&
    // Reject parenthesized strings.
    (this.input[statement.start] === "\"" || this.input[statement.start] === "'")
  )
};

var pp$2 = Parser.prototype;

// Convert existing expression atom to assignable pattern
// if possible.

pp$2.toAssignable = function(node, isBinding, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 6 && node) {
    switch (node.type) {
    case "Identifier":
      if (this.inAsync && node.name === "await")
        { this.raise(node.start, "Cannot use 'await' as identifier inside an async function"); }
      break

    case "ObjectPattern":
    case "ArrayPattern":
    case "RestElement":
      break

    case "ObjectExpression":
      node.type = "ObjectPattern";
      if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
      for (var i = 0, list = node.properties; i < list.length; i += 1) {
        var prop = list[i];

      this.toAssignable(prop, isBinding);
        // Early error:
        //   AssignmentRestProperty[Yield, Await] :
        //     `...` DestructuringAssignmentTarget[Yield, Await]
        //
        //   It is a Syntax Error if |DestructuringAssignmentTarget| is an |ArrayLiteral| or an |ObjectLiteral|.
        if (
          prop.type === "RestElement" &&
          (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")
        ) {
          this.raise(prop.argument.start, "Unexpected token");
        }
      }
      break

    case "Property":
      // AssignmentProperty has type === "Property"
      if (node.kind !== "init") { this.raise(node.key.start, "Object pattern can't contain getter or setter"); }
      this.toAssignable(node.value, isBinding);
      break

    case "ArrayExpression":
      node.type = "ArrayPattern";
      if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
      this.toAssignableList(node.elements, isBinding);
      break

    case "SpreadElement":
      node.type = "RestElement";
      this.toAssignable(node.argument, isBinding);
      if (node.argument.type === "AssignmentPattern")
        { this.raise(node.argument.start, "Rest elements cannot have a default value"); }
      break

    case "AssignmentExpression":
      if (node.operator !== "=") { this.raise(node.left.end, "Only '=' operator can be used for specifying default value."); }
      node.type = "AssignmentPattern";
      delete node.operator;
      this.toAssignable(node.left, isBinding);
      // falls through to AssignmentPattern

    case "AssignmentPattern":
      break

    case "ParenthesizedExpression":
      this.toAssignable(node.expression, isBinding, refDestructuringErrors);
      break

    case "MemberExpression":
      if (!isBinding) { break }

    default:
      this.raise(node.start, "Assigning to rvalue");
    }
  } else if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
  return node
};

// Convert list of expression atoms to binding list.

pp$2.toAssignableList = function(exprList, isBinding) {
  var end = exprList.length;
  for (var i = 0; i < end; i++) {
    var elt = exprList[i];
    if (elt) { this.toAssignable(elt, isBinding); }
  }
  if (end) {
    var last = exprList[end - 1];
    if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier")
      { this.unexpected(last.argument.start); }
  }
  return exprList
};

// Parses spread element.

pp$2.parseSpread = function(refDestructuringErrors) {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
  return this.finishNode(node, "SpreadElement")
};

pp$2.parseRestBinding = function() {
  var node = this.startNode();
  this.next();

  // RestElement inside of a function parameter must be an identifier
  if (this.options.ecmaVersion === 6 && this.type !== types.name)
    { this.unexpected(); }

  node.argument = this.parseBindingAtom();

  return this.finishNode(node, "RestElement")
};

// Parses lvalue (assignable) atom.

pp$2.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6) {
    switch (this.type) {
    case types.bracketL:
      var node = this.startNode();
      this.next();
      node.elements = this.parseBindingList(types.bracketR, true, true);
      return this.finishNode(node, "ArrayPattern")

    case types.braceL:
      return this.parseObj(true)
    }
  }
  return this.parseIdent()
};

pp$2.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
  var elts = [], first = true;
  while (!this.eat(close)) {
    if (first) { first = false; }
    else { this.expect(types.comma); }
    if (allowEmpty && this.type === types.comma) {
      elts.push(null);
    } else if (allowTrailingComma && this.afterTrailingComma(close)) {
      break
    } else if (this.type === types.ellipsis) {
      var rest = this.parseRestBinding();
      this.parseBindingListItem(rest);
      elts.push(rest);
      if (this.type === types.comma) { this.raise(this.start, "Comma is not permitted after the rest element"); }
      this.expect(close);
      break
    } else {
      var elem = this.parseMaybeDefault(this.start, this.startLoc);
      this.parseBindingListItem(elem);
      elts.push(elem);
    }
  }
  return elts
};

pp$2.parseBindingListItem = function(param) {
  return param
};

// Parses assignment pattern around given atom if possible.

pp$2.parseMaybeDefault = function(startPos, startLoc, left) {
  left = left || this.parseBindingAtom();
  if (this.options.ecmaVersion < 6 || !this.eat(types.eq)) { return left }
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern")
};

// Verify that a node is an lval — something that can be assigned
// to.
// bindingType can be either:
// 'var' indicating that the lval creates a 'var' binding
// 'let' indicating that the lval creates a lexical ('let' or 'const') binding
// 'none' indicating that the binding should be checked for illegal identifiers, but not for duplicate references

pp$2.checkLVal = function(expr, bindingType, checkClashes) {
  if ( bindingType === void 0 ) bindingType = BIND_NONE;

  switch (expr.type) {
  case "Identifier":
    if (bindingType === BIND_LEXICAL && expr.name === "let")
      { this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name"); }
    if (this.strict && this.reservedWordsStrictBind.test(expr.name))
      { this.raiseRecoverable(expr.start, (bindingType ? "Binding " : "Assigning to ") + expr.name + " in strict mode"); }
    if (checkClashes) {
      if (has(checkClashes, expr.name))
        { this.raiseRecoverable(expr.start, "Argument name clash"); }
      checkClashes[expr.name] = true;
    }
    if (bindingType !== BIND_NONE && bindingType !== BIND_OUTSIDE) { this.declareName(expr.name, bindingType, expr.start); }
    break

  case "MemberExpression":
    if (bindingType) { this.raiseRecoverable(expr.start, "Binding member expression"); }
    break

  case "ObjectPattern":
    for (var i = 0, list = expr.properties; i < list.length; i += 1)
      {
    var prop = list[i];

    this.checkLVal(prop, bindingType, checkClashes);
  }
    break

  case "Property":
    // AssignmentProperty has type === "Property"
    this.checkLVal(expr.value, bindingType, checkClashes);
    break

  case "ArrayPattern":
    for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
      var elem = list$1[i$1];

    if (elem) { this.checkLVal(elem, bindingType, checkClashes); }
    }
    break

  case "AssignmentPattern":
    this.checkLVal(expr.left, bindingType, checkClashes);
    break

  case "RestElement":
    this.checkLVal(expr.argument, bindingType, checkClashes);
    break

  case "ParenthesizedExpression":
    this.checkLVal(expr.expression, bindingType, checkClashes);
    break

  default:
    this.raise(expr.start, (bindingType ? "Binding" : "Assigning to") + " rvalue");
  }
};

// A recursive descent parser operates by defining functions for all

var pp$3 = Parser.prototype;

// Check if property name clashes with already added.
// Object/class getters and setters are not allowed to clash —
// either with each other or with an init property — and in
// strict mode, init properties are also not allowed to be repeated.

pp$3.checkPropClash = function(prop, propHash, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement")
    { return }
  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))
    { return }
  var key = prop.key;
  var name;
  switch (key.type) {
  case "Identifier": name = key.name; break
  case "Literal": name = String(key.value); break
  default: return
  }
  var kind = prop.kind;
  if (this.options.ecmaVersion >= 6) {
    if (name === "__proto__" && kind === "init") {
      if (propHash.proto) {
        if (refDestructuringErrors && refDestructuringErrors.doubleProto < 0) { refDestructuringErrors.doubleProto = key.start; }
        // Backwards-compat kludge. Can be removed in version 6.0
        else { this.raiseRecoverable(key.start, "Redefinition of __proto__ property"); }
      }
      propHash.proto = true;
    }
    return
  }
  name = "$" + name;
  var other = propHash[name];
  if (other) {
    var redefinition;
    if (kind === "init") {
      redefinition = this.strict && other.init || other.get || other.set;
    } else {
      redefinition = other.init || other[kind];
    }
    if (redefinition)
      { this.raiseRecoverable(key.start, "Redefinition of property"); }
  } else {
    other = propHash[name] = {
      init: false,
      get: false,
      set: false
    };
  }
  other[kind] = true;
};

// ### Expression parsing

// These nest, from the most general expression type at the top to
// 'atomic', nondivisible expression types at the bottom. Most of
// the functions will simply let the function(s) below them parse,
// and, *if* the syntactic construct they handle is present, wrap
// the AST node that the inner parser gave them in another node.

// Parse a full expression. The optional arguments are used to
// forbid the `in` operator (in for loops initalization expressions)
// and provide reference for storing '=' operator inside shorthand
// property assignment in contexts where both object expression
// and object pattern might appear (so it's possible to raise
// delayed syntax error at correct position).

pp$3.parseExpression = function(noIn, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
  if (this.type === types.comma) {
    var node = this.startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (this.eat(types.comma)) { node.expressions.push(this.parseMaybeAssign(noIn, refDestructuringErrors)); }
    return this.finishNode(node, "SequenceExpression")
  }
  return expr
};

// Parse an assignment expression. This includes applications of
// operators like `+=`.

pp$3.parseMaybeAssign = function(noIn, refDestructuringErrors, afterLeftParse) {
  if (this.isContextual("yield")) {
    if (this.inGenerator) { return this.parseYield(noIn) }
    // The tokenizer will assume an expression is allowed after
    // `yield`, but this isn't that kind of yield
    else { this.exprAllowed = false; }
  }

  var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldShorthandAssign = -1;
  if (refDestructuringErrors) {
    oldParenAssign = refDestructuringErrors.parenthesizedAssign;
    oldTrailingComma = refDestructuringErrors.trailingComma;
    oldShorthandAssign = refDestructuringErrors.shorthandAssign;
    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.shorthandAssign = -1;
  } else {
    refDestructuringErrors = new DestructuringErrors;
    ownDestructuringErrors = true;
  }

  var startPos = this.start, startLoc = this.startLoc;
  if (this.type === types.parenL || this.type === types.name)
    { this.potentialArrowAt = this.start; }
  var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
  if (afterLeftParse) { left = afterLeftParse.call(this, left, startPos, startLoc); }
  if (this.type.isAssign) {
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.value;
    node.left = this.type === types.eq ? this.toAssignable(left, false, refDestructuringErrors) : left;
    if (!ownDestructuringErrors) { DestructuringErrors.call(refDestructuringErrors); }
    refDestructuringErrors.shorthandAssign = -1; // reset because shorthand default was used correctly
    this.checkLVal(left);
    this.next();
    node.right = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "AssignmentExpression")
  } else {
    if (ownDestructuringErrors) { this.checkExpressionErrors(refDestructuringErrors, true); }
  }
  if (oldParenAssign > -1) { refDestructuringErrors.parenthesizedAssign = oldParenAssign; }
  if (oldTrailingComma > -1) { refDestructuringErrors.trailingComma = oldTrailingComma; }
  if (oldShorthandAssign > -1) { refDestructuringErrors.shorthandAssign = oldShorthandAssign; }
  return left
};

// Parse a ternary conditional (`?:`) operator.

pp$3.parseMaybeConditional = function(noIn, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprOps(noIn, refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
  if (this.eat(types.question)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    this.expect(types.colon);
    node.alternate = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "ConditionalExpression")
  }
  return expr
};

// Start the precedence parser.

pp$3.parseExprOps = function(noIn, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeUnary(refDestructuringErrors, false);
  if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
  return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, noIn)
};

// Parse binary operators with the operator precedence parsing
// algorithm. `left` is the left-hand side of the operator.
// `minPrec` provides context that allows the function to stop and
// defer further parser to one of its callers when it encounters an
// operator that has a lower precedence than the set it is parsing.

pp$3.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, noIn) {
  var prec = this.type.binop;
  if (prec != null && (!noIn || this.type !== types._in)) {
    if (prec > minPrec) {
      var logical = this.type === types.logicalOR || this.type === types.logicalAND;
      var op = this.value;
      this.next();
      var startPos = this.start, startLoc = this.startLoc;
      var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn);
      var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical);
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn)
    }
  }
  return left
};

pp$3.buildBinary = function(startPos, startLoc, left, right, op, logical) {
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.operator = op;
  node.right = right;
  return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression")
};

// Parse unary operators, both prefix and postfix.

pp$3.parseMaybeUnary = function(refDestructuringErrors, sawUnary) {
  var startPos = this.start, startLoc = this.startLoc, expr;
  if (this.isContextual("await") && (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction))) {
    expr = this.parseAwait();
    sawUnary = true;
  } else if (this.type.prefix) {
    var node = this.startNode(), update = this.type === types.incDec;
    node.operator = this.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary(null, true);
    this.checkExpressionErrors(refDestructuringErrors, true);
    if (update) { this.checkLVal(node.argument); }
    else if (this.strict && node.operator === "delete" &&
             node.argument.type === "Identifier")
      { this.raiseRecoverable(node.start, "Deleting local variable in strict mode"); }
    else { sawUnary = true; }
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  } else {
    expr = this.parseExprSubscripts(refDestructuringErrors);
    if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.operator = this.value;
      node$1.prefix = false;
      node$1.argument = expr;
      this.checkLVal(expr);
      this.next();
      expr = this.finishNode(node$1, "UpdateExpression");
    }
  }

  if (!sawUnary && this.eat(types.starstar))
    { return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false) }
  else
    { return expr }
};

// Parse call, dot, and `[]`-subscript expressions.

pp$3.parseExprSubscripts = function(refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprAtom(refDestructuringErrors);
  var skipArrowSubscripts = expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")";
  if (this.checkExpressionErrors(refDestructuringErrors) || skipArrowSubscripts) { return expr }
  var result = this.parseSubscripts(expr, startPos, startLoc);
  if (refDestructuringErrors && result.type === "MemberExpression") {
    if (refDestructuringErrors.parenthesizedAssign >= result.start) { refDestructuringErrors.parenthesizedAssign = -1; }
    if (refDestructuringErrors.parenthesizedBind >= result.start) { refDestructuringErrors.parenthesizedBind = -1; }
  }
  return result
};

pp$3.parseSubscripts = function(base, startPos, startLoc, noCalls) {
  var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" &&
      this.lastTokEnd === base.end && !this.canInsertSemicolon() && this.input.slice(base.start, base.end) === "async";
  while (true) {
    var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow);
    if (element === base || element.type === "ArrowFunctionExpression") { return element }
    base = element;
  }
};

pp$3.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow) {
  var computed = this.eat(types.bracketL);
  if (computed || this.eat(types.dot)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.object = base;
    node.property = computed ? this.parseExpression() : this.parseIdent(this.options.allowReserved !== "never");
    node.computed = !!computed;
    if (computed) { this.expect(types.bracketR); }
    base = this.finishNode(node, "MemberExpression");
  } else if (!noCalls && this.eat(types.parenL)) {
    var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    var exprList = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
    if (maybeAsyncArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      if (this.awaitIdentPos > 0)
        { this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"); }
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      this.awaitIdentPos = oldAwaitIdentPos;
      return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true)
    }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;
    this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
    var node$1 = this.startNodeAt(startPos, startLoc);
    node$1.callee = base;
    node$1.arguments = exprList;
    base = this.finishNode(node$1, "CallExpression");
  } else if (this.type === types.backQuote) {
    var node$2 = this.startNodeAt(startPos, startLoc);
    node$2.tag = base;
    node$2.quasi = this.parseTemplate({isTagged: true});
    base = this.finishNode(node$2, "TaggedTemplateExpression");
  }
  return base
};

// Parse an atomic expression — either a single token that is an
// expression, an expression started by a keyword like `function` or
// `new`, or an expression wrapped in punctuation like `()`, `[]`,
// or `{}`.

pp$3.parseExprAtom = function(refDestructuringErrors) {
  // If a division operator appears in an expression position, the
  // tokenizer got confused, and we force it to read a regexp instead.
  if (this.type === types.slash) { this.readRegexp(); }

  var node, canBeArrow = this.potentialArrowAt === this.start;
  switch (this.type) {
  case types._super:
    if (!this.allowSuper)
      { this.raise(this.start, "'super' keyword outside a method"); }
    node = this.startNode();
    this.next();
    if (this.type === types.parenL && !this.allowDirectSuper)
      { this.raise(node.start, "super() call outside constructor of a subclass"); }
    // The `super` keyword can appear at below:
    // SuperProperty:
    //     super [ Expression ]
    //     super . IdentifierName
    // SuperCall:
    //     super ( Arguments )
    if (this.type !== types.dot && this.type !== types.bracketL && this.type !== types.parenL)
      { this.unexpected(); }
    return this.finishNode(node, "Super")

  case types._this:
    node = this.startNode();
    this.next();
    return this.finishNode(node, "ThisExpression")

  case types.name:
    var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
    var id = this.parseIdent(false);
    if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types._function))
      { return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true) }
    if (canBeArrow && !this.canInsertSemicolon()) {
      if (this.eat(types.arrow))
        { return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false) }
      if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types.name && !containsEsc) {
        id = this.parseIdent(false);
        if (this.canInsertSemicolon() || !this.eat(types.arrow))
          { this.unexpected(); }
        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true)
      }
    }
    return id

  case types.regexp:
    var value = this.value;
    node = this.parseLiteral(value.value);
    node.regex = {pattern: value.pattern, flags: value.flags};
    return node

  case types.num: case types.string:
    return this.parseLiteral(this.value)

  case types._null: case types._true: case types._false:
    node = this.startNode();
    node.value = this.type === types._null ? null : this.type === types._true;
    node.raw = this.type.keyword;
    this.next();
    return this.finishNode(node, "Literal")

  case types.parenL:
    var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow);
    if (refDestructuringErrors) {
      if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr))
        { refDestructuringErrors.parenthesizedAssign = start; }
      if (refDestructuringErrors.parenthesizedBind < 0)
        { refDestructuringErrors.parenthesizedBind = start; }
    }
    return expr

  case types.bracketL:
    node = this.startNode();
    this.next();
    node.elements = this.parseExprList(types.bracketR, true, true, refDestructuringErrors);
    return this.finishNode(node, "ArrayExpression")

  case types.braceL:
    return this.parseObj(false, refDestructuringErrors)

  case types._function:
    node = this.startNode();
    this.next();
    return this.parseFunction(node, 0)

  case types._class:
    return this.parseClass(this.startNode(), false)

  case types._new:
    return this.parseNew()

  case types.backQuote:
    return this.parseTemplate()

  case types._import:
    if (this.options.ecmaVersion >= 11) {
      return this.parseExprImport()
    } else {
      return this.unexpected()
    }

  default:
    this.unexpected();
  }
};

pp$3.parseExprImport = function() {
  var node = this.startNode();
  this.next(); // skip `import`
  switch (this.type) {
  case types.parenL:
    return this.parseDynamicImport(node)
  default:
    this.unexpected();
  }
};

pp$3.parseDynamicImport = function(node) {
  this.next(); // skip `(`

  // Parse node.source.
  node.source = this.parseMaybeAssign();

  // Verify ending.
  if (!this.eat(types.parenR)) {
    var errorPos = this.start;
    if (this.eat(types.comma) && this.eat(types.parenR)) {
      this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
    } else {
      this.unexpected(errorPos);
    }
  }

  return this.finishNode(node, "ImportExpression")
};

pp$3.parseLiteral = function(value) {
  var node = this.startNode();
  node.value = value;
  node.raw = this.input.slice(this.start, this.end);
  if (node.raw.charCodeAt(node.raw.length - 1) === 110) { node.bigint = node.raw.slice(0, -1); }
  this.next();
  return this.finishNode(node, "Literal")
};

pp$3.parseParenExpression = function() {
  this.expect(types.parenL);
  var val = this.parseExpression();
  this.expect(types.parenR);
  return val
};

pp$3.parseParenAndDistinguishExpression = function(canBeArrow) {
  var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();

    var innerStartPos = this.start, innerStartLoc = this.startLoc;
    var exprList = [], first = true, lastIsComma = false;
    var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
    this.yieldPos = 0;
    this.awaitPos = 0;
    // Do not save awaitIdentPos to allow checking awaits nested in parameters
    while (this.type !== types.parenR) {
      first ? first = false : this.expect(types.comma);
      if (allowTrailingComma && this.afterTrailingComma(types.parenR, true)) {
        lastIsComma = true;
        break
      } else if (this.type === types.ellipsis) {
        spreadStart = this.start;
        exprList.push(this.parseParenItem(this.parseRestBinding()));
        if (this.type === types.comma) { this.raise(this.start, "Comma is not permitted after the rest element"); }
        break
      } else {
        exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
      }
    }
    var innerEndPos = this.start, innerEndLoc = this.startLoc;
    this.expect(types.parenR);

    if (canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      return this.parseParenArrowList(startPos, startLoc, exprList)
    }

    if (!exprList.length || lastIsComma) { this.unexpected(this.lastTokStart); }
    if (spreadStart) { this.unexpected(spreadStart); }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;

    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }
  } else {
    val = this.parseParenExpression();
  }

  if (this.options.preserveParens) {
    var par = this.startNodeAt(startPos, startLoc);
    par.expression = val;
    return this.finishNode(par, "ParenthesizedExpression")
  } else {
    return val
  }
};

pp$3.parseParenItem = function(item) {
  return item
};

pp$3.parseParenArrowList = function(startPos, startLoc, exprList) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList)
};

// New's precedence is slightly tricky. It must allow its argument to
// be a `[]` or dot subscript expression, but not a call — at least,
// not without wrapping it in parentheses. Thus, it uses the noCalls
// argument to parseSubscripts to prevent it from consuming the
// argument list.

var empty$1 = [];

pp$3.parseNew = function() {
  var node = this.startNode();
  var meta = this.parseIdent(true);
  if (this.options.ecmaVersion >= 6 && this.eat(types.dot)) {
    node.meta = meta;
    var containsEsc = this.containsEsc;
    node.property = this.parseIdent(true);
    if (node.property.name !== "target" || containsEsc)
      { this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target"); }
    if (!this.inNonArrowFunction())
      { this.raiseRecoverable(node.start, "new.target can only be used in functions"); }
    return this.finishNode(node, "MetaProperty")
  }
  var startPos = this.start, startLoc = this.startLoc, isImport = this.type === types._import;
  node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
  if (isImport && node.callee.type === "ImportExpression") {
    this.raise(startPos, "Cannot use new with import()");
  }
  if (this.eat(types.parenL)) { node.arguments = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false); }
  else { node.arguments = empty$1; }
  return this.finishNode(node, "NewExpression")
};

// Parse template expression.

pp$3.parseTemplateElement = function(ref) {
  var isTagged = ref.isTagged;

  var elem = this.startNode();
  if (this.type === types.invalidTemplate) {
    if (!isTagged) {
      this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
    }
    elem.value = {
      raw: this.value,
      cooked: null
    };
  } else {
    elem.value = {
      raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
      cooked: this.value
    };
  }
  this.next();
  elem.tail = this.type === types.backQuote;
  return this.finishNode(elem, "TemplateElement")
};

pp$3.parseTemplate = function(ref) {
  if ( ref === void 0 ) ref = {};
  var isTagged = ref.isTagged; if ( isTagged === void 0 ) isTagged = false;

  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement({isTagged: isTagged});
  node.quasis = [curElt];
  while (!curElt.tail) {
    if (this.type === types.eof) { this.raise(this.pos, "Unterminated template literal"); }
    this.expect(types.dollarBraceL);
    node.expressions.push(this.parseExpression());
    this.expect(types.braceR);
    node.quasis.push(curElt = this.parseTemplateElement({isTagged: isTagged}));
  }
  this.next();
  return this.finishNode(node, "TemplateLiteral")
};

pp$3.isAsyncProp = function(prop) {
  return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" &&
    (this.type === types.name || this.type === types.num || this.type === types.string || this.type === types.bracketL || this.type.keyword || (this.options.ecmaVersion >= 9 && this.type === types.star)) &&
    !lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
};

// Parse an object literal or binding pattern.

pp$3.parseObj = function(isPattern, refDestructuringErrors) {
  var node = this.startNode(), first = true, propHash = {};
  node.properties = [];
  this.next();
  while (!this.eat(types.braceR)) {
    if (!first) {
      this.expect(types.comma);
      if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types.braceR)) { break }
    } else { first = false; }

    var prop = this.parseProperty(isPattern, refDestructuringErrors);
    if (!isPattern) { this.checkPropClash(prop, propHash, refDestructuringErrors); }
    node.properties.push(prop);
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression")
};

pp$3.parseProperty = function(isPattern, refDestructuringErrors) {
  var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
  if (this.options.ecmaVersion >= 9 && this.eat(types.ellipsis)) {
    if (isPattern) {
      prop.argument = this.parseIdent(false);
      if (this.type === types.comma) {
        this.raise(this.start, "Comma is not permitted after the rest element");
      }
      return this.finishNode(prop, "RestElement")
    }
    // To disallow parenthesized identifier via `this.toAssignable()`.
    if (this.type === types.parenL && refDestructuringErrors) {
      if (refDestructuringErrors.parenthesizedAssign < 0) {
        refDestructuringErrors.parenthesizedAssign = this.start;
      }
      if (refDestructuringErrors.parenthesizedBind < 0) {
        refDestructuringErrors.parenthesizedBind = this.start;
      }
    }
    // Parse argument.
    prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    // To disallow trailing comma via `this.toAssignable()`.
    if (this.type === types.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
      refDestructuringErrors.trailingComma = this.start;
    }
    // Finish
    return this.finishNode(prop, "SpreadElement")
  }
  if (this.options.ecmaVersion >= 6) {
    prop.method = false;
    prop.shorthand = false;
    if (isPattern || refDestructuringErrors) {
      startPos = this.start;
      startLoc = this.startLoc;
    }
    if (!isPattern)
      { isGenerator = this.eat(types.star); }
  }
  var containsEsc = this.containsEsc;
  this.parsePropertyName(prop);
  if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
    isAsync = true;
    isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
    this.parsePropertyName(prop, refDestructuringErrors);
  } else {
    isAsync = false;
  }
  this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
  return this.finishNode(prop, "Property")
};

pp$3.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
  if ((isGenerator || isAsync) && this.type === types.colon)
    { this.unexpected(); }

  if (this.eat(types.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
    prop.kind = "init";
  } else if (this.options.ecmaVersion >= 6 && this.type === types.parenL) {
    if (isPattern) { this.unexpected(); }
    prop.kind = "init";
    prop.method = true;
    prop.value = this.parseMethod(isGenerator, isAsync);
  } else if (!isPattern && !containsEsc &&
             this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
             (prop.key.name === "get" || prop.key.name === "set") &&
             (this.type !== types.comma && this.type !== types.braceR)) {
    if (isGenerator || isAsync) { this.unexpected(); }
    prop.kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get")
        { this.raiseRecoverable(start, "getter should have no params"); }
      else
        { this.raiseRecoverable(start, "setter should have exactly one param"); }
    } else {
      if (prop.kind === "set" && prop.value.params[0].type === "RestElement")
        { this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params"); }
    }
  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
    if (isGenerator || isAsync) { this.unexpected(); }
    this.checkUnreserved(prop.key);
    if (prop.key.name === "await" && !this.awaitIdentPos)
      { this.awaitIdentPos = startPos; }
    prop.kind = "init";
    if (isPattern) {
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
    } else if (this.type === types.eq && refDestructuringErrors) {
      if (refDestructuringErrors.shorthandAssign < 0)
        { refDestructuringErrors.shorthandAssign = this.start; }
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
    } else {
      prop.value = prop.key;
    }
    prop.shorthand = true;
  } else { this.unexpected(); }
};

pp$3.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(types.bracketL)) {
      prop.computed = true;
      prop.key = this.parseMaybeAssign();
      this.expect(types.bracketR);
      return prop.key
    } else {
      prop.computed = false;
    }
  }
  return prop.key = this.type === types.num || this.type === types.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never")
};

// Initialize empty function node.

pp$3.initFunction = function(node) {
  node.id = null;
  if (this.options.ecmaVersion >= 6) { node.generator = node.expression = false; }
  if (this.options.ecmaVersion >= 8) { node.async = false; }
};

// Parse object or class method.

pp$3.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
  var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;

  this.initFunction(node);
  if (this.options.ecmaVersion >= 6)
    { node.generator = isGenerator; }
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }

  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));

  this.expect(types.parenL);
  node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
  this.parseFunctionBody(node, false, true);

  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, "FunctionExpression")
};

// Parse arrow function expression with given parameters.

pp$3.parseArrowExpression = function(node, params, isAsync) {
  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;

  this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
  this.initFunction(node);
  if (this.options.ecmaVersion >= 8) { node.async = !!isAsync; }

  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;

  node.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node, true, false);

  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, "ArrowFunctionExpression")
};

// Parse function body and check parameters.

pp$3.parseFunctionBody = function(node, isArrowFunction, isMethod) {
  var isExpression = isArrowFunction && this.type !== types.braceL;
  var oldStrict = this.strict, useStrict = false;

  if (isExpression) {
    node.body = this.parseMaybeAssign();
    node.expression = true;
    this.checkParams(node, false);
  } else {
    var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
    if (!oldStrict || nonSimple) {
      useStrict = this.strictDirective(this.end);
      // If this is a strict mode function, verify that argument names
      // are not repeated, and it does not try to bind the words `eval`
      // or `arguments`.
      if (useStrict && nonSimple)
        { this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list"); }
    }
    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldLabels = this.labels;
    this.labels = [];
    if (useStrict) { this.strict = true; }

    // Add the params to varDeclaredNames to ensure that an error is thrown
    // if a let/const declaration in the function clashes with one of the params.
    this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
    node.body = this.parseBlock(false);
    node.expression = false;
    this.adaptDirectivePrologue(node.body.body);
    this.labels = oldLabels;
  }
  this.exitScope();

  // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
  if (this.strict && node.id) { this.checkLVal(node.id, BIND_OUTSIDE); }
  this.strict = oldStrict;
};

pp$3.isSimpleParamList = function(params) {
  for (var i = 0, list = params; i < list.length; i += 1)
    {
    var param = list[i];

    if (param.type !== "Identifier") { return false
  } }
  return true
};

// Checks function params for various disallowed patterns such as using "eval"
// or "arguments" and duplicate parameters.

pp$3.checkParams = function(node, allowDuplicates) {
  var nameHash = {};
  for (var i = 0, list = node.params; i < list.length; i += 1)
    {
    var param = list[i];

    this.checkLVal(param, BIND_VAR, allowDuplicates ? null : nameHash);
  }
};

// Parses a comma-separated list of expressions, and returns them as
// an array. `close` is the token type that ends the list, and
// `allowEmpty` can be turned on to allow subsequent commas with
// nothing in between them to be parsed as `null` (which is needed
// for array literals).

pp$3.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
  var elts = [], first = true;
  while (!this.eat(close)) {
    if (!first) {
      this.expect(types.comma);
      if (allowTrailingComma && this.afterTrailingComma(close)) { break }
    } else { first = false; }

    var elt = (void 0);
    if (allowEmpty && this.type === types.comma)
      { elt = null; }
    else if (this.type === types.ellipsis) {
      elt = this.parseSpread(refDestructuringErrors);
      if (refDestructuringErrors && this.type === types.comma && refDestructuringErrors.trailingComma < 0)
        { refDestructuringErrors.trailingComma = this.start; }
    } else {
      elt = this.parseMaybeAssign(false, refDestructuringErrors);
    }
    elts.push(elt);
  }
  return elts
};

pp$3.checkUnreserved = function(ref) {
  var start = ref.start;
  var end = ref.end;
  var name = ref.name;

  if (this.inGenerator && name === "yield")
    { this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator"); }
  if (this.inAsync && name === "await")
    { this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function"); }
  if (this.keywords.test(name))
    { this.raise(start, ("Unexpected keyword '" + name + "'")); }
  if (this.options.ecmaVersion < 6 &&
    this.input.slice(start, end).indexOf("\\") !== -1) { return }
  var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
  if (re.test(name)) {
    if (!this.inAsync && name === "await")
      { this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function"); }
    this.raiseRecoverable(start, ("The keyword '" + name + "' is reserved"));
  }
};

// Parse the next token as an identifier. If `liberal` is true (used
// when parsing properties), it will also convert keywords into
// identifiers.

pp$3.parseIdent = function(liberal, isBinding) {
  var node = this.startNode();
  if (this.type === types.name) {
    node.name = this.value;
  } else if (this.type.keyword) {
    node.name = this.type.keyword;

    // To fix https://github.com/acornjs/acorn/issues/575
    // `class` and `function` keywords push new context into this.context.
    // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
    // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
    if ((node.name === "class" || node.name === "function") &&
        (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
      this.context.pop();
    }
  } else {
    this.unexpected();
  }
  this.next();
  this.finishNode(node, "Identifier");
  if (!liberal) {
    this.checkUnreserved(node);
    if (node.name === "await" && !this.awaitIdentPos)
      { this.awaitIdentPos = node.start; }
  }
  return node
};

// Parses yield expression inside generator.

pp$3.parseYield = function(noIn) {
  if (!this.yieldPos) { this.yieldPos = this.start; }

  var node = this.startNode();
  this.next();
  if (this.type === types.semi || this.canInsertSemicolon() || (this.type !== types.star && !this.type.startsExpr)) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = this.eat(types.star);
    node.argument = this.parseMaybeAssign(noIn);
  }
  return this.finishNode(node, "YieldExpression")
};

pp$3.parseAwait = function() {
  if (!this.awaitPos) { this.awaitPos = this.start; }

  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeUnary(null, true);
  return this.finishNode(node, "AwaitExpression")
};

var pp$4 = Parser.prototype;

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp$4.raise = function(pos, message) {
  var loc = getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  var err = new SyntaxError(message);
  err.pos = pos; err.loc = loc; err.raisedAt = this.pos;
  throw err
};

pp$4.raiseRecoverable = pp$4.raise;

pp$4.curPosition = function() {
  if (this.options.locations) {
    return new Position(this.curLine, this.pos - this.lineStart)
  }
};

var pp$5 = Parser.prototype;

var Scope$1 = function Scope(flags) {
  this.flags = flags;
  // A list of var-declared names in the current lexical scope
  this.var = [];
  // A list of lexically-declared names in the current lexical scope
  this.lexical = [];
  // A list of lexically-declared FunctionDeclaration names in the current lexical scope
  this.functions = [];
};

// The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

pp$5.enterScope = function(flags) {
  this.scopeStack.push(new Scope$1(flags));
};

pp$5.exitScope = function() {
  this.scopeStack.pop();
};

// The spec says:
// > At the top level of a function, or script, function declarations are
// > treated like var declarations rather than like lexical declarations.
pp$5.treatFunctionsAsVarInScope = function(scope) {
  return (scope.flags & SCOPE_FUNCTION) || !this.inModule && (scope.flags & SCOPE_TOP)
};

pp$5.declareName = function(name, bindingType, pos) {
  var redeclared = false;
  if (bindingType === BIND_LEXICAL) {
    var scope = this.currentScope();
    redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
    scope.lexical.push(name);
    if (this.inModule && (scope.flags & SCOPE_TOP))
      { delete this.undefinedExports[name]; }
  } else if (bindingType === BIND_SIMPLE_CATCH) {
    var scope$1 = this.currentScope();
    scope$1.lexical.push(name);
  } else if (bindingType === BIND_FUNCTION) {
    var scope$2 = this.currentScope();
    if (this.treatFunctionsAsVar)
      { redeclared = scope$2.lexical.indexOf(name) > -1; }
    else
      { redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1; }
    scope$2.functions.push(name);
  } else {
    for (var i = this.scopeStack.length - 1; i >= 0; --i) {
      var scope$3 = this.scopeStack[i];
      if (scope$3.lexical.indexOf(name) > -1 && !((scope$3.flags & SCOPE_SIMPLE_CATCH) && scope$3.lexical[0] === name) ||
          !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
        redeclared = true;
        break
      }
      scope$3.var.push(name);
      if (this.inModule && (scope$3.flags & SCOPE_TOP))
        { delete this.undefinedExports[name]; }
      if (scope$3.flags & SCOPE_VAR) { break }
    }
  }
  if (redeclared) { this.raiseRecoverable(pos, ("Identifier '" + name + "' has already been declared")); }
};

pp$5.checkLocalExport = function(id) {
  // scope.functions must be empty as Module code is always strict.
  if (this.scopeStack[0].lexical.indexOf(id.name) === -1 &&
      this.scopeStack[0].var.indexOf(id.name) === -1) {
    this.undefinedExports[id.name] = id;
  }
};

pp$5.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1]
};

pp$5.currentVarScope = function() {
  for (var i = this.scopeStack.length - 1;; i--) {
    var scope = this.scopeStack[i];
    if (scope.flags & SCOPE_VAR) { return scope }
  }
};

// Could be useful for `this`, `new.target`, `super()`, `super.property`, and `super[property]`.
pp$5.currentThisScope = function() {
  for (var i = this.scopeStack.length - 1;; i--) {
    var scope = this.scopeStack[i];
    if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) { return scope }
  }
};

var Node = function Node(parser, pos, loc) {
  this.type = "";
  this.start = pos;
  this.end = 0;
  if (parser.options.locations)
    { this.loc = new SourceLocation(parser, loc); }
  if (parser.options.directSourceFile)
    { this.sourceFile = parser.options.directSourceFile; }
  if (parser.options.ranges)
    { this.range = [pos, 0]; }
};

// Start an AST node, attaching a start offset.

var pp$6 = Parser.prototype;

pp$6.startNode = function() {
  return new Node(this, this.start, this.startLoc)
};

pp$6.startNodeAt = function(pos, loc) {
  return new Node(this, pos, loc)
};

// Finish an AST node, adding `type` and `end` properties.

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  if (this.options.locations)
    { node.loc.end = loc; }
  if (this.options.ranges)
    { node.range[1] = pos; }
  return node
}

pp$6.finishNode = function(node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
};

// Finish node at given position

pp$6.finishNodeAt = function(node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc)
};

// The algorithm used to determine whether a regexp can appear at a

var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
  this.generator = !!generator;
};

var types$1 = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", false),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function (p) { return p.tryReadTemplateToken(); }),
  f_stat: new TokContext("function", false),
  f_expr: new TokContext("function", true),
  f_expr_gen: new TokContext("function", true, false, null, true),
  f_gen: new TokContext("function", false, false, null, true)
};

var pp$7 = Parser.prototype;

pp$7.initialContext = function() {
  return [types$1.b_stat]
};

pp$7.braceIsBlock = function(prevType) {
  var parent = this.curContext();
  if (parent === types$1.f_expr || parent === types$1.f_stat)
    { return true }
  if (prevType === types.colon && (parent === types$1.b_stat || parent === types$1.b_expr))
    { return !parent.isExpr }

  // The check for `tt.name && exprAllowed` detects whether we are
  // after a `yield` or `of` construct. See the `updateContext` for
  // `tt.name`.
  if (prevType === types._return || prevType === types.name && this.exprAllowed)
    { return lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) }
  if (prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR || prevType === types.arrow)
    { return true }
  if (prevType === types.braceL)
    { return parent === types$1.b_stat }
  if (prevType === types._var || prevType === types._const || prevType === types.name)
    { return false }
  return !this.exprAllowed
};

pp$7.inGeneratorContext = function() {
  for (var i = this.context.length - 1; i >= 1; i--) {
    var context = this.context[i];
    if (context.token === "function")
      { return context.generator }
  }
  return false
};

pp$7.updateContext = function(prevType) {
  var update, type = this.type;
  if (type.keyword && prevType === types.dot)
    { this.exprAllowed = false; }
  else if (update = type.updateContext)
    { update.call(this, prevType); }
  else
    { this.exprAllowed = type.beforeExpr; }
};

// Token-specific context update code

types.parenR.updateContext = types.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = true;
    return
  }
  var out = this.context.pop();
  if (out === types$1.b_stat && this.curContext().token === "function") {
    out = this.context.pop();
  }
  this.exprAllowed = !out.isExpr;
};

types.braceL.updateContext = function(prevType) {
  this.context.push(this.braceIsBlock(prevType) ? types$1.b_stat : types$1.b_expr);
  this.exprAllowed = true;
};

types.dollarBraceL.updateContext = function() {
  this.context.push(types$1.b_tmpl);
  this.exprAllowed = true;
};

types.parenL.updateContext = function(prevType) {
  var statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
  this.context.push(statementParens ? types$1.p_stat : types$1.p_expr);
  this.exprAllowed = true;
};

types.incDec.updateContext = function() {
  // tokExprAllowed stays unchanged
};

types._function.updateContext = types._class.updateContext = function(prevType) {
  if (prevType.beforeExpr && prevType !== types.semi && prevType !== types._else &&
      !(prevType === types._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) &&
      !((prevType === types.colon || prevType === types.braceL) && this.curContext() === types$1.b_stat))
    { this.context.push(types$1.f_expr); }
  else
    { this.context.push(types$1.f_stat); }
  this.exprAllowed = false;
};

types.backQuote.updateContext = function() {
  if (this.curContext() === types$1.q_tmpl)
    { this.context.pop(); }
  else
    { this.context.push(types$1.q_tmpl); }
  this.exprAllowed = false;
};

types.star.updateContext = function(prevType) {
  if (prevType === types._function) {
    var index = this.context.length - 1;
    if (this.context[index] === types$1.f_expr)
      { this.context[index] = types$1.f_expr_gen; }
    else
      { this.context[index] = types$1.f_gen; }
  }
  this.exprAllowed = true;
};

types.name.updateContext = function(prevType) {
  var allowed = false;
  if (this.options.ecmaVersion >= 6 && prevType !== types.dot) {
    if (this.value === "of" && !this.exprAllowed ||
        this.value === "yield" && this.inGeneratorContext())
      { allowed = true; }
  }
  this.exprAllowed = allowed;
};

// This file contains Unicode properties extracted from the ECMAScript
// specification. The lists are extracted like so:
// $$('#table-binary-unicode-properties > figure > table > tbody > tr > td:nth-child(1) code').map(el => el.innerText)

// #table-binary-unicode-properties
var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
var ecma11BinaryProperties = ecma10BinaryProperties;
var unicodeBinaryProperties = {
  9: ecma9BinaryProperties,
  10: ecma10BinaryProperties,
  11: ecma11BinaryProperties
};

// #table-unicode-general-category-values
var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";

// #table-unicode-script-values
var ecma9ScriptValues = "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
var unicodeScriptValues = {
  9: ecma9ScriptValues,
  10: ecma10ScriptValues,
  11: ecma11ScriptValues
};

var data = {};
function buildUnicodeData(ecmaVersion) {
  var d = data[ecmaVersion] = {
    binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
    nonBinary: {
      General_Category: wordsRegexp(unicodeGeneralCategoryValues),
      Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
    }
  };
  d.nonBinary.Script_Extensions = d.nonBinary.Script;

  d.nonBinary.gc = d.nonBinary.General_Category;
  d.nonBinary.sc = d.nonBinary.Script;
  d.nonBinary.scx = d.nonBinary.Script_Extensions;
}
buildUnicodeData(9);
buildUnicodeData(10);
buildUnicodeData(11);

var pp$8 = Parser.prototype;

var RegExpValidationState = function RegExpValidationState(parser) {
  this.parser = parser;
  this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "");
  this.unicodeProperties = data[parser.options.ecmaVersion >= 11 ? 11 : parser.options.ecmaVersion];
  this.source = "";
  this.flags = "";
  this.start = 0;
  this.switchU = false;
  this.switchN = false;
  this.pos = 0;
  this.lastIntValue = 0;
  this.lastStringValue = "";
  this.lastAssertionIsQuantifiable = false;
  this.numCapturingParens = 0;
  this.maxBackReference = 0;
  this.groupNames = [];
  this.backReferenceNames = [];
};

RegExpValidationState.prototype.reset = function reset (start, pattern, flags) {
  var unicode = flags.indexOf("u") !== -1;
  this.start = start | 0;
  this.source = pattern + "";
  this.flags = flags;
  this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
  this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
};

RegExpValidationState.prototype.raise = function raise (message) {
  this.parser.raiseRecoverable(this.start, ("Invalid regular expression: /" + (this.source) + "/: " + message));
};

// If u flag is given, this returns the code point at the index (it combines a surrogate pair).
// Otherwise, this returns the code unit of the index (can be a part of a surrogate pair).
RegExpValidationState.prototype.at = function at (i) {
  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return -1
  }
  var c = s.charCodeAt(i);
  if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
    return c
  }
  return (c << 10) + s.charCodeAt(i + 1) - 0x35FDC00
};

RegExpValidationState.prototype.nextIndex = function nextIndex (i) {
  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return l
  }
  var c = s.charCodeAt(i);
  if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
    return i + 1
  }
  return i + 2
};

RegExpValidationState.prototype.current = function current () {
  return this.at(this.pos)
};

RegExpValidationState.prototype.lookahead = function lookahead () {
  return this.at(this.nextIndex(this.pos))
};

RegExpValidationState.prototype.advance = function advance () {
  this.pos = this.nextIndex(this.pos);
};

RegExpValidationState.prototype.eat = function eat (ch) {
  if (this.current() === ch) {
    this.advance();
    return true
  }
  return false
};

function codePointToString(ch) {
  if (ch <= 0xFFFF) { return String.fromCharCode(ch) }
  ch -= 0x10000;
  return String.fromCharCode((ch >> 10) + 0xD800, (ch & 0x03FF) + 0xDC00)
}

/**
 * Validate the flags part of a given RegExpLiteral.
 *
 * @param {RegExpValidationState} state The state to validate RegExp.
 * @returns {void}
 */
pp$8.validateRegExpFlags = function(state) {
  var validFlags = state.validFlags;
  var flags = state.flags;

  for (var i = 0; i < flags.length; i++) {
    var flag = flags.charAt(i);
    if (validFlags.indexOf(flag) === -1) {
      this.raise(state.start, "Invalid regular expression flag");
    }
    if (flags.indexOf(flag, i + 1) > -1) {
      this.raise(state.start, "Duplicate regular expression flag");
    }
  }
};

/**
 * Validate the pattern part of a given RegExpLiteral.
 *
 * @param {RegExpValidationState} state The state to validate RegExp.
 * @returns {void}
 */
pp$8.validateRegExpPattern = function(state) {
  this.regexp_pattern(state);

  // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
  // parsing contains a |GroupName|, reparse with the goal symbol
  // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
  // exception if _P_ did not conform to the grammar, if any elements of _P_
  // were not matched by the parse, or if any Early Error conditions exist.
  if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
    state.switchN = true;
    this.regexp_pattern(state);
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
pp$8.regexp_pattern = function(state) {
  state.pos = 0;
  state.lastIntValue = 0;
  state.lastStringValue = "";
  state.lastAssertionIsQuantifiable = false;
  state.numCapturingParens = 0;
  state.maxBackReference = 0;
  state.groupNames.length = 0;
  state.backReferenceNames.length = 0;

  this.regexp_disjunction(state);

  if (state.pos !== state.source.length) {
    // Make the same messages as V8.
    if (state.eat(0x29 /* ) */)) {
      state.raise("Unmatched ')'");
    }
    if (state.eat(0x5D /* [ */) || state.eat(0x7D /* } */)) {
      state.raise("Lone quantifier brackets");
    }
  }
  if (state.maxBackReference > state.numCapturingParens) {
    state.raise("Invalid escape");
  }
  for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
    var name = list[i];

    if (state.groupNames.indexOf(name) === -1) {
      state.raise("Invalid named capture referenced");
    }
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
pp$8.regexp_disjunction = function(state) {
  this.regexp_alternative(state);
  while (state.eat(0x7C /* | */)) {
    this.regexp_alternative(state);
  }

  // Make the same message as V8.
  if (this.regexp_eatQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  if (state.eat(0x7B /* { */)) {
    state.raise("Lone quantifier brackets");
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
pp$8.regexp_alternative = function(state) {
  while (state.pos < state.source.length && this.regexp_eatTerm(state))
    { }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
pp$8.regexp_eatTerm = function(state) {
  if (this.regexp_eatAssertion(state)) {
    // Handle `QuantifiableAssertion Quantifier` alternative.
    // `state.lastAssertionIsQuantifiable` is true if the last eaten Assertion
    // is a QuantifiableAssertion.
    if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
      // Make the same message as V8.
      if (state.switchU) {
        state.raise("Invalid quantifier");
      }
    }
    return true
  }

  if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
    this.regexp_eatQuantifier(state);
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
pp$8.regexp_eatAssertion = function(state) {
  var start = state.pos;
  state.lastAssertionIsQuantifiable = false;

  // ^, $
  if (state.eat(0x5E /* ^ */) || state.eat(0x24 /* $ */)) {
    return true
  }

  // \b \B
  if (state.eat(0x5C /* \ */)) {
    if (state.eat(0x42 /* B */) || state.eat(0x62 /* b */)) {
      return true
    }
    state.pos = start;
  }

  // Lookahead / Lookbehind
  if (state.eat(0x28 /* ( */) && state.eat(0x3F /* ? */)) {
    var lookbehind = false;
    if (this.options.ecmaVersion >= 9) {
      lookbehind = state.eat(0x3C /* < */);
    }
    if (state.eat(0x3D /* = */) || state.eat(0x21 /* ! */)) {
      this.regexp_disjunction(state);
      if (!state.eat(0x29 /* ) */)) {
        state.raise("Unterminated group");
      }
      state.lastAssertionIsQuantifiable = !lookbehind;
      return true
    }
  }

  state.pos = start;
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
pp$8.regexp_eatQuantifier = function(state, noError) {
  if ( noError === void 0 ) noError = false;

  if (this.regexp_eatQuantifierPrefix(state, noError)) {
    state.eat(0x3F /* ? */);
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
pp$8.regexp_eatQuantifierPrefix = function(state, noError) {
  return (
    state.eat(0x2A /* * */) ||
    state.eat(0x2B /* + */) ||
    state.eat(0x3F /* ? */) ||
    this.regexp_eatBracedQuantifier(state, noError)
  )
};
pp$8.regexp_eatBracedQuantifier = function(state, noError) {
  var start = state.pos;
  if (state.eat(0x7B /* { */)) {
    var min = 0, max = -1;
    if (this.regexp_eatDecimalDigits(state)) {
      min = state.lastIntValue;
      if (state.eat(0x2C /* , */) && this.regexp_eatDecimalDigits(state)) {
        max = state.lastIntValue;
      }
      if (state.eat(0x7D /* } */)) {
        // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
        if (max !== -1 && max < min && !noError) {
          state.raise("numbers out of order in {} quantifier");
        }
        return true
      }
    }
    if (state.switchU && !noError) {
      state.raise("Incomplete quantifier");
    }
    state.pos = start;
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
pp$8.regexp_eatAtom = function(state) {
  return (
    this.regexp_eatPatternCharacters(state) ||
    state.eat(0x2E /* . */) ||
    this.regexp_eatReverseSolidusAtomEscape(state) ||
    this.regexp_eatCharacterClass(state) ||
    this.regexp_eatUncapturingGroup(state) ||
    this.regexp_eatCapturingGroup(state)
  )
};
pp$8.regexp_eatReverseSolidusAtomEscape = function(state) {
  var start = state.pos;
  if (state.eat(0x5C /* \ */)) {
    if (this.regexp_eatAtomEscape(state)) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$8.regexp_eatUncapturingGroup = function(state) {
  var start = state.pos;
  if (state.eat(0x28 /* ( */)) {
    if (state.eat(0x3F /* ? */) && state.eat(0x3A /* : */)) {
      this.regexp_disjunction(state);
      if (state.eat(0x29 /* ) */)) {
        return true
      }
      state.raise("Unterminated group");
    }
    state.pos = start;
  }
  return false
};
pp$8.regexp_eatCapturingGroup = function(state) {
  if (state.eat(0x28 /* ( */)) {
    if (this.options.ecmaVersion >= 9) {
      this.regexp_groupSpecifier(state);
    } else if (state.current() === 0x3F /* ? */) {
      state.raise("Invalid group");
    }
    this.regexp_disjunction(state);
    if (state.eat(0x29 /* ) */)) {
      state.numCapturingParens += 1;
      return true
    }
    state.raise("Unterminated group");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
pp$8.regexp_eatExtendedAtom = function(state) {
  return (
    state.eat(0x2E /* . */) ||
    this.regexp_eatReverseSolidusAtomEscape(state) ||
    this.regexp_eatCharacterClass(state) ||
    this.regexp_eatUncapturingGroup(state) ||
    this.regexp_eatCapturingGroup(state) ||
    this.regexp_eatInvalidBracedQuantifier(state) ||
    this.regexp_eatExtendedPatternCharacter(state)
  )
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
pp$8.regexp_eatInvalidBracedQuantifier = function(state) {
  if (this.regexp_eatBracedQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
pp$8.regexp_eatSyntaxCharacter = function(state) {
  var ch = state.current();
  if (isSyntaxCharacter(ch)) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }
  return false
};
function isSyntaxCharacter(ch) {
  return (
    ch === 0x24 /* $ */ ||
    ch >= 0x28 /* ( */ && ch <= 0x2B /* + */ ||
    ch === 0x2E /* . */ ||
    ch === 0x3F /* ? */ ||
    ch >= 0x5B /* [ */ && ch <= 0x5E /* ^ */ ||
    ch >= 0x7B /* { */ && ch <= 0x7D /* } */
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
// But eat eager.
pp$8.regexp_eatPatternCharacters = function(state) {
  var start = state.pos;
  var ch = 0;
  while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
    state.advance();
  }
  return state.pos !== start
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter
pp$8.regexp_eatExtendedPatternCharacter = function(state) {
  var ch = state.current();
  if (
    ch !== -1 &&
    ch !== 0x24 /* $ */ &&
    !(ch >= 0x28 /* ( */ && ch <= 0x2B /* + */) &&
    ch !== 0x2E /* . */ &&
    ch !== 0x3F /* ? */ &&
    ch !== 0x5B /* [ */ &&
    ch !== 0x5E /* ^ */ &&
    ch !== 0x7C /* | */
  ) {
    state.advance();
    return true
  }
  return false
};

// GroupSpecifier[U] ::
//   [empty]
//   `?` GroupName[?U]
pp$8.regexp_groupSpecifier = function(state) {
  if (state.eat(0x3F /* ? */)) {
    if (this.regexp_eatGroupName(state)) {
      if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
        state.raise("Duplicate capture group name");
      }
      state.groupNames.push(state.lastStringValue);
      return
    }
    state.raise("Invalid group");
  }
};

// GroupName[U] ::
//   `<` RegExpIdentifierName[?U] `>`
// Note: this updates `state.lastStringValue` property with the eaten name.
pp$8.regexp_eatGroupName = function(state) {
  state.lastStringValue = "";
  if (state.eat(0x3C /* < */)) {
    if (this.regexp_eatRegExpIdentifierName(state) && state.eat(0x3E /* > */)) {
      return true
    }
    state.raise("Invalid capture group name");
  }
  return false
};

// RegExpIdentifierName[U] ::
//   RegExpIdentifierStart[?U]
//   RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
// Note: this updates `state.lastStringValue` property with the eaten name.
pp$8.regexp_eatRegExpIdentifierName = function(state) {
  state.lastStringValue = "";
  if (this.regexp_eatRegExpIdentifierStart(state)) {
    state.lastStringValue += codePointToString(state.lastIntValue);
    while (this.regexp_eatRegExpIdentifierPart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);
    }
    return true
  }
  return false
};

// RegExpIdentifierStart[U] ::
//   UnicodeIDStart
//   `$`
//   `_`
//   `\` RegExpUnicodeEscapeSequence[?U]
pp$8.regexp_eatRegExpIdentifierStart = function(state) {
  var start = state.pos;
  var ch = state.current();
  state.advance();

  if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierStart(ch)) {
    state.lastIntValue = ch;
    return true
  }

  state.pos = start;
  return false
};
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */
}

// RegExpIdentifierPart[U] ::
//   UnicodeIDContinue
//   `$`
//   `_`
//   `\` RegExpUnicodeEscapeSequence[?U]
//   <ZWNJ>
//   <ZWJ>
pp$8.regexp_eatRegExpIdentifierPart = function(state) {
  var start = state.pos;
  var ch = state.current();
  state.advance();

  if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierPart(ch)) {
    state.lastIntValue = ch;
    return true
  }

  state.pos = start;
  return false
};
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */ || ch === 0x200C /* <ZWNJ> */ || ch === 0x200D /* <ZWJ> */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
pp$8.regexp_eatAtomEscape = function(state) {
  if (
    this.regexp_eatBackReference(state) ||
    this.regexp_eatCharacterClassEscape(state) ||
    this.regexp_eatCharacterEscape(state) ||
    (state.switchN && this.regexp_eatKGroupName(state))
  ) {
    return true
  }
  if (state.switchU) {
    // Make the same message as V8.
    if (state.current() === 0x63 /* c */) {
      state.raise("Invalid unicode escape");
    }
    state.raise("Invalid escape");
  }
  return false
};
pp$8.regexp_eatBackReference = function(state) {
  var start = state.pos;
  if (this.regexp_eatDecimalEscape(state)) {
    var n = state.lastIntValue;
    if (state.switchU) {
      // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
      if (n > state.maxBackReference) {
        state.maxBackReference = n;
      }
      return true
    }
    if (n <= state.numCapturingParens) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$8.regexp_eatKGroupName = function(state) {
  if (state.eat(0x6B /* k */)) {
    if (this.regexp_eatGroupName(state)) {
      state.backReferenceNames.push(state.lastStringValue);
      return true
    }
    state.raise("Invalid named reference");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
pp$8.regexp_eatCharacterEscape = function(state) {
  return (
    this.regexp_eatControlEscape(state) ||
    this.regexp_eatCControlLetter(state) ||
    this.regexp_eatZero(state) ||
    this.regexp_eatHexEscapeSequence(state) ||
    this.regexp_eatRegExpUnicodeEscapeSequence(state) ||
    (!state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state)) ||
    this.regexp_eatIdentityEscape(state)
  )
};
pp$8.regexp_eatCControlLetter = function(state) {
  var start = state.pos;
  if (state.eat(0x63 /* c */)) {
    if (this.regexp_eatControlLetter(state)) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$8.regexp_eatZero = function(state) {
  if (state.current() === 0x30 /* 0 */ && !isDecimalDigit(state.lookahead())) {
    state.lastIntValue = 0;
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
pp$8.regexp_eatControlEscape = function(state) {
  var ch = state.current();
  if (ch === 0x74 /* t */) {
    state.lastIntValue = 0x09; /* \t */
    state.advance();
    return true
  }
  if (ch === 0x6E /* n */) {
    state.lastIntValue = 0x0A; /* \n */
    state.advance();
    return true
  }
  if (ch === 0x76 /* v */) {
    state.lastIntValue = 0x0B; /* \v */
    state.advance();
    return true
  }
  if (ch === 0x66 /* f */) {
    state.lastIntValue = 0x0C; /* \f */
    state.advance();
    return true
  }
  if (ch === 0x72 /* r */) {
    state.lastIntValue = 0x0D; /* \r */
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
pp$8.regexp_eatControlLetter = function(state) {
  var ch = state.current();
  if (isControlLetter(ch)) {
    state.lastIntValue = ch % 0x20;
    state.advance();
    return true
  }
  return false
};
function isControlLetter(ch) {
  return (
    (ch >= 0x41 /* A */ && ch <= 0x5A /* Z */) ||
    (ch >= 0x61 /* a */ && ch <= 0x7A /* z */)
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
pp$8.regexp_eatRegExpUnicodeEscapeSequence = function(state) {
  var start = state.pos;

  if (state.eat(0x75 /* u */)) {
    if (this.regexp_eatFixedHexDigits(state, 4)) {
      var lead = state.lastIntValue;
      if (state.switchU && lead >= 0xD800 && lead <= 0xDBFF) {
        var leadSurrogateEnd = state.pos;
        if (state.eat(0x5C /* \ */) && state.eat(0x75 /* u */) && this.regexp_eatFixedHexDigits(state, 4)) {
          var trail = state.lastIntValue;
          if (trail >= 0xDC00 && trail <= 0xDFFF) {
            state.lastIntValue = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
            return true
          }
        }
        state.pos = leadSurrogateEnd;
        state.lastIntValue = lead;
      }
      return true
    }
    if (
      state.switchU &&
      state.eat(0x7B /* { */) &&
      this.regexp_eatHexDigits(state) &&
      state.eat(0x7D /* } */) &&
      isValidUnicode(state.lastIntValue)
    ) {
      return true
    }
    if (state.switchU) {
      state.raise("Invalid unicode escape");
    }
    state.pos = start;
  }

  return false
};
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 0x10FFFF
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
pp$8.regexp_eatIdentityEscape = function(state) {
  if (state.switchU) {
    if (this.regexp_eatSyntaxCharacter(state)) {
      return true
    }
    if (state.eat(0x2F /* / */)) {
      state.lastIntValue = 0x2F; /* / */
      return true
    }
    return false
  }

  var ch = state.current();
  if (ch !== 0x63 /* c */ && (!state.switchN || ch !== 0x6B /* k */)) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
pp$8.regexp_eatDecimalEscape = function(state) {
  state.lastIntValue = 0;
  var ch = state.current();
  if (ch >= 0x31 /* 1 */ && ch <= 0x39 /* 9 */) {
    do {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
      state.advance();
    } while ((ch = state.current()) >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */)
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
pp$8.regexp_eatCharacterClassEscape = function(state) {
  var ch = state.current();

  if (isCharacterClassEscape(ch)) {
    state.lastIntValue = -1;
    state.advance();
    return true
  }

  if (
    state.switchU &&
    this.options.ecmaVersion >= 9 &&
    (ch === 0x50 /* P */ || ch === 0x70 /* p */)
  ) {
    state.lastIntValue = -1;
    state.advance();
    if (
      state.eat(0x7B /* { */) &&
      this.regexp_eatUnicodePropertyValueExpression(state) &&
      state.eat(0x7D /* } */)
    ) {
      return true
    }
    state.raise("Invalid property name");
  }

  return false
};
function isCharacterClassEscape(ch) {
  return (
    ch === 0x64 /* d */ ||
    ch === 0x44 /* D */ ||
    ch === 0x73 /* s */ ||
    ch === 0x53 /* S */ ||
    ch === 0x77 /* w */ ||
    ch === 0x57 /* W */
  )
}

// UnicodePropertyValueExpression ::
//   UnicodePropertyName `=` UnicodePropertyValue
//   LoneUnicodePropertyNameOrValue
pp$8.regexp_eatUnicodePropertyValueExpression = function(state) {
  var start = state.pos;

  // UnicodePropertyName `=` UnicodePropertyValue
  if (this.regexp_eatUnicodePropertyName(state) && state.eat(0x3D /* = */)) {
    var name = state.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(state)) {
      var value = state.lastStringValue;
      this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
      return true
    }
  }
  state.pos = start;

  // LoneUnicodePropertyNameOrValue
  if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
    var nameOrValue = state.lastStringValue;
    this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
    return true
  }
  return false
};
pp$8.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
  if (!has(state.unicodeProperties.nonBinary, name))
    { state.raise("Invalid property name"); }
  if (!state.unicodeProperties.nonBinary[name].test(value))
    { state.raise("Invalid property value"); }
};
pp$8.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
  if (!state.unicodeProperties.binary.test(nameOrValue))
    { state.raise("Invalid property name"); }
};

// UnicodePropertyName ::
//   UnicodePropertyNameCharacters
pp$8.regexp_eatUnicodePropertyName = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyNameCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch);
    state.advance();
  }
  return state.lastStringValue !== ""
};
function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === 0x5F /* _ */
}

// UnicodePropertyValue ::
//   UnicodePropertyValueCharacters
pp$8.regexp_eatUnicodePropertyValue = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyValueCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch);
    state.advance();
  }
  return state.lastStringValue !== ""
};
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch)
}

// LoneUnicodePropertyNameOrValue ::
//   UnicodePropertyValueCharacters
pp$8.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
  return this.regexp_eatUnicodePropertyValue(state)
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
pp$8.regexp_eatCharacterClass = function(state) {
  if (state.eat(0x5B /* [ */)) {
    state.eat(0x5E /* ^ */);
    this.regexp_classRanges(state);
    if (state.eat(0x5D /* [ */)) {
      return true
    }
    // Unreachable since it threw "unterminated regular expression" error before.
    state.raise("Unterminated character class");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
pp$8.regexp_classRanges = function(state) {
  while (this.regexp_eatClassAtom(state)) {
    var left = state.lastIntValue;
    if (state.eat(0x2D /* - */) && this.regexp_eatClassAtom(state)) {
      var right = state.lastIntValue;
      if (state.switchU && (left === -1 || right === -1)) {
        state.raise("Invalid character class");
      }
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class");
      }
    }
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
pp$8.regexp_eatClassAtom = function(state) {
  var start = state.pos;

  if (state.eat(0x5C /* \ */)) {
    if (this.regexp_eatClassEscape(state)) {
      return true
    }
    if (state.switchU) {
      // Make the same message as V8.
      var ch$1 = state.current();
      if (ch$1 === 0x63 /* c */ || isOctalDigit(ch$1)) {
        state.raise("Invalid class escape");
      }
      state.raise("Invalid escape");
    }
    state.pos = start;
  }

  var ch = state.current();
  if (ch !== 0x5D /* [ */) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape
pp$8.regexp_eatClassEscape = function(state) {
  var start = state.pos;

  if (state.eat(0x62 /* b */)) {
    state.lastIntValue = 0x08; /* <BS> */
    return true
  }

  if (state.switchU && state.eat(0x2D /* - */)) {
    state.lastIntValue = 0x2D; /* - */
    return true
  }

  if (!state.switchU && state.eat(0x63 /* c */)) {
    if (this.regexp_eatClassControlLetter(state)) {
      return true
    }
    state.pos = start;
  }

  return (
    this.regexp_eatCharacterClassEscape(state) ||
    this.regexp_eatCharacterEscape(state)
  )
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter
pp$8.regexp_eatClassControlLetter = function(state) {
  var ch = state.current();
  if (isDecimalDigit(ch) || ch === 0x5F /* _ */) {
    state.lastIntValue = ch % 0x20;
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
pp$8.regexp_eatHexEscapeSequence = function(state) {
  var start = state.pos;
  if (state.eat(0x78 /* x */)) {
    if (this.regexp_eatFixedHexDigits(state, 2)) {
      return true
    }
    if (state.switchU) {
      state.raise("Invalid escape");
    }
    state.pos = start;
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
pp$8.regexp_eatDecimalDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isDecimalDigit(ch = state.current())) {
    state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
    state.advance();
  }
  return state.pos !== start
};
function isDecimalDigit(ch) {
  return ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
pp$8.regexp_eatHexDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isHexDigit(ch = state.current())) {
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return state.pos !== start
};
function isHexDigit(ch) {
  return (
    (ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */) ||
    (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) ||
    (ch >= 0x61 /* a */ && ch <= 0x66 /* f */)
  )
}
function hexToInt(ch) {
  if (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) {
    return 10 + (ch - 0x41 /* A */)
  }
  if (ch >= 0x61 /* a */ && ch <= 0x66 /* f */) {
    return 10 + (ch - 0x61 /* a */)
  }
  return ch - 0x30 /* 0 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
// Allows only 0-377(octal) i.e. 0-255(decimal).
pp$8.regexp_eatLegacyOctalEscapeSequence = function(state) {
  if (this.regexp_eatOctalDigit(state)) {
    var n1 = state.lastIntValue;
    if (this.regexp_eatOctalDigit(state)) {
      var n2 = state.lastIntValue;
      if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
        state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
      } else {
        state.lastIntValue = n1 * 8 + n2;
      }
    } else {
      state.lastIntValue = n1;
    }
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
pp$8.regexp_eatOctalDigit = function(state) {
  var ch = state.current();
  if (isOctalDigit(ch)) {
    state.lastIntValue = ch - 0x30; /* 0 */
    state.advance();
    return true
  }
  state.lastIntValue = 0;
  return false
};
function isOctalDigit(ch) {
  return ch >= 0x30 /* 0 */ && ch <= 0x37 /* 7 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
// And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
pp$8.regexp_eatFixedHexDigits = function(state, length) {
  var start = state.pos;
  state.lastIntValue = 0;
  for (var i = 0; i < length; ++i) {
    var ch = state.current();
    if (!isHexDigit(ch)) {
      state.pos = start;
      return false
    }
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return true
};

// Object type used to represent tokens. Note that normally, tokens
// simply exist as properties on the parser object. This is only
// used for the onToken callback and the external tokenizer.

var Token = function Token(p) {
  this.type = p.type;
  this.value = p.value;
  this.start = p.start;
  this.end = p.end;
  if (p.options.locations)
    { this.loc = new SourceLocation(p, p.startLoc, p.endLoc); }
  if (p.options.ranges)
    { this.range = [p.start, p.end]; }
};

// ## Tokenizer

var pp$9 = Parser.prototype;

// Move to the next token

pp$9.next = function() {
  if (this.options.onToken)
    { this.options.onToken(new Token(this)); }

  this.lastTokEnd = this.end;
  this.lastTokStart = this.start;
  this.lastTokEndLoc = this.endLoc;
  this.lastTokStartLoc = this.startLoc;
  this.nextToken();
};

pp$9.getToken = function() {
  this.next();
  return new Token(this)
};

// If we're in an ES6 environment, make parsers iterable
if (typeof Symbol !== "undefined")
  { pp$9[Symbol.iterator] = function() {
    var this$1 = this;

    return {
      next: function () {
        var token = this$1.getToken();
        return {
          done: token.type === types.eof,
          value: token
        }
      }
    }
  }; }

// Toggle strict mode. Re-reads the next number or string to please
// pedantic tests (`"use strict"; 010;` should fail).

pp$9.curContext = function() {
  return this.context[this.context.length - 1]
};

// Read a single token, updating the parser object's token-related
// properties.

pp$9.nextToken = function() {
  var curContext = this.curContext();
  if (!curContext || !curContext.preserveSpace) { this.skipSpace(); }

  this.start = this.pos;
  if (this.options.locations) { this.startLoc = this.curPosition(); }
  if (this.pos >= this.input.length) { return this.finishToken(types.eof) }

  if (curContext.override) { return curContext.override(this) }
  else { this.readToken(this.fullCharCodeAtPos()); }
};

pp$9.readToken = function(code) {
  // Identifier or keyword. '\uXXXX' sequences are allowed in
  // identifiers, so '\' also dispatches to that.
  if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */)
    { return this.readWord() }

  return this.getTokenFromCode(code)
};

pp$9.fullCharCodeAtPos = function() {
  var code = this.input.charCodeAt(this.pos);
  if (code <= 0xd7ff || code >= 0xe000) { return code }
  var next = this.input.charCodeAt(this.pos + 1);
  return (code << 10) + next - 0x35fdc00
};

pp$9.skipBlockComment = function() {
  var startLoc = this.options.onComment && this.curPosition();
  var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
  if (end === -1) { this.raise(this.pos - 2, "Unterminated comment"); }
  this.pos = end + 2;
  if (this.options.locations) {
    lineBreakG.lastIndex = start;
    var match;
    while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
      ++this.curLine;
      this.lineStart = match.index + match[0].length;
    }
  }
  if (this.options.onComment)
    { this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos,
                           startLoc, this.curPosition()); }
};

pp$9.skipLineComment = function(startSkip) {
  var start = this.pos;
  var startLoc = this.options.onComment && this.curPosition();
  var ch = this.input.charCodeAt(this.pos += startSkip);
  while (this.pos < this.input.length && !isNewLine(ch)) {
    ch = this.input.charCodeAt(++this.pos);
  }
  if (this.options.onComment)
    { this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos,
                           startLoc, this.curPosition()); }
};

// Called at the start of the parse and after every token. Skips
// whitespace and comments, and.

pp$9.skipSpace = function() {
  loop: while (this.pos < this.input.length) {
    var ch = this.input.charCodeAt(this.pos);
    switch (ch) {
    case 32: case 160: // ' '
      ++this.pos;
      break
    case 13:
      if (this.input.charCodeAt(this.pos + 1) === 10) {
        ++this.pos;
      }
    case 10: case 8232: case 8233:
      ++this.pos;
      if (this.options.locations) {
        ++this.curLine;
        this.lineStart = this.pos;
      }
      break
    case 47: // '/'
      switch (this.input.charCodeAt(this.pos + 1)) {
      case 42: // '*'
        this.skipBlockComment();
        break
      case 47:
        this.skipLineComment(2);
        break
      default:
        break loop
      }
      break
    default:
      if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
        ++this.pos;
      } else {
        break loop
      }
    }
  }
};

// Called at the end of every token. Sets `end`, `val`, and
// maintains `context` and `exprAllowed`, and skips the space after
// the token, so that the next one's `start` will point at the
// right position.

pp$9.finishToken = function(type, val) {
  this.end = this.pos;
  if (this.options.locations) { this.endLoc = this.curPosition(); }
  var prevType = this.type;
  this.type = type;
  this.value = val;

  this.updateContext(prevType);
};

// ### Token reading

// This is the function that is called to fetch the next token. It
// is somewhat obscure, because it works in character codes rather
// than characters, and because operator parsing has been inlined
// into it.
//
// All in the name of speed.
//
pp$9.readToken_dot = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next >= 48 && next <= 57) { return this.readNumber(true) }
  var next2 = this.input.charCodeAt(this.pos + 2);
  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
    this.pos += 3;
    return this.finishToken(types.ellipsis)
  } else {
    ++this.pos;
    return this.finishToken(types.dot)
  }
};

pp$9.readToken_slash = function() { // '/'
  var next = this.input.charCodeAt(this.pos + 1);
  if (this.exprAllowed) { ++this.pos; return this.readRegexp() }
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(types.slash, 1)
};

pp$9.readToken_mult_modulo_exp = function(code) { // '%*'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  var tokentype = code === 42 ? types.star : types.modulo;

  // exponentiation operator ** and **=
  if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
    ++size;
    tokentype = types.starstar;
    next = this.input.charCodeAt(this.pos + 2);
  }

  if (next === 61) { return this.finishOp(types.assign, size + 1) }
  return this.finishOp(tokentype, size)
};

pp$9.readToken_pipe_amp = function(code) { // '|&'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) { return this.finishOp(code === 124 ? types.logicalOR : types.logicalAND, 2) }
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1)
};

pp$9.readToken_caret = function() { // '^'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(types.bitwiseXOR, 1)
};

pp$9.readToken_plus_min = function(code) { // '+-'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 &&
        (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
      // A `-->` line comment
      this.skipLineComment(3);
      this.skipSpace();
      return this.nextToken()
    }
    return this.finishOp(types.incDec, 2)
  }
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(types.plusMin, 1)
};

pp$9.readToken_lt_gt = function(code) { // '<>'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  if (next === code) {
    size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
    if (this.input.charCodeAt(this.pos + size) === 61) { return this.finishOp(types.assign, size + 1) }
    return this.finishOp(types.bitShift, size)
  }
  if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 &&
      this.input.charCodeAt(this.pos + 3) === 45) {
    // `<!--`, an XML-style comment that should be interpreted as a line comment
    this.skipLineComment(4);
    this.skipSpace();
    return this.nextToken()
  }
  if (next === 61) { size = 2; }
  return this.finishOp(types.relational, size)
};

pp$9.readToken_eq_excl = function(code) { // '=!'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) { return this.finishOp(types.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) }
  if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) { // '=>'
    this.pos += 2;
    return this.finishToken(types.arrow)
  }
  return this.finishOp(code === 61 ? types.eq : types.prefix, 1)
};

pp$9.getTokenFromCode = function(code) {
  switch (code) {
  // The interpretation of a dot depends on whether it is followed
  // by a digit or another two dots.
  case 46: // '.'
    return this.readToken_dot()

  // Punctuation tokens.
  case 40: ++this.pos; return this.finishToken(types.parenL)
  case 41: ++this.pos; return this.finishToken(types.parenR)
  case 59: ++this.pos; return this.finishToken(types.semi)
  case 44: ++this.pos; return this.finishToken(types.comma)
  case 91: ++this.pos; return this.finishToken(types.bracketL)
  case 93: ++this.pos; return this.finishToken(types.bracketR)
  case 123: ++this.pos; return this.finishToken(types.braceL)
  case 125: ++this.pos; return this.finishToken(types.braceR)
  case 58: ++this.pos; return this.finishToken(types.colon)
  case 63: ++this.pos; return this.finishToken(types.question)

  case 96: // '`'
    if (this.options.ecmaVersion < 6) { break }
    ++this.pos;
    return this.finishToken(types.backQuote)

  case 48: // '0'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 120 || next === 88) { return this.readRadixNumber(16) } // '0x', '0X' - hex number
    if (this.options.ecmaVersion >= 6) {
      if (next === 111 || next === 79) { return this.readRadixNumber(8) } // '0o', '0O' - octal number
      if (next === 98 || next === 66) { return this.readRadixNumber(2) } // '0b', '0B' - binary number
    }

  // Anything else beginning with a digit is an integer, octal
  // number, or float.
  case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
    return this.readNumber(false)

  // Quotes produce strings.
  case 34: case 39: // '"', "'"
    return this.readString(code)

  // Operators are parsed inline in tiny state machines. '=' (61) is
  // often referred to. `finishOp` simply skips the amount of
  // characters it is given as second argument, and returns a token
  // of the type given by its first argument.

  case 47: // '/'
    return this.readToken_slash()

  case 37: case 42: // '%*'
    return this.readToken_mult_modulo_exp(code)

  case 124: case 38: // '|&'
    return this.readToken_pipe_amp(code)

  case 94: // '^'
    return this.readToken_caret()

  case 43: case 45: // '+-'
    return this.readToken_plus_min(code)

  case 60: case 62: // '<>'
    return this.readToken_lt_gt(code)

  case 61: case 33: // '=!'
    return this.readToken_eq_excl(code)

  case 126: // '~'
    return this.finishOp(types.prefix, 1)
  }

  this.raise(this.pos, "Unexpected character '" + codePointToString$1(code) + "'");
};

pp$9.finishOp = function(type, size) {
  var str = this.input.slice(this.pos, this.pos + size);
  this.pos += size;
  return this.finishToken(type, str)
};

pp$9.readRegexp = function() {
  var escaped, inClass, start = this.pos;
  for (;;) {
    if (this.pos >= this.input.length) { this.raise(start, "Unterminated regular expression"); }
    var ch = this.input.charAt(this.pos);
    if (lineBreak.test(ch)) { this.raise(start, "Unterminated regular expression"); }
    if (!escaped) {
      if (ch === "[") { inClass = true; }
      else if (ch === "]" && inClass) { inClass = false; }
      else if (ch === "/" && !inClass) { break }
      escaped = ch === "\\";
    } else { escaped = false; }
    ++this.pos;
  }
  var pattern = this.input.slice(start, this.pos);
  ++this.pos;
  var flagsStart = this.pos;
  var flags = this.readWord1();
  if (this.containsEsc) { this.unexpected(flagsStart); }

  // Validate pattern
  var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
  state.reset(start, pattern, flags);
  this.validateRegExpFlags(state);
  this.validateRegExpPattern(state);

  // Create Literal#value property value.
  var value = null;
  try {
    value = new RegExp(pattern, flags);
  } catch (e) {
    // ESTree requires null if it failed to instantiate RegExp object.
    // https://github.com/estree/estree/blob/a27003adf4fd7bfad44de9cef372a2eacd527b1c/es5.md#regexpliteral
  }

  return this.finishToken(types.regexp, {pattern: pattern, flags: flags, value: value})
};

// Read an integer in the given radix. Return null if zero digits
// were read, the integer value otherwise. When `len` is given, this
// will return `null` unless the integer has exactly `len` digits.

pp$9.readInt = function(radix, len) {
  var start = this.pos, total = 0;
  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
    var code = this.input.charCodeAt(this.pos), val = (void 0);
    if (code >= 97) { val = code - 97 + 10; } // a
    else if (code >= 65) { val = code - 65 + 10; } // A
    else if (code >= 48 && code <= 57) { val = code - 48; } // 0-9
    else { val = Infinity; }
    if (val >= radix) { break }
    ++this.pos;
    total = total * radix + val;
  }
  if (this.pos === start || len != null && this.pos - start !== len) { return null }

  return total
};

pp$9.readRadixNumber = function(radix) {
  var start = this.pos;
  this.pos += 2; // 0x
  var val = this.readInt(radix);
  if (val == null) { this.raise(this.start + 2, "Expected number in radix " + radix); }
  if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
    val = typeof BigInt !== "undefined" ? BigInt(this.input.slice(start, this.pos)) : null;
    ++this.pos;
  } else if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
  return this.finishToken(types.num, val)
};

// Read an integer, octal integer, or floating-point number.

pp$9.readNumber = function(startsWithDot) {
  var start = this.pos;
  if (!startsWithDot && this.readInt(10) === null) { this.raise(start, "Invalid number"); }
  var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
  if (octal && this.strict) { this.raise(start, "Invalid number"); }
  if (octal && /[89]/.test(this.input.slice(start, this.pos))) { octal = false; }
  var next = this.input.charCodeAt(this.pos);
  if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
    var str$1 = this.input.slice(start, this.pos);
    var val$1 = typeof BigInt !== "undefined" ? BigInt(str$1) : null;
    ++this.pos;
    if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
    return this.finishToken(types.num, val$1)
  }
  if (next === 46 && !octal) { // '.'
    ++this.pos;
    this.readInt(10);
    next = this.input.charCodeAt(this.pos);
  }
  if ((next === 69 || next === 101) && !octal) { // 'eE'
    next = this.input.charCodeAt(++this.pos);
    if (next === 43 || next === 45) { ++this.pos; } // '+-'
    if (this.readInt(10) === null) { this.raise(start, "Invalid number"); }
  }
  if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }

  var str = this.input.slice(start, this.pos);
  var val = octal ? parseInt(str, 8) : parseFloat(str);
  return this.finishToken(types.num, val)
};

// Read a string value, interpreting backslash-escapes.

pp$9.readCodePoint = function() {
  var ch = this.input.charCodeAt(this.pos), code;

  if (ch === 123) { // '{'
    if (this.options.ecmaVersion < 6) { this.unexpected(); }
    var codePos = ++this.pos;
    code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
    ++this.pos;
    if (code > 0x10FFFF) { this.invalidStringToken(codePos, "Code point out of bounds"); }
  } else {
    code = this.readHexChar(4);
  }
  return code
};

function codePointToString$1(code) {
  // UTF-16 Decoding
  if (code <= 0xFFFF) { return String.fromCharCode(code) }
  code -= 0x10000;
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
}

pp$9.readString = function(quote) {
  var out = "", chunkStart = ++this.pos;
  for (;;) {
    if (this.pos >= this.input.length) { this.raise(this.start, "Unterminated string constant"); }
    var ch = this.input.charCodeAt(this.pos);
    if (ch === quote) { break }
    if (ch === 92) { // '\'
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(false);
      chunkStart = this.pos;
    } else {
      if (isNewLine(ch, this.options.ecmaVersion >= 10)) { this.raise(this.start, "Unterminated string constant"); }
      ++this.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(types.string, out)
};

// Reads template string tokens.

var INVALID_TEMPLATE_ESCAPE_ERROR = {};

pp$9.tryReadTemplateToken = function() {
  this.inTemplateElement = true;
  try {
    this.readTmplToken();
  } catch (err) {
    if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
      this.readInvalidTemplateToken();
    } else {
      throw err
    }
  }

  this.inTemplateElement = false;
};

pp$9.invalidStringToken = function(position, message) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
    throw INVALID_TEMPLATE_ESCAPE_ERROR
  } else {
    this.raise(position, message);
  }
};

pp$9.readTmplToken = function() {
  var out = "", chunkStart = this.pos;
  for (;;) {
    if (this.pos >= this.input.length) { this.raise(this.start, "Unterminated template"); }
    var ch = this.input.charCodeAt(this.pos);
    if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) { // '`', '${'
      if (this.pos === this.start && (this.type === types.template || this.type === types.invalidTemplate)) {
        if (ch === 36) {
          this.pos += 2;
          return this.finishToken(types.dollarBraceL)
        } else {
          ++this.pos;
          return this.finishToken(types.backQuote)
        }
      }
      out += this.input.slice(chunkStart, this.pos);
      return this.finishToken(types.template, out)
    }
    if (ch === 92) { // '\'
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(true);
      chunkStart = this.pos;
    } else if (isNewLine(ch)) {
      out += this.input.slice(chunkStart, this.pos);
      ++this.pos;
      switch (ch) {
      case 13:
        if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; }
      case 10:
        out += "\n";
        break
      default:
        out += String.fromCharCode(ch);
        break
      }
      if (this.options.locations) {
        ++this.curLine;
        this.lineStart = this.pos;
      }
      chunkStart = this.pos;
    } else {
      ++this.pos;
    }
  }
};

// Reads a template token to search for the end, without validating any escape sequences
pp$9.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++) {
    switch (this.input[this.pos]) {
    case "\\":
      ++this.pos;
      break

    case "$":
      if (this.input[this.pos + 1] !== "{") {
        break
      }
    // falls through

    case "`":
      return this.finishToken(types.invalidTemplate, this.input.slice(this.start, this.pos))

    // no default
    }
  }
  this.raise(this.start, "Unterminated template");
};

// Used to read escaped characters

pp$9.readEscapedChar = function(inTemplate) {
  var ch = this.input.charCodeAt(++this.pos);
  ++this.pos;
  switch (ch) {
  case 110: return "\n" // 'n' -> '\n'
  case 114: return "\r" // 'r' -> '\r'
  case 120: return String.fromCharCode(this.readHexChar(2)) // 'x'
  case 117: return codePointToString$1(this.readCodePoint()) // 'u'
  case 116: return "\t" // 't' -> '\t'
  case 98: return "\b" // 'b' -> '\b'
  case 118: return "\u000b" // 'v' -> '\u000b'
  case 102: return "\f" // 'f' -> '\f'
  case 13: if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; } // '\r\n'
  case 10: // ' \n'
    if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
    return ""
  default:
    if (ch >= 48 && ch <= 55) {
      var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
      var octal = parseInt(octalStr, 8);
      if (octal > 255) {
        octalStr = octalStr.slice(0, -1);
        octal = parseInt(octalStr, 8);
      }
      this.pos += octalStr.length - 1;
      ch = this.input.charCodeAt(this.pos);
      if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
        this.invalidStringToken(
          this.pos - 1 - octalStr.length,
          inTemplate
            ? "Octal literal in template string"
            : "Octal literal in strict mode"
        );
      }
      return String.fromCharCode(octal)
    }
    if (isNewLine(ch)) {
      // Unicode new line characters after \ get removed from output in both
      // template literals and strings
      return ""
    }
    return String.fromCharCode(ch)
  }
};

// Used to read character escape sequences ('\x', '\u', '\U').

pp$9.readHexChar = function(len) {
  var codePos = this.pos;
  var n = this.readInt(16, len);
  if (n === null) { this.invalidStringToken(codePos, "Bad character escape sequence"); }
  return n
};

// Read an identifier, and return it as a string. Sets `this.containsEsc`
// to whether the word contained a '\u' escape.
//
// Incrementally adds only escaped chars, adding other chunks as-is
// as a micro-optimization.

pp$9.readWord1 = function() {
  this.containsEsc = false;
  var word = "", first = true, chunkStart = this.pos;
  var astral = this.options.ecmaVersion >= 6;
  while (this.pos < this.input.length) {
    var ch = this.fullCharCodeAtPos();
    if (isIdentifierChar(ch, astral)) {
      this.pos += ch <= 0xffff ? 1 : 2;
    } else if (ch === 92) { // "\"
      this.containsEsc = true;
      word += this.input.slice(chunkStart, this.pos);
      var escStart = this.pos;
      if (this.input.charCodeAt(++this.pos) !== 117) // "u"
        { this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"); }
      ++this.pos;
      var esc = this.readCodePoint();
      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
        { this.invalidStringToken(escStart, "Invalid Unicode escape"); }
      word += codePointToString$1(esc);
      chunkStart = this.pos;
    } else {
      break
    }
    first = false;
  }
  return word + this.input.slice(chunkStart, this.pos)
};

// Read an identifier or keyword token. Will check for reserved
// words when necessary.

pp$9.readWord = function() {
  var word = this.readWord1();
  var type = types.name;
  if (this.keywords.test(word)) {
    if (this.containsEsc) { this.raiseRecoverable(this.start, "Escape sequence in keyword " + word); }
    type = keywords$1[word];
  }
  return this.finishToken(type, word)
};

// Acorn is a tiny, fast JavaScript parser written in JavaScript.

var version = "7.1.0";

Parser.acorn = {
  Parser: Parser,
  version: version,
  defaultOptions: defaultOptions,
  Position: Position,
  SourceLocation: SourceLocation,
  getLineInfo: getLineInfo,
  Node: Node,
  TokenType: TokenType,
  tokTypes: types,
  keywordTypes: keywords$1,
  TokContext: TokContext,
  tokContexts: types$1,
  isIdentifierChar: isIdentifierChar,
  isIdentifierStart: isIdentifierStart,
  Token: Token,
  isNewLine: isNewLine,
  lineBreak: lineBreak,
  lineBreakG: lineBreakG,
  nonASCIIwhitespace: nonASCIIwhitespace
};function noop$1() {}

var LooseParser = function LooseParser(input, options) {
  if ( options === void 0 ) options = {};

  this.toks = this.constructor.BaseParser.tokenizer(input, options);
  this.options = this.toks.options;
  this.input = this.toks.input;
  this.tok = this.last = {type: types.eof, start: 0, end: 0};
  this.tok.validateRegExpFlags = noop$1;
  this.tok.validateRegExpPattern = noop$1;
  if (this.options.locations) {
    var here = this.toks.curPosition();
    this.tok.loc = new SourceLocation(this.toks, here, here);
  }
  this.ahead = []; // Tokens ahead
  this.context = []; // Indentation contexted
  this.curIndent = 0;
  this.curLineStart = 0;
  this.nextLineStart = this.lineEnd(this.curLineStart) + 1;
  this.inAsync = false;
  this.inFunction = false;
};

LooseParser.prototype.startNode = function startNode () {
  return new Node(this.toks, this.tok.start, this.options.locations ? this.tok.loc.start : null)
};

LooseParser.prototype.storeCurrentPos = function storeCurrentPos () {
  return this.options.locations ? [this.tok.start, this.tok.loc.start] : this.tok.start
};

LooseParser.prototype.startNodeAt = function startNodeAt (pos) {
  if (this.options.locations) {
    return new Node(this.toks, pos[0], pos[1])
  } else {
    return new Node(this.toks, pos)
  }
};

LooseParser.prototype.finishNode = function finishNode (node, type) {
  node.type = type;
  node.end = this.last.end;
  if (this.options.locations)
    { node.loc.end = this.last.loc.end; }
  if (this.options.ranges)
    { node.range[1] = this.last.end; }
  return node
};

LooseParser.prototype.dummyNode = function dummyNode (type) {
  var dummy = this.startNode();
  dummy.type = type;
  dummy.end = dummy.start;
  if (this.options.locations)
    { dummy.loc.end = dummy.loc.start; }
  if (this.options.ranges)
    { dummy.range[1] = dummy.start; }
  this.last = {type: types.name, start: dummy.start, end: dummy.start, loc: dummy.loc};
  return dummy
};

LooseParser.prototype.dummyIdent = function dummyIdent () {
  var dummy = this.dummyNode("Identifier");
  dummy.name = "✖";
  return dummy
};

LooseParser.prototype.dummyString = function dummyString () {
  var dummy = this.dummyNode("Literal");
  dummy.value = dummy.raw = "✖";
  return dummy
};

LooseParser.prototype.eat = function eat (type) {
  if (this.tok.type === type) {
    this.next();
    return true
  } else {
    return false
  }
};

LooseParser.prototype.isContextual = function isContextual (name) {
  return this.tok.type === types.name && this.tok.value === name
};

LooseParser.prototype.eatContextual = function eatContextual (name) {
  return this.tok.value === name && this.eat(types.name)
};

LooseParser.prototype.canInsertSemicolon = function canInsertSemicolon () {
  return this.tok.type === types.eof || this.tok.type === types.braceR ||
    lineBreak.test(this.input.slice(this.last.end, this.tok.start))
};

LooseParser.prototype.semicolon = function semicolon () {
  return this.eat(types.semi)
};

LooseParser.prototype.expect = function expect (type) {
  if (this.eat(type)) { return true }
  for (var i = 1; i <= 2; i++) {
    if (this.lookAhead(i).type === type) {
      for (var j = 0; j < i; j++) { this.next(); }
      return true
    }
  }
};

LooseParser.prototype.pushCx = function pushCx () {
  this.context.push(this.curIndent);
};

LooseParser.prototype.popCx = function popCx () {
  this.curIndent = this.context.pop();
};

LooseParser.prototype.lineEnd = function lineEnd (pos) {
  while (pos < this.input.length && !isNewLine(this.input.charCodeAt(pos))) { ++pos; }
  return pos
};

LooseParser.prototype.indentationAfter = function indentationAfter (pos) {
  for (var count = 0;; ++pos) {
    var ch = this.input.charCodeAt(pos);
    if (ch === 32) { ++count; }
    else if (ch === 9) { count += this.options.tabSize; }
    else { return count }
  }
};

LooseParser.prototype.closes = function closes (closeTok, indent, line, blockHeuristic) {
  if (this.tok.type === closeTok || this.tok.type === types.eof) { return true }
  return line !== this.curLineStart && this.curIndent < indent && this.tokenStartsLine() &&
    (!blockHeuristic || this.nextLineStart >= this.input.length ||
     this.indentationAfter(this.nextLineStart) < indent)
};

LooseParser.prototype.tokenStartsLine = function tokenStartsLine () {
  for (var p = this.tok.start - 1; p >= this.curLineStart; --p) {
    var ch = this.input.charCodeAt(p);
    if (ch !== 9 && ch !== 32) { return false }
  }
  return true
};

LooseParser.prototype.extend = function extend (name, f) {
  this[name] = f(this[name]);
};

LooseParser.prototype.parse = function parse () {
  this.next();
  return this.parseTopLevel()
};

LooseParser.extend = function extend () {
    var plugins = [], len = arguments.length;
    while ( len-- ) plugins[ len ] = arguments[ len ];

  var cls = this;
  for (var i = 0; i < plugins.length; i++) { cls = plugins[i](cls); }
  return cls
};

LooseParser.parse = function parse (input, options) {
  return new this(input, options).parse()
};

// Allows plugins to extend the base parser / tokenizer used
LooseParser.BaseParser = Parser;

var lp = LooseParser.prototype;

function isSpace(ch) {
  return (ch < 14 && ch > 8) || ch === 32 || ch === 160 || isNewLine(ch)
}

lp.next = function() {
  this.last = this.tok;
  if (this.ahead.length)
    { this.tok = this.ahead.shift(); }
  else
    { this.tok = this.readToken(); }

  if (this.tok.start >= this.nextLineStart) {
    while (this.tok.start >= this.nextLineStart) {
      this.curLineStart = this.nextLineStart;
      this.nextLineStart = this.lineEnd(this.curLineStart) + 1;
    }
    this.curIndent = this.indentationAfter(this.curLineStart);
  }
};

lp.readToken = function() {
  for (;;) {
    try {
      this.toks.next();
      if (this.toks.type === types.dot &&
          this.input.substr(this.toks.end, 1) === "." &&
          this.options.ecmaVersion >= 6) {
        this.toks.end++;
        this.toks.type = types.ellipsis;
      }
      return new Token(this.toks)
    } catch (e) {
      if (!(e instanceof SyntaxError)) { throw e }

      // Try to skip some text, based on the error message, and then continue
      var msg = e.message, pos = e.raisedAt, replace = true;
      if (/unterminated/i.test(msg)) {
        pos = this.lineEnd(e.pos + 1);
        if (/string/.test(msg)) {
          replace = {start: e.pos, end: pos, type: types.string, value: this.input.slice(e.pos + 1, pos)};
        } else if (/regular expr/i.test(msg)) {
          var re = this.input.slice(e.pos, pos);
          try { re = new RegExp(re); } catch (e) { /* ignore compilation error due to new syntax */ }
          replace = {start: e.pos, end: pos, type: types.regexp, value: re};
        } else if (/template/.test(msg)) {
          replace = {
            start: e.pos,
            end: pos,
            type: types.template,
            value: this.input.slice(e.pos, pos)
          };
        } else {
          replace = false;
        }
      } else if (/invalid (unicode|regexp|number)|expecting unicode|octal literal|is reserved|directly after number|expected number in radix/i.test(msg)) {
        while (pos < this.input.length && !isSpace(this.input.charCodeAt(pos))) { ++pos; }
      } else if (/character escape|expected hexadecimal/i.test(msg)) {
        while (pos < this.input.length) {
          var ch = this.input.charCodeAt(pos++);
          if (ch === 34 || ch === 39 || isNewLine(ch)) { break }
        }
      } else if (/unexpected character/i.test(msg)) {
        pos++;
        replace = false;
      } else if (/regular expression/i.test(msg)) {
        replace = true;
      } else {
        throw e
      }
      this.resetTo(pos);
      if (replace === true) { replace = {start: pos, end: pos, type: types.name, value: "✖"}; }
      if (replace) {
        if (this.options.locations)
          { replace.loc = new SourceLocation(
            this.toks,
            getLineInfo(this.input, replace.start),
            getLineInfo(this.input, replace.end)); }
        return replace
      }
    }
  }
};

lp.resetTo = function(pos) {
  this.toks.pos = pos;
  var ch = this.input.charAt(pos - 1);
  this.toks.exprAllowed = !ch || /[[{(,;:?/*=+\-~!|&%^<>]/.test(ch) ||
    /[enwfd]/.test(ch) &&
    /\b(case|else|return|throw|new|in|(instance|type)?of|delete|void)$/.test(this.input.slice(pos - 10, pos));

  if (this.options.locations) {
    this.toks.curLine = 1;
    this.toks.lineStart = lineBreakG.lastIndex = 0;
    var match;
    while ((match = lineBreakG.exec(this.input)) && match.index < pos) {
      ++this.toks.curLine;
      this.toks.lineStart = match.index + match[0].length;
    }
  }
};

lp.lookAhead = function(n) {
  while (n > this.ahead.length)
    { this.ahead.push(this.readToken()); }
  return this.ahead[n - 1]
};

function isDummy(node) { return node.name === "✖" }

var lp$1 = LooseParser.prototype;

lp$1.parseTopLevel = function() {
  var node = this.startNodeAt(this.options.locations ? [0, getLineInfo(this.input, 0)] : 0);
  node.body = [];
  while (this.tok.type !== types.eof) { node.body.push(this.parseStatement()); }
  this.toks.adaptDirectivePrologue(node.body);
  this.last = this.tok;
  node.sourceType = this.options.sourceType;
  return this.finishNode(node, "Program")
};

lp$1.parseStatement = function() {
  var starttype = this.tok.type, node = this.startNode(), kind;

  if (this.toks.isLet()) {
    starttype = types._var;
    kind = "let";
  }

  switch (starttype) {
  case types._break: case types._continue:
    this.next();
    var isBreak = starttype === types._break;
    if (this.semicolon() || this.canInsertSemicolon()) {
      node.label = null;
    } else {
      node.label = this.tok.type === types.name ? this.parseIdent() : null;
      this.semicolon();
    }
    return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement")

  case types._debugger:
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement")

  case types._do:
    this.next();
    node.body = this.parseStatement();
    node.test = this.eat(types._while) ? this.parseParenExpression() : this.dummyIdent();
    this.semicolon();
    return this.finishNode(node, "DoWhileStatement")

  case types._for:
    this.next(); // `for` keyword
    var isAwait = this.options.ecmaVersion >= 9 && this.inAsync && this.eatContextual("await");

    this.pushCx();
    this.expect(types.parenL);
    if (this.tok.type === types.semi) { return this.parseFor(node, null) }
    var isLet = this.toks.isLet();
    if (isLet || this.tok.type === types._var || this.tok.type === types._const) {
      var init$1 = this.parseVar(this.startNode(), true, isLet ? "let" : this.tok.value);
      if (init$1.declarations.length === 1 && (this.tok.type === types._in || this.isContextual("of"))) {
        if (this.options.ecmaVersion >= 9 && this.tok.type !== types._in) {
          node.await = isAwait;
        }
        return this.parseForIn(node, init$1)
      }
      return this.parseFor(node, init$1)
    }
    var init = this.parseExpression(true);
    if (this.tok.type === types._in || this.isContextual("of")) {
      if (this.options.ecmaVersion >= 9 && this.tok.type !== types._in) {
        node.await = isAwait;
      }
      return this.parseForIn(node, this.toAssignable(init))
    }
    return this.parseFor(node, init)

  case types._function:
    this.next();
    return this.parseFunction(node, true)

  case types._if:
    this.next();
    node.test = this.parseParenExpression();
    node.consequent = this.parseStatement();
    node.alternate = this.eat(types._else) ? this.parseStatement() : null;
    return this.finishNode(node, "IfStatement")

  case types._return:
    this.next();
    if (this.eat(types.semi) || this.canInsertSemicolon()) { node.argument = null; }
    else { node.argument = this.parseExpression(); this.semicolon(); }
    return this.finishNode(node, "ReturnStatement")

  case types._switch:
    var blockIndent = this.curIndent, line = this.curLineStart;
    this.next();
    node.discriminant = this.parseParenExpression();
    node.cases = [];
    this.pushCx();
    this.expect(types.braceL);

    var cur;
    while (!this.closes(types.braceR, blockIndent, line, true)) {
      if (this.tok.type === types._case || this.tok.type === types._default) {
        var isCase = this.tok.type === types._case;
        if (cur) { this.finishNode(cur, "SwitchCase"); }
        node.cases.push(cur = this.startNode());
        cur.consequent = [];
        this.next();
        if (isCase) { cur.test = this.parseExpression(); }
        else { cur.test = null; }
        this.expect(types.colon);
      } else {
        if (!cur) {
          node.cases.push(cur = this.startNode());
          cur.consequent = [];
          cur.test = null;
        }
        cur.consequent.push(this.parseStatement());
      }
    }
    if (cur) { this.finishNode(cur, "SwitchCase"); }
    this.popCx();
    this.eat(types.braceR);
    return this.finishNode(node, "SwitchStatement")

  case types._throw:
    this.next();
    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement")

  case types._try:
    this.next();
    node.block = this.parseBlock();
    node.handler = null;
    if (this.tok.type === types._catch) {
      var clause = this.startNode();
      this.next();
      if (this.eat(types.parenL)) {
        clause.param = this.toAssignable(this.parseExprAtom(), true);
        this.expect(types.parenR);
      } else {
        clause.param = null;
      }
      clause.body = this.parseBlock();
      node.handler = this.finishNode(clause, "CatchClause");
    }
    node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;
    if (!node.handler && !node.finalizer) { return node.block }
    return this.finishNode(node, "TryStatement")

  case types._var:
  case types._const:
    return this.parseVar(node, false, kind || this.tok.value)

  case types._while:
    this.next();
    node.test = this.parseParenExpression();
    node.body = this.parseStatement();
    return this.finishNode(node, "WhileStatement")

  case types._with:
    this.next();
    node.object = this.parseParenExpression();
    node.body = this.parseStatement();
    return this.finishNode(node, "WithStatement")

  case types.braceL:
    return this.parseBlock()

  case types.semi:
    this.next();
    return this.finishNode(node, "EmptyStatement")

  case types._class:
    return this.parseClass(true)

  case types._import:
    if (this.options.ecmaVersion > 10 && this.lookAhead(1).type === types.parenL) {
      node.expression = this.parseExpression();
      this.semicolon();
      return this.finishNode(node, "ExpressionStatement")
    }

    return this.parseImport()

  case types._export:
    return this.parseExport()

  default:
    if (this.toks.isAsyncFunction()) {
      this.next();
      this.next();
      return this.parseFunction(node, true, true)
    }
    var expr = this.parseExpression();
    if (isDummy(expr)) {
      this.next();
      if (this.tok.type === types.eof) { return this.finishNode(node, "EmptyStatement") }
      return this.parseStatement()
    } else if (starttype === types.name && expr.type === "Identifier" && this.eat(types.colon)) {
      node.body = this.parseStatement();
      node.label = expr;
      return this.finishNode(node, "LabeledStatement")
    } else {
      node.expression = expr;
      this.semicolon();
      return this.finishNode(node, "ExpressionStatement")
    }
  }
};

lp$1.parseBlock = function() {
  var node = this.startNode();
  this.pushCx();
  this.expect(types.braceL);
  var blockIndent = this.curIndent, line = this.curLineStart;
  node.body = [];
  while (!this.closes(types.braceR, blockIndent, line, true))
    { node.body.push(this.parseStatement()); }
  this.popCx();
  this.eat(types.braceR);
  return this.finishNode(node, "BlockStatement")
};

lp$1.parseFor = function(node, init) {
  node.init = init;
  node.test = node.update = null;
  if (this.eat(types.semi) && this.tok.type !== types.semi) { node.test = this.parseExpression(); }
  if (this.eat(types.semi) && this.tok.type !== types.parenR) { node.update = this.parseExpression(); }
  this.popCx();
  this.expect(types.parenR);
  node.body = this.parseStatement();
  return this.finishNode(node, "ForStatement")
};

lp$1.parseForIn = function(node, init) {
  var type = this.tok.type === types._in ? "ForInStatement" : "ForOfStatement";
  this.next();
  node.left = init;
  node.right = this.parseExpression();
  this.popCx();
  this.expect(types.parenR);
  node.body = this.parseStatement();
  return this.finishNode(node, type)
};

lp$1.parseVar = function(node, noIn, kind) {
  node.kind = kind;
  this.next();
  node.declarations = [];
  do {
    var decl = this.startNode();
    decl.id = this.options.ecmaVersion >= 6 ? this.toAssignable(this.parseExprAtom(), true) : this.parseIdent();
    decl.init = this.eat(types.eq) ? this.parseMaybeAssign(noIn) : null;
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
  } while (this.eat(types.comma))
  if (!node.declarations.length) {
    var decl$1 = this.startNode();
    decl$1.id = this.dummyIdent();
    node.declarations.push(this.finishNode(decl$1, "VariableDeclarator"));
  }
  if (!noIn) { this.semicolon(); }
  return this.finishNode(node, "VariableDeclaration")
};

lp$1.parseClass = function(isStatement) {
  var node = this.startNode();
  this.next();
  if (this.tok.type === types.name) { node.id = this.parseIdent(); }
  else if (isStatement === true) { node.id = this.dummyIdent(); }
  else { node.id = null; }
  node.superClass = this.eat(types._extends) ? this.parseExpression() : null;
  node.body = this.startNode();
  node.body.body = [];
  this.pushCx();
  var indent = this.curIndent + 1, line = this.curLineStart;
  this.eat(types.braceL);
  if (this.curIndent + 1 < indent) { indent = this.curIndent; line = this.curLineStart; }
  while (!this.closes(types.braceR, indent, line)) {
    if (this.semicolon()) { continue }
    var method = this.startNode(), isGenerator = (void 0), isAsync = (void 0);
    if (this.options.ecmaVersion >= 6) {
      method.static = false;
      isGenerator = this.eat(types.star);
    }
    this.parsePropertyName(method);
    if (isDummy(method.key)) { if (isDummy(this.parseMaybeAssign())) { this.next(); } this.eat(types.comma); continue }
    if (method.key.type === "Identifier" && !method.computed && method.key.name === "static" &&
        (this.tok.type !== types.parenL && this.tok.type !== types.braceL)) {
      method.static = true;
      isGenerator = this.eat(types.star);
      this.parsePropertyName(method);
    } else {
      method.static = false;
    }
    if (!method.computed &&
        method.key.type === "Identifier" && method.key.name === "async" && this.tok.type !== types.parenL &&
        !this.canInsertSemicolon()) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
      this.parsePropertyName(method);
    } else {
      isAsync = false;
    }
    if (this.options.ecmaVersion >= 5 && method.key.type === "Identifier" &&
        !method.computed && (method.key.name === "get" || method.key.name === "set") &&
        this.tok.type !== types.parenL && this.tok.type !== types.braceL) {
      method.kind = method.key.name;
      this.parsePropertyName(method);
      method.value = this.parseMethod(false);
    } else {
      if (!method.computed && !method.static && !isGenerator && !isAsync && (
        method.key.type === "Identifier" && method.key.name === "constructor" ||
          method.key.type === "Literal" && method.key.value === "constructor")) {
        method.kind = "constructor";
      } else {
        method.kind = "method";
      }
      method.value = this.parseMethod(isGenerator, isAsync);
    }
    node.body.body.push(this.finishNode(method, "MethodDefinition"));
  }
  this.popCx();
  if (!this.eat(types.braceR)) {
    // If there is no closing brace, make the node span to the start
    // of the next token (this is useful for Tern)
    this.last.end = this.tok.start;
    if (this.options.locations) { this.last.loc.end = this.tok.loc.start; }
  }
  this.semicolon();
  this.finishNode(node.body, "ClassBody");
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression")
};

lp$1.parseFunction = function(node, isStatement, isAsync) {
  var oldInAsync = this.inAsync, oldInFunction = this.inFunction;
  this.initFunction(node);
  if (this.options.ecmaVersion >= 6) {
    node.generator = this.eat(types.star);
  }
  if (this.options.ecmaVersion >= 8) {
    node.async = !!isAsync;
  }
  if (this.tok.type === types.name) { node.id = this.parseIdent(); }
  else if (isStatement === true) { node.id = this.dummyIdent(); }
  this.inAsync = node.async;
  this.inFunction = true;
  node.params = this.parseFunctionParams();
  node.body = this.parseBlock();
  this.toks.adaptDirectivePrologue(node.body.body);
  this.inAsync = oldInAsync;
  this.inFunction = oldInFunction;
  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression")
};

lp$1.parseExport = function() {
  var node = this.startNode();
  this.next();
  if (this.eat(types.star)) {
    node.source = this.eatContextual("from") ? this.parseExprAtom() : this.dummyString();
    return this.finishNode(node, "ExportAllDeclaration")
  }
  if (this.eat(types._default)) {
    // export default (function foo() {}) // This is FunctionExpression.
    var isAsync;
    if (this.tok.type === types._function || (isAsync = this.toks.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) { this.next(); }
      node.declaration = this.parseFunction(fNode, "nullableID", isAsync);
    } else if (this.tok.type === types._class) {
      node.declaration = this.parseClass("nullableID");
    } else {
      node.declaration = this.parseMaybeAssign();
      this.semicolon();
    }
    return this.finishNode(node, "ExportDefaultDeclaration")
  }
  if (this.tok.type.keyword || this.toks.isLet() || this.toks.isAsyncFunction()) {
    node.declaration = this.parseStatement();
    node.specifiers = [];
    node.source = null;
  } else {
    node.declaration = null;
    node.specifiers = this.parseExportSpecifierList();
    node.source = this.eatContextual("from") ? this.parseExprAtom() : null;
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration")
};

lp$1.parseImport = function() {
  var node = this.startNode();
  this.next();
  if (this.tok.type === types.string) {
    node.specifiers = [];
    node.source = this.parseExprAtom();
  } else {
    var elt;
    if (this.tok.type === types.name && this.tok.value !== "from") {
      elt = this.startNode();
      elt.local = this.parseIdent();
      this.finishNode(elt, "ImportDefaultSpecifier");
      this.eat(types.comma);
    }
    node.specifiers = this.parseImportSpecifiers();
    node.source = this.eatContextual("from") && this.tok.type === types.string ? this.parseExprAtom() : this.dummyString();
    if (elt) { node.specifiers.unshift(elt); }
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration")
};

lp$1.parseImportSpecifiers = function() {
  var elts = [];
  if (this.tok.type === types.star) {
    var elt = this.startNode();
    this.next();
    elt.local = this.eatContextual("as") ? this.parseIdent() : this.dummyIdent();
    elts.push(this.finishNode(elt, "ImportNamespaceSpecifier"));
  } else {
    var indent = this.curIndent, line = this.curLineStart, continuedLine = this.nextLineStart;
    this.pushCx();
    this.eat(types.braceL);
    if (this.curLineStart > continuedLine) { continuedLine = this.curLineStart; }
    while (!this.closes(types.braceR, indent + (this.curLineStart <= continuedLine ? 1 : 0), line)) {
      var elt$1 = this.startNode();
      if (this.eat(types.star)) {
        elt$1.local = this.eatContextual("as") ? this.parseIdent() : this.dummyIdent();
        this.finishNode(elt$1, "ImportNamespaceSpecifier");
      } else {
        if (this.isContextual("from")) { break }
        elt$1.imported = this.parseIdent();
        if (isDummy(elt$1.imported)) { break }
        elt$1.local = this.eatContextual("as") ? this.parseIdent() : elt$1.imported;
        this.finishNode(elt$1, "ImportSpecifier");
      }
      elts.push(elt$1);
      this.eat(types.comma);
    }
    this.eat(types.braceR);
    this.popCx();
  }
  return elts
};

lp$1.parseExportSpecifierList = function() {
  var elts = [];
  var indent = this.curIndent, line = this.curLineStart, continuedLine = this.nextLineStart;
  this.pushCx();
  this.eat(types.braceL);
  if (this.curLineStart > continuedLine) { continuedLine = this.curLineStart; }
  while (!this.closes(types.braceR, indent + (this.curLineStart <= continuedLine ? 1 : 0), line)) {
    if (this.isContextual("from")) { break }
    var elt = this.startNode();
    elt.local = this.parseIdent();
    if (isDummy(elt.local)) { break }
    elt.exported = this.eatContextual("as") ? this.parseIdent() : elt.local;
    this.finishNode(elt, "ExportSpecifier");
    elts.push(elt);
    this.eat(types.comma);
  }
  this.eat(types.braceR);
  this.popCx();
  return elts
};

var lp$2 = LooseParser.prototype;

lp$2.checkLVal = function(expr) {
  if (!expr) { return expr }
  switch (expr.type) {
  case "Identifier":
  case "MemberExpression":
    return expr

  case "ParenthesizedExpression":
    expr.expression = this.checkLVal(expr.expression);
    return expr

  default:
    return this.dummyIdent()
  }
};

lp$2.parseExpression = function(noIn) {
  var start = this.storeCurrentPos();
  var expr = this.parseMaybeAssign(noIn);
  if (this.tok.type === types.comma) {
    var node = this.startNodeAt(start);
    node.expressions = [expr];
    while (this.eat(types.comma)) { node.expressions.push(this.parseMaybeAssign(noIn)); }
    return this.finishNode(node, "SequenceExpression")
  }
  return expr
};

lp$2.parseParenExpression = function() {
  this.pushCx();
  this.expect(types.parenL);
  var val = this.parseExpression();
  this.popCx();
  this.expect(types.parenR);
  return val
};

lp$2.parseMaybeAssign = function(noIn) {
  if (this.toks.isContextual("yield")) {
    var node = this.startNode();
    this.next();
    if (this.semicolon() || this.canInsertSemicolon() || (this.tok.type !== types.star && !this.tok.type.startsExpr)) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(types.star);
      node.argument = this.parseMaybeAssign();
    }
    return this.finishNode(node, "YieldExpression")
  }

  var start = this.storeCurrentPos();
  var left = this.parseMaybeConditional(noIn);
  if (this.tok.type.isAssign) {
    var node$1 = this.startNodeAt(start);
    node$1.operator = this.tok.value;
    node$1.left = this.tok.type === types.eq ? this.toAssignable(left) : this.checkLVal(left);
    this.next();
    node$1.right = this.parseMaybeAssign(noIn);
    return this.finishNode(node$1, "AssignmentExpression")
  }
  return left
};

lp$2.parseMaybeConditional = function(noIn) {
  var start = this.storeCurrentPos();
  var expr = this.parseExprOps(noIn);
  if (this.eat(types.question)) {
    var node = this.startNodeAt(start);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    node.alternate = this.expect(types.colon) ? this.parseMaybeAssign(noIn) : this.dummyIdent();
    return this.finishNode(node, "ConditionalExpression")
  }
  return expr
};

lp$2.parseExprOps = function(noIn) {
  var start = this.storeCurrentPos();
  var indent = this.curIndent, line = this.curLineStart;
  return this.parseExprOp(this.parseMaybeUnary(false), start, -1, noIn, indent, line)
};

lp$2.parseExprOp = function(left, start, minPrec, noIn, indent, line) {
  if (this.curLineStart !== line && this.curIndent < indent && this.tokenStartsLine()) { return left }
  var prec = this.tok.type.binop;
  if (prec != null && (!noIn || this.tok.type !== types._in)) {
    if (prec > minPrec) {
      var node = this.startNodeAt(start);
      node.left = left;
      node.operator = this.tok.value;
      this.next();
      if (this.curLineStart !== line && this.curIndent < indent && this.tokenStartsLine()) {
        node.right = this.dummyIdent();
      } else {
        var rightStart = this.storeCurrentPos();
        node.right = this.parseExprOp(this.parseMaybeUnary(false), rightStart, prec, noIn, indent, line);
      }
      this.finishNode(node, /&&|\|\|/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");
      return this.parseExprOp(node, start, minPrec, noIn, indent, line)
    }
  }
  return left
};

lp$2.parseMaybeUnary = function(sawUnary) {
  var start = this.storeCurrentPos(), expr;
  if (this.options.ecmaVersion >= 8 && this.toks.isContextual("await") &&
    (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction))
  ) {
    expr = this.parseAwait();
    sawUnary = true;
  } else if (this.tok.type.prefix) {
    var node = this.startNode(), update = this.tok.type === types.incDec;
    if (!update) { sawUnary = true; }
    node.operator = this.tok.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary(true);
    if (update) { node.argument = this.checkLVal(node.argument); }
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  } else if (this.tok.type === types.ellipsis) {
    var node$1 = this.startNode();
    this.next();
    node$1.argument = this.parseMaybeUnary(sawUnary);
    expr = this.finishNode(node$1, "SpreadElement");
  } else {
    expr = this.parseExprSubscripts();
    while (this.tok.type.postfix && !this.canInsertSemicolon()) {
      var node$2 = this.startNodeAt(start);
      node$2.operator = this.tok.value;
      node$2.prefix = false;
      node$2.argument = this.checkLVal(expr);
      this.next();
      expr = this.finishNode(node$2, "UpdateExpression");
    }
  }

  if (!sawUnary && this.eat(types.starstar)) {
    var node$3 = this.startNodeAt(start);
    node$3.operator = "**";
    node$3.left = expr;
    node$3.right = this.parseMaybeUnary(false);
    return this.finishNode(node$3, "BinaryExpression")
  }

  return expr
};

lp$2.parseExprSubscripts = function() {
  var start = this.storeCurrentPos();
  return this.parseSubscripts(this.parseExprAtom(), start, false, this.curIndent, this.curLineStart)
};

lp$2.parseSubscripts = function(base, start, noCalls, startIndent, line) {
  for (;;) {
    if (this.curLineStart !== line && this.curIndent <= startIndent && this.tokenStartsLine()) {
      if (this.tok.type === types.dot && this.curIndent === startIndent)
        { --startIndent; }
      else
        { return base }
    }

    var maybeAsyncArrow = base.type === "Identifier" && base.name === "async" && !this.canInsertSemicolon();

    if (this.eat(types.dot)) {
      var node = this.startNodeAt(start);
      node.object = base;
      if (this.curLineStart !== line && this.curIndent <= startIndent && this.tokenStartsLine())
        { node.property = this.dummyIdent(); }
      else
        { node.property = this.parsePropertyAccessor() || this.dummyIdent(); }
      node.computed = false;
      base = this.finishNode(node, "MemberExpression");
    } else if (this.tok.type === types.bracketL) {
      this.pushCx();
      this.next();
      var node$1 = this.startNodeAt(start);
      node$1.object = base;
      node$1.property = this.parseExpression();
      node$1.computed = true;
      this.popCx();
      this.expect(types.bracketR);
      base = this.finishNode(node$1, "MemberExpression");
    } else if (!noCalls && this.tok.type === types.parenL) {
      var exprList = this.parseExprList(types.parenR);
      if (maybeAsyncArrow && this.eat(types.arrow))
        { return this.parseArrowExpression(this.startNodeAt(start), exprList, true) }
      var node$2 = this.startNodeAt(start);
      node$2.callee = base;
      node$2.arguments = exprList;
      base = this.finishNode(node$2, "CallExpression");
    } else if (this.tok.type === types.backQuote) {
      var node$3 = this.startNodeAt(start);
      node$3.tag = base;
      node$3.quasi = this.parseTemplate();
      base = this.finishNode(node$3, "TaggedTemplateExpression");
    } else {
      return base
    }
  }
};

lp$2.parseExprAtom = function() {
  var node;
  switch (this.tok.type) {
  case types._this:
  case types._super:
    var type = this.tok.type === types._this ? "ThisExpression" : "Super";
    node = this.startNode();
    this.next();
    return this.finishNode(node, type)

  case types.name:
    var start = this.storeCurrentPos();
    var id = this.parseIdent();
    var isAsync = false;
    if (id.name === "async" && !this.canInsertSemicolon()) {
      if (this.eat(types._function))
        { return this.parseFunction(this.startNodeAt(start), false, true) }
      if (this.tok.type === types.name) {
        id = this.parseIdent();
        isAsync = true;
      }
    }
    return this.eat(types.arrow) ? this.parseArrowExpression(this.startNodeAt(start), [id], isAsync) : id

  case types.regexp:
    node = this.startNode();
    var val = this.tok.value;
    node.regex = {pattern: val.pattern, flags: val.flags};
    node.value = val.value;
    node.raw = this.input.slice(this.tok.start, this.tok.end);
    this.next();
    return this.finishNode(node, "Literal")

  case types.num: case types.string:
    node = this.startNode();
    node.value = this.tok.value;
    node.raw = this.input.slice(this.tok.start, this.tok.end);
    if (this.tok.type === types.num && node.raw.charCodeAt(node.raw.length - 1) === 110) { node.bigint = node.raw.slice(0, -1); }
    this.next();
    return this.finishNode(node, "Literal")

  case types._null: case types._true: case types._false:
    node = this.startNode();
    node.value = this.tok.type === types._null ? null : this.tok.type === types._true;
    node.raw = this.tok.type.keyword;
    this.next();
    return this.finishNode(node, "Literal")

  case types.parenL:
    var parenStart = this.storeCurrentPos();
    this.next();
    var inner = this.parseExpression();
    this.expect(types.parenR);
    if (this.eat(types.arrow)) {
      // (a,)=>a // SequenceExpression makes dummy in the last hole. Drop the dummy.
      var params = inner.expressions || [inner];
      if (params.length && isDummy(params[params.length - 1]))
        { params.pop(); }
      return this.parseArrowExpression(this.startNodeAt(parenStart), params)
    }
    if (this.options.preserveParens) {
      var par = this.startNodeAt(parenStart);
      par.expression = inner;
      inner = this.finishNode(par, "ParenthesizedExpression");
    }
    return inner

  case types.bracketL:
    node = this.startNode();
    node.elements = this.parseExprList(types.bracketR, true);
    return this.finishNode(node, "ArrayExpression")

  case types.braceL:
    return this.parseObj()

  case types._class:
    return this.parseClass(false)

  case types._function:
    node = this.startNode();
    this.next();
    return this.parseFunction(node, false)

  case types._new:
    return this.parseNew()

  case types.backQuote:
    return this.parseTemplate()

  case types._import:
    if (this.options.ecmaVersion >= 11) {
      return this.parseExprImport()
    } else {
      return this.dummyIdent()
    }

  default:
    return this.dummyIdent()
  }
};

lp$2.parseExprImport = function() {
  var node = this.startNode();
  this.next(); // skip `import`
  switch (this.tok.type) {
  case types.parenL:
    return this.parseDynamicImport(node)
  default:
    node.name = "import";
    return this.finishNode(node, "Identifier")
  }
};

lp$2.parseDynamicImport = function(node) {
  node.source = this.parseExprList(types.parenR)[0] || this.dummyString();
  return this.finishNode(node, "ImportExpression")
};

lp$2.parseNew = function() {
  var node = this.startNode(), startIndent = this.curIndent, line = this.curLineStart;
  var meta = this.parseIdent(true);
  if (this.options.ecmaVersion >= 6 && this.eat(types.dot)) {
    node.meta = meta;
    node.property = this.parseIdent(true);
    return this.finishNode(node, "MetaProperty")
  }
  var start = this.storeCurrentPos();
  node.callee = this.parseSubscripts(this.parseExprAtom(), start, true, startIndent, line);
  if (this.tok.type === types.parenL) {
    node.arguments = this.parseExprList(types.parenR);
  } else {
    node.arguments = [];
  }
  return this.finishNode(node, "NewExpression")
};

lp$2.parseTemplateElement = function() {
  var elem = this.startNode();

  // The loose parser accepts invalid unicode escapes even in untagged templates.
  if (this.tok.type === types.invalidTemplate) {
    elem.value = {
      raw: this.tok.value,
      cooked: null
    };
  } else {
    elem.value = {
      raw: this.input.slice(this.tok.start, this.tok.end).replace(/\r\n?/g, "\n"),
      cooked: this.tok.value
    };
  }
  this.next();
  elem.tail = this.tok.type === types.backQuote;
  return this.finishNode(elem, "TemplateElement")
};

lp$2.parseTemplate = function() {
  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement();
  node.quasis = [curElt];
  while (!curElt.tail) {
    this.next();
    node.expressions.push(this.parseExpression());
    if (this.expect(types.braceR)) {
      curElt = this.parseTemplateElement();
    } else {
      curElt = this.startNode();
      curElt.value = {cooked: "", raw: ""};
      curElt.tail = true;
      this.finishNode(curElt, "TemplateElement");
    }
    node.quasis.push(curElt);
  }
  this.expect(types.backQuote);
  return this.finishNode(node, "TemplateLiteral")
};

lp$2.parseObj = function() {
  var node = this.startNode();
  node.properties = [];
  this.pushCx();
  var indent = this.curIndent + 1, line = this.curLineStart;
  this.eat(types.braceL);
  if (this.curIndent + 1 < indent) { indent = this.curIndent; line = this.curLineStart; }
  while (!this.closes(types.braceR, indent, line)) {
    var prop = this.startNode(), isGenerator = (void 0), isAsync = (void 0), start = (void 0);
    if (this.options.ecmaVersion >= 9 && this.eat(types.ellipsis)) {
      prop.argument = this.parseMaybeAssign();
      node.properties.push(this.finishNode(prop, "SpreadElement"));
      this.eat(types.comma);
      continue
    }
    if (this.options.ecmaVersion >= 6) {
      start = this.storeCurrentPos();
      prop.method = false;
      prop.shorthand = false;
      isGenerator = this.eat(types.star);
    }
    this.parsePropertyName(prop);
    if (this.toks.isAsyncProp(prop)) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
      this.parsePropertyName(prop);
    } else {
      isAsync = false;
    }
    if (isDummy(prop.key)) { if (isDummy(this.parseMaybeAssign())) { this.next(); } this.eat(types.comma); continue }
    if (this.eat(types.colon)) {
      prop.kind = "init";
      prop.value = this.parseMaybeAssign();
    } else if (this.options.ecmaVersion >= 6 && (this.tok.type === types.parenL || this.tok.type === types.braceL)) {
      prop.kind = "init";
      prop.method = true;
      prop.value = this.parseMethod(isGenerator, isAsync);
    } else if (this.options.ecmaVersion >= 5 && prop.key.type === "Identifier" &&
               !prop.computed && (prop.key.name === "get" || prop.key.name === "set") &&
               (this.tok.type !== types.comma && this.tok.type !== types.braceR && this.tok.type !== types.eq)) {
      prop.kind = prop.key.name;
      this.parsePropertyName(prop);
      prop.value = this.parseMethod(false);
    } else {
      prop.kind = "init";
      if (this.options.ecmaVersion >= 6) {
        if (this.eat(types.eq)) {
          var assign = this.startNodeAt(start);
          assign.operator = "=";
          assign.left = prop.key;
          assign.right = this.parseMaybeAssign();
          prop.value = this.finishNode(assign, "AssignmentExpression");
        } else {
          prop.value = prop.key;
        }
      } else {
        prop.value = this.dummyIdent();
      }
      prop.shorthand = true;
    }
    node.properties.push(this.finishNode(prop, "Property"));
    this.eat(types.comma);
  }
  this.popCx();
  if (!this.eat(types.braceR)) {
    // If there is no closing brace, make the node span to the start
    // of the next token (this is useful for Tern)
    this.last.end = this.tok.start;
    if (this.options.locations) { this.last.loc.end = this.tok.loc.start; }
  }
  return this.finishNode(node, "ObjectExpression")
};

lp$2.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(types.bracketL)) {
      prop.computed = true;
      prop.key = this.parseExpression();
      this.expect(types.bracketR);
      return
    } else {
      prop.computed = false;
    }
  }
  var key = (this.tok.type === types.num || this.tok.type === types.string) ? this.parseExprAtom() : this.parseIdent();
  prop.key = key || this.dummyIdent();
};

lp$2.parsePropertyAccessor = function() {
  if (this.tok.type === types.name || this.tok.type.keyword) { return this.parseIdent() }
};

lp$2.parseIdent = function() {
  var name = this.tok.type === types.name ? this.tok.value : this.tok.type.keyword;
  if (!name) { return this.dummyIdent() }
  var node = this.startNode();
  this.next();
  node.name = name;
  return this.finishNode(node, "Identifier")
};

lp$2.initFunction = function(node) {
  node.id = null;
  node.params = [];
  if (this.options.ecmaVersion >= 6) {
    node.generator = false;
    node.expression = false;
  }
  if (this.options.ecmaVersion >= 8)
    { node.async = false; }
};

// Convert existing expression atom to assignable pattern
// if possible.

lp$2.toAssignable = function(node, binding) {
  if (!node || node.type === "Identifier" || (node.type === "MemberExpression" && !binding)) ; else if (node.type === "ParenthesizedExpression") {
    this.toAssignable(node.expression, binding);
  } else if (this.options.ecmaVersion < 6) {
    return this.dummyIdent()
  } else if (node.type === "ObjectExpression") {
    node.type = "ObjectPattern";
    for (var i = 0, list = node.properties; i < list.length; i += 1)
      {
      var prop = list[i];

      this.toAssignable(prop, binding);
    }
  } else if (node.type === "ArrayExpression") {
    node.type = "ArrayPattern";
    this.toAssignableList(node.elements, binding);
  } else if (node.type === "Property") {
    this.toAssignable(node.value, binding);
  } else if (node.type === "SpreadElement") {
    node.type = "RestElement";
    this.toAssignable(node.argument, binding);
  } else if (node.type === "AssignmentExpression") {
    node.type = "AssignmentPattern";
    delete node.operator;
  } else {
    return this.dummyIdent()
  }
  return node
};

lp$2.toAssignableList = function(exprList, binding) {
  for (var i = 0, list = exprList; i < list.length; i += 1)
    {
    var expr = list[i];

    this.toAssignable(expr, binding);
  }
  return exprList
};

lp$2.parseFunctionParams = function(params) {
  params = this.parseExprList(types.parenR);
  return this.toAssignableList(params, true)
};

lp$2.parseMethod = function(isGenerator, isAsync) {
  var node = this.startNode(), oldInAsync = this.inAsync, oldInFunction = this.inFunction;
  this.initFunction(node);
  if (this.options.ecmaVersion >= 6)
    { node.generator = !!isGenerator; }
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }
  this.inAsync = node.async;
  this.inFunction = true;
  node.params = this.parseFunctionParams();
  node.body = this.parseBlock();
  this.toks.adaptDirectivePrologue(node.body.body);
  this.inAsync = oldInAsync;
  this.inFunction = oldInFunction;
  return this.finishNode(node, "FunctionExpression")
};

lp$2.parseArrowExpression = function(node, params, isAsync) {
  var oldInAsync = this.inAsync, oldInFunction = this.inFunction;
  this.initFunction(node);
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }
  this.inAsync = node.async;
  this.inFunction = true;
  node.params = this.toAssignableList(params, true);
  node.expression = this.tok.type !== types.braceL;
  if (node.expression) {
    node.body = this.parseMaybeAssign();
  } else {
    node.body = this.parseBlock();
    this.toks.adaptDirectivePrologue(node.body.body);
  }
  this.inAsync = oldInAsync;
  this.inFunction = oldInFunction;
  return this.finishNode(node, "ArrowFunctionExpression")
};

lp$2.parseExprList = function(close, allowEmpty) {
  this.pushCx();
  var indent = this.curIndent, line = this.curLineStart, elts = [];
  this.next(); // Opening bracket
  while (!this.closes(close, indent + 1, line)) {
    if (this.eat(types.comma)) {
      elts.push(allowEmpty ? null : this.dummyIdent());
      continue
    }
    var elt = this.parseMaybeAssign();
    if (isDummy(elt)) {
      if (this.closes(close, indent, line)) { break }
      this.next();
    } else {
      elts.push(elt);
    }
    this.eat(types.comma);
  }
  this.popCx();
  if (!this.eat(close)) {
    // If there is no closing brace, make the node span to the start
    // of the next token (this is useful for Tern)
    this.last.end = this.tok.start;
    if (this.options.locations) { this.last.loc.end = this.tok.loc.start; }
  }
  return elts
};

lp$2.parseAwait = function() {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeUnary();
  return this.finishNode(node, "AwaitExpression")
};

// Acorn: Loose parser

defaultOptions.tabSize = 4;var cleanupExternalDependency = function (code) {
    return code.replace(/process.env.NODE_ENV/g, "'development'");
};
function dependencyLoader(context) {
    return {
        name: "packager::loader::dependency-loader",
        load: function (modulePath) {
            var _a;
            return __awaiter(this, void 0, Promise, function () {
                var file, moduleMeta, moduleName, version, cachedNpmDependency, npmDependency, cleanUpCode;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            file = context.files.find(function (f) { return f.path === modulePath; });
                            if (!(modulePath && !file)) return [3 /*break*/, 3];
                            moduleMeta = parsePackagePath(modulePath);
                            moduleName = (_a = moduleMeta.name) === null || _a === void 0 ? void 0 : _a.split("__")[0];
                            if (!moduleName)
                                throw new Error("There was an issue with loading deps for " + modulePath);
                            version = moduleMeta.version ||
                                context.bundleOptions.dependencies[moduleName] ||
                                "latest";
                            cachedNpmDependency = context.cache.dependencies.get(modulePath);
                            if (!!cachedNpmDependency) return [3 /*break*/, 2];
                            return [4 /*yield*/, fetchNpmDependency(moduleName, version, moduleMeta.path || "")];
                        case 1:
                            npmDependency = (_b.sent()) || "";
                            if (npmDependency) {
                                cleanUpCode = cleanupExternalDependency(npmDependency.code);
                                context.cache.dependencies.set(modulePath, __assign(__assign({}, npmDependency), { code: cleanUpCode, name: modulePath }));
                                return [2 /*return*/, {
                                        code: cleanUpCode,
                                        syntheticNamedExports: true
                                    }];
                            }
                            return [2 /*return*/, null];
                        case 2: return [2 /*return*/, {
                                code: ""
                            }];
                        case 3:
                            if (modulePath && file) {
                                return [2 /*return*/, {
                                        code: file.code,
                                        syntheticNamedExports: true
                                    }];
                            }
                            _b.label = 4;
                        case 4: return [2 /*return*/, null];
                    }
                });
            });
        }
    };
}
//# sourceMappingURL=dependency-loader.js.map
/**
 * Modified from: https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
function commonjsLoader(context) {
    return {
        name: "packager::loader::commonjs-loader",
        load: function (modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var actualId, name, actualId_1, name_1;
                return __generator(this, function (_a) {
                    if (modulePath === HELPERS_ID)
                        return [2 /*return*/, HELPERS];
                    // generate proxy modules
                    if (modulePath.endsWith(EXTERNAL_SUFFIX)) {
                        actualId = getIdFromExternalProxyId(modulePath);
                        name = getName(actualId);
                        return [2 /*return*/, "import " + name + " from " + JSON.stringify(actualId) + "; export default " + name + ";"];
                    }
                    if (modulePath.endsWith(PROXY_SUFFIX)) {
                        actualId_1 = getIdFromProxyId(modulePath);
                        name_1 = getName(actualId_1);
                        return [2 /*return*/, getIsCjsPromise(actualId_1).then(function (isCjs) {
                                if (isCjs)
                                    return "import { __moduleExports } from " + JSON.stringify(actualId_1) + "; export default __moduleExports;";
                                else if (context.cache.esModulesWithoutDefaultExport.has(actualId_1))
                                    return "import * as " + name_1 + " from " + JSON.stringify(actualId_1) + "; export default " + name_1 + ";";
                                else if (context.cache.esModulesWithDefaultExport.has(actualId_1)) {
                                    return "export {default} from " + JSON.stringify(actualId_1) + ";";
                                }
                                return "import * as " + name_1 + " from " + JSON.stringify(actualId_1) + "; import {getCjsExportFromNamespace} from \"" + HELPERS_ID + "\"; export default getCjsExportFromNamespace(" + name_1 + ")";
                            })];
                    }
                    return [2 /*return*/, null];
                });
            });
        }
    };
}
//# sourceMappingURL=commonjs-loader.js.map
var loaders = (function (context) { return [
    commonjsLoader(context),
    dependencyLoader(context)
]; });
//# sourceMappingURL=index.js.map
var HtmlTranspiler = /** @class */ (function (_super) {
    __extends(HtmlTranspiler, _super);
    function HtmlTranspiler(context) {
        var _this = _super.call(this, "html-transpiler", null, context) || this;
        _this.additionalTranspilers = {};
        return _this;
    }
    HtmlTranspiler.prototype.transpile = function (file) {
        return this.doTranspile(file);
    };
    return HtmlTranspiler;
}(Transpiler));
//# sourceMappingURL=index.js.map
var transpilers = {
    less: LessTranspiler,
    sass: SassTranspiler,
    scss: SassTranspiler,
    stylus: StylusTranspiler,
    styl: StylusTranspiler,
    svelte: SvelteTranspiler,
    ts: TypescriptTranspiler,
    tsx: TypescriptTranspiler,
    js: TypescriptTranspiler,
    jsx: TypescriptTranspiler,
    vue: VueTranspiler,
    html: HtmlTranspiler,
    json: JsonTranspiler,
    css: CssTranspiler
};
//# sourceMappingURL=index.js.map
function initialSetup(context) {
    var getAllLangsFromFiles = function () {
        return context.files.reduce(function (acc, curr) {
            var extension = extname(curr.path).slice(1);
            if (!acc.includes(extension)) {
                acc.push(extension);
                return acc;
            }
            return acc;
        }, []);
    };
    var usingUnsupportedFiles = function () {
        var givenLangs = getAllLangsFromFiles();
        var unsupportedExtensions = givenLangs.reduce(function (acc, curr) {
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
        buildStart: function () {
            return __awaiter(this, void 0, Promise, function () {
                var _a, unsupportedFiles, extensions;
                return __generator(this, function (_b) {
                    _a = usingUnsupportedFiles(), unsupportedFiles = _a.unsupportedFiles, extensions = _a.extensions;
                    if (unsupportedFiles) {
                        throw Error("Files with the following extensions are not supported yet: " + extensions.join(", ") + ".");
                    }
                    return [2 /*return*/];
                });
            });
        }
    };
}
//# sourceMappingURL=build-start.js.map
var applyPreCode = function () {
    return "window.__dependencies = { ...window.__dependencies || {} };";
};
function intro (context) {
    return {
        name: "packager::setup::intro",
        intro: function () { return applyPreCode(); }
    };
}
//# sourceMappingURL=intro.js.map
var setup = (function (context) { return [
    initialSetup(context),
    intro()
]; });
//# sourceMappingURL=index.js.map
var defaultBundleOptions = {
    dependencies: {}
};
var cache = {
    dependencies: cacheFactory(),
    transpilers: cacheFactory(),
    esModulesWithoutDefaultExport: new Set(),
    esModulesWithDefaultExport: new Set()
};
var pluginFactory = (function (files, bundleOptions) {
    if (bundleOptions === void 0) { bundleOptions = defaultBundleOptions; }
    var context = {
        cache: cache,
        files: files,
        transpileQueue: new SequentialTaskQueue({ timeout: 30000 }),
        bundleOptions: normalizeBundleOptions(bundleOptions)
    };
    return __spread(setup(context), resolvers(context), loaders(context), transformers(context));
});
//# sourceMappingURL=plugin-factory.js.map
var loadRollup = function () {
    return new Promise(function (resolve) {
        var script = document.createElement("script");
        script.src = "https://unpkg.com/rollup@latest/dist/rollup.browser.js";
        script.setAttribute("data-packager", "true");
        script.onload = resolve;
        document.head.appendChild(script);
    });
};
var loadMagicString$1 = function () {
    return new Promise(function (resolve) {
        var script = document.createElement("script");
        script.src =
            "https://cdn.jsdelivr.net/npm/magic-string@latest/dist/magic-string.umd.min.js";
        script.setAttribute("data-packager", "true");
        script.onload = resolve;
        document.head.appendChild(script);
    });
};
//# sourceMappingURL=script-loaders.js.map
var findEntryFile = (function (files, forcePath) {
    var pkgMain = files.find(function (f) { return f.path === forcePath; });
    var foundFile = pkgMain || files.find(function (f) { return f.entry; });
    if (!foundFile) {
        throw Error("You haven't specific an entry file. You can do so by adding 'entry: true' to one of your files or use the 'main' in a package.json file..");
    }
    return foundFile;
});
//# sourceMappingURL=find-entry-file.js.map
var extractPackageJsonOptions = (function (packgeJson) {
    return {
        dependencies: __assign(__assign({}, packgeJson.dependencies), packgeJson.peerDependencies)
    };
});
//# sourceMappingURL=extract-package-json-options.js.map
var handleBuildWarnings = (function (warning) {
    if (warning.code === "THIS_IS_UNDEFINED")
        return;
});
//# sourceMappingURL=handle-build-warnings.js.map
var Packager = /** @class */ (function () {
    function Packager(options, inputOptions, outputOptions) {
        if (inputOptions === void 0) { inputOptions = {}; }
        if (outputOptions === void 0) { outputOptions = {}; }
        this.files = [];
        this.cachedBundle = { modules: [] };
        this.inputOptions = __assign(__assign({}, inputOptions), { inlineDynamicImports: true, cache: this.cachedBundle });
        this.outputOptions = __assign(__assign({}, outputOptions), { format: "iife", sourcemap: options && options.sourcemaps ? "inline" : false, freeze: false });
    }
    Packager.prototype.bundle = function (files, bundleOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var entryFile, packageJson, parsed, pkgBundleOptions, bundle, output, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.files = files;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        if (!(!this.rollup || !window.rollup)) return [3 /*break*/, 4];
                        return [4 /*yield*/, loadRollup()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, loadMagicString$1()];
                    case 3:
                        _b.sent();
                        //@ts-ignore
                        this.rollup = window.rollup;
                        _b.label = 4;
                    case 4:
                        entryFile = void 0;
                        packageJson = this.files.find(function (f) { return f.path === "/package.json"; });
                        if (packageJson && packageJson.code != "") {
                            parsed = typeof packageJson.code === "string"
                                ? JSON.parse(packageJson.code)
                                : packageJson.code;
                            pkgBundleOptions = extractPackageJsonOptions(parsed);
                            bundleOptions = cjs(pkgBundleOptions, bundleOptions || {});
                            if (parsed.main) {
                                entryFile = findEntryFile(this.files, parsed.main.startsWith("/")
                                    ? parsed.main
                                    : "/" + parsed.main);
                            }
                        }
                        entryFile = entryFile || findEntryFile(this.files);
                        this.inputOptions = __assign(__assign({}, this.inputOptions), { input: (_a = entryFile) === null || _a === void 0 ? void 0 : _a.path, onwarn: handleBuildWarnings, plugins: pluginFactory(this.files, bundleOptions) });
                        return [4 /*yield*/, this.rollup.rollup(this.inputOptions)];
                    case 5:
                        bundle = _b.sent();
                        this.cachedBundle = bundle.cache;
                        return [4 /*yield*/, bundle.generate(this.outputOptions)];
                    case 6:
                        output = (_b.sent()).output;
                        return [2 /*return*/, {
                                code: output[0].code + " " + (this.outputOptions.sourcemap && output[0].map
                                    ? " \n //# sourceMappingURL=" + output[0].map.toUrl()
                                    : "")
                            }];
                    case 7:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Packager;
}());
//# sourceMappingURL=index.js.map
return Packager;}());