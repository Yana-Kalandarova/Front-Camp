class SourcesList {
  constructor() {
    this.wrapper = SourcesList.createComponentWrap();
    this.list = SourcesList.createComponent();
    this.sourceItemDelay = 1300;
  }

  static createComponent() {
    return document.createElement('ul');
  }

  static createComponentWrap() {
    return document.createElement('div');
  }

  static getListItems(sources) {
    return sources.map(source => (
      `<li class="filter_item">
        <label class="filter_item-label">
          <input class="filter_item-input" type="checkbox" value=${source.id}>
          <span class="filter_item-text">${source.name}</span>
        </label>
      </li>`
    )).join('');
  }

  build(sources) {
    this.list.className = 'filter_list';
    this.wrapper.className = 'filter';
    this.list.innerHTML = SourcesList.getListItems(sources);
    this.wrapper.append(this.list);

    return this;
  }

  initCheckboxHandler({ getTopHeadlinesNews, updateNewsList }) {
    this.list.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
        const checkedValues = this.getAllCheckedValues();

        getTopHeadlinesNews(checkedValues).then(({articles}) => {
          updateNewsList(articles);
        });
      }
    });
  }

  getAllCheckedValues() {
    const checkedValues = [];

    Array.from(this.list.querySelectorAll('input:checked')).forEach(elem => checkedValues.push(elem.value));

    return checkedValues.join(',');
  }

  getComponent() {
    return this.wrapper;
  }
}
