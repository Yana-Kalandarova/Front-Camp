import NewsBtn from './components/newsBtn';
import NewsList from './components/newsList';
import PageContent from './components/pageContent';
import Sidebar from './components/sidebar';
import SourcesList from './components/sourcesList';
import RequestFactory from './request';

class App {
  constructor() {
    this.body = document.querySelector('body');
    this.rootEl = this.createRootEl();
    this.request = new RequestFactory();
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

  initEventHandlers() {
    this.newsBtn.initClickHandler(this.getEventHandlersCallbacks());
  }

  getEventHandlersCallbacks() {
    return {
      getAllCheckedValues: this.sourcesList.getAllCheckedValues.bind(this.sourcesList),
      updateNewsList: this.newsList.build.bind(this.newsList),
      updateLayout: this.updateLayout.bind(this),
    };
  }

  initCallback(response) {
    return {
      initEventHandlers: this.initEventHandlers(),
      buildLayout: this.buildLayout(response),
    };
  }

  init() {
    this.request.create().getRequest(null, this.initCallback.bind(this));
  }
}

export default App;
