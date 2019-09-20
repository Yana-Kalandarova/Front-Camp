class Sidebar {
  constructor() {
    this.sidebar = Sidebar.createComponent();
    this.sidebarTitle = Sidebar.createTitle();
  }

  static createComponent() {
    return document.createElement('aside');
  }

  static createTitle() {
    return document.createElement('h3');
  }

  getComponent() {
    return this.sidebar;
  }

  build(component, btn) {
    this.sidebar.className = 'sidebar';
    this.sidebarTitle.className = 'sidebar_title';
    this.sidebarTitle.textContent = 'Select Source of News';

    this.sidebar.append(this.sidebarTitle);
    this.sidebar.append(component);
    this.sidebar.append(btn);

    return this;
  }
}

export default Sidebar;
