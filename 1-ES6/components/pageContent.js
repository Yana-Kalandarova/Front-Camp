class PageContent {
  constructor() {
    this.pageContent = PageContent.createComponent();
  }

  static createComponent() {
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
