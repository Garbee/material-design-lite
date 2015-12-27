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

class MaterialTextfield {
  /**
   * Construct a MaterialTextfield object.
   *
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */
  constructor(element) {
    this.element_ = element;
    this.CssClasses_ = {
      LABEL: 'mdl-textfield__label',
      INPUT: 'mdl-textfield__input',
      IS_DIRTY: 'mdl-textfield--dirty',
      IS_FOCUSED: 'mdl-textfield--focused',
      IS_DISABLED: 'mdl-textfield--disabled',
      IS_INVALID: 'mdl-textfield--invalid',
      IS_UPGRADED: 'mdl-textfield--upgraded'
    };

    this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);

    if (!this.input_) {
      throw new Error('An input element must be a child of a textfield block.');
    }

    this.input_.addEventListener('input', this.updateClasses_.bind(this));
    this.input_.addEventListener('focus', this.onFocus_.bind(this));
    this.input_.addEventListener('blur', this.onBlur_.bind(this));
    this.input_.addEventListener('reset', this.onReset_.bind(this));
    var invalid = this.element_.classList
      .contains(this.CssClasses_.IS_INVALID);
    this.updateClasses_();
    this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
    if (invalid) {
      this.element_.classList.add(this.CssClasses_.IS_INVALID);
    }
    if (this.input_.hasAttribute('autofocus')) {
      this.element_.focus();
      this.checkFocus();
    }
  }

  /**
   * Handle focus events.
   * @private
   */
  onFocus_() {
    this.checkFocus();
  }

  /**
   * Handle lost focus
   *
   * @private
   */
  onBlur_() {
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
  }

  /**
   * Handle reset event from out side.
   *
   * @private
   */
  onReset_() {
    this.updateClasses_();
  }

  /**
   * Handle class updates.
   *
   * @private
   */
  updateClasses_() {
    this.checkDisabled();
    this.checkValidity();
    this.checkDirty();
    this.checkFocus();
  }

  /**
   * Check the disabled state of the input and update view accordingly.
   *
   * @public
   */
  checkDisabled() {
    if (this.input_.disabled) {
      this.element_.classList.add(this.CssClasses_.IS_DISABLED);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
    }
  }

  /**
   * Check the focus state and update field accordingly.
   *
   * @public
   */
  checkFocus() {
    if (Boolean(this.element_.querySelector(':focus'))) {
      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    }
  }

  /**
   * Check the validity state and update field accordingly.
   *
   * @public
   */
  checkValidity() {
    if (this.input_.validity) {
      if (this.input_.validity.valid) {
        this.element_.classList.remove(this.CssClasses_.IS_INVALID);
      } else {
        this.element_.classList.add(this.CssClasses_.IS_INVALID);
      }
    }
  }

  /**
   * Check the dirty state and update field accordingly.
   *
   * @public
   */
  checkDirty() {
    if (this.input_.value && this.input_.value.length > 0) {
      this.element_.classList.add(this.CssClasses_.IS_DIRTY);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
    }
  }

  /**
   * Disable text field.
   *
   * @public
   */
  disable() {
    this.input_.disabled = true;
    this.updateClasses_();
  }

  /**
   * Enable text field.
   *
   * @public
   */
  enable() {
    this.input_.disabled = false;
    this.updateClasses_();
  }

  /**
   * Update text field value.
   *
   * @param {string} value The value to which to set the control.
   * @public
   */
  change(value) {
    this.input_.value = value;
    this.updateClasses_();
  }

  /**
   * Clear the textfield value.
   *
   * @public
   */
  clear() {
    this.input_.value = '';
    this.updateClasses_();
  }
}

export default MaterialTextfield;
