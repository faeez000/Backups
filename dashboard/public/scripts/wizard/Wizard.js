import LinkedList from './LinkedList.js';

export default class Wizard {
  constructor({ screenContainer, controllerContainer }, { previous, next, final }, screens = []) {
    this.config = {
      screenContainer: document.querySelector(`${screenContainer}`),
      controllerContainer: document.querySelector(`${controllerContainer}`),
    };
    this.controller = {
      previous: document.querySelector(`${previous}`),
      next: document.querySelector(`${next}`),
      final: document.querySelector(`${final}`),
    };
    this.screens = screens;
    this.currentScreen = null;
    this.screenList = new LinkedList();
  }
  initialize() {
    this._attachNextMethodToNextController();
    this._attachPreviousMethodToPreviousController();
    this._hidePreviousController();
    this._hideFinalController();

    this.screens.forEach((screen) => {
      this.screenList.add(screen);
    });

    this.currentScreen = this.screenList.head;

    if (!this.currentScreen.previous) {
      this._hidePreviousController();
    }
    this._emptyScreenContainer();
    this.config.screenContainer.appendChild(this.currentScreen.element);
  }
  next() {
    if (this.currentScreen.next) {
      this._showNextController();
      this._showPreviousController();

      this.currentScreen = this.currentScreen.next;

      if (!!!this.currentScreen.next) {
        this._hideNextController();
        this._showFinalController();
      }
      this._emptyScreenContainer();

      this.config.screenContainer.appendChild(this.currentScreen.element);
    } else {
      this._hideNextController();
    }
  }
  previous() {
    this._hideFinalController();

    if (this.currentScreen.previous) {
      this._showPreviousController();
      this._showNextController();

      this.currentScreen = this.currentScreen.previous;

      if (!!!this.currentScreen.previous) {
        this._hidePreviousController();
      }
      this._emptyScreenContainer();

      this.config.screenContainer.appendChild(this.currentScreen.element);
    } else {
      this._hidePreviousController();
    }
  }
  _showFinalController() {
    this.controller.final.style.display = 'block';
  }
  _showNextController() {
    this.controller.next.style.display = 'block';
  }
  _showPreviousController() {
    this.controller.previous.style.display = 'block';
  }
  _hideFinalController() {
    this.controller.final.style.display = 'none';
  }
  _hideNextController() {
    this.controller.next.style.display = 'none';
  }
  _hidePreviousController() {
    this.controller.previous.style.display = 'none';
  }
  _attachNextMethodToNextController() {
    this.controller.next.addEventListener('click', this.next.bind(this));
  }
  _attachPreviousMethodToPreviousController() {
    this.controller.previous.addEventListener('click', this.previous.bind(this));
  }
  _emptyScreenContainer() {
    this.config.screenContainer.innerHTML = '';
  }
}
