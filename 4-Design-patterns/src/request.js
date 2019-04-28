import apiLocalConfig from './api.config';

// request service implemented via Factory pattern
class RequestFactory {
  create(params) {
    if (params) {
      const _params = {
        method: 'post',
        body: JSON.stringify(params),
      };

      return new PostRequest(_params);
    } else {
      return new GetRequest();
    }
  }
}

let RequestProxy = new Proxy(RequestFactory, {
  construct(target, argumentsList) {
    console.log('create a new request');
    return new target(...argumentsList);
  },
});

class RequestService {
  constructor(param) {
    this.apiKey = apiLocalConfig.apiKey;
    this.urlPrefix = apiLocalConfig.urlPrefix;
    this.topHeadlinesParam = apiLocalConfig.topHeadlinesParam;
    this.sourcesParam = apiLocalConfig.sourcesParam;
    this.errorStatus = apiLocalConfig.errorStatus;
    this.param = param;
  }

  getTopHeadlinesURL(sources) {
    return `${this.urlPrefix}/${this.topHeadlinesParam}?sources=${sources}&apiKey=${this.apiKey}`;
  }

  getSourcesURl() {
    return `${this.urlPrefix}/${this.sourcesParam}?apiKey=${this.apiKey}`;
  }

  async getUrl (type) {
    let url = null;

    if (type) {
      url = this.getTopHeadlinesURL(type);
    } else {
      url = this.getSourcesURl();
    }

    const response = await fetch(url, this.param);
    const data = await response.json();

    return data;
  }

  getRequest(type, callback) {
    this.getUrl(type)
      .then((response) => {
        if (response.status === apiLocalConfig.errorStatus) {
          throw response;
        }

        callback(response);
      })
      .catch((response) => {
        import('./components/errorPopUp').then((module)=>{
          const errorPopUp = new module.default(response);

          errorPopUp.show(response);
        })
      });
  }
}

class PostRequest extends RequestService {
  constructor(param) {
    super(param);
  }
}
class GetRequest extends RequestService {
  constructor() {
    super();
  }
}

export default RequestProxy;
