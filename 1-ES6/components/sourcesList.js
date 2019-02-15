class SourcesList {
    constructor() {
        this.wrapper = this.createComponentWrap();
        this.list = this.createComponent();
        this.sourceItemDelay = 1300;
    }

    createComponent() {
        return document.createElement('ul');
    }

    createComponentWrap() {
        return document.createElement('div');
    }

    getListItems(sources) {
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
        this.list.innerHTML = this.getListItems(sources);
        this.wrapper.append(this.list);

        return this;
    }

    getComponent(sources) {
        return this.wrapper;
    }

}
