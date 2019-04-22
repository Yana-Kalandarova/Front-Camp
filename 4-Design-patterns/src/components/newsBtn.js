class NewsBtn {
  constructor() {
    this.wrapper = NewsBtn.createComponentWrap();
    this.btn = NewsBtn.createComponent();
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

  initClickHandler({ getAllCheckedValues, getTopHeadlinesNews, updateNewsList, updateLayout }) {
    this.btn.addEventListener('click', () => {
      const checkedValues = getAllCheckedValues();

      checkedValues && getTopHeadlinesNews(checkedValues).then(({ articles }) => {
        const newsList = updateNewsList(articles);
        updateLayout(newsList.getComponent());
      });
    });
  }

  getComponent() {
    return this.wrapper;
  }
}

export default NewsBtn;
