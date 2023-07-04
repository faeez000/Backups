export default class Toast {
  constructor(config) {
    this.config = config;

    this.toastContainer = document.createElement('div');
    this.toastHeader = document.createElement('div');
    this.toastCloseButton = document.createElement('button');
    this.toastBody = document.createElement('div');

    this.message = 'Hello, world! This is a toast message Hello, world! This is a toast message.';

    // messageType could be 'success' or 'failure'
    this.messageType = 'success';
  }

  create() {
    this._setAttribute();

    const span = document.createElement('span');
    span.setAttribute('arial-hidden', 'true');
    span.innerHTML = '&times;';

    this.toastBody.textContent = this.message;

    this.toastCloseButton.appendChild(span);

    this.toastHeader.appendChild(this.toastCloseButton);

    this.toastContainer.appendChild(this.toastBody);
    this.toastContainer.appendChild(this.toastHeader);
    document.querySelector(`${this.config.app}`).appendChild(this.toastContainer);
  }
  show() {
    $('.admin .toast').toast('show');
  }
  hide() {
    $('.admin .toast').toast('hide');
  }
  update(message, messageType) {
    if (messageType === 'success') {
      this._setSuccessStyle();
    } else {
      this._setFailureStyle();
    }
    this.toastBody.textContent = message;
  }
  _setSuccessStyle() {
    this.toastContainer.style.borderColor = '#C8F08F';
  }
  _setFailureStyle() {
    this.toastContainer.style.borderColor = '#DC4146';
  }

  _setAttribute() {
    this.toastContainer.setAttribute('class', 'toast toast-container');
    this.toastContainer.setAttribute('role', 'alert');
    this.toastContainer.setAttribute('aria-live', 'assertive');
    this.toastContainer.setAttribute('aria-atomic', 'true');
    this.toastContainer.setAttribute('data-autohide', 'true');
    this.toastContainer.setAttribute('data-delay', '1000');

    this.toastHeader.setAttribute('class', 'toast-header');

    this.toastCloseButton.setAttribute('type', 'button');
    this.toastCloseButton.setAttribute('class', 'ml-4 close');
    this.toastCloseButton.setAttribute('data-dismiss', 'toast');
    this.toastCloseButton.setAttribute('arial-label', 'Close');

    this.toastBody.setAttribute('class', 'toast-body');
  }
}
