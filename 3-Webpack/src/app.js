import NewsList from './components/newsList';
import PageContent from './components/pageContent';
import Sidebar from './components/sidebar';
import SourcesList from './components/sourcesList';
import RequestService from './request';

class App {
  constructor() {
    this.body = document.querySelector('body');
    this.rootEl = this.createRootEl();
    this.requestService = new RequestService();
    this.sidebar = new Sidebar();
    this.pageContent = new PageContent();
    this.sourcesList = new SourcesList();
    this.newsList = new NewsList();
  }

  createRootEl() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('root');

    return this.rootEl;
  }

  initEventHandlers() {
    this.sourcesList.initCheckboxHandler(this.getEventHandlersCallbacks());
  }

  buildLayout([{ articles }, { sources }]) {
    const fragment = document.createDocumentFragment();
    const newsListComponent = this.newsList.build(articles).getComponent();
    const pageContentComponent = this.pageContent.build(newsListComponent).getComponent();
    const sourcesListComponent = this.sourcesList.build(sources).getComponent();
    const sidebarComponent = this.sidebar.build(sourcesListComponent).getComponent();

    fragment.append(sidebarComponent);
    fragment.append(pageContentComponent);
    this.rootEl.append(fragment);
    this.body.append(this.rootEl);
  }

  fetchData() {
    return Promise.all([this.requestService.getTopHeadlinesNews(), this.requestService.getSourcesNews()]);
  }

  getEventHandlersCallbacks() {
    return {
      getTopHeadlinesNews: this.requestService.getTopHeadlinesNews.bind(this.requestService),
      updateNewsList: this.newsList.updateComponent.bind(this.newsList),
    };
  }

  init() {
    this.fetchData().then((data) => {
      this.initEventHandlers(data);
      this.buildLayout(data);
    });
  }
}

export default App;
