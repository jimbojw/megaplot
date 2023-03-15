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
 * @fileoverview Types relating to Selections.
 */

import { SpriteView } from './generated/sprite-view';
import { HitTestParameters } from './hit-test-types';

/**
 * The enter, update and exit methods of Selections take callbacks of
 * this form.
 */
export type SelectionCallback<T> = (spriteView: SpriteView, datum: T) => void;

/**
 * Parameters to pass to a Selection hit test.
 */
export interface SelectionHitTestParameters
  extends Omit<HitTestParameters, 'sprites'> {
  /**
   * Whether to sort results so that the topmost Sprites are last. Default=true.
   */
  sortResults?: boolean;
}

/**
 * A Selection maps data points to sprites. This is the primary interface by
 * which API users express lifecycle changes to visible sprites.
 */
export interface Selection<T> {
  /**
   * Sets the callback to be invoked before a sprite first appears. Transition
   * time, if set will be ignored.
   */
  onInit: (initCallback: SelectionCallback<T>) => Selection<T>;

  /**
   * Set the callback to be invoked after the sprite first appears. Changes to
   * the arrival time will be honored. This allows for transitioning properties
   * as the sprite pops into existence.
   */
  onEnter: (enterCallback: SelectionCallback<T>) => Selection<T>;

  /**
   * Set the callback to be invoked after a previously bound sprite is bound
   * again. This will not run when a sprite first comes into existence, only
   * when its bound a subsequent time.
   */
  onUpdate: (updateCallback: SelectionCallback<T>) => Selection<T>;

  /**
   * Set the callback to be invoked for sprites that are being unbound.
   */
  onExit: (exitCallback: SelectionCallback<T>) => Selection<T>;

  /**
   * Bind the provided data points to the selection. This will cause the enter,
   * update and exit callbacks to be invoked asynchronously. If a key function
   * is specified, then data points will be bound to Sprites according to the
   * key string produced.
   */
  bind: (data: T[], keyFn?: (datum: T) => string) => Selection<T>;

  /**
   * Clear any previously bound data and Sprites. Previously bound Sprites will
   * still have their callbacks invoked. This is equivalent to calling bind()
   * with an empty array, except that it is guaranteed to drop expsting data and
   * Sprites, whereas calling bind([]) may be interrupted by a later call to
   * bind().
   */
  clear: () => Selection<T>;

  /**
   * Given target coordinates relative to the drawable container, determine
   * which data-bound Sprites' bounding boxes intersect the target, then resolve
   * with a result that includes an array of the bound data. If none of the
   * Selection's Sprites intersect the target, then the resolved array will be
   * empty.
   *
   * @param hitTestParameters Coordinates of the box/point to test.
   * @return T[] Array of data whose bound sprites were hit.
   */
  hitTest: (hitTestParameters: SelectionHitTestParameters) => T[];
}
