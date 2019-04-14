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

	initCheckboxHandler({
		getTopHeadlinesNews,
		updateNewsList
	}) {
		this.list.addEventListener('click', (e) => {

			if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
				const checkedValues = this.getAllCheckedValues();

				getTopHeadlinesNews(checkedValues).then(({
					articles
				}) => {
					updateNewsList(articles);
				});
			}
		});
	}

	getAllCheckedValues() {
		let checkedValues = [];

		this.list.querySelectorAll('input:checked').forEach(elem => checkedValues.push(elem.value));

		return checkedValues.join(',');
	}

	getComponent(sources) {
		return this.wrapper;
	}
}