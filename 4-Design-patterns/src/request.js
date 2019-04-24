import apiLocalConfig from './api.config';

class RequestService {
  constructor() {
    this.apiKey = apiLocalConfig.apiKey;
    this.urlPrefix = apiLocalConfig.urlPrefix;
    this.topHeadlinesParam = apiLocalConfig.topHeadlinesParam;
    this.sourcesParam = apiLocalConfig.sourcesParam;
    this.errorStatus = apiLocalConfig.errorStatus;
  }

  getTopHeadlinesURL(sources) {
    return `${this.urlPrefix}/${this.topHeadlinesParam}?sources=${sources}&apiKey=${this.apiKey}`;
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

export default RequestService;
