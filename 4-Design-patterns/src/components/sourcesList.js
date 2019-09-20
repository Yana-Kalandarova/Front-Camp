import checkboxFalse from '../img/checkbox-false.svg';
import checkboxTrue from '../img/checkbox-true.svg';

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
          <span class="filter_item-text">
            <span class="filter_item-icon">
              <svg><use xlink:href="#${checkboxFalse.id}"></svg>
              <svg><use xlink:href="#${checkboxTrue.id}"></svg>
            </span>
            ${source.name}
          </span>
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

  getAllCheckedValues() {
    const checkedValues = [];

    Array.from(this.list.querySelectorAll('input:checked')).forEach(elem => checkedValues.push(elem.value));

    return checkedValues.length && checkedValues.join(',');
  }

  getComponent() {
    return this.wrapper;
  }
}

export default SourcesList;
