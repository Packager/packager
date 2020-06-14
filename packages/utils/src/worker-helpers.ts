import { WebWorkerContext, WebWorkerEvent } from "packager";
import { TRANSPILE_STATUS, TRANSPILE_ERROR } from "./consts";

export const resolveWorkerDependency = (
  moduleId: string
): Promise<WebWorkerContext> =>
  new Promise((resolve) => {
    // @ts-ignore
    self.postMessage({
      type: TRANSPILE_STATUS.ADD_DEPENDENCY,
      context: { moduleId, isExternal: false },
    });

    const handleEvent = ({ data }: WebWorkerEvent) => {
      const { context, type, error } = data;

      if (type === TRANSPILE_STATUS.ADD_DEPENDENCY) {
        if (context && context.moduleId === moduleId) {
          resolve(context);
        }
      }

      if (type === TRANSPILE_STATUS.ERROR) {
        if (error === TRANSPILE_ERROR.DEPENDENCY_NOT_FOUND) {
          resolve();
        }
      }
    };

    self.addEventListener("message", handleEvent);
  });
