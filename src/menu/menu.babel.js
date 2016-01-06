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

class MaterialMenu {
  constructor(element) {
    this.element_ = element;
    this.CssClasses_ = {
      ITEM: 'mdl-menu__item',
      IS_VISIBLE: 'mdl-menu--visible',
      // Alignment options
      BOTTOM_LEFT: 'mdl-menu--bottom-left',
      BOTTOM_RIGHT: 'mdl-menu--bottom-right',
      TOP_LEFT: 'mdl-menu--top-left',
      TOP_RIGHT: 'mdl-menu--top-right',
      UNALIGNED: 'mdl-menu--unaligned'
    };
    // Set default placement.
    this.placement_ = this.CssClasses_.BOTTOM_LEFT;
    /*
     * Aux function to verify only one modifier is provided.
     */
    (() => {
      let alignmentOptions = [
        this.CssClasses_.BOTTOM_LEFT,
        this.CssClasses_.BOTTOM_RIGHT,
        this.CssClasses_.TOP_LEFT,
        this.CssClasses_.TOP_RIGHT,
        this.CssClasses_.UNALIGNED
      ];
      let contains = false;
      alignmentOptions.forEach(item => {
        if (this.element_.classList.contains(item)) {
          if (contains) {
            throw new Error('A menu may only have one alignment modifier.');
          } else {
            contains = true;
            this.placement_ = item;
          }
        }
      });
    })();
  }

  /**
   * Position the menu relative to the emitting event target.
   * @param {Event} event The event triggering the menu to display.
   * @private
   */
  positionMenu_(event) {
    let targetElementPosition = event.target.getBoundingClientRect();
    let parentPosition = event.target.parentElement.getBoundingClientRect();
    let targetBottomPlacement = targetElementPosition.bottom;
    let targetLeftPlacement = targetElementPosition.left;
    let targetRightPlacement = targetElementPosition.right;
    let parentRightPlacement = parentPosition.right;

    switch (this.placement_) {
      case this.CssClasses_.UNALIGNED:
        // Do nothing. Up to developer to handle this case.
        break;
      case this.CssClasses_.TOP_LEFT:
        // TODO: Position this
        console.error('Top Left menu positioning not yet implemented.');
        break;
      case this.CssClasses_.TOP_RIGHT:
        // TODO: Position this
        console.error('Top Right menu positioning not yet implemented.');
        break;
      case this.CssClasses_.BOTTOM_RIGHT:
        this.element_.style.right =
          (parentRightPlacement - targetRightPlacement) + 'px';
        this.element_.style.top = targetBottomPlacement + 'px';
        break;
      case this.CssClasses_.BOTTOM_LEFT:
      default:
        this.element_.style.top = targetBottomPlacement + 'px';
        this.element_.style.left = targetLeftPlacement + 'px';
        break;
    }
  }

  /**
   * Show the menu to the user.
   * @param {Event} event The event triggering the menu to display.
   * @public
   */
  show(event) {
    if (!event) {
      throw new Error('An event object must be supplied to show a menu.');
    }
    this.positionMenu_(event);
    this.element_.classList.add(this.CssClasses_.IS_VISIBLE);
  }

  /**
   * Close the menu.
   * @public
   */
  close() {
    this.element_.classList.remove(this.CssClasses_.IS_VISIBLE);
  }

  /**
   * Toggle the menu display.
   * @param {Event} event The emitting event causing the toggle.
   */
  toggle(event) {
    if (!event) {
      throw new Error('An event object must be supplied to toggle a menu.');
    }
    if (this.classList.contains(this.CssClasses_.IS_VISIBLE)) {
      this.hide();
      return;
    }
    this.show(event);
  }
}

export default MaterialMenu;
