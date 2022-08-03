/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Provides default timing functions for work scheduler and the
 * timing functions shim, which uses it for TypeScript typing.
 */

/**
 * Generic Function which can be invoked as a callback.
 */
export type CallbackFunctionType = (...args: unknown[]) => unknown;

/**
 * To enhance testability, the timing functions are constructor parameters to
 * the WorkScheduler. This is exported for testing purposes, but generally
 * should not be of interest to API consumers.
 */
export const DEFAULT_TIMING_FUNCTIONS: TimingFunctions = Object.freeze({
  requestAnimationFrame: (callbackFn: FrameRequestCallback) =>
      window.requestAnimationFrame(callbackFn),
  cancelAnimationFrame: (handle: number) => {
    window.cancelAnimationFrame(handle);
  },
  setTimeout:
      (callbackFn: CallbackFunctionType, delay = 0, ...args: unknown[]) => {
        return window.setTimeout(callbackFn, delay, ...args);
      },
  clearTimeout: (id: number) => {
    window.clearTimeout(id);
  },
  now: () => Date.now(),
});

/** Timing functions for WorkScheduler. */
export interface TimingFunctions {
  /** Function that updates an animation before the browser's next repaint. */
  readonly requestAnimationFrame: (callback: FrameRequestCallback) => number;
  /** Function to cancel a scehdule animation frame. */
  readonly cancelAnimationFrame: (handle: number) => void;
  /** Sets a timer to execute a function or piece of code when it expires. */
  readonly setTimeout:
      (callbackFn: CallbackFunctionType, delay?: number,
       ...args: unknown[]) => number;
  /** Function to clear a scheduled timeout. */
  readonly clearTimeout: (id: number) => void;
  /** Function to get number of milliseconds elapsed since 1 Jan 1970. */
  readonly now: typeof Date.now;
}
