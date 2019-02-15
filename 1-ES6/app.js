class App {
    constructor() {
        this.rootEl = document.querySelector('.root');
        this.requestService = new RequestService();
    }

    buildLayout([{articles}, {sources}]) {
        const p = document.createElement("p");
        this.rootEl.appendChild(p);

        console.log(articles);
        console.log(sources);
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
