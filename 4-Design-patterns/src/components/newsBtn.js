import apiLocalConfig from '../api.config';

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

      checkedValues && getTopHeadlinesNews(checkedValues)
        .then((response) => {
          if (response.status === apiLocalConfig.errorStatus) {
            throw response;
          }
          const newsList = updateNewsList(response.articles);
          updateLayout(newsList.getComponent());

          console.log(response.articles);
        })
        .catch((response) => {
          import('./errorPopUp').then((module)=>{
            const errorPopUp = new module.default(response);

            errorPopUp.show(response);
          })
        });
    });
  }

  getComponent() {
    return this.wrapper;
  }
}

export default NewsBtn;
