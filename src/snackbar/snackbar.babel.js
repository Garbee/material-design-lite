/**
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

class MaterialSnackbar {
  constructor(element) {
    this.element_ = element;
    this.cssClasses_ = {
      SNACKBAR: 'mdl-snackbar',
      CONAINER: 'mdl-snackbar__container',
      MESSAGE: 'mdl-snackbar__text',
      ACTION: 'mdl-snackbar__action',
      ACTIVE: 'mdl-snackbar--active'
    };
    this.containerElement_ =
      this.element_.querySelector('.' + this.cssClasses_.CONAINER);
    this.textElement_ =
      this.containerElement_.querySelector('.' + this.cssClasses_.MESSAGE);
    this.actionElement_ =
      this.containerElement_.querySelector('.' + this.cssClasses_.ACTION);
    if (!this.containerElement_) {
      throw new Error('There must be a container element within the snackbar.');
    }
    if (!this.textElement_) {
      throw new Error(
        'There must be a message element in the snackbar container.'
      );
    }
    if (!this.actionElement_) {
      throw new Error(
        'There must be an action element in the snackbar container.'
      );
    }
    this.active = false;
    this.actionHandler_ = undefined;
    this.message_ = undefined;
    this.actionText_ = undefined;
    this.queuedNotifications_ = [];
    this.setActionHidden_(true);
  }

  /**
   * Display the snackbar.
   *
   * @private
   */
  displaySnackbar_() {
    if (this.actionHandler_) {
      this.actionElement_.textContent = this.actionText_;
      this.actionElement_.addEventListener('click', this.actionHandler_);
      this.setActionHidden_(false);
    }

    this.textElement_.textContent = this.message_;
    this.element_.classList.add(this.cssClasses_.ACTIVE);
    this.element_.removeAttribute('aria-hidden');
    setTimeout(this.cleanup_.bind(this), this.timeout_);
  }

  /**
   * Show the snackbar.
   *
   * @param {Object} data The data for the notification.
   * @public
   */
  showSnackbar(data) {
    if (data === undefined) {
      throw new Error(
        'Please provide a data object with at least a message to display.');
    }
    if (data['message'] === undefined) {
      throw new Error('Please provide a message to be displayed.');
    }
    if (data['actionHandler'] && !data['actionText']) {
      throw new Error('Please provide action text with the handler.');
    }
    if (this.active) {
      this.queuedNotifications_.push(data);
    } else {
      this.active = true;
      this.message_ = data['message'];
      if (data['timeout']) {
        this.timeout_ = data['timeout'];
      } else {
        this.timeout_ = 8000;
      }
      if (data['actionHandler']) {
        this.actionHandler_ = data['actionHandler'];
      }
      if (data['actionText']) {
        this.actionText_ = data['actionText'];
      }
      this.displaySnackbar_();
    }
  }

  /**
   * Check if the queue has items within it.
   * If it does, display the next entry.
   *
   * @private
   */
  checkQueue_() {
    if (this.queuedNotifications_.length > 0) {
      this.showSnackbar(this.queuedNotifications_.shift());
    }
  }

  /**
   * Cleanup the snackbar event listeners and accessiblity attributes.
   *
   * @private
   */
  cleanup_() {
    this.element_.classList.remove(this.cssClasses_.ACTIVE);
    this.element_.setAttribute('aria-hidden', 'true');
    this.textElement_.textContent = '';
    // Hard check against undefined since
    // simply checking for existence failed.
    if (this.actionHandler_ !== undefined) {
      this.setActionHidden_(true);
      this.actionElement_.textContent = '';
      this.actionElement_.removeEventListener('click', this.actionHandler_);
    }
    this.actionHandler_ = undefined;
    this.message_ = undefined;
    this.actionText_ = undefined;
    this.active = false;
    this.checkQueue_();
  }

  /**
   * Set the action handler hidden state.
   *
   * @param {boolean} value Whether to hide the value or not.
   * @private
   */
  setActionHidden_(value) {
    if (value) {
      this.actionElement_.setAttribute('aria-hidden', 'true');
    } else {
      this.actionElement_.removeAttribute('aria-hidden');
    }
  }
}

export default MaterialSnackbar;
