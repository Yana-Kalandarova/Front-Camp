const apiLocalConfig = {
	apiKey: '0231aec065cf4fa6b93f871a418b651a',
	urlPrefix: 'https://newsapi.org/v2',
	topHeadlinesParam: 'top-headlines',
	sourcesParam: 'sources',
	defaultSources: [
		'bbc-news',
		'cnn',
	],
};

class NewsList {
	constructor() {
		this.newsComponent = this.createComponent();
		this.newsArticles = null;
	}

	createComponent() {
		return document.createElement('div');
	}

	getNews(articles) {
		return articles.map(article => (
			`<article class="news-item">
        ${article.urlToImage ?
				`<div class="news-item_img-wrap"><img class="news-item_img" src=${article.urlToImage} alt='${article.title}'></div>`
				: ''}
				<div class="news-item_content">
					<h2 class="news-item_title">${article.title}</h2>
					<p class="news-item_info">
							${article.author ?
				`<span class="news-item_info-item"><img src="./img/news.svg"> ${article.author}</span>` :
				''}
							${article.publishedAt ?
				`<span class="news-item_info-item"><img src="./img/date.svg">${this.transformPublishedDate(article.publishedAt)}</span>` :
				''}
					</p>
					${article.description ?
				`<p class="news-item_description">${article.description}</p>` :
				''}
					<a class="news-item_link" href=${article.url} target="_blank" title="${article.title}">Read more</a>
				</div>
			</article>`
		)).join('');
	}

	transformPublishedDate(date) {
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

class PageContent {
	constructor() {
		this.pageContent = this.createComponent();
	}
	createComponent() {
		return document.createElement('section');
	}
	build(component) {
		this.pageContent.className = 'page-content';
		this.pageContent.append(component);

		return this;
	}
	getComponent() {
		return this.pageContent;
	}
}

class Sidebar {
	constructor() {
		this.sidebar = this.createComponent();
		this.sidebarTitle = this.createTitle();
	}
	createComponent() {
		return document.createElement('aside');
	}
	createTitle() {
		return document.createElement('h3');
	}
	getComponent() {
		return this.sidebar;
	}
	build(component) {
		this.sidebar.className = 'sidebar';
		this.sidebarTitle.className = 'sidebar_title';
		this.sidebarTitle.textContent = 'Select Source of News';

		this.sidebar.append(this.sidebarTitle);
		this.sidebar.append(component);

		return this;
	}
}

class SourcesList {
	constructor() {
		this.wrapper = this.createComponentWrap();
		this.list = this.createComponent();
		this.sourceItemDelay = 1300;
	}

	createComponent() {
		return document.createElement('ul');
	}

	createComponentWrap() {
		return document.createElement('div');
	}

	getListItems(sources) {
		return sources.map(source => (
			`<li class="filter_item">
				<label class="filter_item-label">
						<input class="filter_item-input" type="checkbox" value=${source.id}>
						<span class="filter_item-text">${source.name}</span>
				</label>
      </li>`
		)).join('');
	}

	build(sources) {
		this.list.className = 'filter_list';
		this.wrapper.className = 'filter';
		this.list.innerHTML = this.getListItems(sources);
		this.wrapper.append(this.list);

		return this;
	}

	initCheckboxHandler({
							getTopHeadlinesNews,
							updateNewsList
						}) {
		this.list.addEventListener('click', (e) => {

			if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
				const checkedValues = this.getAllCheckedValues();

				getTopHeadlinesNews(checkedValues).then(({
															 articles
														 }) => {
					updateNewsList(articles);
				});
			}
		});
	}

	getAllCheckedValues() {
		let checkedValues = [];

		Array.from(this.list.querySelectorAll('input:checked')).forEach(elem => checkedValues.push(elem.value));

		return checkedValues.join(',');
	}

	getComponent(sources) {
		return this.wrapper;
	}
}

class RequestService {
	constructor() {
		this.apiKey = apiLocalConfig.apiKey;
		this.urlPrefix = apiLocalConfig.urlPrefix;
		this.topHeadlinesParam = apiLocalConfig.topHeadlinesParam;
		this.sourcesParam = apiLocalConfig.sourcesParam;
		this.defaultSources = apiLocalConfig.defaultSources;
	}

	getTopHeadlinesURL(sources) {
		const sourceList = sources ? sources : this.defaultSources.join(',');

		return `${this.urlPrefix}/${this.topHeadlinesParam}?sources=${sourceList}&apiKey=${this.apiKey}`;
	}

	getSourcesURl() {
		return `${this.urlPrefix}/${this.sourcesParam}?apiKey=${this.apiKey}`;
	}

	async getTopHeadlinesNews(sources) {
		const url = this.getTopHeadlinesURL(sources);
		const response = await fetch(url);
		const data = await response.json();

		return data;
	}

	async getSourcesNews() {
		const url = this.getSourcesURl();
		const response = await fetch(url);
		const data = await response.json();

		return data;
	}
}

class App {
	constructor() {
		this.rootEl = document.querySelector('.root');
		this.requestService = new RequestService();
		this.sidebar = new Sidebar();
		this.pageContent = new PageContent();
		this.sourcesList = new SourcesList();
		this.newsList = new NewsList();
	}

	initEventHandlers() {
		this.sourcesList.initCheckboxHandler(this.getEventHandlersCallbacks());
	}

	buildLayout([{
		articles
	}, {
		sources
	}]) {
		const fragment = document.createDocumentFragment();
		const newsListComponent = this.newsList.build(articles).getComponent();
		const pageContentComponent = this.pageContent.build(newsListComponent).getComponent();
		const sourcesListComponent = this.sourcesList.build(sources).getComponent();
		const sidebarComponent = this.sidebar.build(sourcesListComponent).getComponent();

		fragment.appendChild(sidebarComponent);
		fragment.appendChild(pageContentComponent);

		this.rootEl.appendChild(fragment);
	}

	fetchData() {
		return Promise.all([this.requestService.getTopHeadlinesNews(), this.requestService.getSourcesNews()]);
	}

	getEventHandlersCallbacks() {
		return {
			getTopHeadlinesNews: this.requestService.getTopHeadlinesNews.bind(this.requestService),
			updateNewsList: this.newsList.updateComponent.bind(this.newsList)
		};
	}

	init() {
		this.fetchData().then(data => {
			this.initEventHandlers(data);
			this.buildLayout(data);
		});
	}
}

const myApp = new App();
myApp.init();