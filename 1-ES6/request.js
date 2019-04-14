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

	getTopHeadlinesNews(sources) {
		const url = this.getTopHeadlinesURL(sources);

		return fetch(url).then(data => data.json());
	}

	getSourcesNews() {
		const url = this.getSourcesURl();

		return fetch(url).then(data => data.json());
	}
}