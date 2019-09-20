import dateIcon from '../img/date.svg';
import newsIcon from '../img/news.svg';
import arrowIcon from '../img/chevron.svg';

class NewsList {
  constructor() {
    this.newsComponent = NewsList.createComponent();
    this.newsArticles = null;
  }

  static createComponent() {
    return document.createElement('div');
  }

  getNews(articles) {
    return articles.map(article => (
      `<article class="news-item">
        ${article.urlToImage
        ? `<div class="news-item_img-wrap">
            <img class="news-item_img" src=${article.urlToImage} alt='${article.title}'>
        </div>`
        : ''}
        <div class="news-item_content">
          <h2 class="news-item_title">${article.title}</h2>
          <p class="news-item_info">
            ${article.author
        ? `<span class="news-item_info-item"><svg><use xlink:href="#${newsIcon.id}"></svg> ${article.author}</span>`
        : ''}

            ${article.publishedAt
        ? `<span class="news-item_info-item"><svg><use xlink:href="#${dateIcon.id}"></svg> ${NewsList.transformPublishedDate(article.publishedAt)}</span>`
        : ''}
          </p>
          ${article.description
        ? `<p class="news-item_description">${article.description}</p>`
        : ''}
          <a class="news-item_link" href=${article.url} target="_blank" title="${article.title}">
            Read more
            <svg class="news-item_link-icon"><use xlink:href="#${arrowIcon.id}"></svg>
          </a>
        </div>
      </article>`
    )).join('');
  }

  static transformPublishedDate(date) {
    const newDate = new Date(date);

    return newDate.toLocaleString();
  }

  build(articles) {
    this.newsArticles = this.getNews(articles);
    this.newsComponent.className = 'news-list';
    this.newsComponent.innerHTML = this.newsArticles;

    return this;
  }

  getComponent() {
    return this.newsComponent;
  }

  updateComponent(articles) {
    const newsItems = this.getNews(articles);

    if (this.newsArticles !== newsItems) {
      this.newsArticles = newsItems;
      this.newsComponent.innerHTML = this.newsArticles;
    }
  }
}

export default NewsList;
