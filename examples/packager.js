/*
    @license

    Packager v0.1.0
    @author baryla (Adrian Barylski)
    @github https://github.com/baryla/pacakger

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
var HELPERS = "\nexport var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};\n\nexport function commonjsRequire () {\n    throw new Error('Dynamic requires are not currently supported.');\n}\n\nexport function unwrapExports (x) {\n    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;\n}\n\nexport function createCommonjsModule(fn, module) {\n    return module = { exports: {} }, fn(module, module.exports), module.exports;\n}\n\nexport function getCjsExportFromNamespace (n) {\n    return n && n['default'] || n;\n}\n\nexport default {\n    commonjsRequire,\n    unwrapExports,\n    createCommonjsModule,\n    getCjsExportFromNamespace\n}";
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
const WorkerFactory$4 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0NCg0KZnVuY3Rpb24gX192YWx1ZXMobykgew0KICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gImZ1bmN0aW9uIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwOw0KICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pOw0KICAgIHJldHVybiB7DQogICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHsNCiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7DQogICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07DQogICAgICAgIH0NCiAgICB9Ow0KfQoKdmFyIFRSQU5TUElMRV9TVEFUVVMgPSB7CiAgICBQUkVQQVJFX0ZJTEVTOiAidHJhbnNwaWxlcjpmaWxlOnByZXBhcmUiLAogICAgUFJFUEFSRV9BRERJVElPTkFMOiAidHJhbnNwaWxlcjphZGRpdGlvbmFsOnByZXBhcmUiLAogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAidHJhbnNwaWxlcjphZGRpdGlvbmFsOnRyYW5zcGlsZWQiLAogICAgVFJBTlNQSUxFX0NPTVBMRVRFOiAidHJhbnNwaWxlcjp0cmFuc3BpbGU6Y29tcGxldGUiLAogICAgRVJST1JfUFJFUEFSSU5HX0FORF9DT01QSUxJTkc6ICJ0cmFuc3BpbGVyOmVycm9yOmNvbXBpbGUiLAogICAgRVJST1JfQURESVRJT05BTDogInRyYW5zcGlsZXI6ZXJyb3I6YWRkaXRpb25hbCIKfTsKCnZhciBhYnNvbHV0ZVBhdGggPSAvXig/OlwvfCg/OltBLVphLXpdOik/W1xcfFwvXSkvOwpmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGgpIHsKICAgIHJldHVybiBhYnNvbHV0ZVBhdGgudGVzdChwYXRoKTsKfQpmdW5jdGlvbiBkaXJuYW1lKHBhdGgpIHsKICAgIHZhciBtYXRjaCA9IC8oXC98XFwpW15cL1xcXSokLy5leGVjKHBhdGgpOwogICAgaWYgKCFtYXRjaCkKICAgICAgICByZXR1cm4gIi4iOwogICAgdmFyIGRpciA9IHBhdGguc2xpY2UoMCwgLW1hdGNoWzBdLmxlbmd0aCk7CiAgICAvLyBJZiBgZGlyYCBpcyB0aGUgZW1wdHkgc3RyaW5nLCB3ZSdyZSBhdCByb290LgogICAgcmV0dXJuIGRpciA/IGRpciA6ICIvIjsKfQpmdW5jdGlvbiByZXNvbHZlKCkgewogICAgdmFyIHBhdGhzID0gW107CiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykgewogICAgICAgIHBhdGhzW19pXSA9IGFyZ3VtZW50c1tfaV07CiAgICB9CiAgICB2YXIgcmVzb2x2ZWRQYXJ0cyA9IHBhdGhzLnNoaWZ0KCkuc3BsaXQoL1tcL1xcXS8pOwogICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbiAocGF0aCkgewogICAgICAgIGlmIChpc0Fic29sdXRlKHBhdGgpKSB7CiAgICAgICAgICAgIHJlc29sdmVkUGFydHMgPSBwYXRoLnNwbGl0KC9bXC9cXF0vKTsKICAgICAgICB9CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoL1tcL1xcXS8pOwogICAgICAgICAgICB3aGlsZSAocGFydHNbMF0gPT09ICIuIiB8fCBwYXJ0c1swXSA9PT0gIi4uIikgewogICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0cy5zaGlmdCgpOwogICAgICAgICAgICAgICAgaWYgKHBhcnQgPT09ICIuLiIpIHsKICAgICAgICAgICAgICAgICAgICByZXNvbHZlZFBhcnRzLnBvcCgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJlc29sdmVkUGFydHMucHVzaC5hcHBseShyZXNvbHZlZFBhcnRzLCBwYXJ0cyk7CiAgICAgICAgfQogICAgfSk7CiAgICByZXR1cm4gbm9ybWFsaXplKHJlc29sdmVkUGFydHMuam9pbigiLyIpKTsKfQpmdW5jdGlvbiBub3JtYWxpemUocGF0aCkgewogICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXC9cLy9naSwgIi8iKTsKfQoKdmFyIHJlc29sdmVSZWxhdGl2ZSA9IGZ1bmN0aW9uIChjaGlsZFBhdGgsIHBhcmVudFBhdGgsIGNvbnRleHQsIHBhdGhPbmx5KSB7CiAgICBpZiAocGF0aE9ubHkgPT09IHZvaWQgMCkgeyBwYXRoT25seSA9IHRydWU7IH0KICAgIHZhciByZXRyeUZpbGVGaW5kID0gZnVuY3Rpb24gKHBhdGgpIHsKICAgICAgICByZXR1cm4gY29udGV4dC5maWxlcy5maW5kKGZ1bmN0aW9uIChmKSB7CiAgICAgICAgICAgIHJldHVybiBmLnBhdGggPT09IHBhdGggKyAiL2luZGV4LmpzIiB8fAogICAgICAgICAgICAgICAgZi5wYXRoID09PSBwYXRoICsgIi9pbmRleC50cyIgfHwKICAgICAgICAgICAgICAgIGYucGF0aCA9PT0gcGF0aCArICIvaW5kZXguanN4IiB8fAogICAgICAgICAgICAgICAgZi5wYXRoID09PSBwYXRoICsgIi9pbmRleC50c3giIHx8CiAgICAgICAgICAgICAgICBmLnBhdGggPT09IHBhdGggKyAiLmpzIiB8fAogICAgICAgICAgICAgICAgZi5wYXRoID09PSBwYXRoICsgIi50cyIgfHwKICAgICAgICAgICAgICAgIGYucGF0aCA9PT0gcGF0aCArICIuanN4IiB8fAogICAgICAgICAgICAgICAgZi5wYXRoID09PSBwYXRoICsgIi50c3giOwogICAgICAgIH0pIHx8IG51bGw7CiAgICB9OwogICAgdmFyIHJlc29sdmVkID0gcmVzb2x2ZShkaXJuYW1lKHBhcmVudFBhdGgpLCBjaGlsZFBhdGgpLnJlcGxhY2UoL15cLlwvLywgIiIpOwogICAgdmFyIGZvdW5kRmlsZSA9IGNvbnRleHQuZmlsZXMuZmluZChmdW5jdGlvbiAoZikgeyByZXR1cm4gZi5wYXRoID09PSByZXNvbHZlZDsgfSk7CiAgICBpZiAoZm91bmRGaWxlKQogICAgICAgIHJldHVybiBwYXRoT25seSA/IGZvdW5kRmlsZS5wYXRoIDogZm91bmRGaWxlOwogICAgdmFyIGFic29sdXRlID0gcmVzb2x2ZShkaXJuYW1lKHBhcmVudFBhdGgpLCBjaGlsZFBhdGgpOwogICAgdmFyIHJldHJpZWRGaWxlID0gcmV0cnlGaWxlRmluZChhYnNvbHV0ZSk7CiAgICBpZiAoIXJldHJpZWRGaWxlKQogICAgICAgIHJldHVybiBudWxsOwogICAgcmV0dXJuIHBhdGhPbmx5ID8gcmV0cmllZEZpbGUucGF0aCB8fCBudWxsIDogcmV0cmllZEZpbGUgfHwgbnVsbDsKfTsKCi8qKgogKiBTbGlnaHRseSBtb2RpZmllZCB2ZXJzaW9uIG9mOgogKiAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9rZXZ2YS9wYXJzZS1pbXBvcnQvYmxvYi9tYXN0ZXIvaW5kZXguanMKICogYnkgaHR0cHM6Ly9naXRodWIuY29tL2tldnZhCiAqLwp2YXIgZ2V0UGF0aCA9IGZ1bmN0aW9uIChzdHIpIHsKICAgIHJldHVybiAvKD86dXJsXCgpKD86Lio/KSg/OlwpKXwoWyInXSkoPzpbXiInKV0rKVwxL2dpCiAgICAgICAgLmV4ZWMoc3RyKVswXQogICAgICAgIC5yZXBsYWNlKC8oPzp1cmxcKCkvZ2ksICIiKQogICAgICAgIC5yZXBsYWNlKC8oPzpcKSkvZywgIiIpCiAgICAgICAgLnJlcGxhY2UoLyg/OlsiJ10pL2csICIiKQogICAgICAgIC50cmltKCk7Cn07CnZhciBnZXRDb25kaXRpb24gPSBmdW5jdGlvbiAoc3RyKSB7CiAgICByZXR1cm4gc3RyCiAgICAgICAgLnJlcGxhY2UoLyg/OnVybFwoKSg/Oi4qPykoPzpcKSl8KFsiJ10pKD86W14iJyldKylcMS9naSwgIiIpCiAgICAgICAgLnJlcGxhY2UoLyg/OkBpbXBvcnQpKD86XHMpKi9nLCAiIikKICAgICAgICAudHJpbSgpOwp9Owp2YXIgcGFyc2VDc3NJbXBvcnQgPSAoZnVuY3Rpb24gKGNzc0ltcG9ydCkgewogICAgY3NzSW1wb3J0ID0gY3NzSW1wb3J0LnJlcGxhY2UoLyg/OjspJC9nLCAiIik7CiAgICByZXR1cm4gewogICAgICAgIHBhdGg6IGdldFBhdGgoY3NzSW1wb3J0KSwKICAgICAgICBjb25kaXRpb246IGdldENvbmRpdGlvbihjc3NJbXBvcnQpIHx8IG51bGwsCiAgICAgICAgcnVsZTogY3NzSW1wb3J0CiAgICB9Owp9KTsKCnNlbGYuaW1wb3J0U2NyaXB0cygiaHR0cHM6Ly91bnBrZy5jb20vQGJsb3h5L2lpZmUtbGlic0BsYXRlc3QvbGlicy9jc3MuanMiKTsKc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZnVuY3Rpb24gKF9hKSB7CiAgICB2YXIgZGF0YSA9IF9hLmRhdGE7CiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgZmlsZSwgdHlwZSwgY29udGV4dCwgdHJhbnNwaWxlZEZpbGU7CiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikgewogICAgICAgICAgICBmaWxlID0gZGF0YS5maWxlLCB0eXBlID0gZGF0YS50eXBlLCBjb250ZXh0ID0gZGF0YS5jb250ZXh0OwogICAgICAgICAgICBpZiAodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0ZJTEVTKSB7CiAgICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgICAgIHRyYW5zcGlsZWRGaWxlID0gcHJlcGFyZUFuZFRyYW5zcGlsZUZpbGUoZmlsZSwgY29udGV4dCk7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLlRSQU5TUElMRV9DT01QTEVURSwKICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogdHJhbnNwaWxlZEZpbGUKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikgewogICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9QUkVQQVJJTkdfQU5EX0NPTVBJTElORywKICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yCiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dOwogICAgICAgIH0pOwogICAgfSk7Cn0pOwp2YXIgcHJlcGFyZUFuZFRyYW5zcGlsZUZpbGUgPSBmdW5jdGlvbiAoZmlsZSwgY29udGV4dCkgewogICAgdmFyIG9yaWdpbmFsQXN0ID0gZ2V0QXN0RnJvbUZpbGUoZmlsZSk7CiAgICB2YXIgcnVsZXMgPSBhcHBlbmRJbXBvcnRlZEZpbGVzV2l0aEFzdChmaWxlLnBhdGgsIG9yaWdpbmFsQXN0LCBjb250ZXh0KTsKICAgIG9yaWdpbmFsQXN0LnN0eWxlc2hlZXQucnVsZXMgPSBydWxlczsKICAgIHZhciBjb21waWxlZENvZGUgPSBjc3Muc3RyaW5naWZ5KG9yaWdpbmFsQXN0KTsKICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZmlsZSksIHsgY29kZTogY29tcGlsZWRDb2RlIH0pOwp9Owp2YXIgZ2V0QXN0RnJvbUZpbGUgPSBmdW5jdGlvbiAoZmlsZSkgewogICAgcmV0dXJuIGNzcy5wYXJzZShmaWxlLmNvZGUsIHsgc291cmNlOiBmaWxlLnBhdGggfSk7Cn07CnZhciBhcHBlbmRJbXBvcnRlZEZpbGVzV2l0aEFzdCA9IGZ1bmN0aW9uIChjdXJyZW50UGF0aCwgY3VycmVudEFzdCwgY29udGV4dCwgbG9vcGVkUnVsZXMpIHsKICAgIHZhciBlXzEsIF9hOwogICAgaWYgKGxvb3BlZFJ1bGVzID09PSB2b2lkIDApIHsgbG9vcGVkUnVsZXMgPSBbXTsgfQogICAgdmFyIGN1cnJlbmV0TG9vcCA9IFtdOwogICAgdmFyIHJ1bGVzID0gY3VycmVudEFzdC5zdHlsZXNoZWV0LnJ1bGVzIHx8IFtdOwogICAgdHJ5IHsKICAgICAgICBmb3IgKHZhciBydWxlc18xID0gX192YWx1ZXMocnVsZXMpLCBydWxlc18xXzEgPSBydWxlc18xLm5leHQoKTsgIXJ1bGVzXzFfMS5kb25lOyBydWxlc18xXzEgPSBydWxlc18xLm5leHQoKSkgewogICAgICAgICAgICB2YXIgcnVsZSA9IHJ1bGVzXzFfMS52YWx1ZTsKICAgICAgICAgICAgaWYgKHJ1bGUudHlwZSAhPSAiaW1wb3J0IikgewogICAgICAgICAgICAgICAgY3VycmVuZXRMb29wLnB1c2gocnVsZSk7CiAgICAgICAgICAgICAgICBsb29wZWRSdWxlcy5wdXNoKHJ1bGUpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChydWxlLmltcG9ydCkgewogICAgICAgICAgICAgICAgdmFyIGltcG9ydFJ1bGUgPSAiQGltcG9ydCAiICsgcnVsZS5pbXBvcnQgKyAiOyI7CiAgICAgICAgICAgICAgICB2YXIgcGFyc2VkSW1wb3J0ID0gcGFyc2VDc3NJbXBvcnQoaW1wb3J0UnVsZSk7CiAgICAgICAgICAgICAgICBpZiAocGFyc2VkSW1wb3J0LnBhdGgpIHsKICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmRGaWxlID0gKHJlc29sdmVSZWxhdGl2ZShwYXJzZWRJbXBvcnQucGF0aCwgY3VycmVudFBhdGgsIGNvbnRleHQsIGZhbHNlKSk7CiAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kRmlsZSkgewogICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kRmlsZS5wYXRoLmVuZHNXaXRoKCIuY3NzIikpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiWW91IGNhbid0IGltcG9ydCAiICsgZm91bmRGaWxlLnBhdGggKyAiIGluICIgKyBjdXJyZW50UGF0aCArICIgYmVjYXVzZSBpdCdzIG5vdCBhIENTUyBmaWxlLiIpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJzZWRBZGRpdGlvbmFsRmlsZSA9IGNzcy5wYXJzZShmb3VuZEZpbGUuY29kZSwgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBmb3VuZEZpbGUucGF0aAogICAgICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJzZWRJbXBvcnQuY29uZGl0aW9uIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhcGFyc2VkSW1wb3J0LmNvbmRpdGlvbi5sZW5ndGgpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZEltcG9ydGVkRmlsZXNXaXRoQXN0KGZvdW5kRmlsZS5wYXRoLCBwYXJzZWRBZGRpdGlvbmFsRmlsZSwgY29udGV4dCwgbG9vcGVkUnVsZXMpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltcG9ydFJ1bGVzID0gcGFyc2VkQWRkaXRpb25hbEZpbGUuc3R5bGVzaGVldC5ydWxlcy5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIudHlwZSA9PT0gImltcG9ydCI7IH0pOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vcGVkUnVsZXMucHVzaCh7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWE6IHBhcnNlZEltcG9ydC5jb25kaXRpb24sCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXM6IHBhcnNlZEFkZGl0aW9uYWxGaWxlLnN0eWxlc2hlZXQucnVsZXMuZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiByLnR5cGUgIT09ICJpbXBvcnQiOyB9KSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAibWVkaWEiCiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbXBvcnRSdWxlcy5sZW5ndGgpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXBwZW5kQWRkaXRpb25hbEltcG9ydHMgPSBfX2Fzc2lnbih7fSwgcGFyc2VkQWRkaXRpb25hbEZpbGUpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZEFkZGl0aW9uYWxJbXBvcnRzLnN0eWxlc2hlZXQucnVsZXMgPSBpbXBvcnRSdWxlczsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRJbXBvcnRlZEZpbGVzV2l0aEFzdChmb3VuZEZpbGUucGF0aCwgYXBwZW5kQWRkaXRpb25hbEltcG9ydHMsIGNvbnRleHQsIGxvb3BlZFJ1bGVzKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9CiAgICBmaW5hbGx5IHsKICAgICAgICB0cnkgewogICAgICAgICAgICBpZiAocnVsZXNfMV8xICYmICFydWxlc18xXzEuZG9uZSAmJiAoX2EgPSBydWxlc18xLnJldHVybikpIF9hLmNhbGwocnVsZXNfMSk7CiAgICAgICAgfQogICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH0KICAgIH0KICAgIHJldHVybiBsb29wZWRSdWxlczsKfTsKCg==', null, false);
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
/* eslint-disable */
const WorkerFactory$7 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0KCnZhciBUUkFOU1BJTEVfU1RBVFVTID0gewogICAgUFJFUEFSRV9GSUxFUzogInRyYW5zcGlsZXI6ZmlsZTpwcmVwYXJlIiwKICAgIFBSRVBBUkVfQURESVRJT05BTDogInRyYW5zcGlsZXI6YWRkaXRpb25hbDpwcmVwYXJlIiwKICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogInRyYW5zcGlsZXI6YWRkaXRpb25hbDp0cmFuc3BpbGVkIiwKICAgIFRSQU5TUElMRV9DT01QTEVURTogInRyYW5zcGlsZXI6dHJhbnNwaWxlOmNvbXBsZXRlIiwKICAgIEVSUk9SX1BSRVBBUklOR19BTkRfQ09NUElMSU5HOiAidHJhbnNwaWxlcjplcnJvcjpjb21waWxlIiwKICAgIEVSUk9SX0FERElUSU9OQUw6ICJ0cmFuc3BpbGVyOmVycm9yOmFkZGl0aW9uYWwiCn07CgpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vdW5wa2cuY29tL2NvZmZlZXNjcmlwdC9saWIvY29mZmVlc2NyaXB0LWJyb3dzZXItY29tcGlsZXItbGVnYWN5L2NvZmZlZXNjcmlwdC5qcyIpOwpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiAoX2EpIHsKICAgIHZhciBkYXRhID0gX2EuZGF0YTsKICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBmaWxlLCB0eXBlLCBjb250ZXh0LCB0cmFuc3BpbGVkRmlsZSwgZXJyb3JfMTsKICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7CiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHsKICAgICAgICAgICAgICAgIGNhc2UgMDoKICAgICAgICAgICAgICAgICAgICBmaWxlID0gZGF0YS5maWxlLCB0eXBlID0gZGF0YS50eXBlLCBjb250ZXh0ID0gZGF0YS5jb250ZXh0OwogICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGUgPT09IFRSQU5TUElMRV9TVEFUVVMuUFJFUEFSRV9GSUxFUykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTsKICAgICAgICAgICAgICAgIGNhc2UgMToKICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsIDMsICwgNF0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRyYW5zcGlsZUZpbGUoZmlsZSldOwogICAgICAgICAgICAgICAgY2FzZSAyOgogICAgICAgICAgICAgICAgICAgIHRyYW5zcGlsZWRGaWxlID0gX2Iuc2VudCgpOwogICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUKICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5UUkFOU1BJTEVfQ09NUExFVEUsCiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IHRyYW5zcGlsZWRGaWxlCiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07CiAgICAgICAgICAgICAgICBjYXNlIDM6CiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9iLnNlbnQoKTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuRVJST1JfUFJFUEFSSU5HX0FORF9DT01QSUxJTkcsCiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcl8xCiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07CiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTsKICAgICAgICAgICAgfQogICAgICAgIH0pOwogICAgfSk7Cn0pOwp2YXIgdHJhbnNwaWxlRmlsZSA9IGZ1bmN0aW9uIChmaWxlKSB7CiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgewogICAgICAgIHRyeSB7CiAgICAgICAgICAgIHZhciB0cmFuc3BpbGVkID0gQ29mZmVlU2NyaXB0LmNvbXBpbGUoZmlsZS5jb2RlLCB7CiAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZS5wYXRoLAogICAgICAgICAgICAgICAgc291cmNlTWFwOiB0cnVlCiAgICAgICAgICAgIH0pOwogICAgICAgICAgICByZXNvbHZlKF9fYXNzaWduKF9fYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiB0cmFuc3BpbGVkLmpzLCBtYXA6IEpTT04ucGFyc2UodHJhbnNwaWxlZC52M1NvdXJjZU1hcCB8fCAie30iKSB9KSk7CiAgICAgICAgfQogICAgICAgIGNhdGNoIChlKSB7CiAgICAgICAgICAgIHJlamVjdChlKTsKICAgICAgICB9CiAgICB9KTsKfTsKCg==', null, false);
/* eslint-enable */var CoffeescriptTranspiler = /** @class */ (function (_super) {
    __extends(CoffeescriptTranspiler, _super);
    function CoffeescriptTranspiler(context) {
        var _this = _super.call(this, "coffeescript-transpiler", new WorkerFactory$7(), context) || this;
        _this.additionalTranspilers = {};
        return _this;
    }
    CoffeescriptTranspiler.prototype.transpile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doTranspile(file)];
            });
        });
    };
    return CoffeescriptTranspiler;
}(Transpiler));
//# sourceMappingURL=index.js.map
function coffeescriptTransformer(context) {
    var transformerName = "packager::transformer::coffeescript-transformer";
    var isCoffeescript = verifyExtensions([".coffee"]);
    var transpiler;
    return {
        name: transformerName,
        transform: function (code, modulePath) {
            return __awaiter(this, void 0, Promise, function () {
                var file_1, completed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isCoffeescript(modulePath)) return [3 /*break*/, 2];
                            transpiler = context.cache.transpilers.get("coffeescript-transpiler");
                            if (!transpiler) {
                                transpiler = new CoffeescriptTranspiler(context);
                                context.cache.transpilers.set("coffeescript-transpiler", transpiler);
                            }
                            file_1 = context.files.find(function (f) { return f.path === modulePath; });
                            return [4 /*yield*/, context.transpileQueue.push("Coffeescript-Transpiler", function () { return transpiler.transpile(__assign(__assign({}, file_1), { code: code })); })];
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
    jsonTransformer(context),
    coffeescriptTransformer(context)
]; });
//# sourceMappingURL=index.js.map
var parsePackagePath = (function (name) {
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
var cleanupExternalDependency = function (code) {
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
var pluginHooksMap = {
    resolver: "resolveId",
    loader: "load",
    transform: "transformer"
};
var pluginHooks = ["resolver", "loader", "transformer"];
var reducePluginArgs = function (pluginArgs) {
    return Object.keys(pluginArgs).reduce(function (acc, curr) {
        var _a;
        if (curr === "name") {
            return __assign(__assign({}, acc), { name: pluginArgs["name"] });
        }
        if (curr === "worker") {
            return __assign(__assign({}, acc), { worker: pluginArgs["worker"] });
        }
        if (pluginHooks.includes(curr)) {
            var hookId = pluginHooksMap[curr];
            return __assign(__assign({}, acc), { hooks: __assign(__assign({}, acc.hooks), (_a = {}, _a[hookId] = pluginArgs[curr], _a)) });
        }
        return acc;
    }, {});
};
var createPlugin = function (args) {
    return reducePluginArgs(args);
};
//# sourceMappingURL=create-plugin.js.map
var plugins = new Map();
var bindContextToHooks = function (context, hooks) {
    return hooks
        ? Object.keys(hooks).reduce(function (acc, curr) {
            var _a;
            var boundHook = hooks[curr].bind(context);
            return __assign(__assign({}, acc), (_a = {}, _a[curr] = boundHook, _a));
        }, {})
        : null;
};
var pluginManager = function (files) {
    var context = { files: files };
    return {
        registerPlugin: function (plugin) {
            var hooks = bindContextToHooks(context, plugin.hooks);
            plugins.set(plugin.name, __assign(__assign({}, plugin), hooks));
        },
        getPlugins: function () {
            return Array.from(plugins.entries()).reduce(function (acc, val) {
                var _a;
                return (__assign(__assign({}, acc), (_a = {}, _a[val[0]] = val[1] || null, _a)));
            }, {});
        }
    };
};
//# sourceMappingURL=plugin-manager.js.map
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
            var entryFile, packageJson, parsed, pkgBundleOptions, manager, vuePlugin, bundle, output, e_1;
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
                        manager = pluginManager(this.files);
                        vuePlugin = createPlugin({
                            name: "vue-plugin",
                            resolver: function (moduleId) {
                                {
                                    return null;
                                }
                            }
                        });
                        manager.registerPlugin(vuePlugin);
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