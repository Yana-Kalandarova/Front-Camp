import RequestFactory from '../request';

class NewsBtn {
  constructor() {
    this.wrapper = NewsBtn.createComponentWrap();
    this.btn = NewsBtn.createComponent();
    this.request = new RequestFactory();
  }

  static createComponent() {
    return document.createElement('button');
  }

  static createComponentWrap() {
    return document.createElement('div');
  }

  build() {
    this.btn.className = 'news-btn';
    this.wrapper.className = 'news-btn_wrapper';
    this.btn.innerHTML = 'Get News';
    this.wrapper.append(this.btn);

    return this;
  }

  newsBtnCallback(response) {
    const newsList = this.updateNewsList(response.articles);

    this.updateLayout(newsList.getComponent());
  }

  initClickHandler(callback) {
    this.btn.addEventListener('click', () => {
      const checkedValues = callback.getAllCheckedValues();

      checkedValues && this.request.create().getRequest(checkedValues, this.newsBtnCallback.bind(callback));
    });
  }

  getComponent() {
    return this.wrapper;
  }
}

export default NewsBtn;
