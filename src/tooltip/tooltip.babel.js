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

/* eslint no-lonely-if:0 */

class MaterialTooltip {
  constructor(element) {
    this.element_ = element;
    this.CssClasses_ = {
      IS_ACTIVE: 'is-active',
      BOTTOM: 'mdl-tooltip--bottom',
      LEFT: 'mdl-tooltip--left',
      RIGHT: 'mdl-tooltip--right',
      TOP: 'mdl-tooltip--top'
    };

    // TODO: Check using a generic user-supplied selector for security.
    // Seems fishy. Could be exploited.
    var forSelector = this.element_.getAttribute('data-mdl-tooltip-target');

    if (forSelector) {
      this.forElement_ = document.querySelector(forSelector);
    }

    if (this.forElement_) {
      // It's left here because it prevents accidental text selection on Android
      if (!this.forElement_.hasAttribute('tabindex')) {
        this.forElement_.setAttribute('tabindex', '0');
      }

      this.boundMouseEnterHandler = this.handleMouseEnter_.bind(this);
      this.boundMouseLeaveHandler = this.handleMouseLeave_.bind(this);
      this.forElement_.addEventListener(
        'mouseenter', this.boundMouseEnterHandler, false);
      this.forElement_.addEventListener(
        'touchend', this.boundMouseEnterHandler, false);
      this.forElement_.addEventListener(
        'mouseleave', this.boundMouseLeaveHandler, false);
      window.addEventListener(
        'touchstart', this.boundMouseLeaveHandler);
    }
  }

  /**
   * Handle mouseenter for tooltip.
   *
   * @param {Event} event The event that fired.
   * @private
   */
  handleMouseEnter_(event) {
    var props = event.target.getBoundingClientRect();
    var left = props.left + (props.width / 2);
    var top = props.top + (props.height / 2);
    var marginLeft = -1 * (this.element_.offsetWidth / 2);
    var marginTop = -1 * (this.element_.offsetHeight / 2);

    if (
      this.element_.classList.contains(this.CssClasses_.LEFT) ||
      this.element_.classList.contains(this.CssClasses_.RIGHT)
    ) {
      left = (props.width / 2);
      if (top + marginTop < 0) {
        this.element_.style.top = 0;
        this.element_.style.marginTop = 0;
      } else {
        this.element_.style.top = top + 'px';
        this.element_.style.marginTop = marginTop + 'px';
      }
    } else {
      if (left + marginLeft < 0) {
        this.element_.style.left = 0;
        this.element_.style.marginLeft = 0;
      } else {
        this.element_.style.left = left + 'px';
        this.element_.style.marginLeft = marginLeft + 'px';
      }
    }

    if (this.element_.classList.contains(this.CssClasses_.TOP)) {
      this.element_.style.top =
        props.top - this.element_.offsetHeight - 10 + 'px';
    } else if (this.element_.classList.contains(this.CssClasses_.RIGHT)) {
      this.element_.style.left = props.left + props.width + 10 + 'px';
    } else if (this.element_.classList.contains(this.CssClasses_.LEFT)) {
      this.element_.style.left =
        props.left - this.element_.offsetWidth - 10 + 'px';
    } else {
      this.element_.style.top = props.top + props.height + 10 + 'px';
    }

    this.element_.classList.add(this.CssClasses_.IS_ACTIVE);
  }

  /**
   * Handle mouseleave for tooltip.
   *
   * @private
   */
  handleMouseLeave_() {
    this.element_.classList.remove(this.CssClasses_.IS_ACTIVE);
  }
}

export default MaterialTooltip;
