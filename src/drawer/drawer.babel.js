/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @classdesc Applies developer methods to a Drawer node.
 * @class
 */
class MaterialDrawer {
  /**
   * Setup the MaterialDrawer object.
   * @param {Node} element The HTMLElement of the drawer.
   */
  constructor(element) {
    this.element_ = element;
    this.cssClasses_ = {
      VISIBLE: 'mdl-drawer--visible',
      BACKDROP: 'mdl-drawer__backdrop'
    };
    var backdropFound = false;
    Array.prototype.forEach.call(this.element_.parentNode.childNodes, node => {
      if (node.classList.contains(this.cssClasses_.BACKDROP)) {
        backdropFound = true;
      }
    });
    if (!backdropFound) {
      throw new Error('A drawer backdrop must be a sibling to the drawer.');
    }
  }

  /**
   * Show the drawer.
   * @public
   */
  show() {
    this.element_.classList.add(this.cssClasses_.VISIBLE);
  }

  /**
   * Hide the drawer.
   * @public
   */
  hide() {
    this.element_.classList.remove(this.cssClasses_.VISIBLE);
  }

  /**
   * Toggle the drawer state.
   * @public
   */
  toggle() {
    this.element_.classList.toggle(this.cssClasses_.VISIBLE);
  }
}

export default MaterialDrawer;
