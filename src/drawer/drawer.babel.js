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
      if (
        node.classList &&
        node.classList.contains(this.cssClasses_.BACKDROP)
      ) {
        backdropFound = true;
      }
    });
    if (!backdropFound) {
      throw new Error('A drawer backdrop must be a sibling to the drawer.');
    }
  }

  /**
   * Fire an event after actions are completed.
   *
   * @private
   */
  fireAfterEvent_() {
    var eventName = 'mdl-drawer-hidden';
    if (this.element_.classList.contains(this.cssClasses_.VISIBLE)) {
      eventName = 'mdl-drawer-shown';
    }
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, false);
    this.element_.dispatchEvent(event);
  }

  /**
   * Fire an event before actions are carried out.
   *
   * @return {Event} The before action event.
   * @private
   */
  fireBeforeEvent_() {
    var eventName = 'mdl-drawer-showing';
    if (this.element_.classList.contains(this.cssClasses_.VISIBLE)) {
      eventName = 'mdl-drawer-hiding';
    }
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    this.element_.dispatchEvent(event);
    return event;
  }

  /**
   * Attempt to show the drawer if it is currently not visible.
   * @public
   */
  show() {
    var event = this.fireBeforeEvent_();
    if (!event.defaultPrevented) {
      this.element_.classList.add(this.cssClasses_.VISIBLE);
      this.fireAfterEvent_();
    }
  }

  /**
   * Attempt to hide the drawer if it is currently visible.
   * @public
   */
  hide() {
    var event = this.fireBeforeEvent_();
    if (!event.defaultPrevented) {
      this.element_.classList.remove(this.cssClasses_.VISIBLE);
      this.fireAfterEvent_();
    }
  }

  /**
   * Reverse the drawer's current state.
   * @public
   */
  toggle() {
    var event = this.fireBeforeEvent_();
    if (!event.defaultPrevented) {
      this.element_.classList.toggle(this.cssClasses_.VISIBLE);
      this.fireAfterEvent_();
    }
  }
}

export default MaterialDrawer;
