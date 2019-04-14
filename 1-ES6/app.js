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