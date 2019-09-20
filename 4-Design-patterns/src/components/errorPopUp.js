// error pop-up implemented via Singleton pattern
class ErrorPopUp {
  constructor(response) {
    if (typeof ErrorPopUp.instance === 'object') {
      return ErrorPopUp.instance;
    }

    this.response = response;
    this.popUp = ErrorPopUp.createComponent();
    this.wrapper = ErrorPopUp.createComponentWrap();
    this.wrapperClassName = 'error-popup_wrapper';
    this.btnClassName = 'error-popup_btn';

    ErrorPopUp.instance = this;

    return this;
  }

  static createComponent() {
    return document.createElement('div');
  }

  static createComponentWrap() {
    return document.createElement('div');
  }

  getPopUp() {
    return `
      <h3>${this.response.status}: ${this.response.code}</h3>
      <p>${this.response.message}</p>
      <button class=${this.btnClassName}>Close</button>
    `;
  }

  build() {
    this.popUp.className = 'error-popup';
    this.wrapper.className = this.wrapperClassName;
    this.popUp.innerHTML = this.getPopUp();

    this.wrapper.append(this.popUp);

    return this;
  }

  getComponent() {
    return this.wrapper;
  }

  initCloseHandler() {
    this.popUp.addEventListener('click', (e) => {
      if (e.target.classList.contains(this.btnClassName)) {
        this.close();
      }
    });
  }

  show(response) {
    console.log('Error:', response);
    const popUp = this.build().getComponent();

    document.querySelector('body').append(popUp);
    this.initCloseHandler();
  }

  close() {
    document.querySelector(`.${this.wrapperClassName}`).remove();
  }
}

export default ErrorPopUp;
