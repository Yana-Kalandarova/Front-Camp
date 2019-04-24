import NewsBtn from './components/newsBtn';
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
    this.newsBtn = new NewsBtn();
  }

  createRootEl() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('root');

    return this.rootEl;
  }

  initEventHandlers() {
    this.newsBtn.initClickHandler(this.getEventHandlersCallbacks());
  }

  buildLayout(data) {
    const fragment = document.createDocumentFragment();
    const pageContentComponent = this.pageContent.build().getComponent();
    const newsBtn = this.newsBtn.build().getComponent();
    const sourcesListComponent = this.sourcesList.build(data.sources).getComponent();
    const sidebarComponent = this.sidebar.build(sourcesListComponent, newsBtn).getComponent();

    fragment.append(sidebarComponent);
    fragment.append(pageContentComponent);
    this.rootEl.append(fragment);
    this.body.prepend(this.rootEl);
  }

  updateLayout(newsListComponent) {
    this.pageContent.build(newsListComponent).getComponent();
  }

  fetchSources() {
    return Promise.resolve(this.requestService.getSourcesNews());
  }

  getEventHandlersCallbacks() {
    return {
      getAllCheckedValues: this.sourcesList.getAllCheckedValues.bind(this.sourcesList),
      getTopHeadlinesNews: this.requestService.getTopHeadlinesNews.bind(this.requestService),
      updateNewsList: this.newsList.build.bind(this.newsList),
      updateLayout: this.updateLayout.bind(this),
    };
  }

  init() {
    this.fetchSources()
      .then((response) => {
        if (response.status === this.requestService.errorStatus) {
          throw response;
        }
        this.initEventHandlers(response);
        this.buildLayout(response);
      })
      .catch((response) => {
        import('./components/errorPopUp').then((module)=>{
          const errorPopUp = new module.default(response);

          errorPopUp.show(response);
        })
      });
  }
}

export default App;
