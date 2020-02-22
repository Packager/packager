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
    PREPARE_FILES: "TRANSPILER:FILE:PREPARE",
    PREPARE_ADDITIONAL: "TRANSPILER:ADDITIONAL:PREPARE",
    ADDITIONAL_TRANSPILED: "TRANSPILER:ADDITIONAL:TRANSPILED",
    TRANSPILE_COMPLETE: "TRANSPILER:TRANSPILE:COMPLETE",
    ERROR_COMPILE: "TRANSPILER:ERROR:COMPILE",
    ERROR_ADDITIONAL: "TRANSPILER:ERROR:ADDITIONAL"
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
                                    type === TRANSPILE_STATUS.ERROR_COMPILE) {
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
const WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0NCg0KZnVuY3Rpb24gX192YWx1ZXMobykgew0KICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gImZ1bmN0aW9uIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwOw0KICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pOw0KICAgIHJldHVybiB7DQogICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHsNCiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7DQogICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07DQogICAgICAgIH0NCiAgICB9Ow0KfQoKdmFyIGFic29sdXRlUGF0aCA9IC9eKD86XC98KD86W0EtWmEtel06KT9bXFx8XC9dKS87CmZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aCkgewogICAgcmV0dXJuIGFic29sdXRlUGF0aC50ZXN0KHBhdGgpOwp9CmZ1bmN0aW9uIGRpcm5hbWUocGF0aCkgewogICAgdmFyIG1hdGNoID0gLyhcL3xcXClbXlwvXFxdKiQvLmV4ZWMocGF0aCk7CiAgICBpZiAoIW1hdGNoKQogICAgICAgIHJldHVybiAiLiI7CiAgICB2YXIgZGlyID0gcGF0aC5zbGljZSgwLCAtbWF0Y2hbMF0ubGVuZ3RoKTsKICAgIC8vIElmIGBkaXJgIGlzIHRoZSBlbXB0eSBzdHJpbmcsIHdlJ3JlIGF0IHJvb3QuCiAgICByZXR1cm4gZGlyID8gZGlyIDogIi8iOwp9CmZ1bmN0aW9uIHJlc29sdmUoKSB7CiAgICB2YXIgcGF0aHMgPSBbXTsKICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7CiAgICAgICAgcGF0aHNbX2ldID0gYXJndW1lbnRzW19pXTsKICAgIH0KICAgIHZhciByZXNvbHZlZFBhcnRzID0gcGF0aHMuc2hpZnQoKS5zcGxpdCgvW1wvXFxdLyk7CiAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uIChwYXRoKSB7CiAgICAgICAgaWYgKGlzQWJzb2x1dGUocGF0aCkpIHsKICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cyA9IHBhdGguc3BsaXQoL1tcL1xcXS8pOwogICAgICAgIH0KICAgICAgICBlbHNlIHsKICAgICAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgvW1wvXFxdLyk7CiAgICAgICAgICAgIHdoaWxlIChwYXJ0c1swXSA9PT0gIi4iIHx8IHBhcnRzWzBdID09PSAiLi4iKSB7CiAgICAgICAgICAgICAgICB2YXIgcGFydCA9IHBhcnRzLnNoaWZ0KCk7CiAgICAgICAgICAgICAgICBpZiAocGFydCA9PT0gIi4uIikgewogICAgICAgICAgICAgICAgICAgIHJlc29sdmVkUGFydHMucG9wKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cy5wdXNoLmFwcGx5KHJlc29sdmVkUGFydHMsIHBhcnRzKTsKICAgICAgICB9CiAgICB9KTsKICAgIHJldHVybiBub3JtYWxpemUocmVzb2x2ZWRQYXJ0cy5qb2luKCIvIikpOwp9CmZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoKSB7CiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cL1wvL2dpLCAiLyIpOwp9Cgp2YXIgVFJBTlNQSUxFX1NUQVRVUyA9IHsKICAgIFBSRVBBUkVfRklMRVM6ICJUUkFOU1BJTEVSOkZJTEU6UFJFUEFSRSIsCiAgICBQUkVQQVJFX0FERElUSU9OQUw6ICJUUkFOU1BJTEVSOkFERElUSU9OQUw6UFJFUEFSRSIsCiAgICBBRERJVElPTkFMX1RSQU5TUElMRUQ6ICJUUkFOU1BJTEVSOkFERElUSU9OQUw6VFJBTlNQSUxFRCIsCiAgICBUUkFOU1BJTEVfQ09NUExFVEU6ICJUUkFOU1BJTEVSOlRSQU5TUElMRTpDT01QTEVURSIsCiAgICBFUlJPUl9DT01QSUxFOiAiVFJBTlNQSUxFUjpFUlJPUjpDT01QSUxFIiwKICAgIEVSUk9SX0FERElUSU9OQUw6ICJUUkFOU1BJTEVSOkVSUk9SOkFERElUSU9OQUwiCn07CgpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vdW5wa2cuY29tL3Nhc3MuanNAbGF0ZXN0L2Rpc3Qvc2Fzcy5zeW5jLmpzIik7CnNlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsIGZ1bmN0aW9uIChfYSkgewogICAgdmFyIGRhdGEgPSBfYS5kYXRhOwogICAgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgdmFyIGZpbGUsIHR5cGUsIGNvbnRleHQsIHRyYW5zcGlsZWRGaWxlLCBlcnJvcl8xOwogICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHsKICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkgewogICAgICAgICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICAgICAgICAgIGZpbGUgPSBkYXRhLmZpbGUsIHR5cGUgPSBkYXRhLnR5cGUsIGNvbnRleHQgPSBkYXRhLmNvbnRleHQ7CiAgICAgICAgICAgICAgICAgICAgaWYgKCEodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0ZJTEVTKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07CiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxOwogICAgICAgICAgICAgICAgY2FzZSAxOgogICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgMywgLCA0XSk7CiAgICAgICAgICAgICAgICAgICAgc2V0dXBTYXNzKGNvbnRleHQpOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRyYW5zcGlsZUZpbGUoZmlsZSldOwogICAgICAgICAgICAgICAgY2FzZSAyOgogICAgICAgICAgICAgICAgICAgIHRyYW5zcGlsZWRGaWxlID0gX2Iuc2VudCgpOwogICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUKICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5UUkFOU1BJTEVfQ09NUExFVEUsCiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IHRyYW5zcGlsZWRGaWxlCiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07CiAgICAgICAgICAgICAgICBjYXNlIDM6CiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9iLnNlbnQoKTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuRVJST1JfQ09NUElMRSwKICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXzEKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTsKICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dOwogICAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICB9KTsKfSk7CnZhciBzZXR1cFNhc3MgPSBmdW5jdGlvbiAoY29udGV4dCkgewogICAgdmFyIGVfMSwgX2E7CiAgICB2YXIgc2Fzc0ZpbGVzID0gY29udGV4dC5maWxlcy5maWx0ZXIoZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYucGF0aC5lbmRzV2l0aCgiLnNhc3MiKSB8fCBmLnBhdGguZW5kc1dpdGgoIi5zY3NzIik7IH0pOwogICAgU2Fzcy53cml0ZUZpbGUoc2Fzc0ZpbGVzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjdXJyKSB7CiAgICAgICAgdmFyIF9hOwogICAgICAgIHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIGFjYyksIChfYSA9IHt9LCBfYVtjdXJyLnBhdGhdID0gY3Vyci5jb2RlLCBfYSkpKTsKICAgIH0sIHt9KSk7CiAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChmaWxlKSB7CiAgICAgICAgU2Fzcy5pbXBvcnRlcihmdW5jdGlvbiAocmVxdWVzdCwgZG9uZSkgewogICAgICAgICAgICByZXR1cm4gaW1wb3J0ZXIoZmlsZSwgc2Fzc0ZpbGVzLCByZXF1ZXN0LCBkb25lKTsKICAgICAgICB9KTsKICAgIH07CiAgICB0cnkgewogICAgICAgIGZvciAodmFyIHNhc3NGaWxlc18xID0gX192YWx1ZXMoc2Fzc0ZpbGVzKSwgc2Fzc0ZpbGVzXzFfMSA9IHNhc3NGaWxlc18xLm5leHQoKTsgIXNhc3NGaWxlc18xXzEuZG9uZTsgc2Fzc0ZpbGVzXzFfMSA9IHNhc3NGaWxlc18xLm5leHQoKSkgewogICAgICAgICAgICB2YXIgZmlsZSA9IHNhc3NGaWxlc18xXzEudmFsdWU7CiAgICAgICAgICAgIF9sb29wXzEoZmlsZSk7CiAgICAgICAgfQogICAgfQogICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH0KICAgIGZpbmFsbHkgewogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGlmIChzYXNzRmlsZXNfMV8xICYmICFzYXNzRmlsZXNfMV8xLmRvbmUgJiYgKF9hID0gc2Fzc0ZpbGVzXzEucmV0dXJuKSkgX2EuY2FsbChzYXNzRmlsZXNfMSk7CiAgICAgICAgfQogICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH0KICAgIH0KfTsKdmFyIGltcG9ydGVyID0gZnVuY3Rpb24gKGZpbGUsIHNhc3NGaWxlcywgcmVxdWVzdCwgZG9uZSkgewogICAgdmFyIHBhdGggPSByZXNvbHZlKGRpcm5hbWUoZmlsZS5wYXRoKSwgcmVxdWVzdC5jdXJyZW50KTsKICAgIHZhciBwb3RlbnRpYWxQYXRocyA9IFNhc3MuZ2V0UGF0aFZhcmlhdGlvbnMocGF0aCk7CiAgICB2YXIgYWN0dWFsRmlsZSA9IHNhc3NGaWxlcy5maW5kKGZ1bmN0aW9uIChmaWxlKSB7IHJldHVybiB+cG90ZW50aWFsUGF0aHMuaW5kZXhPZihmaWxlLnBhdGgpOyB9KTsKICAgIGlmIChhY3R1YWxGaWxlICYmIGFjdHVhbEZpbGUucGF0aCkgewogICAgICAgIHJldHVybiBkb25lKHsKICAgICAgICAgICAgcGF0aDogYWN0dWFsRmlsZS5wYXRoLAogICAgICAgICAgICBjb250ZW50czogYWN0dWFsRmlsZS5jb2RlCiAgICAgICAgfSk7CiAgICB9CiAgICBlbHNlIHsKICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRoZSBmaWxlICIgKyByZXF1ZXN0LmN1cnJlbnQgKyAiIGRvZXMgbm90IGV4aXN0Iik7CiAgICB9Cn07CnZhciB0cmFuc3BpbGVGaWxlID0gZnVuY3Rpb24gKGZpbGUpIHsKICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7CiAgICAgICAgU2Fzcy5vcHRpb25zKHsKICAgICAgICAgICAgaW5kZW50ZWRTeW50YXg6IGZpbGUucGF0aC5lbmRzV2l0aCgiLnNhc3MiKSB8fCBmaWxlLmxhbmcgPT09ICJzYXNzIgogICAgICAgIH0pOwogICAgICAgIFNhc3MuY29tcGlsZShmaWxlLmNvZGUsIGZ1bmN0aW9uIChyZXN1bHQpIHsKICAgICAgICAgICAgaWYgKHJlc3VsdC5mb3JtYXR0ZWQpIHsKICAgICAgICAgICAgICAgIHJlamVjdChyZXN1bHQuZm9ybWF0dGVkKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICAgIHJlc29sdmUoX19hc3NpZ24oX19hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGU6IHJlc3VsdC50ZXh0LCBtYXA6IHJlc3VsdC5tYXAgfSkpOwogICAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICB9KTsKfTsKCg==', null, false);
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
const WorkerFactory$1 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0KCnZhciBUUkFOU1BJTEVfU1RBVFVTID0gewogICAgUFJFUEFSRV9GSUxFUzogIlRSQU5TUElMRVI6RklMRTpQUkVQQVJFIiwKICAgIFBSRVBBUkVfQURESVRJT05BTDogIlRSQU5TUElMRVI6QURESVRJT05BTDpQUkVQQVJFIiwKICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogIlRSQU5TUElMRVI6QURESVRJT05BTDpUUkFOU1BJTEVEIiwKICAgIFRSQU5TUElMRV9DT01QTEVURTogIlRSQU5TUElMRVI6VFJBTlNQSUxFOkNPTVBMRVRFIiwKICAgIEVSUk9SX0NPTVBJTEU6ICJUUkFOU1BJTEVSOkVSUk9SOkNPTVBJTEUiLAogICAgRVJST1JfQURESVRJT05BTDogIlRSQU5TUElMRVI6RVJST1I6QURESVRJT05BTCIKfTsKCnNlbGYuaW1wb3J0U2NyaXB0cygiaHR0cHM6Ly91bnBrZy5jb20vQGJsb3h5L2lpZmUtbGlic0BsYXRlc3QvbGlicy9zdHlsdXMuanMiKTsKc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZnVuY3Rpb24gKF9hKSB7CiAgICB2YXIgZGF0YSA9IF9hLmRhdGE7CiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgZmlsZSwgdHlwZSwgY29udGV4dCwgdHJhbnNwaWxlZEZpbGUsIGVycm9yXzE7CiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikgewogICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7CiAgICAgICAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgICAgICAgICAgZmlsZSA9IGRhdGEuZmlsZSwgdHlwZSA9IGRhdGEudHlwZSwgY29udGV4dCA9IGRhdGEuY29udGV4dDsKICAgICAgICAgICAgICAgICAgICBpZiAoISh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLlBSRVBBUkVfRklMRVMpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTsKICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7CiAgICAgICAgICAgICAgICBjYXNlIDE6CiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0cmFuc3BpbGVGaWxlKGZpbGUpXTsKICAgICAgICAgICAgICAgIGNhc2UgMjoKICAgICAgICAgICAgICAgICAgICB0cmFuc3BpbGVkRmlsZSA9IF9iLnNlbnQoKTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLAogICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiB0cmFuc3BpbGVkRmlsZQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgY2FzZSAzOgogICAgICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYi5zZW50KCk7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX0NPTVBJTEUsCiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcl8xCiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07CiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTsKICAgICAgICAgICAgfQogICAgICAgIH0pOwogICAgfSk7Cn0pOwp2YXIgdHJhbnNwaWxlRmlsZSA9IGZ1bmN0aW9uIChmaWxlKSB7CiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgewogICAgICAgIHN0eWx1cyhmaWxlLmNvZGUpCiAgICAgICAgICAgIC5zZXQoImZpbGVuYW1lIiwgZmlsZS5wYXRoKQogICAgICAgICAgICAucmVuZGVyKGZ1bmN0aW9uIChlcnIsIGNzcykgewogICAgICAgICAgICBpZiAoZXJyKSB7CiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICAgIHJlc29sdmUoX19hc3NpZ24oX19hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGU6IGNzcyB9KSk7CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgIH0pOwp9OwoK', null, false);
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
const WorkerFactory$2 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0KCnZhciBhYnNvbHV0ZVBhdGggPSAvXig/OlwvfCg/OltBLVphLXpdOik/W1xcfFwvXSkvOwpmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGgpIHsKICAgIHJldHVybiBhYnNvbHV0ZVBhdGgudGVzdChwYXRoKTsKfQpmdW5jdGlvbiByZXNvbHZlKCkgewogICAgdmFyIHBhdGhzID0gW107CiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykgewogICAgICAgIHBhdGhzW19pXSA9IGFyZ3VtZW50c1tfaV07CiAgICB9CiAgICB2YXIgcmVzb2x2ZWRQYXJ0cyA9IHBhdGhzLnNoaWZ0KCkuc3BsaXQoL1tcL1xcXS8pOwogICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbiAocGF0aCkgewogICAgICAgIGlmIChpc0Fic29sdXRlKHBhdGgpKSB7CiAgICAgICAgICAgIHJlc29sdmVkUGFydHMgPSBwYXRoLnNwbGl0KC9bXC9cXF0vKTsKICAgICAgICB9CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoL1tcL1xcXS8pOwogICAgICAgICAgICB3aGlsZSAocGFydHNbMF0gPT09ICIuIiB8fCBwYXJ0c1swXSA9PT0gIi4uIikgewogICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0cy5zaGlmdCgpOwogICAgICAgICAgICAgICAgaWYgKHBhcnQgPT09ICIuLiIpIHsKICAgICAgICAgICAgICAgICAgICByZXNvbHZlZFBhcnRzLnBvcCgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJlc29sdmVkUGFydHMucHVzaC5hcHBseShyZXNvbHZlZFBhcnRzLCBwYXJ0cyk7CiAgICAgICAgfQogICAgfSk7CiAgICByZXR1cm4gbm9ybWFsaXplKHJlc29sdmVkUGFydHMuam9pbigiLyIpKTsKfQpmdW5jdGlvbiBub3JtYWxpemUocGF0aCkgewogICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXC9cLy9naSwgIi8iKTsKfQoKdmFyIFRSQU5TUElMRV9TVEFUVVMgPSB7CiAgICBQUkVQQVJFX0ZJTEVTOiAiVFJBTlNQSUxFUjpGSUxFOlBSRVBBUkUiLAogICAgUFJFUEFSRV9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlBSRVBBUkUiLAogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlRSQU5TUElMRUQiLAogICAgVFJBTlNQSUxFX0NPTVBMRVRFOiAiVFJBTlNQSUxFUjpUUkFOU1BJTEU6Q09NUExFVEUiLAogICAgRVJST1JfQ09NUElMRTogIlRSQU5TUElMRVI6RVJST1I6Q09NUElMRSIsCiAgICBFUlJPUl9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpFUlJPUjpBRERJVElPTkFMIgp9OwoKLy8gQHRzLWlnbm9yZQpzZWxmLndpbmRvdyA9IHNlbGY7Ci8vIEB0cy1pZ25vcmUKc2VsZi53aW5kb3cuZG9jdW1lbnQgPSB7CiAgICBjdXJyZW50U2NyaXB0OiB7IGFzeW5jOiB0cnVlIH0sCiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAoKSB7IHJldHVybiAoeyBhcHBlbmRDaGlsZDogZnVuY3Rpb24gKCkgeyB9IH0pOyB9LAogICAgY3JlYXRlVGV4dE5vZGU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7fSk7IH0sCiAgICBnZXRFbGVtZW50c0J5VGFnTmFtZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH0sCiAgICBoZWFkOiB7IGFwcGVuZENoaWxkOiBmdW5jdGlvbiAoKSB7IH0sIHJlbW92ZUNoaWxkOiBmdW5jdGlvbiAoKSB7IH0gfQp9OwpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbGVzcyIpOwpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiAoX2EpIHsKICAgIHZhciBkYXRhID0gX2EuZGF0YTsKICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBmaWxlLCB0eXBlLCBjb250ZXh0LCBvcHRpb25zLCB0cmFuc3BpbGVkRmlsZSwgZXJyb3JfMTsKICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7CiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHsKICAgICAgICAgICAgICAgIGNhc2UgMDoKICAgICAgICAgICAgICAgICAgICBmaWxlID0gZGF0YS5maWxlLCB0eXBlID0gZGF0YS50eXBlLCBjb250ZXh0ID0gZGF0YS5jb250ZXh0OwogICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGUgPT09IFRSQU5TUElMRV9TVEFUVVMuUFJFUEFSRV9GSUxFUykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTsKICAgICAgICAgICAgICAgIGNhc2UgMToKICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsIDMsICwgNF0pOwogICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbnM6IFttYW5hZ2VyKGNvbnRleHQsIGZpbGUucGF0aCldLAogICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVVybHM6IHRydWUsCiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlLnBhdGgKICAgICAgICAgICAgICAgICAgICB9OwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRyYW5zcGlsZUZpbGUoZmlsZSwgb3B0aW9ucyldOwogICAgICAgICAgICAgICAgY2FzZSAyOgogICAgICAgICAgICAgICAgICAgIHRyYW5zcGlsZWRGaWxlID0gX2Iuc2VudCgpOwogICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUKICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5UUkFOU1BJTEVfQ09NUExFVEUsCiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IHRyYW5zcGlsZWRGaWxlCiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07CiAgICAgICAgICAgICAgICBjYXNlIDM6CiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9iLnNlbnQoKTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuRVJST1JfQ09NUElMRSwKICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXzEKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTsKICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dOwogICAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICB9KTsKfSk7CnZhciB0cmFuc3BpbGVGaWxlID0gZnVuY3Rpb24gKGZpbGUsIG9wdGlvbnMpIHsKICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7CiAgICAgICAgbGVzcy5yZW5kZXIoZmlsZS5jb2RlLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7CiAgICAgICAgICAgIGlmIChlcnIpIHsKICAgICAgICAgICAgICAgIHJlamVjdChlcnIpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgcmVzb2x2ZShfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZmlsZSksIHsgY29kZTogZGF0YS5jc3MgfSkpOwogICAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICB9KTsKfTsKdmFyIG1hbmFnZXIgPSBmdW5jdGlvbiAoY29udGV4dCwgcGFyZW50UGF0aCkgewogICAgdmFyIGxlc3NNYW5hZ2VyID0gbmV3IGxlc3MuRmlsZU1hbmFnZXIoKTsKICAgIGxlc3NNYW5hZ2VyLmxvYWRGaWxlID0gZnVuY3Rpb24gKGZpbGVuYW1lLCBjdXJyZW50RGlyZWN0b3J5KSB7CiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlJDEsIHJlamVjdCkgewogICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgdmFyIHJlbGF0aXZlUGF0aF8xID0gcmVzb2x2ZShjdXJyZW50RGlyZWN0b3J5LCBmaWxlbmFtZSk7CiAgICAgICAgICAgICAgICB2YXIgZm91bmRGaWxlID0gY29udGV4dC5maWxlcy5maW5kKGZ1bmN0aW9uIChmaWxlKSB7IHJldHVybiBmaWxlLnBhdGggPT09IHJlbGF0aXZlUGF0aF8xOyB9KTsKICAgICAgICAgICAgICAgIGlmIChmb3VuZEZpbGUpIHsKICAgICAgICAgICAgICAgICAgICByZXNvbHZlJDEoeyBjb250ZW50czogZm91bmRGaWxlLmNvZGUsIGZpbGVuYW1lOiBmaWxlbmFtZSB9KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgICAgIHZhciByZXRyaWVkRmlsZSA9IHJldHJ5RmlsZXMocmVsYXRpdmVQYXRoXzEsIGNvbnRleHQpOwogICAgICAgICAgICAgICAgICAgIGlmIChyZXRyaWVkRmlsZSkgewogICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlJDEoeyBjb250ZW50czogcmV0cmllZEZpbGUuY29kZSwgZmlsZW5hbWU6IGZpbGVuYW1lIH0pOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJDb3VsZCBub3QgbG9hZCAiICsgZmlsZW5hbWUgKyAiIGZyb20gIiArIHBhcmVudFBhdGgpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBjYXRjaCAoZSkgewogICAgICAgICAgICAgICAgcmVqZWN0KGUpOwogICAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICB9OwogICAgcmV0dXJuIHsKICAgICAgICBpbnN0YWxsOiBmdW5jdGlvbiAoaW5zdGFuY2UsIHBsdWdpbk1hbmFnZXIpIHsKICAgICAgICAgICAgcGx1Z2luTWFuYWdlci5hZGRGaWxlTWFuYWdlcihsZXNzTWFuYWdlcik7CiAgICAgICAgfQogICAgfTsKfTsKdmFyIHJldHJ5RmlsZXMgPSBmdW5jdGlvbiAocGF0aCwgY29udGV4dCkgewogICAgcmV0dXJuIGNvbnRleHQuZmlsZXMuZmluZChmdW5jdGlvbiAoZmlsZSkgewogICAgICAgIHJldHVybiBmaWxlLnBhdGggPT09IHBhdGggfHwKICAgICAgICAgICAgZmlsZS5wYXRoID09PSBwYXRoICsgIi5sZXNzIiB8fAogICAgICAgICAgICBmaWxlLnBhdGggPT09IHBhdGggKyAiLmNzcyI7CiAgICB9KTsKfTsKCg==', null, false);
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
const WorkerFactory$3 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0NCg0KZnVuY3Rpb24gX192YWx1ZXMobykgew0KICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gImZ1bmN0aW9uIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwOw0KICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pOw0KICAgIHJldHVybiB7DQogICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHsNCiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7DQogICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07DQogICAgICAgIH0NCiAgICB9Ow0KfQoKdmFyIGdlbmVyYXRlRXhwb3J0ID0gZnVuY3Rpb24gKGZpbGUsIHByZXBlbmRFeHBvcnREZWZhdWx0KSB7CiAgICBpZiAocHJlcGVuZEV4cG9ydERlZmF1bHQgPT09IHZvaWQgMCkgeyBwcmVwZW5kRXhwb3J0RGVmYXVsdCA9IHRydWU7IH0KICAgIHJldHVybiAoKHByZXBlbmRFeHBvcnREZWZhdWx0ID8gImV4cG9ydCBkZWZhdWx0ICIgOiAiIikgKyAiZnVuY3Rpb24gYWRkU3R5bGVzICgpIHsiICsKICAgICAgICAiY29uc3QgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTsiICsKICAgICAgICAidGFnLnR5cGUgPSAndGV4dC9jc3MnOyIgKwogICAgICAgICgidGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAiICsgZmlsZS5jb2RlICsgImApKTsiKSArCiAgICAgICAgKCJ0YWcuc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsICciICsgZmlsZS5wYXRoICsgIicpOyIpICsKICAgICAgICAiZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWcpOyIgKwogICAgICAgICJ9IGFkZFN0eWxlcygpOyIpOwp9Owp2YXIgZ2VuZXJhdGVFeHBvcnRzRm9yQWxsU3R5bGVzID0gZnVuY3Rpb24gKHN0eWxlcywgZmlsZVBhdGgpIHsgcmV0dXJuIGdlbmVyYXRlRXhwb3J0KHsgcGF0aDogZmlsZVBhdGgsIGNvZGU6IHN0eWxlcy5qb2luKCJcblxuIikgfSwgZmFsc2UpOyB9OwoKdmFyIFRSQU5TUElMRV9TVEFUVVMgPSB7CiAgICBQUkVQQVJFX0ZJTEVTOiAiVFJBTlNQSUxFUjpGSUxFOlBSRVBBUkUiLAogICAgUFJFUEFSRV9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlBSRVBBUkUiLAogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlRSQU5TUElMRUQiLAogICAgVFJBTlNQSUxFX0NPTVBMRVRFOiAiVFJBTlNQSUxFUjpUUkFOU1BJTEU6Q09NUExFVEUiLAogICAgRVJST1JfQ09NUElMRTogIlRSQU5TUElMRVI6RVJST1I6Q09NUElMRSIsCiAgICBFUlJPUl9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpFUlJPUjpBRERJVElPTkFMIgp9OwoKLyoqCiAqIEB0b2RvIEZpeCBzb3VyY2VtYXBzIGJlY2F1c2UgdGhleSdyZSBpbmFjY3VyYXRlLgogKi8Kc2VsZi5pbXBvcnRTY3JpcHRzKCJodHRwczovL3VucGtnLmNvbS9zb3VyY2UtbWFwL2Rpc3Qvc291cmNlLW1hcC5qcyIpOwp2YXIgZ2VuZXJhdGVTb3VyY2VNYXAkMSA9IGZ1bmN0aW9uIChmaWxlUGF0aCwgb3JpZ2luYWxDb2RlLCBnZW5lcmF0ZWRDb2RlKSB7CiAgICAvLyBAdHMtaWdub3JlCiAgICB2YXIgbWFwID0gbmV3IHNlbGYuc291cmNlTWFwLlNvdXJjZU1hcEdlbmVyYXRvcih7IGZpbGU6IGZpbGVQYXRoIH0pOwogICAgbWFwLnNldFNvdXJjZUNvbnRlbnQoZmlsZVBhdGgsIG9yaWdpbmFsQ29kZSk7CiAgICBnZW5lcmF0ZWRDb2RlLnNwbGl0KC9ccj9cbi9nKS5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lLCBpbmRleCkgewogICAgICAgIGlmIChsaW5lKSB7CiAgICAgICAgICAgIG1hcC5hZGRNYXBwaW5nKHsKICAgICAgICAgICAgICAgIHNvdXJjZTogZmlsZVBhdGgsCiAgICAgICAgICAgICAgICBvcmlnaW5hbDogeyBsaW5lOiBpbmRleCArIDEsIGNvbHVtbjogMCB9LAogICAgICAgICAgICAgICAgZ2VuZXJhdGVkOiB7IGxpbmU6IGluZGV4ICsgMSwgY29sdW1uOiAwIH0KICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgfSk7CiAgICByZXR1cm4gbWFwLnRvSlNPTigpOwp9OwovLyBAdHMtaWdub3JlCnNlbGYuZ2VuZXJhdGVTb3VyY2VNYXAgPSBnZW5lcmF0ZVNvdXJjZU1hcCQxOwoKc2VsZi5pbXBvcnRTY3JpcHRzKCJodHRwczovL3VucGtnLmNvbS92dWUtdGVtcGxhdGUtY29tcGlsZXIvYnJvd3Nlci5qcyIsICJodHRwczovL3VucGtnLmNvbS9oYXNoLXN1bS1icm93c2VyL2Rpc3QvaW5kZXgubWluLmpzIiwgImh0dHBzOi8vdW5wa2cuY29tL0BibG94eS9paWZlLWxpYnNAbGF0ZXN0L2xpYnMvYnVibGUuanMiLCAiaHR0cHM6Ly91bnBrZy5jb20vQGJsb3h5L2lpZmUtbGlic0BsYXRlc3QvbGlicy9jc3MuanMiLCAiaHR0cHM6Ly91bnBrZy5jb20vQGJsb3h5L2lpZmUtbGlic0BsYXRlc3QvbGlicy9wb3N0Y3NzLXNlbGVjdG9yLXBhcnNlci5qcyIpOwpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiAoX2EpIHsKICAgIHZhciBkYXRhID0gX2EuZGF0YTsKICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBmaWxlLCB0eXBlLCBhZGRpdGlvbmFsLCBfYiwgc3R5bGVzLCBzY3JpcHQsIGh0bWwsIGFkZGl0aW9uYWxfMSwgY29kZTsKICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7CiAgICAgICAgICAgIGZpbGUgPSBkYXRhLmZpbGUsIHR5cGUgPSBkYXRhLnR5cGUsIGFkZGl0aW9uYWwgPSBkYXRhLmFkZGl0aW9uYWw7CiAgICAgICAgICAgIGlmICh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLlBSRVBBUkVfRklMRVMpIHsKICAgICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlIHx8ICFmaWxlLnBhdGgpCiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiRmlsZSBpc24ndCBzdXBwbGllZCBvciBpdCBoYXMgYW4gaW5jb3JyZWN0IGZvcm1hdC4iKTsKICAgICAgICAgICAgICAgICAgICBfYiA9IHByZXBhcmVGaWxlQW5kQ29tcGlsZVRlbXBsYXRlKGZpbGUpLCBzdHlsZXMgPSBfYi5zdHlsZXMsIHNjcmlwdCA9IF9iLnNjcmlwdCwgaHRtbCA9IF9iLmh0bWw7CiAgICAgICAgICAgICAgICAgICAgaWYgKChzdHlsZXMgfHwgaHRtbCkgJiYgKHN0eWxlcy5sZW5ndGggfHwgaHRtbC5sZW5ndGgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfMSA9IHsgc3R5bGVzOiBzdHlsZXMsIGh0bWw6IGh0bWwgfTsKICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuUFJFUEFSRV9BRERJVElPTkFMLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogX19hc3NpZ24oX19hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGU6IHNjcmlwdCB9KSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWw6IGFkZGl0aW9uYWxfMQogICAgICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLlRSQU5TUElMRV9DT01QTEVURSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiBzY3JpcHQsIG1hcDogZ2VuZXJhdGVTb3VyY2VNYXAoZmlsZS5wYXRoLCBmaWxlLmNvZGUsIHNjcmlwdCkgfSkKICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX0NPTVBJTEUsCiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcgogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLkFERElUSU9OQUxfVFJBTlNQSUxFRCkgewogICAgICAgICAgICAgICAgY29kZSA9IGZpbGUuY29kZTsKICAgICAgICAgICAgICAgIGlmIChhZGRpdGlvbmFsKSB7CiAgICAgICAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSBzdHlsZSBpbmplY3RvciBoZXJlCiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZyB3aXRoIGh0bWwgc3R1ZmYgaGVyZSBsaWtlIHZ1ZSBwdWcuIGJ1dCBsYXRlci4KICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29kZSArIHN0eWxlcwogICAgICAgICAgICAgICAgICAgICAgICBjb2RlICs9IGFwcGVuZFN0eWxlcyhhZGRpdGlvbmFsLnN0eWxlcywgZmlsZS5wYXRoKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX0FERElUSU9OQUwsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IKICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlCiAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLlRSQU5TUElMRV9DT01QTEVURSwKICAgICAgICAgICAgICAgICAgICBmaWxlOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZmlsZSksIHsgY29kZTogY29kZSwgbWFwOiBnZW5lcmF0ZVNvdXJjZU1hcChmaWxlLnBhdGgsIGZpbGUuY29kZSwgY29kZSkgfSkKICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTsKICAgICAgICB9KTsKICAgIH0pOwp9KTsKdmFyIHByZXBhcmVGaWxlQW5kQ29tcGlsZVRlbXBsYXRlID0gZnVuY3Rpb24gKGZpbGUpIHsKICAgIHZhciBfYSA9IFZ1ZVRlbXBsYXRlQ29tcGlsZXIucGFyc2VDb21wb25lbnQoZmlsZS5jb2RlLCB7IHBhZDogImxpbmUiIH0pLCB0ZW1wbGF0ZSA9IF9hLnRlbXBsYXRlLCBzY3JpcHQgPSBfYS5zY3JpcHQsIHN0eWxlcyA9IF9hLnN0eWxlczsKICAgIHZhciBzY29wZUlkID0gImRhdGEtdi0iICsgaGFzaFN1bShmaWxlLnBhdGgpOwogICAgdmFyIHNjb3BlZCA9IHN0eWxlcy5zb21lKGZ1bmN0aW9uIChzdHlsZSkgeyByZXR1cm4gc3R5bGUuc2NvcGVkID09PSB0cnVlOyB9KTsKICAgIHJldHVybiB7CiAgICAgICAgc3R5bGVzOiBwcmVwYXJlU3R5bGVzKHN0eWxlcywgc2NvcGVkID8gc2NvcGVJZCA6IG51bGwsIGZpbGUpLAogICAgICAgIGh0bWw6IFtdLAogICAgICAgIHNjcmlwdDogY29tcGlsZVRlbXBsYXRlKHNjcmlwdC5jb250ZW50LCB0ZW1wbGF0ZSwgc2NvcGVJZCwgc2NvcGVkKQogICAgfTsKfTsKdmFyIHByZXBhcmVTdHlsZXMgPSBmdW5jdGlvbiAoc3R5bGVzLCBzY29wZUlkLCBmaWxlKSB7CiAgICBpZiAoc3R5bGVzID09PSB2b2lkIDApIHsgc3R5bGVzID0gW107IH0KICAgIHJldHVybiBzdHlsZXMubWFwKGZ1bmN0aW9uIChzdHlsZSkgeyByZXR1cm4gKHsKICAgICAgICBjb2RlOiBzdHlsZS5jb250ZW50LAogICAgICAgIGxhbmc6IHN0eWxlLmxhbmcgfHwgImNzcyIsCiAgICAgICAgc2NvcGVJZDogc3R5bGUuc2NvcGVkID8gc2NvcGVJZCA6IG51bGwsCiAgICAgICAgcGF0aDogZmlsZS5wYXRoCiAgICB9KTsgfSk7Cn07CnZhciBhcHBlbmRTdHlsZXMgPSBmdW5jdGlvbiAoc3R5bGVzLCBmaWxlUGF0aCkgewogICAgdmFyIGVfMSwgX2E7CiAgICB2YXIgcGFyc2VkU3R5bGVzID0gW107CiAgICB0cnkgewogICAgICAgIGZvciAodmFyIHN0eWxlc18xID0gX192YWx1ZXMoc3R5bGVzKSwgc3R5bGVzXzFfMSA9IHN0eWxlc18xLm5leHQoKTsgIXN0eWxlc18xXzEuZG9uZTsgc3R5bGVzXzFfMSA9IHN0eWxlc18xLm5leHQoKSkgewogICAgICAgICAgICB2YXIgc3R5bGUgPSBzdHlsZXNfMV8xLnZhbHVlOwogICAgICAgICAgICBwYXJzZWRTdHlsZXMucHVzaChwYXJzZUNzc1N0eWxlKHN0eWxlLmNvZGUsIHN0eWxlLnNjb3BlSWQpKTsKICAgICAgICB9CiAgICB9CiAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfQogICAgZmluYWxseSB7CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgaWYgKHN0eWxlc18xXzEgJiYgIXN0eWxlc18xXzEuZG9uZSAmJiAoX2EgPSBzdHlsZXNfMS5yZXR1cm4pKSBfYS5jYWxsKHN0eWxlc18xKTsKICAgICAgICB9CiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfQogICAgfQogICAgcmV0dXJuIGdlbmVyYXRlRXhwb3J0c0ZvckFsbFN0eWxlcyhwYXJzZWRTdHlsZXMsIGZpbGVQYXRoKTsKfTsKdmFyIHBhcnNlQ3NzU3R5bGUgPSBmdW5jdGlvbiAoY29kZSwgc2NvcGVJZCkgewogICAgaWYgKHNjb3BlSWQgPT09IHZvaWQgMCkgeyBzY29wZUlkID0gIiI7IH0KICAgIHZhciBwYXJzZWQgPSBjc3MucGFyc2UoY29kZSk7CiAgICByZXR1cm4gY3NzLnN0cmluZ2lmeShfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcGFyc2VkKSwgeyBzdHlsZXNoZWV0OiBhcHBseUF0dHJpYnV0ZVRvU2VsZWN0b3IocGFyc2VkLnN0eWxlc2hlZXQsIHNjb3BlSWQpIH0pKTsKfTsKdmFyIGFwcGx5QXR0cmlidXRlVG9TZWxlY3RvciA9IGZ1bmN0aW9uICh0cmVlLCBzY29wZUlkKSB7CiAgICBpZiAoInNlbGVjdG9ycyIgaW4gdHJlZSkgewogICAgICAgIGZvciAodmFyIGkgaW4gdHJlZS5zZWxlY3RvcnMpIHsKICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gdHJlZS5zZWxlY3RvcnNbaV07CiAgICAgICAgICAgIHRyZWUuc2VsZWN0b3JzW2ldID0gcG9zdGNzc1NlbGVjdG9yUGFyc2VyKGZ1bmN0aW9uIChzZWxlY3RvcnMpIHsKICAgICAgICAgICAgICAgIHNlbGVjdG9ycy5lYWNoKGZ1bmN0aW9uIChzZWxlY3RvcikgewogICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gbnVsbDsKICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvci5lYWNoKGZ1bmN0aW9uIChuKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLnR5cGUgIT09ICJwc2V1ZG8iKQogICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG47CiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlSWQgJiYgc2NvcGVJZCAhPSAiIikgewogICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvci5pbnNlcnRBZnRlcihub2RlLCBwb3N0Y3NzU2VsZWN0b3JQYXJzZXIuYXR0cmlidXRlKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogc2NvcGVJZAogICAgICAgICAgICAgICAgICAgICAgICB9KSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIH0pLnByb2Nlc3NTeW5jKHNlbGVjdG9yKTsKICAgICAgICB9CiAgICB9CiAgICBpZiAoInJ1bGVzIiBpbiB0cmVlKSB7CiAgICAgICAgZm9yICh2YXIgaSBpbiB0cmVlLnJ1bGVzKSB7CiAgICAgICAgICAgIHZhciBydWxlID0gdHJlZS5ydWxlc1tpXTsKICAgICAgICAgICAgdHJlZS5ydWxlc1tpXSA9IGFwcGx5QXR0cmlidXRlVG9TZWxlY3RvcihydWxlLCBzY29wZUlkKTsKICAgICAgICB9CiAgICB9CiAgICByZXR1cm4gdHJlZTsKfTsKLyoqCiAqIENvbXBpbGVkIHRoZSB0ZW1wbGF0ZSB1c2luZyB2dWUtdGVtcGxhdGUtY29tcGlsZXIKICogYW5kIGNyZWF0ZXMgYW4gb2JqZWN0IGxhdGVyIHRvIGJlIHVzZWQgYnkgU3lzdGVtSlMgdG8gcmVuZGVyCiAqIHRoZSB0ZW1wbGF0ZS4KICovCnZhciBjb21waWxlVGVtcGxhdGUgPSBmdW5jdGlvbiAoY29udGVudCwgdGVtcGxhdGUsIHNjb3BlSWQsIHNjb3BlZCkgewogICAgdmFyIF9hID0gVnVlVGVtcGxhdGVDb21waWxlci5jb21waWxlVG9GdW5jdGlvbnModGVtcGxhdGUuY29udGVudCksIHJlbmRlciA9IF9hLnJlbmRlciwgc3RhdGljUmVuZGVyRm5zID0gX2Euc3RhdGljUmVuZGVyRm5zOwogICAgY29udGVudCA9IGluc2VydFRlbXBsYXRlSW5FeHBvcnQoY29udGVudCwgdGVtcGxhdGUuY29udGVudCwgc2NvcGVJZCwgc2NvcGVkKTsKICAgIHJldHVybiAidmFyIF9fcmVuZGVyRm5zX18gPSB7IFxuICAgICAgICByZW5kZXI6ICIgKyB0b0ZuKHJlbmRlcikgKyAiLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IFtcbiAgICAgICAgICAgICIgKyBzdGF0aWNSZW5kZXJGbnMubWFwKHRvRm4pLmpvaW4oIiwiKSArICJcbiAgICAgICAgXSBcbiAgICB9OyAiICsgY29udGVudDsKfTsKLyoqCiAqIFRyYW5zZm9ybSB0aGUgZ2l2ZW4gY29kZSB3aXRoIGJ1YmxlCiAqIGFuZCBwdXQgaXQgaW50byBhIHJlbmRlciBmdW5jdGlvbiBmb3IgbGF0ZXIgdXNlLgogKgogKiBTb21lIHdlaXJkIHN0dWZmIGF0IHRoZSBlbmQgb2YgdGhpcyBmdW5jdGlvbiBidXQKICogdGhhdCdzIGJlY2F1c2UgdGhlIGJ1YmxlLnRyYW5zZm9ybSByZXR1cm5zIGFuCiAqIGFub255bW91cyBmdW5jdGlvbiB3aGljaCBtZXNzZXMgdXAgdGhlIHJlbmRlci4KICogU28gd2UgYXJlIGVzc2VudGlhbGx5IHJlbW92aW5nIHRoYXQgZnVuY3Rpb24gOikKICogQHRvZG8gZmluZCBhIGJldHRlciB3YXkgZm9yIHRoaXMuIHRoaXMgaXMgaG9ycmlibGUuCiAqLwp2YXIgdG9GbiA9IGZ1bmN0aW9uIChjb2RlKSB7CiAgICByZXR1cm4gYnVibGUKICAgICAgICAudHJhbnNmb3JtKCJmdW5jdGlvbiByZW5kZXIgKCkgeyAiICsgY29kZSArICIgfSIsIHsKICAgICAgICBvYmplY3RBc3NpZ246ICJPYmplY3QuYXNzaWduIiwKICAgICAgICB0cmFuc2Zvcm1zOiB7CiAgICAgICAgICAgIHN0cmlwV2l0aDogdHJ1ZSwKICAgICAgICAgICAgc3RyaXBXaXRoRnVuY3Rpb25hbDogZmFsc2UKICAgICAgICB9CiAgICB9KQogICAgICAgIC5jb2RlLnJlcGxhY2UoImZ1bmN0aW9uIGFub255bW91cyhcbikgeyIsICIiKQogICAgICAgIC5zbGljZSgwLCAtMSk7Cn07Ci8qKgogKiBGaW5kIHdoZXJlIHRoZSBleHBvcnQgZGVmYXVsdCBpcyBpbiB0aGUgY29kZQogKiBhbmQgaW5zZXJ0IHRoZSB0ZW1wbGF0ZSBwcm9wZXJ0eSB3aXRoIGNvbnRlbnQuCiAqLwp2YXIgaW5zZXJ0VGVtcGxhdGVJbkV4cG9ydCA9IGZ1bmN0aW9uIChjb250ZW50LCB0ZW1wbGF0ZSwgc2NvcGVJZCwgc2NvcGVkKSB7CiAgICBpZiAoc2NvcGVkID09PSB2b2lkIDApIHsgc2NvcGVkID0gZmFsc2U7IH0KICAgIHZhciBleHBvcnRSZWdleCA9IC9eZXhwb3J0IGRlZmF1bHQuKi9nbTsKICAgIGlmIChleHBvcnRSZWdleC50ZXN0KGNvbnRlbnQpKSB7CiAgICAgICAgdmFyIGluc2lkZUV4cG9ydCA9IC9ceyguKilcfS9nbXMuZXhlYyhjb250ZW50KTsKICAgICAgICB2YXIgX3RlbXBsYXRlID0gImAiICsgdGVtcGxhdGUgKyAiYCI7CiAgICAgICAgY29udGVudCA9ICJleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogIiArIF90ZW1wbGF0ZSArICIsXG4gICAgICAgICAgICByZW5kZXI6IF9fcmVuZGVyRm5zX18ucmVuZGVyLFxuICAgICAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBfX3JlbmRlckZuc19fLnN0YXRpY1JlbmRlckZucywgXG4gICAgICAgICAgICAiICsgKHNjb3BlZCA/ICJfc2NvcGVJZDpcIiIgKyBzY29wZUlkICsgIlwiLCIgOiAiIikgKyAiXG4gICAgICAgICAgICAiICsgKGluc2lkZUV4cG9ydCAmJiBpbnNpZGVFeHBvcnQubGVuZ3RoID8gaW5zaWRlRXhwb3J0WzFdIDogIiIpICsgIiB9OyAiOwogICAgfQogICAgcmV0dXJuIGNvbnRlbnQ7Cn07Cgo=', null, false);
/* eslint-enable *//* eslint-disable */
const WorkerFactory$4 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0NCg0KZnVuY3Rpb24gX192YWx1ZXMobykgew0KICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gImZ1bmN0aW9uIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwOw0KICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pOw0KICAgIHJldHVybiB7DQogICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHsNCiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7DQogICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07DQogICAgICAgIH0NCiAgICB9Ow0KfQoKdmFyIFRSQU5TUElMRV9TVEFUVVMgPSB7CiAgICBQUkVQQVJFX0ZJTEVTOiAiVFJBTlNQSUxFUjpGSUxFOlBSRVBBUkUiLAogICAgUFJFUEFSRV9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlBSRVBBUkUiLAogICAgQURESVRJT05BTF9UUkFOU1BJTEVEOiAiVFJBTlNQSUxFUjpBRERJVElPTkFMOlRSQU5TUElMRUQiLAogICAgVFJBTlNQSUxFX0NPTVBMRVRFOiAiVFJBTlNQSUxFUjpUUkFOU1BJTEU6Q09NUExFVEUiLAogICAgRVJST1JfQ09NUElMRTogIlRSQU5TUElMRVI6RVJST1I6Q09NUElMRSIsCiAgICBFUlJPUl9BRERJVElPTkFMOiAiVFJBTlNQSUxFUjpFUlJPUjpBRERJVElPTkFMIgp9OwoKdmFyIGFic29sdXRlUGF0aCA9IC9eKD86XC98KD86W0EtWmEtel06KT9bXFx8XC9dKS87CmZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aCkgewogICAgcmV0dXJuIGFic29sdXRlUGF0aC50ZXN0KHBhdGgpOwp9CmZ1bmN0aW9uIGRpcm5hbWUocGF0aCkgewogICAgdmFyIG1hdGNoID0gLyhcL3xcXClbXlwvXFxdKiQvLmV4ZWMocGF0aCk7CiAgICBpZiAoIW1hdGNoKQogICAgICAgIHJldHVybiAiLiI7CiAgICB2YXIgZGlyID0gcGF0aC5zbGljZSgwLCAtbWF0Y2hbMF0ubGVuZ3RoKTsKICAgIC8vIElmIGBkaXJgIGlzIHRoZSBlbXB0eSBzdHJpbmcsIHdlJ3JlIGF0IHJvb3QuCiAgICByZXR1cm4gZGlyID8gZGlyIDogIi8iOwp9CmZ1bmN0aW9uIHJlc29sdmUoKSB7CiAgICB2YXIgcGF0aHMgPSBbXTsKICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7CiAgICAgICAgcGF0aHNbX2ldID0gYXJndW1lbnRzW19pXTsKICAgIH0KICAgIHZhciByZXNvbHZlZFBhcnRzID0gcGF0aHMuc2hpZnQoKS5zcGxpdCgvW1wvXFxdLyk7CiAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uIChwYXRoKSB7CiAgICAgICAgaWYgKGlzQWJzb2x1dGUocGF0aCkpIHsKICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cyA9IHBhdGguc3BsaXQoL1tcL1xcXS8pOwogICAgICAgIH0KICAgICAgICBlbHNlIHsKICAgICAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgvW1wvXFxdLyk7CiAgICAgICAgICAgIHdoaWxlIChwYXJ0c1swXSA9PT0gIi4iIHx8IHBhcnRzWzBdID09PSAiLi4iKSB7CiAgICAgICAgICAgICAgICB2YXIgcGFydCA9IHBhcnRzLnNoaWZ0KCk7CiAgICAgICAgICAgICAgICBpZiAocGFydCA9PT0gIi4uIikgewogICAgICAgICAgICAgICAgICAgIHJlc29sdmVkUGFydHMucG9wKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmVzb2x2ZWRQYXJ0cy5wdXNoLmFwcGx5KHJlc29sdmVkUGFydHMsIHBhcnRzKTsKICAgICAgICB9CiAgICB9KTsKICAgIHJldHVybiBub3JtYWxpemUocmVzb2x2ZWRQYXJ0cy5qb2luKCIvIikpOwp9CmZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoKSB7CiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cL1wvL2dpLCAiLyIpOwp9Cgp2YXIgcmVzb2x2ZVJlbGF0aXZlID0gZnVuY3Rpb24gKGNoaWxkUGF0aCwgcGFyZW50UGF0aCwgY29udGV4dCwgcGF0aE9ubHkpIHsKICAgIGlmIChwYXRoT25seSA9PT0gdm9pZCAwKSB7IHBhdGhPbmx5ID0gdHJ1ZTsgfQogICAgdmFyIHJldHJ5RmlsZUZpbmQgPSBmdW5jdGlvbiAocGF0aCkgewogICAgICAgIHJldHVybiBjb250ZXh0LmZpbGVzLmZpbmQoZnVuY3Rpb24gKGYpIHsKICAgICAgICAgICAgcmV0dXJuIGYucGF0aCA9PT0gcGF0aCArICIvaW5kZXguanMiIHx8CiAgICAgICAgICAgICAgICBmLnBhdGggPT09IHBhdGggKyAiL2luZGV4LnRzIiB8fAogICAgICAgICAgICAgICAgZi5wYXRoID09PSBwYXRoICsgIi9pbmRleC5qc3giIHx8CiAgICAgICAgICAgICAgICBmLnBhdGggPT09IHBhdGggKyAiL2luZGV4LnRzeCIgfHwKICAgICAgICAgICAgICAgIGYucGF0aCA9PT0gcGF0aCArICIuanMiIHx8CiAgICAgICAgICAgICAgICBmLnBhdGggPT09IHBhdGggKyAiLnRzIiB8fAogICAgICAgICAgICAgICAgZi5wYXRoID09PSBwYXRoICsgIi5qc3giIHx8CiAgICAgICAgICAgICAgICBmLnBhdGggPT09IHBhdGggKyAiLnRzeCI7CiAgICAgICAgfSkgfHwgbnVsbDsKICAgIH07CiAgICB2YXIgcmVzb2x2ZWQgPSByZXNvbHZlKGRpcm5hbWUocGFyZW50UGF0aCksIGNoaWxkUGF0aCkucmVwbGFjZSgvXlwuXC8vLCAiIik7CiAgICB2YXIgZm91bmRGaWxlID0gY29udGV4dC5maWxlcy5maW5kKGZ1bmN0aW9uIChmKSB7IHJldHVybiBmLnBhdGggPT09IHJlc29sdmVkOyB9KTsKICAgIGlmIChmb3VuZEZpbGUpCiAgICAgICAgcmV0dXJuIHBhdGhPbmx5ID8gZm91bmRGaWxlLnBhdGggOiBmb3VuZEZpbGU7CiAgICB2YXIgYWJzb2x1dGUgPSByZXNvbHZlKGRpcm5hbWUocGFyZW50UGF0aCksIGNoaWxkUGF0aCk7CiAgICB2YXIgcmV0cmllZEZpbGUgPSByZXRyeUZpbGVGaW5kKGFic29sdXRlKTsKICAgIGlmICghcmV0cmllZEZpbGUpCiAgICAgICAgcmV0dXJuIG51bGw7CiAgICByZXR1cm4gcGF0aE9ubHkgPyByZXRyaWVkRmlsZS5wYXRoIHx8IG51bGwgOiByZXRyaWVkRmlsZSB8fCBudWxsOwp9OwoKLyoqCiAqIFNsaWdodGx5IG1vZGlmaWVkIHZlcnNpb24gb2Y6CiAqICAgICAgaHR0cHM6Ly9naXRodWIuY29tL2tldnZhL3BhcnNlLWltcG9ydC9ibG9iL21hc3Rlci9pbmRleC5qcwogKiBieSBodHRwczovL2dpdGh1Yi5jb20va2V2dmEKICovCnZhciBnZXRQYXRoID0gZnVuY3Rpb24gKHN0cikgewogICAgcmV0dXJuIC8oPzp1cmxcKCkoPzouKj8pKD86XCkpfChbIiddKSg/OlteIicpXSspXDEvZ2kKICAgICAgICAuZXhlYyhzdHIpWzBdCiAgICAgICAgLnJlcGxhY2UoLyg/OnVybFwoKS9naSwgIiIpCiAgICAgICAgLnJlcGxhY2UoLyg/OlwpKS9nLCAiIikKICAgICAgICAucmVwbGFjZSgvKD86WyInXSkvZywgIiIpCiAgICAgICAgLnRyaW0oKTsKfTsKdmFyIGdldENvbmRpdGlvbiA9IGZ1bmN0aW9uIChzdHIpIHsKICAgIHJldHVybiBzdHIKICAgICAgICAucmVwbGFjZSgvKD86dXJsXCgpKD86Lio/KSg/OlwpKXwoWyInXSkoPzpbXiInKV0rKVwxL2dpLCAiIikKICAgICAgICAucmVwbGFjZSgvKD86QGltcG9ydCkoPzpccykqL2csICIiKQogICAgICAgIC50cmltKCk7Cn07CnZhciBwYXJzZUNzc0ltcG9ydCA9IChmdW5jdGlvbiAoY3NzSW1wb3J0KSB7CiAgICBjc3NJbXBvcnQgPSBjc3NJbXBvcnQucmVwbGFjZSgvKD86OykkL2csICIiKTsKICAgIHJldHVybiB7CiAgICAgICAgcGF0aDogZ2V0UGF0aChjc3NJbXBvcnQpLAogICAgICAgIGNvbmRpdGlvbjogZ2V0Q29uZGl0aW9uKGNzc0ltcG9ydCkgfHwgbnVsbCwKICAgICAgICBydWxlOiBjc3NJbXBvcnQKICAgIH07Cn0pOwoKc2VsZi5pbXBvcnRTY3JpcHRzKCJodHRwczovL3VucGtnLmNvbS9AYmxveHkvaWlmZS1saWJzQGxhdGVzdC9saWJzL2Nzcy5qcyIpOwpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiAoX2EpIHsKICAgIHZhciBkYXRhID0gX2EuZGF0YTsKICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBmaWxlLCB0eXBlLCBjb250ZXh0LCB0cmFuc3BpbGVkRmlsZTsKICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7CiAgICAgICAgICAgIGZpbGUgPSBkYXRhLmZpbGUsIHR5cGUgPSBkYXRhLnR5cGUsIGNvbnRleHQgPSBkYXRhLmNvbnRleHQ7CiAgICAgICAgICAgIGlmICh0eXBlID09PSBUUkFOU1BJTEVfU1RBVFVTLlBSRVBBUkVfRklMRVMpIHsKICAgICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICAgICAgdHJhbnNwaWxlZEZpbGUgPSBwcmVwYXJlQW5kVHJhbnNwaWxlRmlsZShmaWxlLCBjb250ZXh0KTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuVFJBTlNQSUxFX0NPTVBMRVRFLAogICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiB0cmFuc3BpbGVkRmlsZQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLkVSUk9SX0NPTVBJTEUsCiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcgogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTsKICAgICAgICB9KTsKICAgIH0pOwp9KTsKdmFyIHByZXBhcmVBbmRUcmFuc3BpbGVGaWxlID0gZnVuY3Rpb24gKGZpbGUsIGNvbnRleHQpIHsKICAgIHZhciBvcmlnaW5hbEFzdCA9IGdldEFzdEZyb21GaWxlKGZpbGUpOwogICAgdmFyIHJ1bGVzID0gYXBwZW5kSW1wb3J0ZWRGaWxlc1dpdGhBc3QoZmlsZS5wYXRoLCBvcmlnaW5hbEFzdCwgY29udGV4dCk7CiAgICBvcmlnaW5hbEFzdC5zdHlsZXNoZWV0LnJ1bGVzID0gcnVsZXM7CiAgICB2YXIgY29tcGlsZWRDb2RlID0gY3NzLnN0cmluZ2lmeShvcmlnaW5hbEFzdCk7CiAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIGZpbGUpLCB7IGNvZGU6IGNvbXBpbGVkQ29kZSB9KTsKfTsKdmFyIGdldEFzdEZyb21GaWxlID0gZnVuY3Rpb24gKGZpbGUpIHsKICAgIHJldHVybiBjc3MucGFyc2UoZmlsZS5jb2RlLCB7IHNvdXJjZTogZmlsZS5wYXRoIH0pOwp9Owp2YXIgYXBwZW5kSW1wb3J0ZWRGaWxlc1dpdGhBc3QgPSBmdW5jdGlvbiAoY3VycmVudFBhdGgsIGN1cnJlbnRBc3QsIGNvbnRleHQsIGxvb3BlZFJ1bGVzKSB7CiAgICB2YXIgZV8xLCBfYTsKICAgIGlmIChsb29wZWRSdWxlcyA9PT0gdm9pZCAwKSB7IGxvb3BlZFJ1bGVzID0gW107IH0KICAgIHZhciBjdXJyZW5ldExvb3AgPSBbXTsKICAgIHZhciBydWxlcyA9IGN1cnJlbnRBc3Quc3R5bGVzaGVldC5ydWxlcyB8fCBbXTsKICAgIHRyeSB7CiAgICAgICAgZm9yICh2YXIgcnVsZXNfMSA9IF9fdmFsdWVzKHJ1bGVzKSwgcnVsZXNfMV8xID0gcnVsZXNfMS5uZXh0KCk7ICFydWxlc18xXzEuZG9uZTsgcnVsZXNfMV8xID0gcnVsZXNfMS5uZXh0KCkpIHsKICAgICAgICAgICAgdmFyIHJ1bGUgPSBydWxlc18xXzEudmFsdWU7CiAgICAgICAgICAgIGlmIChydWxlLnR5cGUgIT0gImltcG9ydCIpIHsKICAgICAgICAgICAgICAgIGN1cnJlbmV0TG9vcC5wdXNoKHJ1bGUpOwogICAgICAgICAgICAgICAgbG9vcGVkUnVsZXMucHVzaChydWxlKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAocnVsZS5pbXBvcnQpIHsKICAgICAgICAgICAgICAgIHZhciBpbXBvcnRSdWxlID0gIkBpbXBvcnQgIiArIHJ1bGUuaW1wb3J0ICsgIjsiOwogICAgICAgICAgICAgICAgdmFyIHBhcnNlZEltcG9ydCA9IHBhcnNlQ3NzSW1wb3J0KGltcG9ydFJ1bGUpOwogICAgICAgICAgICAgICAgaWYgKHBhcnNlZEltcG9ydC5wYXRoKSB7CiAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kRmlsZSA9IChyZXNvbHZlUmVsYXRpdmUocGFyc2VkSW1wb3J0LnBhdGgsIGN1cnJlbnRQYXRoLCBjb250ZXh0LCBmYWxzZSkpOwogICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZEZpbGUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZEZpbGUucGF0aC5lbmRzV2l0aCgiLmNzcyIpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIllvdSBjYW4ndCBpbXBvcnQgIiArIGZvdW5kRmlsZS5wYXRoICsgIiBpbiAiICsgY3VycmVudFBhdGggKyAiIGJlY2F1c2UgaXQncyBub3QgYSBDU1MgZmlsZS4iKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyc2VkQWRkaXRpb25hbEZpbGUgPSBjc3MucGFyc2UoZm91bmRGaWxlLmNvZGUsIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZm91bmRGaWxlLnBhdGgKICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFyc2VkSW1wb3J0LmNvbmRpdGlvbiB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgIXBhcnNlZEltcG9ydC5jb25kaXRpb24ubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRJbXBvcnRlZEZpbGVzV2l0aEFzdChmb3VuZEZpbGUucGF0aCwgcGFyc2VkQWRkaXRpb25hbEZpbGUsIGNvbnRleHQsIGxvb3BlZFJ1bGVzKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbXBvcnRSdWxlcyA9IHBhcnNlZEFkZGl0aW9uYWxGaWxlLnN0eWxlc2hlZXQucnVsZXMuZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiByLnR5cGUgPT09ICJpbXBvcnQiOyB9KTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3BlZFJ1bGVzLnB1c2goewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lZGlhOiBwYXJzZWRJbXBvcnQuY29uZGl0aW9uLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGVzOiBwYXJzZWRBZGRpdGlvbmFsRmlsZS5zdHlsZXNoZWV0LnJ1bGVzLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gci50eXBlICE9PSAiaW1wb3J0IjsgfSksCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogIm1lZGlhIgogICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1wb3J0UnVsZXMubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFwcGVuZEFkZGl0aW9uYWxJbXBvcnRzID0gX19hc3NpZ24oe30sIHBhcnNlZEFkZGl0aW9uYWxGaWxlKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRBZGRpdGlvbmFsSW1wb3J0cy5zdHlsZXNoZWV0LnJ1bGVzID0gaW1wb3J0UnVsZXM7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kSW1wb3J0ZWRGaWxlc1dpdGhBc3QoZm91bmRGaWxlLnBhdGgsIGFwcGVuZEFkZGl0aW9uYWxJbXBvcnRzLCBjb250ZXh0LCBsb29wZWRSdWxlcyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CiAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfQogICAgZmluYWxseSB7CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgaWYgKHJ1bGVzXzFfMSAmJiAhcnVsZXNfMV8xLmRvbmUgJiYgKF9hID0gcnVsZXNfMS5yZXR1cm4pKSBfYS5jYWxsKHJ1bGVzXzEpOwogICAgICAgIH0KICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9CiAgICB9CiAgICByZXR1cm4gbG9vcGVkUnVsZXM7Cn07Cgo=', null, false);
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
const WorkerFactory$5 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0KCnZhciBUUkFOU1BJTEVfU1RBVFVTID0gewogICAgUFJFUEFSRV9GSUxFUzogIlRSQU5TUElMRVI6RklMRTpQUkVQQVJFIiwKICAgIFBSRVBBUkVfQURESVRJT05BTDogIlRSQU5TUElMRVI6QURESVRJT05BTDpQUkVQQVJFIiwKICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogIlRSQU5TUElMRVI6QURESVRJT05BTDpUUkFOU1BJTEVEIiwKICAgIFRSQU5TUElMRV9DT01QTEVURTogIlRSQU5TUElMRVI6VFJBTlNQSUxFOkNPTVBMRVRFIiwKICAgIEVSUk9SX0NPTVBJTEU6ICJUUkFOU1BJTEVSOkVSUk9SOkNPTVBJTEUiLAogICAgRVJST1JfQURESVRJT05BTDogIlRSQU5TUElMRVI6RVJST1I6QURESVRJT05BTCIKfTsKCi8vIHNlbGYuaW1wb3J0U2NyaXB0cygKLy8gICAgICJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3R5cGVzY3JpcHRAbGF0ZXN0L2xpYi90eXBlc2NyaXB0LmpzIgovLyApOwpzZWxmLmltcG9ydFNjcmlwdHMoImh0dHBzOi8vdW5wa2cuY29tL0BibG94eS9paWZlLWxpYnNAbGF0ZXN0L2xpYnMvc3VjcmFzZS5qcyIpOwpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiAoX2EpIHsKICAgIHZhciBkYXRhID0gX2EuZGF0YTsKICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBmaWxlLCB0eXBlLCBjb250ZXh0LCB0cmFuc3BpbGVkRmlsZSwgZXJyb3JfMTsKICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7CiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHsKICAgICAgICAgICAgICAgIGNhc2UgMDoKICAgICAgICAgICAgICAgICAgICBmaWxlID0gZGF0YS5maWxlLCB0eXBlID0gZGF0YS50eXBlLCBjb250ZXh0ID0gZGF0YS5jb250ZXh0OwogICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGUgPT09IFRSQU5TUElMRV9TVEFUVVMuUFJFUEFSRV9GSUxFUykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTsKICAgICAgICAgICAgICAgIGNhc2UgMToKICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsIDMsICwgNF0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRyYW5zcGlsZUZpbGUoZmlsZSldOwogICAgICAgICAgICAgICAgY2FzZSAyOgogICAgICAgICAgICAgICAgICAgIHRyYW5zcGlsZWRGaWxlID0gX2Iuc2VudCgpOwogICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUKICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5UUkFOU1BJTEVfQ09NUExFVEUsCiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IHRyYW5zcGlsZWRGaWxlCiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07CiAgICAgICAgICAgICAgICBjYXNlIDM6CiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9iLnNlbnQoKTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuRVJST1JfQ09NUElMRSwKICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXzEKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTsKICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dOwogICAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICB9KTsKfSk7CnZhciB0cmFuc3BpbGVGaWxlID0gZnVuY3Rpb24gKGZpbGUpIHsKICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7CiAgICAgICAgdmFyIHRyYW5zcGlsZWQgPSBzdWNyYXNlLnRyYW5zZm9ybShmaWxlLmNvZGUsIHsKICAgICAgICAgICAgdHJhbnNmb3JtczogWyJ0eXBlc2NyaXB0IiwgImpzeCJdLAogICAgICAgICAgICBmaWxlUGF0aDogZmlsZS5wYXRoLAogICAgICAgICAgICBlbmFibGVMZWdhY3lUeXBlU2NyaXB0TW9kdWxlSW50ZXJvcDogdHJ1ZSwKICAgICAgICAgICAgc291cmNlTWFwT3B0aW9uczogewogICAgICAgICAgICAgICAgY29tcGlsZWRGaWxlbmFtZTogZmlsZS5wYXRoCiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgICAgICAvLyBjb25zdCB0cmFuc3BpbGVkID0gdHMudHJhbnNwaWxlTW9kdWxlKGZpbGUuY29kZSwgewogICAgICAgIC8vICAgICBmaWxlTmFtZTogZmlsZS5uYW1lLAogICAgICAgIC8vICAgICBjb21waWxlck9wdGlvbnM6IHsKICAgICAgICAvLyAgICAgICAgIGFsbG93U3ludGhldGljRGVmYXVsdEltcG9ydHM6IHRydWUsCiAgICAgICAgLy8gICAgICAgICB0YXJnZXQ6IHRzLlNjcmlwdFRhcmdldC5FUzUsCiAgICAgICAgLy8gICAgICAgICBtb2R1bGU6IHRzLk1vZHVsZUtpbmQuRVNOZXh0LAogICAgICAgIC8vICAgICAgICAgaW1wb3J0SGVscGVyczogdHJ1ZSwKICAgICAgICAvLyAgICAgICAgIG5vRW1pdEhlbHBlcnM6IGZhbHNlLAogICAgICAgIC8vICAgICAgICAgbW9kdWxlUmVzb2x1dGlvbjogdHMuTW9kdWxlUmVzb2x1dGlvbktpbmQuTm9kZUpzLAogICAgICAgIC8vICAgICAgICAganN4OiB0cy5Kc3hFbWl0LlJlYWN0LAogICAgICAgIC8vICAgICAgICAgc291cmNlTWFwOiB0cnVlCiAgICAgICAgLy8gICAgIH0KICAgICAgICAvLyB9KTsKICAgICAgICBpZiAodHJhbnNwaWxlZCAmJiB0cmFuc3BpbGVkLmNvZGUpIHsKICAgICAgICAgICAgcmVzb2x2ZShfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZmlsZSksIHsgY29kZTogdHJhbnNwaWxlZC5jb2RlLCBtYXA6IHRyYW5zcGlsZWQuc291cmNlTWFwIHx8IHt9IH0pKTsKICAgICAgICB9CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIHJlamVjdCgiRmFpbGVkIHRvIHRyYW5zcGlsZSAiICsgZmlsZS5wYXRoKTsKICAgICAgICB9CiAgICAgICAgLy8gaWYgKHRyYW5zcGlsZWQub3V0cHV0VGV4dCkgewogICAgICAgIC8vICAgICByZXNvbHZlKHsKICAgICAgICAvLyAgICAgICAgIC4uLmZpbGUsCiAgICAgICAgLy8gICAgICAgICBjb2RlOiB0cmFuc3BpbGVkLm91dHB1dFRleHQsCiAgICAgICAgLy8gICAgICAgICBtYXA6IEpTT04ucGFyc2UodHJhbnNwaWxlZC5zb3VyY2VNYXBUZXh0IHx8ICJ7fSIpCiAgICAgICAgLy8gICAgIH0pOwogICAgICAgIC8vIH0gZWxzZSB7CiAgICAgICAgLy8gICAgIHJlamVjdChgRmFpbGVkIHRvIHRyYW5zcGlsZSAke2ZpbGUucGF0aH1gKTsKICAgICAgICAvLyB9CiAgICB9KTsKfTsKCg==', null, false);
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
const WorkerFactory$6 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0KCnZhciBnZW5lcmF0ZUV4cG9ydCA9IGZ1bmN0aW9uIChmaWxlLCBwcmVwZW5kRXhwb3J0RGVmYXVsdCkgewogICAgaWYgKHByZXBlbmRFeHBvcnREZWZhdWx0ID09PSB2b2lkIDApIHsgcHJlcGVuZEV4cG9ydERlZmF1bHQgPSB0cnVlOyB9CiAgICByZXR1cm4gKChwcmVwZW5kRXhwb3J0RGVmYXVsdCA/ICJleHBvcnQgZGVmYXVsdCAiIDogIiIpICsgImZ1bmN0aW9uIGFkZFN0eWxlcyAoKSB7IiArCiAgICAgICAgImNvbnN0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7IiArCiAgICAgICAgInRhZy50eXBlID0gJ3RleHQvY3NzJzsiICsKICAgICAgICAoInRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgIiArIGZpbGUuY29kZSArICJgKSk7IikgKwogICAgICAgICgidGFnLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCAnIiArIGZpbGUucGF0aCArICInKTsiKSArCiAgICAgICAgImRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGFnKTsiICsKICAgICAgICAifSBhZGRTdHlsZXMoKTsiKTsKfTsKdmFyIGdlbmVyYXRlRXhwb3J0c0ZvckFsbFN0eWxlcyA9IGZ1bmN0aW9uIChzdHlsZXMsIGZpbGVQYXRoKSB7IHJldHVybiBnZW5lcmF0ZUV4cG9ydCh7IHBhdGg6IGZpbGVQYXRoLCBjb2RlOiBzdHlsZXMuam9pbigiXG5cbiIpIH0sIGZhbHNlKTsgfTsKCnZhciBUUkFOU1BJTEVfU1RBVFVTID0gewogICAgUFJFUEFSRV9GSUxFUzogIlRSQU5TUElMRVI6RklMRTpQUkVQQVJFIiwKICAgIFBSRVBBUkVfQURESVRJT05BTDogIlRSQU5TUElMRVI6QURESVRJT05BTDpQUkVQQVJFIiwKICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogIlRSQU5TUElMRVI6QURESVRJT05BTDpUUkFOU1BJTEVEIiwKICAgIFRSQU5TUElMRV9DT01QTEVURTogIlRSQU5TUElMRVI6VFJBTlNQSUxFOkNPTVBMRVRFIiwKICAgIEVSUk9SX0NPTVBJTEU6ICJUUkFOU1BJTEVSOkVSUk9SOkNPTVBJTEUiLAogICAgRVJST1JfQURESVRJT05BTDogIlRSQU5TUElMRVI6RVJST1I6QURESVRJT05BTCIKfTsKCnNlbGYuaW1wb3J0U2NyaXB0cygiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9zdmVsdGVAbGF0ZXN0L2NvbXBpbGVyLm1pbi5qcyIpOwpzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiAoX2EpIHsKICAgIHZhciBkYXRhID0gX2EuZGF0YTsKICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBmaWxlLCB0eXBlLCBhZGRpdGlvbmFsLCBfYiwgc3R5bGVzLCByZXN0LCB0cmFuc3BpbGVkRmlsZSwgYWRkaXRpb25hbF8xLCBlcnJvcl8xLCBjb2RlOwogICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2MpIHsKICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkgewogICAgICAgICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICAgICAgICAgIGZpbGUgPSBkYXRhLmZpbGUsIHR5cGUgPSBkYXRhLnR5cGUsIGFkZGl0aW9uYWwgPSBkYXRhLmFkZGl0aW9uYWw7CiAgICAgICAgICAgICAgICAgICAgaWYgKCEodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0ZJTEVTKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07CiAgICAgICAgICAgICAgICAgICAgX2MubGFiZWwgPSAxOwogICAgICAgICAgICAgICAgY2FzZSAxOgogICAgICAgICAgICAgICAgICAgIF9jLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZXh0cmFjdEZyb21GaWxlKGZpbGUpXTsKICAgICAgICAgICAgICAgIGNhc2UgMjoKICAgICAgICAgICAgICAgICAgICBfYiA9IF9jLnNlbnQoKSwgc3R5bGVzID0gX2Iuc3R5bGVzLCByZXN0ID0gX2IucmVzdDsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0cmFuc3BpbGVGaWxlKF9fYXNzaWduKF9fYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiByZXN0IH0pKV07CiAgICAgICAgICAgICAgICBjYXNlIDM6CiAgICAgICAgICAgICAgICAgICAgdHJhbnNwaWxlZEZpbGUgPSBfYy5zZW50KCk7CiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlcyAmJiBzdHlsZXMubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxfMSA9IHsgc3R5bGVzOiBzdHlsZXMgfTsKICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB3cm9uZyBzY29wZQogICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuUFJFUEFSRV9BRERJVElPTkFMLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogdHJhbnNwaWxlZEZpbGUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsOiBhZGRpdGlvbmFsXzEKICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlCiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5UUkFOU1BJTEVfQ09NUExFVEUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiB0cmFuc3BpbGVkRmlsZQogICAgICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07CiAgICAgICAgICAgICAgICBjYXNlIDQ6CiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9jLnNlbnQoKTsKICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlCiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuRVJST1JfQ09NUElMRSwKICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXzEKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA1XTsKICAgICAgICAgICAgICAgIGNhc2UgNToKICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5BRERJVElPTkFMX1RSQU5TUElMRUQpIHsKICAgICAgICAgICAgICAgICAgICAgICAgY29kZSA9IGZpbGUuY29kZTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZGl0aW9uYWwpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZSArPSBnZW5lcmF0ZUV4cG9ydHNGb3JBbGxTdHlsZXMoYWRkaXRpb25hbC5zdHlsZXMubWFwKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLmNvZGU7IH0pLCBmaWxlLnBhdGgpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5UUkFOU1BJTEVfQ09NUExFVEUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiBjb2RlIH0pCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdyb25nIHNjb3BlCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRSQU5TUElMRV9TVEFUVVMuRVJST1JfQURESVRJT05BTCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dOwogICAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICB9KTsKfSk7CnZhciBleHRyYWN0RnJvbUZpbGUgPSBmdW5jdGlvbiAoZmlsZSkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsKICAgIHZhciBleHRyYWN0ZWQsIGNvZGU7CiAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7CiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkgewogICAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgICAgICBleHRyYWN0ZWQgPSB7CiAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiBbXQogICAgICAgICAgICAgICAgfTsKICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHN2ZWx0ZS5wcmVwcm9jZXNzKGZpbGUuY29kZSwgewogICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogZnVuY3Rpb24gKF9hKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29kZSA9IF9hLmNvbnRlbnQsIGF0dHJpYnV0ZXMgPSBfYS5hdHRyaWJ1dGVzOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFjdGVkLnN0eWxlcy5wdXNoKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBjb2RlLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmc6IGF0dHJpYnV0ZXMubGFuZyB8fCAiY3NzIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBmaWxlLnBhdGgKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY29kZTogIiIgfTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0sIHsgZmlsZW5hbWU6IGZpbGUucGF0aCB9KV07CiAgICAgICAgICAgIGNhc2UgMToKICAgICAgICAgICAgICAgIGNvZGUgPSAoX2Euc2VudCgpKS5jb2RlOwogICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHsKICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiBleHRyYWN0ZWQuc3R5bGVzLAogICAgICAgICAgICAgICAgICAgICAgICByZXN0OiBjb2RlCiAgICAgICAgICAgICAgICAgICAgfV07CiAgICAgICAgfQogICAgfSk7Cn0pOyB9Owp2YXIgdHJhbnNwaWxlRmlsZSA9IGZ1bmN0aW9uIChmaWxlKSB7CiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgdHJhbnNwaWxlZDsKICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7CiAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICB0cmFuc3BpbGVkID0gc3ZlbHRlLmNvbXBpbGUoZmlsZS5jb2RlLCB7CiAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGUucGF0aAogICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICByZXNvbHZlKF9fYXNzaWduKF9fYXNzaWduKHt9LCBmaWxlKSwgeyBjb2RlOiB0cmFuc3BpbGVkLmpzLmNvZGUgfSkpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNhdGNoIChlcnJvcikgewogICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgfSk7CiAgICB9KTsgfSk7Cn07Cgo=', null, false);
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
const WorkerFactory$7 = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkgew0KICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7DQogICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykgew0KICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTsNCiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHQ7DQogICAgfTsNCiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTsNCn07DQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7DQogICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksICJ0aHJvdyI6IHZlcmIoMSksICJyZXR1cm4iOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7DQogICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9DQogICAgZnVuY3Rpb24gc3RlcChvcCkgew0KICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOw0KICAgICAgICB3aGlsZSAoXykgdHJ5IHsNCiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbInJldHVybiJdIDogb3BbMF0gPyB5WyJ0aHJvdyJdIHx8ICgodCA9IHlbInJldHVybiJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDsNCiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTsNCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTsNCiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pOw0KICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9Ow0KICAgIH0NCn0KCnZhciBUUkFOU1BJTEVfU1RBVFVTID0gewogICAgUFJFUEFSRV9GSUxFUzogIlRSQU5TUElMRVI6RklMRTpQUkVQQVJFIiwKICAgIFBSRVBBUkVfQURESVRJT05BTDogIlRSQU5TUElMRVI6QURESVRJT05BTDpQUkVQQVJFIiwKICAgIEFERElUSU9OQUxfVFJBTlNQSUxFRDogIlRSQU5TUElMRVI6QURESVRJT05BTDpUUkFOU1BJTEVEIiwKICAgIFRSQU5TUElMRV9DT01QTEVURTogIlRSQU5TUElMRVI6VFJBTlNQSUxFOkNPTVBMRVRFIiwKICAgIEVSUk9SX0NPTVBJTEU6ICJUUkFOU1BJTEVSOkVSUk9SOkNPTVBJTEUiLAogICAgRVJST1JfQURESVRJT05BTDogIlRSQU5TUElMRVI6RVJST1I6QURESVRJT05BTCIKfTsKCnNlbGYuaW1wb3J0U2NyaXB0cygiaHR0cHM6Ly91bnBrZy5jb20vY29mZmVlc2NyaXB0L2xpYi9jb2ZmZWVzY3JpcHQtYnJvd3Nlci1jb21waWxlci1sZWdhY3kvY29mZmVlc2NyaXB0LmpzIik7CnNlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsIGZ1bmN0aW9uIChfYSkgewogICAgdmFyIGRhdGEgPSBfYS5kYXRhOwogICAgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgdmFyIGZpbGUsIHR5cGUsIGNvbnRleHQsIHRyYW5zcGlsZWRGaWxlLCBlcnJvcl8xOwogICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHsKICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkgewogICAgICAgICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICAgICAgICAgIGZpbGUgPSBkYXRhLmZpbGUsIHR5cGUgPSBkYXRhLnR5cGUsIGNvbnRleHQgPSBkYXRhLmNvbnRleHQ7CiAgICAgICAgICAgICAgICAgICAgaWYgKCEodHlwZSA9PT0gVFJBTlNQSUxFX1NUQVRVUy5QUkVQQVJFX0ZJTEVTKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07CiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxOwogICAgICAgICAgICAgICAgY2FzZSAxOgogICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgMywgLCA0XSk7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdHJhbnNwaWxlRmlsZShmaWxlKV07CiAgICAgICAgICAgICAgICBjYXNlIDI6CiAgICAgICAgICAgICAgICAgICAgdHJhbnNwaWxlZEZpbGUgPSBfYi5zZW50KCk7CiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZQogICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBUUkFOU1BJTEVfU1RBVFVTLlRSQU5TUElMRV9DT01QTEVURSwKICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogdHJhbnNwaWxlZEZpbGUKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTsKICAgICAgICAgICAgICAgIGNhc2UgMzoKICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Iuc2VudCgpOwogICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgd3Jvbmcgc2NvcGUKICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVFJBTlNQSUxFX1NUQVRVUy5FUlJPUl9DT01QSUxFLAogICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JfMQogICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdOwogICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgIH0pOwp9KTsKdmFyIHRyYW5zcGlsZUZpbGUgPSBmdW5jdGlvbiAoZmlsZSkgewogICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsKICAgICAgICB0cnkgewogICAgICAgICAgICB2YXIgdHJhbnNwaWxlZCA9IENvZmZlZVNjcmlwdC5jb21waWxlKGZpbGUuY29kZSwgewogICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGUucGF0aCwKICAgICAgICAgICAgICAgIHNvdXJjZU1hcDogdHJ1ZQogICAgICAgICAgICB9KTsKICAgICAgICAgICAgcmVzb2x2ZShfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZmlsZSksIHsgY29kZTogdHJhbnNwaWxlZC5qcywgbWFwOiBKU09OLnBhcnNlKHRyYW5zcGlsZWQudjNTb3VyY2VNYXAgfHwgInt9IikgfSkpOwogICAgICAgIH0KICAgICAgICBjYXRjaCAoZSkgewogICAgICAgICAgICByZWplY3QoZSk7CiAgICAgICAgfQogICAgfSk7Cn07Cgo=', null, false);
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
function pluginFactory (
// this: Packager,
files, bundleOptions, pluginManager) {
    if (bundleOptions === void 0) { bundleOptions = defaultBundleOptions; }
    var context = {
        cache: cache,
        files: files,
        transpileQueue: new SequentialTaskQueue({ timeout: 30000 }),
        bundleOptions: normalizeBundleOptions(bundleOptions)
    };
    pluginManager.setContext(context);
    var registeredPlugins = pluginManager.prepareAndGetPlugins();
    return __spread(registeredPlugins, setup(context), resolvers(context), loaders(context), transformers(context));
}
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
var resolverProxyHook = (function (plugin, context) {
    var canBeResolved = verifyExtensions(plugin.extensions);
    var resolverFunction = function (moduleId, parentId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!canBeResolved(moduleId))
                return [2 /*return*/, null];
            return [2 /*return*/, moduleId];
        });
    }); };
    return new Proxy(resolverFunction, {
        apply: function (target, thisArg, argumentsList) {
            return __awaiter(this, void 0, void 0, function () {
                var handledResolverFunction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Reflect.apply(target, context, argumentsList)];
                        case 1:
                            handledResolverFunction = _a.sent();
                            if (!handledResolverFunction) {
                                return [2 /*return*/, Promise.resolve()];
                            }
                            return [4 /*yield*/, plugin.resolver.bind(context)(argumentsList[0], argumentsList[1])];
                        case 2: return [2 /*return*/, ((_a.sent()) || null)];
                    }
                });
            });
        }
    });
});
//# sourceMappingURL=resolver.js.map
var loaderProxyHook = (function (plugin, context) {
    var canBeLoaded = verifyExtensions(plugin.extensions);
    var loaderFunction = function (moduleId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!canBeLoaded(moduleId))
                return [2 /*return*/, null];
            return [2 /*return*/, moduleId];
        });
    }); };
    return new Proxy(loaderFunction, {
        apply: function (target, thisArg, argumentsList) {
            return __awaiter(this, void 0, void 0, function () {
                var handledLoaderFunction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Reflect.apply(target, context, argumentsList)];
                        case 1:
                            handledLoaderFunction = _a.sent();
                            if (!handledLoaderFunction) {
                                return [2 /*return*/, Promise.resolve()];
                            }
                            return [4 /*yield*/, plugin.loader.bind(context)(argumentsList[0])];
                        case 2: return [2 /*return*/, ((_a.sent()) || null)];
                    }
                });
            });
        }
    });
});
//# sourceMappingURL=loader.js.map
var transformProxyHook = (function (plugin, context) {
    var transpilerName = plugin.name + "-transpiler";
    var canBeTransformed = verifyExtensions(plugin.extensions);
    var transformFunction = function (code, moduleId) { return __awaiter(void 0, void 0, void 0, function () {
        var transpiler, file, completed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!canBeTransformed(moduleId))
                        return [2 /*return*/, null];
                    transpiler = context.cache.transpilers.get(transpilerName);
                    if (!transpiler) {
                        transpiler =
                            typeof plugin.transpiler === "function"
                                ? new plugin.transpiler(context)
                                : plugin.transpiler;
                        context.cache.transpilers.set(transpilerName, transpiler);
                    }
                    file = context.files.find(function (f) { return f.path === moduleId; });
                    return [4 /*yield*/, context.transpileQueue.push(transpilerName, function () {
                            return transpiler.transpile(__assign(__assign({}, file), { code: code }));
                        })];
                case 1:
                    _a.sent();
                    completed = context.transpileQueue.completed.find(function (c) { return c.path === moduleId; });
                    if (completed) {
                        return [2 /*return*/, {
                                code: completed.code,
                                map: completed.map || { mappings: "" }
                            }];
                    }
                    throw new TransformationException(moduleId, transpilerName);
            }
        });
    }); };
    return new Proxy(transformFunction, {
        apply: function (target, thisArg, argumentsList) {
            return __awaiter(this, void 0, void 0, function () {
                var handledTransformFunction, code, map;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Reflect.apply(target, context, argumentsList)];
                        case 1:
                            handledTransformFunction = _a.sent();
                            if (!handledTransformFunction) {
                                return [2 /*return*/, Promise.resolve()];
                            }
                            if (!plugin.beforeBundle) {
                                return [2 /*return*/, handledTransformFunction];
                            }
                            code = handledTransformFunction.code, map = handledTransformFunction.map;
                            return [2 /*return*/, {
                                    code: plugin.beforeBundle.bind(context)(code) || code,
                                    map: map
                                }];
                    }
                });
            });
        }
    });
});
//# sourceMappingURL=transform.js.map
var beforeBundleProxyHook = (function (plugin, context) {
    var canBeBeforeBundled = verifyExtensions(plugin.extensions);
    var checkIfFileIsAlreadyTranspiler = function (path) {
        return context.transpileQueue.completed.find(function (f) { return f.path === path; });
    };
    var beforeBundleFunction = function (code, moduleId) { return __awaiter(void 0, void 0, void 0, function () {
        var file;
        return __generator(this, function (_a) {
            if (!canBeBeforeBundled(moduleId))
                return [2 /*return*/, null];
            file = checkIfFileIsAlreadyTranspiler(moduleId);
            if (file) {
                return [2 /*return*/, {
                        code: file.code,
                        map: file.map || { mappings: "" }
                    }];
            }
            return [2 /*return*/, { code: code, map: { mappings: "" } }];
        });
    }); };
    return new Proxy(beforeBundleFunction, {
        apply: function (target, thisArg, argumentsList) {
            return __awaiter(this, void 0, void 0, function () {
                var handledTransformFunction, code, map, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Reflect.apply(target, context, argumentsList)];
                        case 1:
                            handledTransformFunction = _b.sent();
                            if (!handledTransformFunction) {
                                return [2 /*return*/, Promise.resolve()];
                            }
                            code = handledTransformFunction.code, map = handledTransformFunction.map;
                            _a = {};
                            return [4 /*yield*/, plugin.beforeBundle.bind(context)(code)];
                        case 2: return [2 /*return*/, (_a.code = (_b.sent()) || code,
                                _a.map = map,
                                _a)];
                    }
                });
            });
        }
    });
});
//# sourceMappingURL=beforeBundle.js.map
var normalizePlugin = (function (plugin) { return ({
    // Meta
    name: plugin.name,
    extensions: plugin.extensions,
    transpiler: plugin.transpiler,
    // Hooks
    resolver: plugin.resolver,
    loader: plugin.loader,
    beforeBundle: plugin.beforeBundle
}); });
//# sourceMappingURL=normalize-plugin.js.map
var MISSING_NAME_FIELD = "'name' is a required field on a plugin.";
var MISSING_FIELD = function (pluginName, field) {
    return pluginName + " is missing '" + field + "'.";
};
var validatePlugin = (function (plugin) {
    if (!plugin.name) {
        throw new Error(MISSING_NAME_FIELD);
    }
    if (!plugin.extensions) {
        throw new Error(MISSING_FIELD(plugin.name, "extensions"));
    }
});var pluginRegistry = new Map();
var transformPluginAsProxy = function (plugin, context) {
    var propertiesAndHooks = {
        name: plugin.name
    };
    if (plugin.resolver) {
        propertiesAndHooks = __assign(__assign({}, propertiesAndHooks), { resolveId: resolverProxyHook(plugin, context) });
    }
    if (plugin.loader) {
        propertiesAndHooks = __assign(__assign({}, propertiesAndHooks), { load: loaderProxyHook(plugin, context) });
    }
    if (plugin.transpiler) {
        propertiesAndHooks = __assign(__assign({}, propertiesAndHooks), { transform: transformProxyHook(plugin, context) });
    }
    if (!plugin.transpiler && plugin.beforeBundle) {
        propertiesAndHooks = __assign(__assign({}, propertiesAndHooks), { transform: beforeBundleProxyHook(plugin, context) });
    }
    return propertiesAndHooks;
};
var createPluginManager = function () { return ({
    context: {},
    setContext: function (context) {
        this.context = context;
    },
    registerPlugin: function (plugin) {
        validatePlugin(plugin);
        pluginRegistry.set(plugin.name || null, __assign(__assign({}, normalizePlugin(plugin)), { transformed: false }));
    },
    prepareAndGetPlugins: function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.getRegisteredPlugins(false)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var plugin = _c.value;
                pluginRegistry.set(plugin.name, __assign(__assign({}, transformPluginAsProxy(plugin, this.context)), { transformed: true }));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.getRegisteredPlugins(true);
    },
    getRegisteredPlugins: function (onlyTransformed) {
        if (onlyTransformed === void 0) { onlyTransformed = true; }
        var plugins = Array.from(pluginRegistry.entries()).map(function (p) {
            return (__assign({}, p[1]));
        });
        return onlyTransformed ? plugins.filter(function (p) { return p.transformed; }) : plugins;
    }
}); };
//# sourceMappingURL=plugin-manager.js.map
var pluginManager = createPluginManager();
var Packager = /** @class */ (function () {
    function Packager(options, inputOptions, outputOptions) {
        if (inputOptions === void 0) { inputOptions = {}; }
        if (outputOptions === void 0) { outputOptions = {}; }
        this.files = [];
        this.cachedBundle = { modules: [] };
        this.inputOptions = __assign(__assign({}, inputOptions), { inlineDynamicImports: true, cache: this.cachedBundle });
        this.outputOptions = __assign(__assign({}, outputOptions), { format: "iife", sourcemap: options && options.sourcemaps ? "inline" : false, freeze: false });
    }
    Packager.prototype.registerPlugin = function (plugin) {
        pluginManager.registerPlugin(plugin);
    };
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
                        this.inputOptions = __assign(__assign({}, this.inputOptions), { input: (_a = entryFile) === null || _a === void 0 ? void 0 : _a.path, onwarn: handleBuildWarnings, plugins: pluginFactory(this.files, bundleOptions, pluginManager) });
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