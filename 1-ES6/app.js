class App {
    constructor() {
        this.rootEl = document.querySelector('.root');
        this.requestService = new RequestService();
        this.sidebar = new Sidebar();
        this.pageContent = new PageContent();
        this.sourcesList = new SourcesList();
        this.newsList= new NewsList();
    }

    buildLayout([{articles}, {sources}]) {
        const newsListComponent = this.newsList.build(articles).getComponent();
        const pageContentComponent = this.pageContent.build(newsListComponent).getComponent();
        const sourcesListComponent = this.sourcesList.build(sources).getComponent();
        const sidebarComponent = this.sidebar.build(sourcesListComponent).getComponent();

        this.rootEl.appendChild(sidebarComponent);
        this.rootEl.appendChild(pageContentComponent);
    }

    fetchData() {
        return Promise.all([this.requestService.getTopHeadlinesNews(), this.requestService.getSourcesNews()]);
    }

    init() {
        this.fetchData().then(data => {
            this.buildLayout(data);
        });
    }
}
