"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var apiLocalConfig = {
  apiKey: '0231aec065cf4fa6b93f871a418b651a',
  urlPrefix: 'https://newsapi.org/v2',
  topHeadlinesParam: 'top-headlines',
  sourcesParam: 'sources',
  defaultSources: ['bbc-news', 'cnn']
};

var NewsList =
/*#__PURE__*/
function () {
  function NewsList() {
    _classCallCheck(this, NewsList);

    this.newsComponent = NewsList.createComponent();
    this.newsArticles = null;
  }

  _createClass(NewsList, [{
    key: "getNews",
    value: function getNews(articles) {
      return articles.map(function (article) {
        return "<article class=\"news-item\">\n        ".concat(article.urlToImage ? "<div class=\"news-item_img-wrap\">\n            <img class=\"news-item_img\" src=".concat(article.urlToImage, " alt='").concat(article.title, "'>\n        </div>") : '', "\n        <div class=\"news-item_content\">\n          <h2 class=\"news-item_title\">").concat(article.title, "</h2>\n          <p class=\"news-item_info\">\n            ").concat(article.author ? "<span class=\"news-item_info-item\"><img src=\"./img/news.svg\"> ".concat(article.author, "</span>") : '', "\n\n            ").concat(article.publishedAt ? "<span class=\"news-item_info-item\"><img src=\"./img/date.svg\">".concat(NewsList.transformPublishedDate(article.publishedAt), "</span>") : '', "\n          </p>\n          ").concat(article.description ? "<p class=\"news-item_description\">".concat(article.description, "</p>") : '', "\n          <a class=\"news-item_link\" href=").concat(article.url, " target=\"_blank\" title=\"").concat(article.title, "\">Read more</a>\n        </div>\n      </article>");
      }).join('');
    }
  }, {
    key: "build",
    value: function build(articles) {
      this.newsArticles = this.getNews(articles);
      this.newsComponent.className = 'news-list';
      this.newsComponent.innerHTML = this.newsArticles;
      return this;
    }
  }, {
    key: "getComponent",
    value: function getComponent() {
      return this.newsComponent;
    }
  }, {
    key: "updateComponent",
    value: function updateComponent(articles) {
      var newsItems = this.getNews(articles);

      if (this.newsArticles !== newsItems) {
        this.newsArticles = newsItems;
        this.newsComponent.innerHTML = this.newsArticles;
      }
    }
  }], [{
    key: "createComponent",
    value: function createComponent() {
      return document.createElement('div');
    }
  }, {
    key: "transformPublishedDate",
    value: function transformPublishedDate(date) {
      var newDate = new Date(date);
      return newDate.toLocaleString();
    }
  }]);

  return NewsList;
}();

var PageContent =
/*#__PURE__*/
function () {
  function PageContent() {
    _classCallCheck(this, PageContent);

    this.pageContent = PageContent.createComponent();
  }

  _createClass(PageContent, [{
    key: "build",
    value: function build(component) {
      this.pageContent.className = 'page-content';
      this.pageContent.appendChild(component);
      return this;
    }
  }, {
    key: "getComponent",
    value: function getComponent() {
      return this.pageContent;
    }
  }], [{
    key: "createComponent",
    value: function createComponent() {
      return document.createElement('section');
    }
  }]);

  return PageContent;
}();

var Sidebar =
/*#__PURE__*/
function () {
  function Sidebar() {
    _classCallCheck(this, Sidebar);

    this.sidebar = Sidebar.createComponent();
    this.sidebarTitle = Sidebar.createTitle();
  }

  _createClass(Sidebar, [{
    key: "getComponent",
    value: function getComponent() {
      return this.sidebar;
    }
  }, {
    key: "build",
    value: function build(component) {
      this.sidebar.className = 'sidebar';
      this.sidebarTitle.className = 'sidebar_title';
      this.sidebarTitle.textContent = 'Select Source of News';
      this.sidebar.appendChild(this.sidebarTitle);
      this.sidebar.appendChild(component);
      return this;
    }
  }], [{
    key: "createComponent",
    value: function createComponent() {
      return document.createElement('aside');
    }
  }, {
    key: "createTitle",
    value: function createTitle() {
      return document.createElement('h3');
    }
  }]);

  return Sidebar;
}();

var SourcesList =
/*#__PURE__*/
function () {
  function SourcesList() {
    _classCallCheck(this, SourcesList);

    this.wrapper = SourcesList.createComponentWrap();
    this.list = SourcesList.createComponent();
    this.sourceItemDelay = 1300;
  }

  _createClass(SourcesList, [{
    key: "build",
    value: function build(sources) {
      this.list.className = 'filter_list';
      this.wrapper.className = 'filter';
      this.list.innerHTML = SourcesList.getListItems(sources);
      this.wrapper.appendChild(this.list);
      return this;
    }
  }, {
    key: "initCheckboxHandler",
    value: function initCheckboxHandler(_ref) {
      var _this = this;

      var getTopHeadlinesNews = _ref.getTopHeadlinesNews,
          updateNewsList = _ref.updateNewsList;
      this.list.addEventListener('click', function (e) {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
          var checkedValues = _this.getAllCheckedValues();

          getTopHeadlinesNews(checkedValues).then(function (_ref2) {
            var articles = _ref2.articles;
            updateNewsList(articles);
          });
        }
      });
    }
  }, {
    key: "getAllCheckedValues",
    value: function getAllCheckedValues() {
      var checkedValues = [];
      Array.from(this.list.querySelectorAll('input:checked')).forEach(function (elem) {
        return checkedValues.push(elem.value);
      });
      return checkedValues.join(',');
    }
  }, {
    key: "getComponent",
    value: function getComponent() {
      return this.wrapper;
    }
  }], [{
    key: "createComponent",
    value: function createComponent() {
      return document.createElement('ul');
    }
  }, {
    key: "createComponentWrap",
    value: function createComponentWrap() {
      return document.createElement('div');
    }
  }, {
    key: "getListItems",
    value: function getListItems(sources) {
      return sources.map(function (source) {
        return "<li class=\"filter_item\">\n        <label class=\"filter_item-label\">\n          <input class=\"filter_item-input\" type=\"checkbox\" value=".concat(source.id, ">\n          <span class=\"filter_item-text\">").concat(source.name, "</span>\n        </label>\n      </li>");
      }).join('');
    }
  }]);

  return SourcesList;
}();

var RequestService =
/*#__PURE__*/
function () {
  function RequestService() {
    _classCallCheck(this, RequestService);

    this.apiKey = apiLocalConfig.apiKey;
    this.urlPrefix = apiLocalConfig.urlPrefix;
    this.topHeadlinesParam = apiLocalConfig.topHeadlinesParam;
    this.sourcesParam = apiLocalConfig.sourcesParam;
    this.defaultSources = apiLocalConfig.defaultSources;
  }

  _createClass(RequestService, [{
    key: "getTopHeadlinesURL",
    value: function getTopHeadlinesURL(sources) {
      var sourceList = sources || this.defaultSources.join(',');
      return "".concat(this.urlPrefix, "/").concat(this.topHeadlinesParam, "?sources=").concat(sourceList, "&apiKey=").concat(this.apiKey);
    }
  }, {
    key: "getSourcesURl",
    value: function getSourcesURl() {
      return "".concat(this.urlPrefix, "/").concat(this.sourcesParam, "?apiKey=").concat(this.apiKey);
    }
  }, {
    key: "getTopHeadlinesNews",
    value: function () {
      var _getTopHeadlinesNews = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(sources) {
        var url, response, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = this.getTopHeadlinesURL(sources);
                _context.next = 3;
                return fetch(url);

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                data = _context.sent;
                return _context.abrupt("return", data);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTopHeadlinesNews(_x) {
        return _getTopHeadlinesNews.apply(this, arguments);
      }

      return getTopHeadlinesNews;
    }()
  }, {
    key: "getSourcesNews",
    value: function () {
      var _getSourcesNews = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var url, response, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = this.getSourcesURl();
                _context2.next = 3;
                return fetch(url);

              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.json();

              case 6:
                data = _context2.sent;
                return _context2.abrupt("return", data);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSourcesNews() {
        return _getSourcesNews.apply(this, arguments);
      }

      return getSourcesNews;
    }()
  }]);

  return RequestService;
}();

var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    this.rootEl = document.querySelector('.root');
    this.requestService = new RequestService();
    this.sidebar = new Sidebar();
    this.pageContent = new PageContent();
    this.sourcesList = new SourcesList();
    this.newsList = new NewsList();
  }

  _createClass(App, [{
    key: "initEventHandlers",
    value: function initEventHandlers() {
      this.sourcesList.initCheckboxHandler(this.getEventHandlersCallbacks());
    }
  }, {
    key: "buildLayout",
    value: function buildLayout(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          articles = _ref4[0].articles,
          sources = _ref4[1].sources;

      var fragment = document.createDocumentFragment();
      var newsListComponent = this.newsList.build(articles).getComponent();
      var pageContentComponent = this.pageContent.build(newsListComponent).getComponent();
      var sourcesListComponent = this.sourcesList.build(sources).getComponent();
      var sidebarComponent = this.sidebar.build(sourcesListComponent).getComponent();
      fragment.appendChild(sidebarComponent);
      fragment.appendChild(pageContentComponent);
      this.rootEl.appendChild(fragment);
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      return Promise.all([this.requestService.getTopHeadlinesNews(), this.requestService.getSourcesNews()]);
    }
  }, {
    key: "getEventHandlersCallbacks",
    value: function getEventHandlersCallbacks() {
      return {
        getTopHeadlinesNews: this.requestService.getTopHeadlinesNews.bind(this.requestService),
        updateNewsList: this.newsList.updateComponent.bind(this.newsList)
      };
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.fetchData().then(function (data) {
        _this2.initEventHandlers(data);

        _this2.buildLayout(data);
      });
    }
  }]);

  return App;
}();

var myApp = new App();
myApp.init();