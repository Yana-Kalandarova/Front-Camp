class Sidebar {
	constructor() {
		this.sidebar = this.createComponent();
		this.sidebarTitle = this.createTitle();
	}
	createComponent() {
		return document.createElement('aside');
	}
	createTitle() {
		return document.createElement('h3');
	}
	getComponent() {
		return this.sidebar;
	}
	build(component) {
		this.sidebar.className = 'sidebar';
		this.sidebarTitle.className = 'sidebar_title';
		this.sidebarTitle.textContent = 'Select Source of News';

		this.sidebar.append(this.sidebarTitle);
		this.sidebar.append(component);

		return this;
	}
}