(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
  var Application, Chaplin, Layout, Left_Navigation_Controller, Messages_Controller, Session_Controller, Websockets_Controller, mediator, routes, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  mediator = require('mediator');

  routes = require('routes');

  _ = require('underscore');

  Session_Controller = require('controllers/session_controller');

  Left_Navigation_Controller = require('controllers/left_navigation_controller');

  Websockets_Controller = require('controllers/websockets_controller');

  Messages_Controller = require('controllers/messages_controller');

  Layout = require('views/layout');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'Fire';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      window.cache = {};
      this.initDispatcher();
      this.initLayout();
      this.initMediator();
      this.initControllers();
      this.initRouter(routes, {
        pushState: false
      });
      window.max_uploads = 4;
      window.queue = _([]);
      window.current_uploads = {};
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    Application.prototype.initControllers = function() {
      new Session_Controller();
      new Websockets_Controller();
      new Left_Navigation_Controller();
      return new Messages_Controller();
    };

    Application.prototype.initMediator = function() {
      Chaplin.mediator.user = null;
      return Chaplin.mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
}});

window.require.define({"controllers/base/controller": function(exports, require, module) {
  var Chaplin, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    return Controller;

  })(Chaplin.Controller);
  
}});

window.require.define({"controllers/brands_controller": function(exports, require, module) {
  var Brand, Brands, BrandsController, Controller, Index_View, UpdateOrCreate_View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediator = require('mediator');

  Index_View = require('views/brands/brands_index');

  UpdateOrCreate_View = require('views/brands/brands_updateorcreate');

  Brands = require('models/brands');

  Brand = require('models/brand');

  module.exports = BrandsController = (function(_super) {

    __extends(BrandsController, _super);

    function BrandsController() {
      return BrandsController.__super__.constructor.apply(this, arguments);
    }

    BrandsController.prototype.initialize = function() {
      return BrandsController.__super__.initialize.apply(this, arguments);
    };

    BrandsController.prototype.index = function() {
      return this.view = new Index_View({
        collection: new Brands()
      });
    };

    BrandsController.prototype.update = function(params) {
      return this.view = new UpdateOrCreate_View({
        model: new Brand({
          id: params.id
        })
      });
    };

    BrandsController.prototype.create = function() {
      return this.view = new UpdateOrCreate_View({
        model: new Brand()
      });
    };

    return BrandsController;

  })(Controller);
  
}});

window.require.define({"controllers/categories_controller": function(exports, require, module) {
  var Categories, CategoriesController, Category, Controller, Index_View, UpdateOrCreate_View, mediate,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediate = require('mediator');

  Index_View = require('views/categories/categories_index');

  UpdateOrCreate_View = require('views/categories/categories_updateorcreate');

  Categories = require('models/categories');

  Category = require('models/category');

  module.exports = CategoriesController = (function(_super) {

    __extends(CategoriesController, _super);

    function CategoriesController() {
      return CategoriesController.__super__.constructor.apply(this, arguments);
    }

    CategoriesController.prototype.initialize = function() {};

    CategoriesController.prototype.index = function() {
      return this.view = new Index_View({
        collection: new Categories()
      });
    };

    CategoriesController.prototype.update = function(params) {
      return this.view = new UpdateOrCreate_View({
        model: new Category({
          id: params.id
        })
      });
    };

    CategoriesController.prototype.create = function() {
      return this.view = new UpdateOrCreate_View({
        model: new Category()
      });
    };

    return CategoriesController;

  })(Controller);
  
}});

window.require.define({"controllers/dashboard_controller": function(exports, require, module) {
  var Controller, Dashboard, DashboardsController,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  Dashboard = require('views/dashboard/dashboard_home');

  module.exports = DashboardsController = (function(_super) {

    __extends(DashboardsController, _super);

    function DashboardsController() {
      return DashboardsController.__super__.constructor.apply(this, arguments);
    }

    DashboardsController.prototype.initialize = function() {};

    DashboardsController.prototype.home = function() {
      return this.view = new Dashboard();
    };

    return DashboardsController;

  })(Controller);
  
}});

window.require.define({"controllers/images_controller": function(exports, require, module) {
  var Controller, Gallery_View, Image, Images, ImagesController, Uploader_View, mediate,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediate = require('mediator');

  Gallery_View = require('views/images/images_gallery');

  Uploader_View = require('views/images/images_uploader');

  Images = require('models/images');

  Image = require('models/image');

  module.exports = ImagesController = (function(_super) {

    __extends(ImagesController, _super);

    function ImagesController() {
      return ImagesController.__super__.constructor.apply(this, arguments);
    }

    ImagesController.prototype.initialize = function() {};

    ImagesController.prototype.gallery = function() {
      return this.view = new Gallery_View({
        collection: new Images()
      });
    };

    ImagesController.prototype.upload = function() {
      return this.view = new Uploader_View();
    };

    return ImagesController;

  })(Controller);
  
}});

window.require.define({"controllers/left_navigation_controller": function(exports, require, module) {
  var Controller, LeftNavigationController, Left_Navigation, Left_Navigation_View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediator = require('mediator');

  Left_Navigation = require('models/left_navigation');

  Left_Navigation_View = require('views/globals/left_navigation');

  module.exports = LeftNavigationController = (function(_super) {

    __extends(LeftNavigationController, _super);

    function LeftNavigationController() {
      return LeftNavigationController.__super__.constructor.apply(this, arguments);
    }

    LeftNavigationController.prototype.initialize = function() {
      LeftNavigationController.__super__.initialize.apply(this, arguments);
      this.model = new Left_Navigation();
      return this.view = new Left_Navigation_View({
        model: this.model
      });
    };

    return LeftNavigationController;

  })(Controller);
  
}});

window.require.define({"controllers/markets_controller": function(exports, require, module) {
  var Controller, Index_View, Market, Markets, Markets_Controller, Upsert_View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediator = require('mediator');

  Index_View = require('views/markets/markets_index');

  Upsert_View = require('views/markets/markets_upsert');

  Markets = require('models/markets');

  Market = require('models/market');

  module.exports = Markets_Controller = (function(_super) {

    __extends(Markets_Controller, _super);

    function Markets_Controller() {
      return Markets_Controller.__super__.constructor.apply(this, arguments);
    }

    Markets_Controller.prototype.initialize = function() {
      return Markets_Controller.__super__.initialize.apply(this, arguments);
    };

    Markets_Controller.prototype.index = function() {
      return this.view = new Index_View({
        collection: new Markets()
      });
    };

    Markets_Controller.prototype.update = function(params) {
      return this.view = new Upsert_View({
        model: new Market({
          id: params.id
        })
      });
    };

    Markets_Controller.prototype.create = function() {
      return this.view = new Upsert_View({
        model: new Market()
      });
    };

    return Markets_Controller;

  })(Controller);
  
}});

window.require.define({"controllers/messages_controller": function(exports, require, module) {
  var Controller, Flash_Message, Flash_Message_View, Messages_Controller, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediator = require('mediator');

  Flash_Message = require('models/flash_message');

  Flash_Message_View = require('views/messages/flash_message');

  module.exports = Messages_Controller = (function(_super) {

    __extends(Messages_Controller, _super);

    function Messages_Controller() {
      return Messages_Controller.__super__.constructor.apply(this, arguments);
    }

    Messages_Controller.prototype.initialize = function() {
      Messages_Controller.__super__.initialize.apply(this, arguments);
      return this.subscribeEvent('message:flash', this.flash_message);
    };

    Messages_Controller.prototype.flash_message = function(message) {
      var msg, type, _results;
      _results = [];
      for (type in message) {
        msg = message[type];
        _results.push(new Flash_Message_View({
          model: new Flash_Message({
            type: type,
            text: msg
          }),
          container: '#page-container',
          decay: 2500
        }));
      }
      return _results;
    };

    return Messages_Controller;

  })(Controller);
  
}});

window.require.define({"controllers/products_controller": function(exports, require, module) {
  var Controller, Index_View, Product, Products, ProductsController, UpdateOrCreate_View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediator = require('mediator');

  Index_View = require('views/products/products_index');

  UpdateOrCreate_View = require('views/products/products_updateorcreate');

  Products = require('models/products');

  Product = require('models/product');

  module.exports = ProductsController = (function(_super) {

    __extends(ProductsController, _super);

    function ProductsController() {
      return ProductsController.__super__.constructor.apply(this, arguments);
    }

    ProductsController.prototype.index = function() {
      return this.view = new Index_View({
        collection: new Products()
      });
    };

    ProductsController.prototype.update = function(params) {
      return this.view = new UpdateOrCreate_View({
        model: new Product({
          id: params.id
        })
      });
    };

    ProductsController.prototype.create = function() {
      return this.view = new UpdateOrCreate_View({
        model: new Product()
      });
    };

    return ProductsController;

  })(Controller);
  
}});

window.require.define({"controllers/scopes_controller": function(exports, require, module) {
  var Controller, Index_View, Scope, Scopes, ScopesController, Upsert_View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediator = require('mediator');

  Index_View = require('views/scopes/scopes_index');

  Upsert_View = require('views/scopes/scopes_upsert');

  Scopes = require('models/scopes');

  Scope = require('models/scope');

  module.exports = ScopesController = (function(_super) {

    __extends(ScopesController, _super);

    function ScopesController() {
      return ScopesController.__super__.constructor.apply(this, arguments);
    }

    ScopesController.prototype.initialize = function() {
      return ScopesController.__super__.initialize.apply(this, arguments);
    };

    ScopesController.prototype.index = function() {
      return this.view = new Index_View({
        collection: new Scopes()
      });
    };

    ScopesController.prototype.update = function(params) {
      return this.view = new Upsert_View({
        model: new Scope({
          id: params.id
        })
      });
    };

    ScopesController.prototype.create = function() {
      return this.view = new Upsert_View({
        model: new Scope()
      });
    };

    return ScopesController;

  })(Controller);
  
}});

window.require.define({"controllers/search_controller": function(exports, require, module) {
  var Collection, Controller, SearchController, Search_Results_View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  Collection = require('models/search_results');

  Search_Results_View = require('views/globals/search_results');

  module.exports = SearchController = (function(_super) {

    __extends(SearchController, _super);

    function SearchController() {
      return SearchController.__super__.constructor.apply(this, arguments);
    }

    SearchController.prototype.initialize = function() {
      return this.subscribeEvent('performSearch', this.query);
    };

    SearchController.prototype.historyURL = function(params) {
      if (params.query) {
        return "#_q?" + params.query;
      } else {
        return '';
      }
    };

    SearchController.prototype.query = function(params) {
      if (params.query && params.query.length >= 1) {
        return this.view = new Search_Results_View({
          collection: new Collection,
          query: params.query
        });
      }
    };

    return SearchController;

  })(Controller);
  
}});

window.require.define({"controllers/session_controller": function(exports, require, module) {
  var Controller, LoginView, SessionController, User, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Controller = require('controllers/base/controller');

  User = require('models/user');

  LoginView = require('views/globals/login');

  module.exports = SessionController = (function(_super) {

    __extends(SessionController, _super);

    function SessionController() {
      this.logout = __bind(this.logout, this);

      this.serviceProviderSession = __bind(this.serviceProviderSession, this);

      this.triggerLogin = __bind(this.triggerLogin, this);
      return SessionController.__super__.constructor.apply(this, arguments);
    }

    SessionController.serviceProviders = {};

    SessionController.prototype.loginStatusDetermined = false;

    SessionController.prototype.loginView = null;

    SessionController.prototype.serviceProviderName = null;

    SessionController.prototype.initialize = function() {
      this.subscribeEvent('serviceProviderSession', this.serviceProviderSession);
      this.subscribeEvent('logout', this.logout);
      this.subscribeEvent('userData', this.userData);
      this.subscribeEvent('!showLogin', this.showLoginView);
      this.subscribeEvent('!login', this.triggerLogin);
      this.subscribeEvent('!logout', this.triggerLogout);
      return this.getSession();
    };

    SessionController.prototype.loadServiceProviders = function() {
      var name, serviceProvider, _ref, _results;
      _ref = SessionController.serviceProviders;
      _results = [];
      for (name in _ref) {
        serviceProvider = _ref[name];
        _results.push(serviceProvider.load());
      }
      return _results;
    };

    SessionController.prototype.createUser = function(userData) {
      return mediator.user = new User(userData);
    };

    SessionController.prototype.getSession = function() {
      var name, serviceProvider, _ref, _results;
      this.loadServiceProviders();
      _ref = SessionController.serviceProviders;
      _results = [];
      for (name in _ref) {
        serviceProvider = _ref[name];
        _results.push(serviceProvider.done(serviceProvider.getLoginStatus));
      }
      return _results;
    };

    SessionController.prototype.showLoginView = function() {
      if (this.loginView) {
        return;
      }
      this.loadServiceProviders();
      return this.loginView = new LoginView({
        serviceProviders: SessionController.serviceProviders
      });
    };

    SessionController.prototype.triggerLogin = function(serviceProviderName) {
      var serviceProvider;
      serviceProvider = SessionController.serviceProviders[serviceProviderName];
      if (!serviceProvider.isLoaded()) {
        mediator.publish('serviceProviderMissing', serviceProviderName);
        return;
      }
      mediator.publish('loginAttempt', serviceProviderName);
      return serviceProvider.triggerLogin();
    };

    SessionController.prototype.serviceProviderSession = function(session) {
      this.serviceProviderName = session.provider.name;
      this.disposeLoginView();
      session.id = session.userId;
      delete session.userId;
      this.createUser(session);
      return this.publishLogin();
    };

    SessionController.prototype.publishLogin = function() {
      this.loginStatusDetermined = true;
      mediator.publish('login', mediator.user);
      return mediator.publish('loginStatus', true);
    };

    SessionController.prototype.triggerLogout = function() {
      return mediator.publish('logout');
    };

    SessionController.prototype.logout = function() {
      this.loginStatusDetermined = true;
      this.disposeUser();
      this.serviceProviderName = null;
      this.showLoginView();
      return mediator.publish('loginStatus', false);
    };

    SessionController.prototype.userData = function(data) {
      return mediator.user.set(data);
    };

    SessionController.prototype.disposeLoginView = function() {
      if (!this.loginView) {
        return;
      }
      this.loginView.dispose();
      return this.loginView = null;
    };

    SessionController.prototype.disposeUser = function() {
      if (!mediator.user) {
        return;
      }
      mediator.user.dispose();
      return mediator.user = null;
    };

    return SessionController;

  })(Controller);
  
}});

window.require.define({"controllers/suppliers_controller": function(exports, require, module) {
  var Controller, Index_View, Supplier, Suppliers, SuppliersController, UpdateOrCreate_View, mediate,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediate = require('mediator');

  Index_View = require('views/suppliers/suppliers_index');

  UpdateOrCreate_View = require('views/suppliers/suppliers_updateorcreate');

  Suppliers = require('models/suppliers');

  Supplier = require('models/supplier');

  module.exports = SuppliersController = (function(_super) {

    __extends(SuppliersController, _super);

    function SuppliersController() {
      return SuppliersController.__super__.constructor.apply(this, arguments);
    }

    SuppliersController.prototype.initialize = function() {
      return SuppliersController.__super__.initialize.apply(this, arguments);
    };

    SuppliersController.prototype.index = function() {
      return this.view = new Index_View({
        collection: new Suppliers()
      });
    };

    SuppliersController.prototype.update = function(params) {
      return this.view = new UpdateOrCreate_View({
        model: new Supplier({
          id: params.id
        })
      });
    };

    SuppliersController.prototype.create = function() {
      return this.view = new UpdateOrCreate_View({
        model: new Supplier()
      });
    };

    return SuppliersController;

  })(Controller);
  
}});

window.require.define({"controllers/templates_controller": function(exports, require, module) {
  var Controller, Index_View, Template, Templates, TemplatesController, UpdateOrCreate_View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediator = require('mediator');

  Index_View = require('views/templates/templates_index');

  UpdateOrCreate_View = require('views/templates/templates_updateorcreate');

  Templates = require('models/templates');

  Template = require('models/template');

  module.exports = TemplatesController = (function(_super) {

    __extends(TemplatesController, _super);

    function TemplatesController() {
      return TemplatesController.__super__.constructor.apply(this, arguments);
    }

    TemplatesController.prototype.initialize = function() {};

    TemplatesController.prototype.index = function() {
      return this.view = new Index_View({
        collection: new Templates()
      });
    };

    TemplatesController.prototype.update = function(params) {
      return this.view = new UpdateOrCreate_View({
        model: new Template({
          id: params.id
        })
      });
    };

    TemplatesController.prototype.create = function() {
      return this.view = new UpdateOrCreate_View({
        model: new Template()
      });
    };

    return TemplatesController;

  })(Controller);
  
}});

window.require.define({"controllers/websockets_controller": function(exports, require, module) {
  var Controller, WebsocketsController, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  mediator = require('mediator');

  module.exports = WebsocketsController = (function(_super) {

    __extends(WebsocketsController, _super);

    function WebsocketsController() {
      return WebsocketsController.__super__.constructor.apply(this, arguments);
    }

    WebsocketsController.prototype.initialize = function() {
      this.socket = io.connect("http://" + DOMAIN);
      this.subscribeEvent('upload:start', this.uploadStart);
      this.subscribeEvent('upload:data', this.uploadData);
      this.socket.on('moar', this.ask_for_moar);
      this.socket.on('uploaded', this.uploaded);
      this.socket.on('image:message', this.image_message);
      return this.socket.on("image:saved", this.image_saved);
    };

    WebsocketsController.prototype.addChannel = function(namespace) {};

    WebsocketsController.prototype.image_message = function(data) {
      return mediator.publish('upload:message', data);
    };

    WebsocketsController.prototype.image_saved = function(data) {
      return mediator.publish('image:saved', data);
    };

    WebsocketsController.prototype.ask_for_moar = function(data) {
      return mediator.publish('upload:moar', data);
    };

    WebsocketsController.prototype.uploaded = function(data) {
      return mediator.publish('upload:finished', data);
    };

    WebsocketsController.prototype.uploadStart = function(data) {
      return this.socket.emit('upload:initialize', data);
    };

    WebsocketsController.prototype.uploadData = function(data) {
      return this.socket.emit('upload:continue', data);
    };

    return WebsocketsController;

  })(Controller);
  
}});

window.require.define({"initialize": function(exports, require, module) {
  var Application;

  Application = require('application');

  $(function() {
    var app;
    app = new Application();
    return app.initialize();
  });
  
}});

window.require.define({"lib/clean_objectify": function(exports, require, module) {
  
  module.exports = function(ele) {
    var fields, key, _fn, _i, _len, _ref;
    fields = {};
    _ref = $(ele).serializeArray();
    _fn = function(key) {
      if (!(key.value === 'undefined' || key.value === null)) {
        return fields[key.name] = key.value;
      }
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      _fn(key);
    }
    return fields;
  };
  
}});

window.require.define({"lib/objectify": function(exports, require, module) {
  
  module.exports = function(ele) {
    var fields, key, value, _i, _len, _ref;
    fields = {};
    _ref = $(ele).serializeArray();
    for (value = _i = 0, _len = _ref.length; _i < _len; value = ++_i) {
      key = _ref[value];
      if (key.value) {
        fields[key.name] = key.value;
      }
    }
    return fields;
  };
  
}});

window.require.define({"lib/piper": function(exports, require, module) {
  var Piper,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  module.exports = Piper = (function() {

    function Piper(self) {
      this.self = self;
      this.push = __bind(this.push, this);

      this.toString = __bind(this.toString, this);

      this.toArray = __bind(this.toArray, this);

      if (this.self) {
        if (this.self instanceof Array) {
          this.length = this.self.length;
          this.self = this.self.join('|');
        }
      } else {
        this.self = '';
        this.length = 0;
      }
    }

    Piper.prototype.toArray = function() {
      if (this.self === "") {
        return [];
      } else {
        return this.self.split('|');
      }
    };

    Piper.prototype.toString = function() {
      return this.self;
    };

    Piper.prototype.push = function(val) {
      length++;
      if (this.self === '') {
        return this.self = val;
      } else {
        return this.self += "|" + val;
      }
    };

    return Piper;

  })();
  
}});

window.require.define({"lib/services/service_provider": function(exports, require, module) {
  var Chaplin, ServiceProvider, utils;

  utils = require('lib/utils');

  Chaplin = require('chaplin');

  module.exports = ServiceProvider = (function() {

    _(ServiceProvider.prototype).extend(Chaplin.Subscriber);

    ServiceProvider.prototype.loading = false;

    function ServiceProvider() {
      _(this).extend($.Deferred());
      utils.deferMethods({
        deferred: this,
        methods: ['triggerLogin', 'getLoginStatus'],
        onDeferral: this.load
      });
    }

    ServiceProvider.prototype.disposed = false;

    ServiceProvider.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      this.unsubscribeAllEvents();
      this.disposed = true;
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    return ServiceProvider;

  })();

  /*

    Standard methods and their signatures:

    load: ->
      # Load a script like this:
      utils.loadLib 'http://example.org/foo.js', @loadHandler, @reject

    loadHandler: =>
      # Init the library, then resolve
      ServiceProviderLibrary.init(foo: 'bar')
      @resolve()

    isLoaded: ->
      # Return a Boolean
      Boolean window.ServiceProviderLibrary and ServiceProviderLibrary.login

    # Trigger login popup
    triggerLogin: (loginContext) ->
      callback = _(@loginHandler).bind(this, loginContext)
      ServiceProviderLibrary.login callback

    # Callback for the login popup
    loginHandler: (loginContext, response) =>

      eventPayload = {provider: this, loginContext}
      if response
        # Publish successful login
        mediator.publish 'loginSuccessful', eventPayload

        # Publish the session
        mediator.publish 'serviceProviderSession',
          provider: this
          userId: response.userId
          accessToken: response.accessToken
          # etc.

      else
        mediator.publish 'loginFail', eventPayload

    getLoginStatus: (callback = @loginStatusHandler, force = false) ->
      ServiceProviderLibrary.getLoginStatus callback, force

    loginStatusHandler: (response) =>
      return unless response
      mediator.publish 'serviceProviderSession',
        provider: this
        userId: response.userId
        accessToken: response.accessToken
        # etc.
  */

  
}});

window.require.define({"lib/support": function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
}});

window.require.define({"lib/utils": function(exports, require, module) {
  var Chaplin, mediator, utils,
    __hasProp = {}.hasOwnProperty;

  Chaplin = require('chaplin');

  mediator = require('mediator');

  utils = Chaplin.utils.beget(Chaplin.utils);

  _(utils).extend({
    /*
      Wrap methods so they can be called before a deferred is resolved.
      The actual methods are called once the deferred is resolved.
    
      Parameters:
    
      Expects an options hash with the following properties:
    
      deferred
        The Deferred object to wait for.
    
      methods
        Either:
        - A string with a method name e.g. 'method'
        - An array of strings e.g. ['method1', 'method2']
        - An object with methods e.g. {method: -> alert('resolved!')}
    
      host (optional)
        If you pass an array of strings in the `methods` parameter the methods
        are fetched from this object. Defaults to `deferred`.
    
      target (optional)
        The target object the new wrapper methods are created at.
        Defaults to host if host is given, otherwise it defaults to deferred.
    
      onDeferral (optional)
        An additional callback function which is invoked when the method is called
        and the Deferred isn't resolved yet.
        After the method is registered as a done handler on the Deferred,
        this callback is invoked. This can be used to trigger the resolving
        of the Deferred.
    
      Examples:
    
      deferMethods(deferred: def, methods: 'foo')
        Wrap the method named foo of the given deferred def and
        postpone all calls until the deferred is resolved.
    
      deferMethods(deferred: def, methods: def.specialMethods)
        Read all methods from the hash def.specialMethods and
        create wrapped methods with the same names at def.
    
      deferMethods(
        deferred: def, methods: def.specialMethods, target: def.specialMethods
      )
        Read all methods from the object def.specialMethods and
        create wrapped methods at def.specialMethods,
        overwriting the existing ones.
    
      deferMethods(deferred: def, host: obj, methods: ['foo', 'bar'])
        Wrap the methods obj.foo and obj.bar so all calls to them are postponed
        until def is resolved. obj.foo and obj.bar are overwritten
        with their wrappers.
    */

    deferMethods: function(options) {
      var deferred, func, host, methods, methodsHash, name, onDeferral, target, _i, _len, _results;
      deferred = options.deferred;
      methods = options.methods;
      host = options.host || deferred;
      target = options.target || host;
      onDeferral = options.onDeferral;
      methodsHash = {};
      if (typeof methods === 'string') {
        methodsHash[methods] = host[methods];
      } else if (methods.length && methods[0]) {
        for (_i = 0, _len = methods.length; _i < _len; _i++) {
          name = methods[_i];
          func = host[name];
          if (typeof func !== 'function') {
            throw new TypeError("utils.deferMethods: method " + name + " notfound on host " + host);
          }
          methodsHash[name] = func;
        }
      } else {
        methodsHash = methods;
      }
      _results = [];
      for (name in methodsHash) {
        if (!__hasProp.call(methodsHash, name)) continue;
        func = methodsHash[name];
        if (typeof func !== 'function') {
          continue;
        }
        _results.push(target[name] = utils.createDeferredFunction(deferred, func, target, onDeferral));
      }
      return _results;
    },
    createDeferredFunction: function(deferred, func, context, onDeferral) {
      if (context == null) {
        context = deferred;
      }
      return function() {
        var args;
        args = arguments;
        if (deferred.state() === 'resolved') {
          return func.apply(context, args);
        } else {
          deferred.done(function() {
            return func.apply(context, args);
          });
          if (typeof onDeferral === 'function') {
            return onDeferral.apply(context);
          }
        }
      };
    }
  });

  module.exports = utils;
  
}});

window.require.define({"lib/view_helper": function(exports, require, module) {
  var mediator, utils;

  mediator = require('mediator');

  utils = require('chaplin/lib/utils');

  Handlebars.registerHelper('if_logged_in', function(options) {
    if (mediator.user) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('with_user', function(options) {
    var context;
    context = mediator.user || {};
    return Handlebars.helpers["with"].call(this, context, options);
  });
  
}});

window.require.define({"mediator": function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
}});

window.require.define({"models/action": function(exports, require, module) {
  var Action, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Action = (function(_super) {

    __extends(Action, _super);

    function Action() {
      return Action.__super__.constructor.apply(this, arguments);
    }

    Action.prototype.defaults = {
      suffix: '',
      height: '',
      width: ''
    };

    return Action;

  })(Model);
  
}});

window.require.define({"models/actions": function(exports, require, module) {
  var Actions, Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Actions = (function(_super) {

    __extends(Actions, _super);

    function Actions() {
      return Actions.__super__.constructor.apply(this, arguments);
    }

    Actions.prototype.model = require('models/action');

    return Actions;

  })(Collection);
  
}});

window.require.define({"models/base/collection": function(exports, require, module) {
  var Chaplin, Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.initialize = function(models, options) {
      Collection.__super__.initialize.apply(this, arguments);
      if (!models) {
        return this.load();
      }
    };

    Collection.prototype.load = function() {
      var _this = this;
      if (this.url) {
        this.initSyncMachine();
        this.beginSync();
        return this.fetch({
          success: function(models, res) {
            return _this.finishSync();
          }
        });
      } else {

      }
    };

    return Collection;

  })(Chaplin.Collection);
  
}});

window.require.define({"models/base/menu_options": function(exports, require, module) {
  var Chaplin, Menu_Options,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Menu_Options = (function(_super) {

    __extends(Menu_Options, _super);

    function Menu_Options() {
      return Menu_Options.__super__.constructor.apply(this, arguments);
    }

    Menu_Options.prototype.initialize = function(test) {
      return console.log(test);
    };

    return Menu_Options;

  })(Chaplin.Collection);
  
}});

window.require.define({"models/base/model": function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.prototype.clean = function() {
      var attr, handle_collection, handle_model, model_attribute, new_val, _i, _len, _ref, _results;
      if (!this.attributes_for_cleaning) {
        return;
      }
      handle_model = function(obj) {
        if (obj._id) {
          return obj._id;
        }
      };
      handle_collection = function(collection) {
        var ids, model, wait, _i, _len;
        ids = [];
        if (collection.length > 0) {
          wait = collection.length;
          collection = collection.toJSON();
          for (_i = 0, _len = collection.length; _i < _len; _i++) {
            model = collection[_i];
            if (model._id) {
              ids.push(model._id);
            }
            if (--wait === 0) {
              return ids;
            }
          }
        }
      };
      _ref = this.attributes_for_cleaning;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        model_attribute = this.attributes[attr];
        if (model_attribute) {
          new_val = model_attribute.length ? handle_collection(model_attribute) : handle_model(model_attribute);
          _results.push(this.attributes[attr] = new_val);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Model;

  })(Chaplin.Model);
  
}});

window.require.define({"models/brand": function(exports, require, module) {
  var Brand, Colors, Materials, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Colors = require('models/colors');

  Materials = require('models/materials');

  module.exports = Brand = (function(_super) {

    __extends(Brand, _super);

    function Brand() {
      return Brand.__super__.constructor.apply(this, arguments);
    }

    Brand.prototype.urlRoot = '/brands';

    Brand.prototype.defaults = {
      name: '',
      description: '',
      colors: new Colors(),
      materials: new Materials()
    };

    Brand.prototype.initialize = function() {
      return Brand.__super__.initialize.apply(this, arguments);
    };

    Brand.prototype.parse = function(res) {
      var color, material, _i, _j, _len, _len1, _ref, _ref1;
      _ref = res.colors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        color = _ref[_i];
        if (color.id) {
          delete color.id;
        }
      }
      _ref1 = res.materials;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        material = _ref1[_j];
        if (material.id) {
          delete material.id;
        }
      }
      res.colors = new Colors(res.colors);
      res.materials = new Materials(res.materials);
      return res;
    };

    Brand.prototype.dispose = function() {
      Brand.__super__.dispose.apply(this, arguments);
      return console.log(this);
    };

    return Brand;

  })(Model);
  
}});

window.require.define({"models/brands": function(exports, require, module) {
  var Brands, Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Brands = (function(_super) {

    __extends(Brands, _super);

    function Brands() {
      return Brands.__super__.constructor.apply(this, arguments);
    }

    Brands.prototype.url = '/brands';

    Brands.prototype.model = require('models/brand');

    return Brands;

  })(Collection);
  
}});

window.require.define({"models/categories": function(exports, require, module) {
  var Categories, Category, Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Category = require('models/category');

  module.exports = Categories = (function(_super) {

    __extends(Categories, _super);

    function Categories() {
      return Categories.__super__.constructor.apply(this, arguments);
    }

    Categories.prototype.url = '/categories';

    Categories.prototype.model = Category;

    return Categories;

  })(Collection);
  
}});

window.require.define({"models/category": function(exports, require, module) {
  var Category, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Category = (function(_super) {

    __extends(Category, _super);

    function Category() {
      return Category.__super__.constructor.apply(this, arguments);
    }

    Category.prototype.urlRoot = '/categories';

    Category.prototype.defaults = {
      name: '',
      singular: '',
      onlyPlural: 0
    };

    Category.prototype.initialize = function() {
      return Category.__super__.initialize.apply(this, arguments);
    };

    return Category;

  })(Model);
  
}});

window.require.define({"models/color": function(exports, require, module) {
  var Model, Variation,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Variation = (function(_super) {

    __extends(Variation, _super);

    function Variation() {
      return Variation.__super__.constructor.apply(this, arguments);
    }

    Variation.prototype.defaults = {
      name: '',
      description: ''
    };

    return Variation;

  })(Model);
  
}});

window.require.define({"models/colors": function(exports, require, module) {
  var Collection, Colors,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Colors = (function(_super) {

    __extends(Colors, _super);

    function Colors() {
      return Colors.__super__.constructor.apply(this, arguments);
    }

    Colors.prototype.model = require('models/color');

    return Colors;

  })(Collection);
  
}});

window.require.define({"models/drop_down_menu": function(exports, require, module) {
  var Collection, DropDownMenuCollection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = DropDownMenuCollection = (function(_super) {

    __extends(DropDownMenuCollection, _super);

    function DropDownMenuCollection() {
      return DropDownMenuCollection.__super__.constructor.apply(this, arguments);
    }

    DropDownMenuCollection.prototype.model = require('models/drop_down_menu_option');

    DropDownMenuCollection.prototype.setUrl = function(url) {
      this.url = url;
      return this.load();
    };

    return DropDownMenuCollection;

  })(Collection);
  
}});

window.require.define({"models/drop_down_menu_option": function(exports, require, module) {
  var DropDownMenuOptionModel, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = DropDownMenuOptionModel = (function(_super) {

    __extends(DropDownMenuOptionModel, _super);

    function DropDownMenuOptionModel() {
      return DropDownMenuOptionModel.__super__.constructor.apply(this, arguments);
    }

    return DropDownMenuOptionModel;

  })(Model);
  
}});

window.require.define({"models/dynamo_menu": function(exports, require, module) {
  var Collection, DynamoMenuCollection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = DynamoMenuCollection = (function(_super) {

    __extends(DynamoMenuCollection, _super);

    function DynamoMenuCollection() {
      return DynamoMenuCollection.__super__.constructor.apply(this, arguments);
    }

    DynamoMenuCollection.prototype.model = require('models/dynamo_menu_option');

    DynamoMenuCollection.prototype.query = function(param) {
      var _this = this;
      return $.get(this.query_location + param, function(res) {
        return _this.reset(res);
      });
    };

    return DynamoMenuCollection;

  })(Collection);
  
}});

window.require.define({"models/dynamo_menu_option": function(exports, require, module) {
  var DynamoMenuOption, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = DynamoMenuOption = (function(_super) {

    __extends(DynamoMenuOption, _super);

    function DynamoMenuOption() {
      return DynamoMenuOption.__super__.constructor.apply(this, arguments);
    }

    return DynamoMenuOption;

  })(Model);
  
}});

window.require.define({"models/flash_message": function(exports, require, module) {
  var FlashMessage, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = FlashMessage = (function(_super) {

    __extends(FlashMessage, _super);

    function FlashMessage() {
      return FlashMessage.__super__.constructor.apply(this, arguments);
    }

    return FlashMessage;

  })(Model);
  
}});

window.require.define({"models/image": function(exports, require, module) {
  var Image, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Image = (function(_super) {

    __extends(Image, _super);

    function Image() {
      return Image.__super__.constructor.apply(this, arguments);
    }

    Image.prototype.urlRoot = '/images';

    Image.prototype.initialize = function() {
      return Image.__super__.initialize.apply(this, arguments);
    };

    return Image;

  })(Model);
  
}});

window.require.define({"models/images": function(exports, require, module) {
  var Collection, Image, Images,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Image = require('models/image');

  module.exports = Images = (function(_super) {

    __extends(Images, _super);

    function Images() {
      return Images.__super__.constructor.apply(this, arguments);
    }

    Images.prototype.url = '/images';

    Images.prototype.model = Image;

    return Images;

  })(Collection);
  
}});

window.require.define({"models/left_navigation": function(exports, require, module) {
  var LeftNavigation, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = LeftNavigation = (function(_super) {

    __extends(LeftNavigation, _super);

    function LeftNavigation() {
      return LeftNavigation.__super__.constructor.apply(this, arguments);
    }

    LeftNavigation.prototype.defaults = {
      links: [
        {
          href: '#',
          title: 'Dashboard'
        }, {
          href: '#/products',
          title: 'Products'
        }, {
          href: '#/gallery',
          title: 'Gallery'
        }, {
          href: '#/brands',
          title: 'Brands'
        }, {
          href: '#/categories',
          title: 'Categories'
        }, {
          href: '#/suppliers',
          title: 'Suppliers'
        }, {
          href: '#/templates',
          title: 'Templates'
        }, {
          href: '#/scopes',
          title: 'Scopes'
        }, {
          href: '#/markets',
          title: 'Markets'
        }, {
          href: '/_logout',
          title: 'Log Out',
          "class": 'logout'
        }
      ]
    };

    return LeftNavigation;

  })(Model);
  
}});

window.require.define({"models/market": function(exports, require, module) {
  var Market, Model, Surcharges,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Surcharges = require('models/surcharges');

  module.exports = Market = (function(_super) {

    __extends(Market, _super);

    function Market() {
      return Market.__super__.constructor.apply(this, arguments);
    }

    Market.prototype.urlRoot = '/markets';

    Market.prototype.defaults = {
      name: '',
      surcharges: new Surcharges()
    };

    Market.prototype.initialize = function() {
      return Market.__super__.initialize.apply(this, arguments);
    };

    Market.prototype.parse = function(res) {
      var surcharge, _i, _len, _ref;
      if (!res.surcharges) {
        return res;
      }
      _ref = res.surcharges;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        surcharge = _ref[_i];
        if (surcharge.id) {
          delete surcharge.id;
        }
      }
      res.surcharges = new Surcharges(res.surcharges);
      return res;
    };

    return Market;

  })(Model);
  
}});

window.require.define({"models/markets": function(exports, require, module) {
  var Collection, Markets,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Markets = (function(_super) {

    __extends(Markets, _super);

    function Markets() {
      return Markets.__super__.constructor.apply(this, arguments);
    }

    Markets.prototype.url = '/markets';

    Markets.prototype.model = require('models/market');

    return Markets;

  })(Collection);
  
}});

window.require.define({"models/material": function(exports, require, module) {
  var Model, Variation,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Variation = (function(_super) {

    __extends(Variation, _super);

    function Variation() {
      return Variation.__super__.constructor.apply(this, arguments);
    }

    Variation.prototype.defaults = {
      name: '',
      description: ''
    };

    return Variation;

  })(Model);
  
}});

window.require.define({"models/materials": function(exports, require, module) {
  var Collection, Materials,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Materials = (function(_super) {

    __extends(Materials, _super);

    function Materials() {
      return Materials.__super__.constructor.apply(this, arguments);
    }

    Materials.prototype.model = require('models/material');

    return Materials;

  })(Collection);
  
}});

window.require.define({"models/product": function(exports, require, module) {
  var Model, Product, Product_Images, Product_Markets, Selling_Points, Variations, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  mediator = require('mediator');

  Selling_Points = require('models/selling_points');

  Variations = require('models/variations');

  Product_Images = require('models/product_images');

  Product_Markets = require('models/product_markets');

  module.exports = Product = (function(_super) {

    __extends(Product, _super);

    function Product() {
      return Product.__super__.constructor.apply(this, arguments);
    }

    Product.prototype.urlRoot = '/products';

    Product.prototype.defaults = {
      title: '',
      updatedAt: new Date,
      description: '',
      male: true,
      female: true,
      markup: 1.30,
      MAP: '',
      cost: 0,
      price: 1000,
      skuBase: '',
      selling_points: new Selling_Points(),
      variations: new Variations(),
      images: new Product_Images(),
      price_points: new Product_Markets()
    };

    Product.prototype.attributes_for_cleaning = ['_color', '_material', '_brand', '_supplier', '_category', 'images'];

    Product.prototype.initialize = function() {
      return Product.__super__.initialize.apply(this, arguments);
    };

    Product.prototype.parse = function(res) {
      var price_points;
      res.selling_points = new Selling_Points(res.selling_points);
      res.variations = new Variations(res.variations);
      res.images = new Product_Images(res.images);
      if (res.price_points) {
        price_points = res.price_points;
        res.price_points = new Product_Markets();
        res.price_points.set_pricing(price_points);
      }
      return res;
    };

    return Product;

  })(Model);
  
}});

window.require.define({"models/product_image": function(exports, require, module) {
  var Model, Product_Image,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Product_Image = (function(_super) {

    __extends(Product_Image, _super);

    function Product_Image() {
      return Product_Image.__super__.constructor.apply(this, arguments);
    }

    return Product_Image;

  })(Model);
  
}});

window.require.define({"models/product_images": function(exports, require, module) {
  var Collection, Product_Images,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Product_Images = (function(_super) {

    __extends(Product_Images, _super);

    function Product_Images() {
      return Product_Images.__super__.constructor.apply(this, arguments);
    }

    Product_Images.prototype.model = require('models/product_image');

    Product_Images.prototype.initialize = function() {
      Product_Images.__super__.initialize.apply(this, arguments);
      this.initSyncMachine();
      this.beginSync();
      this.reset();
      return this.finishSync();
    };

    Product_Images.prototype.setUrl = function(url) {
      this.url = url;
      return this.load();
    };

    return Product_Images;

  })(Collection);
  
}});

window.require.define({"models/product_market": function(exports, require, module) {
  var Model, Product_Market, Product_Market_Surcharges, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  mediator = require('mediator');

  Product_Market_Surcharges = require('models/product_market_surcharges');

  module.exports = Product_Market = (function(_super) {

    __extends(Product_Market, _super);

    function Product_Market() {
      return Product_Market.__super__.constructor.apply(this, arguments);
    }

    Product_Market.prototype.defaults = {
      surcharges: new Product_Market_Surcharges()
    };

    Product_Market.prototype.initialize = function() {
      Product_Market.__super__.initialize.apply(this, arguments);
      this._pricing = {};
      this.subscribeEvent('pricing_data', this.set_pricing_data);
      this.subscribeEvent("pricing_data:" + this.cid, this.set_pricing_data);
      this.bind('change:active', this.fetch_pricing_data);
      this.bind("change:price", this.calculate_profit);
      return this.bind("change:price", this.calculate_roi);
    };

    Product_Market.prototype.calculate_price = function() {
      var market_price;
      market_price = 0;
      if (this._pricing.supplier_costs === 0) {
        this._lastError = '[pricing] no supplier costs';
        this._valid = false;
        return false;
      }
      if (this._pricing.product_cost === 0) {
        this._lastError = '[pricing] no product costs';
        this._valid = false;
        return false;
      }
      this._pricing.market_costs = _(this.attributes.surcharges.toJSON()).pluck('cost').reduce(function(memo, num) {
        return memo + num;
      });
      market_price += this._pricing.product_cost;
      market_price += this._pricing.supplier_costs;
      market_price = market_price * (1 + this._pricing.market_costs);
      market_price = market_price * this._pricing.markup;
      market_price = Math.round(market_price) - .05;
      this._valid = true;
      if (market_price > this._pricing.MAP) {
        return market_price;
      } else {
        return this._pricing.MAP;
      }
    };

    Product_Market.prototype.set_pricing_data = function(data) {
      var key, new_price, value;
      if (data == null) {
        data = {};
      }
      for (key in data) {
        value = data[key];
        this._pricing[key] = value;
      }
      new_price = this.calculate_price();
      if (new_price) {
        return this.set('price', new_price);
      } else {
        return this.set('price', 0);
      }
    };

    Product_Market.prototype.calculate_roi = function(model, price) {
      var $_total_cost, ROI;
      $_total_cost = this._pricing.supplier_costs + this._pricing.product_cost + (price * this._pricing.market_costs);
      ROI = (price - $_total_cost) / $_total_cost;
      return this.set("ROI", ROI.toFixed(2));
    };

    Product_Market.prototype.calculate_profit = function(model, price) {
      var $_total_cost, profit;
      $_total_cost = this._pricing.supplier_costs + this._pricing.product_cost + (price * this._pricing.market_costs);
      profit = price - $_total_cost;
      return this.set('profit', profit.toFixed(2));
    };

    Product_Market.prototype.fetch_pricing_data = function() {
      mediator.publish('fetch_pricing_data', this.cid);
      return this;
    };

    Product_Market.prototype.toJSON = function() {
      Product_Market.__super__.toJSON.apply(this, arguments);
      delete this.attributes.createdAt;
      delete this.attributes.updatedAt;
      delete this.attributes.surcharges;
      return this.attributes;
    };

    return Product_Market;

  })(Model);
  
}});

window.require.define({"models/product_market_surcharge": function(exports, require, module) {
  var Model, Product_Market_Surcharge,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Product_Market_Surcharge = (function(_super) {

    __extends(Product_Market_Surcharge, _super);

    function Product_Market_Surcharge() {
      return Product_Market_Surcharge.__super__.constructor.apply(this, arguments);
    }

    Product_Market_Surcharge.prototype.defaults = {
      type: '',
      cost: ''
    };

    return Product_Market_Surcharge;

  })(Model);
  
}});

window.require.define({"models/product_market_surcharges": function(exports, require, module) {
  var Collection, Product_Market_Surcharges,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Product_Market_Surcharges = (function(_super) {

    __extends(Product_Market_Surcharges, _super);

    function Product_Market_Surcharges() {
      return Product_Market_Surcharges.__super__.constructor.apply(this, arguments);
    }

    Product_Market_Surcharges.prototype.model = require('models/product_market_surcharge');

    return Product_Market_Surcharges;

  })(Collection);
  
}});

window.require.define({"models/product_markets": function(exports, require, module) {
  var Chaplin, Product_Market_Surcharges, Product_Markets, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  mediator = require('mediator');

  Product_Market_Surcharges = require('models/product_market_surcharges');

  module.exports = Product_Markets = (function(_super) {

    __extends(Product_Markets, _super);

    function Product_Markets() {
      return Product_Markets.__super__.constructor.apply(this, arguments);
    }

    Product_Markets.prototype.url = '/product-markets';

    Product_Markets.prototype.model = require('models/product_market');

    Product_Markets.prototype.initialize = function() {
      Product_Markets.__super__.initialize.apply(this, arguments);
      return this.initSyncMachine();
    };

    Product_Markets.prototype.set_pricing = function(price_points) {
      return this._prices = _(price_points);
    };

    Product_Markets.prototype.find_price_point = function(id) {
      return (this._prices.where({
        _market: id
      }))[0];
    };

    Product_Markets.prototype.load = function() {
      var _this = this;
      if (!window.cache.markets) {
        this.beginSync();
        return $.getJSON(this.url, function(res) {
          _this.upsert_markets(res);
          window.cache.markets = res;
          return _this.finishSync();
        });
      } else {
        return this.upsert_markets(window.cache.markets);
      }
    };

    Product_Markets.prototype.upsert_markets = function(markets) {
      var market, product_market, wait, _i, _len, _results;
      wait = markets.length;
      this.reset();
      _results = [];
      for (_i = 0, _len = markets.length; _i < _len; _i++) {
        market = markets[_i];
        if (this._prices) {
          product_market = this.find_price_point(market._id);
          if (product_market) {
            this.merge(market, product_market);
          } else {
            this.add_market(market);
          }
        } else {
          this.add_market(market);
        }
        if (--wait === 0) {
          _results.push(mediator.publish('markets:loaded'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Product_Markets.prototype.merge = function(market_data, product_market) {
      var market;
      market = new this.model;
      market.set('_market', market_data._id);
      market.set('name', market_data.name);
      market.set('surcharges', new Product_Market_Surcharges(market_data.surcharges));
      market.set('active', (product_market != null ? product_market.active : void 0) === true ? true : false);
      if (product_market.price) {
        market.set('price', product_market.price);
      }
      return this.push(market);
    };

    Product_Markets.prototype.add_market = function(attrs) {
      var market,
        _this = this;
      market = new this.model;
      return (function(market) {
        market.set('_market', attrs._id);
        market.set('name', attrs.name);
        market.set('surcharges', new Product_Market_Surcharges(attrs.surcharges));
        return _this.push(market);
      })(market);
    };

    return Product_Markets;

  })(Chaplin.Collection);
  
}});

window.require.define({"models/products": function(exports, require, module) {
  var Collection, Product, Products,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Product = require('models/product');

  module.exports = Products = (function(_super) {

    __extends(Products, _super);

    function Products() {
      return Products.__super__.constructor.apply(this, arguments);
    }

    Products.prototype.url = '/products';

    Products.prototype.model = Product;

    return Products;

  })(Collection);
  
}});

window.require.define({"models/scope": function(exports, require, module) {
  var Actions, Model, Supplier,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Actions = require('models/actions');

  module.exports = Supplier = (function(_super) {

    __extends(Supplier, _super);

    function Supplier() {
      return Supplier.__super__.constructor.apply(this, arguments);
    }

    Supplier.prototype.urlRoot = '/scopes';

    Supplier.prototype.defaults = {
      name: '',
      actions: new Actions()
    };

    Supplier.prototype.parse = function(res) {
      var action, _i, _len, _ref;
      _ref = res.actions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        if (action.id) {
          delete action.id;
        }
      }
      res.actions = new Actions(res.actions);
      return res;
    };

    return Supplier;

  })(Model);
  
}});

window.require.define({"models/scopes": function(exports, require, module) {
  var Collection, Scope, Scopes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Scope = require('models/scope');

  module.exports = Scopes = (function(_super) {

    __extends(Scopes, _super);

    function Scopes() {
      return Scopes.__super__.constructor.apply(this, arguments);
    }

    Scopes.prototype.url = '/scopes';

    Scopes.prototype.model = Scope;

    return Scopes;

  })(Collection);
  
}});

window.require.define({"models/search_result": function(exports, require, module) {
  var Model, Search_Result,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Search_Result = (function(_super) {

    __extends(Search_Result, _super);

    function Search_Result() {
      return Search_Result.__super__.constructor.apply(this, arguments);
    }

    return Search_Result;

  })(Model);
  
}});

window.require.define({"models/search_results": function(exports, require, module) {
  var Collection, SearchResults,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = SearchResults = (function(_super) {

    __extends(SearchResults, _super);

    function SearchResults() {
      return SearchResults.__super__.constructor.apply(this, arguments);
    }

    SearchResults.prototype.model = require('models/search_result');

    SearchResults.prototype.setUrl = function(query) {
      return this.url = "/_q?" + query;
    };

    return SearchResults;

  })(Collection);
  
}});

window.require.define({"models/selling_point": function(exports, require, module) {
  var Model, Sellingpoint,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Sellingpoint = (function(_super) {

    __extends(Sellingpoint, _super);

    function Sellingpoint() {
      return Sellingpoint.__super__.constructor.apply(this, arguments);
    }

    Sellingpoint.prototype.defaults = {
      description: ''
    };

    return Sellingpoint;

  })(Model);
  
}});

window.require.define({"models/selling_points": function(exports, require, module) {
  var Collection, Selling_Points,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Selling_Points = (function(_super) {

    __extends(Selling_Points, _super);

    function Selling_Points() {
      return Selling_Points.__super__.constructor.apply(this, arguments);
    }

    Selling_Points.prototype.model = require('models/selling_point');

    return Selling_Points;

  })(Collection);
  
}});

window.require.define({"models/supplier": function(exports, require, module) {
  var Model, Supplier, Surcharges,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Surcharges = require('models/surcharges');

  module.exports = Supplier = (function(_super) {

    __extends(Supplier, _super);

    function Supplier() {
      return Supplier.__super__.constructor.apply(this, arguments);
    }

    Supplier.prototype.urlRoot = '/suppliers';

    Supplier.prototype.defaults = {
      name: '',
      skuCode: '',
      surcharges: new Surcharges()
    };

    Supplier.prototype.initialize = function() {
      Supplier.__super__.initialize.apply(this, arguments);
      return this.initSyncMachine();
    };

    Supplier.prototype.parse = function(res) {
      if (res.surcharges) {
        res.surcharges = new Surcharges(res.surcharges);
      } else {
        delete res.surcharges;
      }
      return res;
    };

    Supplier.prototype.calculate_sku_code = function(new_sku) {
      var word, _i, _len, _ref, _results;
      if (new_sku == null) {
        new_sku = '';
      }
      _ref = this.name.split(' ');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        _results.push(new_sku += word[0]);
      }
      return _results;
    };

    return Supplier;

  })(Model);
  
}});

window.require.define({"models/suppliers": function(exports, require, module) {
  var Collection, Suppliers,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Suppliers = (function(_super) {

    __extends(Suppliers, _super);

    function Suppliers() {
      return Suppliers.__super__.constructor.apply(this, arguments);
    }

    Suppliers.prototype.url = '/suppliers';

    Suppliers.prototype.model = require('models/supplier');

    return Suppliers;

  })(Collection);
  
}});

window.require.define({"models/surcharge": function(exports, require, module) {
  var Model, Surcharge,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Surcharge = (function(_super) {

    __extends(Surcharge, _super);

    function Surcharge() {
      return Surcharge.__super__.constructor.apply(this, arguments);
    }

    Surcharge.prototype.defaults = {
      type: '',
      cost: ''
    };

    return Surcharge;

  })(Model);
  
}});

window.require.define({"models/surcharges": function(exports, require, module) {
  var Collection, Surcharges,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Surcharges = (function(_super) {

    __extends(Surcharges, _super);

    function Surcharges() {
      return Surcharges.__super__.constructor.apply(this, arguments);
    }

    Surcharges.prototype.model = require('models/surcharge');

    return Surcharges;

  })(Collection);
  
}});

window.require.define({"models/template": function(exports, require, module) {
  var Model, Template, Template_Variations,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Template_Variations = require('models/template_variations');

  module.exports = Template = (function(_super) {

    __extends(Template, _super);

    function Template() {
      return Template.__super__.constructor.apply(this, arguments);
    }

    Template.prototype.urlRoot = '/variationstemplates';

    Template.prototype.defaults = {
      name: '',
      variations: new Template_Variations()
    };

    Template.prototype.initialize = function() {
      return Template.__super__.initialize.apply(this, arguments);
    };

    Template.prototype.parse = function(res) {
      var variation, _i, _len, _ref;
      _ref = res.variations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        variation = _ref[_i];
        if (variation.id) {
          delete variation.id;
        }
      }
      res.variations = new Template_Variations(res.variations);
      return res;
    };

    return Template;

  })(Model);
  
}});

window.require.define({"models/template_variation": function(exports, require, module) {
  var Model, Template_Variation,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Template_Variation = (function(_super) {

    __extends(Template_Variation, _super);

    function Template_Variation() {
      return Template_Variation.__super__.constructor.apply(this, arguments);
    }

    Template_Variation.prototype.defaults = {
      type: '',
      skuMod: ''
    };

    return Template_Variation;

  })(Model);
  
}});

window.require.define({"models/template_variations": function(exports, require, module) {
  var Collection, Template_Variations,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Template_Variations = (function(_super) {

    __extends(Template_Variations, _super);

    function Template_Variations() {
      return Template_Variations.__super__.constructor.apply(this, arguments);
    }

    Template_Variations.prototype.model = require('models/template_variation');

    return Template_Variations;

  })(Collection);
  
}});

window.require.define({"models/templates": function(exports, require, module) {
  var Collection, Template, Templates,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Template = require('models/template');

  module.exports = Templates = (function(_super) {

    __extends(Templates, _super);

    function Templates() {
      return Templates.__super__.constructor.apply(this, arguments);
    }

    Templates.prototype.url = '/variationstemplates';

    Templates.prototype.model = Template;

    return Templates;

  })(Collection);
  
}});

window.require.define({"models/upload": function(exports, require, module) {
  var Model, Upload,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Upload = (function(_super) {

    __extends(Upload, _super);

    function Upload() {
      return Upload.__super__.constructor.apply(this, arguments);
    }

    Upload.prototype.defaults = {
      status: 'Awaiting scope...',
      scope_name: 'scope required'
    };

    return Upload;

  })(Model);
  
}});

window.require.define({"models/uploader": function(exports, require, module) {
  var Collection, UploaderCollection, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  _ = require('underscore');

  module.exports = UploaderCollection = (function(_super) {

    __extends(UploaderCollection, _super);

    function UploaderCollection() {
      return UploaderCollection.__super__.constructor.apply(this, arguments);
    }

    UploaderCollection.prototype.model = require('models/upload');

    UploaderCollection.prototype.addFile = function(file) {
      return this.push(file);
    };

    UploaderCollection.prototype.removeFile = function(file_name) {};

    UploaderCollection.prototype.queuedFiles = function() {
      var files;
      files = this.filter(function(file) {
        if (file.get('queued') === true) {
          return file;
        }
      });
      return files;
    };

    UploaderCollection.prototype.fileName = function(name) {
      var models;
      models = this.where({
        name: name
      });
      return models[0];
    };

    UploaderCollection.prototype.removeByFileName = function(name) {
      return this.remove(this.where({
        name: name
      }));
    };

    UploaderCollection.prototype.updateStatus = function(info) {
      var model, models, _i, _len, _ref, _results;
      if (info.name) {
        models = this.where({
          name: info.name
        });
        return models[0].set('status', status);
      } else {
        _ref = this.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          model = _ref[_i];
          _results.push(model.set('status', info.status));
        }
        return _results;
      }
    };

    UploaderCollection.prototype.setScope = function(scope) {
      var model, _i, _len, _ref, _results;
      _ref = this.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        model.set('_scope', scope._id);
        model.set('scope', scope);
        _results.push(model.set('scope_name', scope.name));
      }
      return _results;
    };

    return UploaderCollection;

  })(Collection);
  
}});

window.require.define({"models/user": function(exports, require, module) {
  var Model, User,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = User = (function(_super) {

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    return User;

  })(Model);
  
}});

window.require.define({"models/variation": function(exports, require, module) {
  var Model, Variation,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Variation = (function(_super) {

    __extends(Variation, _super);

    function Variation() {
      return Variation.__super__.constructor.apply(this, arguments);
    }

    Variation.prototype.defaults = {
      type: '',
      sku: 'XX-XXX-XXX-X',
      mCode: '',
      skuMod: '',
      surcharge: 0,
      inQuantity: 0,
      exQuantity: 0
    };

    return Variation;

  })(Model);
  
}});

window.require.define({"models/variations": function(exports, require, module) {
  var Collection, Variations,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  module.exports = Variations = (function(_super) {

    __extends(Variations, _super);

    function Variations() {
      return Variations.__super__.constructor.apply(this, arguments);
    }

    Variations.prototype.model = require('models/variation');

    return Variations;

  })(Collection);
  
}});

window.require.define({"routes": function(exports, require, module) {
  
  module.exports = function(match) {
    match('', 'dashboard#home');
    match('_q?:query', 'search#query');
    match('gallery', 'images#gallery');
    match('gallery/upload', 'images#upload');
    match('products', 'products#index');
    match('products/:id/edit', 'products#update');
    match('products/new', 'products#create');
    match('brands', 'brands#index');
    match('brands/:id/edit', 'brands#update');
    match('brands/new', 'brands#create');
    match('categories', 'categories#index');
    match('categories/:id/edit', 'categories#update');
    match('categories/new', 'categories#create');
    match('suppliers', 'suppliers#index');
    match('suppliers/:id/edit', 'suppliers#update');
    match('suppliers/new', 'suppliers#create');
    match("templates", 'templates#index');
    match('templates/:id/edit', 'templates#update');
    match('templates/new', 'templates#create');
    match('scopes', 'scopes#index');
    match('scopes/:id/edit', 'scopes#update');
    match('scopes/new', 'scopes#create');
    match('markets', 'markets#index');
    match('markets/:id/edit', 'markets#update');
    return match('markets/new', 'markets#create');
  };
  
}});

window.require.define({"views/_base/card_collection_view": function(exports, require, module) {
  var CardCollectionView, Chaplin, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/_base/view');

  mediator = require('mediator');

  module.exports = CardCollectionView = (function(_super) {

    __extends(CardCollectionView, _super);

    function CardCollectionView() {
      return CardCollectionView.__super__.constructor.apply(this, arguments);
    }

    CardCollectionView.prototype.autoRender = false;

    CardCollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    CardCollectionView.prototype.fallbackSelector = '.fallback';

    CardCollectionView.prototype.listSelector = '.cards';

    CardCollectionView.prototype.initialize = function() {
      CardCollectionView.__super__.initialize.apply(this, arguments);
      this.delegateCommonActions();
      return this.subscribeCommonEvents();
    };

    CardCollectionView.prototype.delegateCommonActions = function() {
      return this.delegate('click', '.add-card', this.add);
    };

    CardCollectionView.prototype.subscribeCommonEvents = function() {
      return this.subscribeEvent('subcollection:serialize', this.collect_user_input);
    };

    CardCollectionView.prototype.collect_user_input = function() {
      var cid, view, _ref, _results;
      _ref = this.viewsByCid;
      _results = [];
      for (cid in _ref) {
        view = _ref[cid];
        _results.push(view.model.set(view.$el.objectify()));
      }
      return _results;
    };

    CardCollectionView.prototype.add = function(e) {
      this.collection.add();
      return e.preventDefault();
    };

    return CardCollectionView;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/_base/collection_item_view": function(exports, require, module) {
  var Chaplin, CollectionItemView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view_helper');

  module.exports = CollectionItemView = (function(_super) {

    __extends(CollectionItemView, _super);

    function CollectionItemView() {
      return CollectionItemView.__super__.constructor.apply(this, arguments);
    }

    CollectionItemView.prototype.tagName = 'form';

    CollectionItemView.prototype.className = 'card';

    CollectionItemView.prototype.getTemplateFunction = function() {
      return this.template;
    };

    CollectionItemView.prototype.initialize = function() {
      CollectionItemView.__super__.initialize.apply(this, arguments);
      return this.subscribeCommonEvents();
    };

    CollectionItemView.prototype.subscribeCommonEvents = function() {
      return this.delegate('click', '.delete-card', this["delete"]);
    };

    CollectionItemView.prototype["delete"] = function() {
      if (this.model.collection) {
        this.model.collection.remove(this.model);
      } else {
        console.debug("model did not reference a parent collection");
        console.log(this.model);
      }
      return false;
    };

    return CollectionItemView;

  })(Chaplin.View);
  
}});

window.require.define({"views/_base/collection_view": function(exports, require, module) {
  var Chaplin, Index_View, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/_base/view');

  module.exports = Index_View = (function(_super) {

    __extends(Index_View, _super);

    function Index_View() {
      return Index_View.__super__.constructor.apply(this, arguments);
    }

    Index_View.prototype.container = '#page-container';

    Index_View.prototype.autoRender = true;

    Index_View.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    Index_View.prototype.loadingSelector = '.loading';

    Index_View.prototype.listSelector = '#cards-container';

    Index_View.prototype.fallbackSelector = '.fallback';

    Index_View.prototype.initialize = function() {
      Index_View.__super__.initialize.apply(this, arguments);
      return this.delegateCommonEvents();
    };

    Index_View.prototype.delegateCommonEvents = function() {
      return this.delegate('click', '.delete', this["delete"]);
    };

    Index_View.prototype["delete"] = function(e) {
      var instance, model;
      e.preventDefault();
      e = $(e)[0];
      model = this.collection.get(e.currentTarget.dataset.id);
      instance = model.attributes.name ? model.get('name') : model.attributes.title ? model.get('title') : model.attributes.stem ? model.get('stem') : 'this';
      if (confirm("Are you sure you want to permanently delete " + instance + "?")) {
        try {
          return model.destroy();
        } catch (err) {
          return console.log(err.message);
        }
      }
    };

    Index_View.prototype.subscribeToChannels = function() {};

    return Index_View;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/_base/index_row_view": function(exports, require, module) {
  var Chaplin, Index_Row_View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view_helper');

  module.exports = Index_Row_View = (function(_super) {

    __extends(Index_Row_View, _super);

    function Index_Row_View() {
      return Index_Row_View.__super__.constructor.apply(this, arguments);
    }

    Index_Row_View.prototype.className = 'index-row';

    Index_Row_View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return Index_Row_View;

  })(Chaplin.View);
  
}});

window.require.define({"views/_base/model_view": function(exports, require, module) {
  var ModelView, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  View = require('views/_base/view');

  module.exports = ModelView = (function(_super) {

    __extends(ModelView, _super);

    function ModelView() {
      return ModelView.__super__.constructor.apply(this, arguments);
    }

    ModelView.prototype.container = '#page-container';

    ModelView.prototype.autoRender = false;

    ModelView.prototype.renderedSubviews = false;

    ModelView.prototype.subviews = [];

    ModelView.prototype.subviewsByName = {};

    ModelView.prototype.initialize = function() {
      ModelView.__super__.initialize.apply(this, arguments);
      this.intelligentFetch();
      this.registerCommonSubscriptions();
      return this.registerCommonDelegates();
    };

    ModelView.prototype.intelligentFetch = function() {
      var _this = this;
      if (this.model.get('id')) {
        this.model.initSyncMachine();
        this.model.beginSync();
        return this.model.fetch({
          success: function(model, res) {
            _this.model.finishSync();
            _this.render();
            return _this.initModelBindings();
          }
        });
      } else {
        this.initModelBindings();
        return this.render();
      }
    };

    ModelView.prototype.renderSubviews = function() {};

    ModelView.prototype.initModelBindings = function() {};

    ModelView.prototype.viewBindings = function() {};

    ModelView.prototype.render = function() {
      ModelView.__super__.render.apply(this, arguments);
      if (!this.renderedSubviews) {
        this.renderSubviews();
        this.renderedSubviews = true;
      }
      return this.viewBindings();
    };

    ModelView.prototype.registerCommonSubscriptions = function() {
      this.subscribeEvent('destroySubview', this.destroySubview);
      return this.subscribeEvent('updateField', this.updateField);
    };

    ModelView.prototype.persistLocalStore = function() {
      var model, namespace;
      if (this.__synced !== true) {
        this.updateModel();
        namespace = this.model.constructor.name;
        model = this.model.toJSON();
        localStorage.setItem("" + namespace + ":" + model.id, JSON.stringify(model));
        return console.log(localStorage.getItem("" + namespace + ":" + model.id));
      }
    };

    ModelView.prototype.destroyLocalStore = function(key) {
      return localStorage.removeItem(key);
    };

    ModelView.prototype.registerCommonDelegates = function() {
      this.delegate("click", "a#sync", this.sync);
      return this.delegate('click', '.click-to-change.checkbox', this.swapState);
    };

    ModelView.prototype.destroySubview = function(cid) {
      return this.removeSubview(cid);
    };

    ModelView.prototype.updateField = function(field, value) {
      return this.model.set(field, value);
    };

    ModelView.prototype.collect_user_input = function() {
      if (this.$('form#main-form')) {
        this.model.set(this.$('form#main-form').objectify());
      } else {
        throw new Error('no #main-form DOM ele is defined!');
      }
    };

    ModelView.prototype.updateModel = function() {
      mediator.publish('subcollection:serialize');
      this.collect_user_input();
      return this.model.clean();
    };

    ModelView.prototype.sync = function() {
      var _this = this;
      this.updateModel();
      this.model.save(null, {
        error: function(model, res) {
          res.responseTxt;
          return mediator.publish('message:flash', {
            error: res.text
          });
        },
        success: function(model, res) {
          _this.__synced = true;
          mediator.publish('!router:route', _this.model.urlRoot);
          return mediator.publish('message:flash', {
            success: 'synced to server'
          });
        }
      });
      return false;
    };

    ModelView.prototype.swapState = function(e) {
      console.log(this);
      if (this.model.get(e.target.dataset.field) === true) {
        this.model.set(e.target.dataset.field, false);
      } else {
        this.model.set(e.target.dataset.field, true);
      }
      return $(e.target).toggleClass('on');
    };

    return ModelView;

  })(View);
  
}});

window.require.define({"views/_base/page_view": function(exports, require, module) {
  var PageView, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  View = require('views/_base/view');

  module.exports = PageView = (function(_super) {

    __extends(PageView, _super);

    function PageView() {
      return PageView.__super__.constructor.apply(this, arguments);
    }

    PageView.prototype.container = '#page-container';

    PageView.prototype.autoRender = true;

    PageView.prototype.renderedSubviews = false;

    PageView.prototype.subviews = [];

    PageView.prototype.subviewsByName = {};

    PageView.prototype.initialize = function() {
      var rendered,
        _this = this;
      PageView.__super__.initialize.apply(this, arguments);
      if (this.model || this.collection) {
        rendered = false;
        return this.modelBind('change', function() {
          if (!rendered) {
            _this.render();
          }
          return rendered = true;
        });
      }
    };

    PageView.prototype.renderSubviews = function() {};

    PageView.prototype.render = function() {
      PageView.__super__.render.apply(this, arguments);
      if (!this.renderedSubviews) {
        this.renderSubviews();
        return this.renderedSubviews = true;
      }
    };

    return PageView;

  })(View);
  
}});

window.require.define({"views/_base/view": function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view_helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
}});

window.require.define({"views/_styles/app": function(exports, require, module) {
  

  
}});

window.require.define({"views/_templates/brands/brands_card": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var brand = locals
  buf.push('<div class="span2"> <a');
  buf.push(attrs({ 'href':('#/brands/' + (brand._id) + '/edit') }, {"href":false}));
  buf.push('>' + escape((interp = brand.name) == null ? '' : interp) + '</a></div><div class="row-actions"><a');
  buf.push(attrs({ 'href':('#/brands/' + (brand._id) + '/edit') }, {"href":false}));
  buf.push('><i class="icon-edit"></i></a><a');
  buf.push(attrs({ 'href':('#'), 'data-id':('' + (brand._id) + ''), "class": ('delete') }, {"href":true,"data-id":true}));
  buf.push('><i class="icon-trash"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/brands/brands_index": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="page-header"><h1>Brands</h1><div class="actions"><a href="#/brands/new" class="action primary large">New Brand</a></div></div><div class="content"><div class="loading"></div><h2 class="fallback">please add brands</h2><div id="cards-container"></div></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/brands/brands_updateorcreate": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var brand = locals
  buf.push('<div class="page-header"><h1> ');
  if ( brand.name)
  {
  buf.push('Edit ' + escape((interp = brand.name) == null ? '' : interp) + '');
  }
  else
  {
  buf.push('New Brand');
  }
  buf.push('</h1></div><form action="/brands" method="PUT" enctype="multipart/form-data" id="main-form"><div class="row"><div class="clearfix"><input');
  buf.push(attrs({ 'name':('name'), 'value':('' + (brand.name) + ''), 'placeholder':('Name'), 'id':('name') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/></div><div class="clearfix">	<textarea name="description" placeholder="Description" id="description">' + escape((interp = brand.description) == null ? '' : interp) + '</textarea></div></div></form><div id="colors-container" class="cards-container"></div><div id="materials-container" class="cards-container"></div><div class="actions"><a href="#" id="sync" class="action primary">Sync</a><a href="#/brands" class="action danger">Cancel</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/brands/card_color": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var color = locals
  buf.push('<input');
  buf.push(attrs({ 'name':('_id'), 'value':('' + (color._id) + ''), 'type':('hidden'), "class": ('id') }, {"name":true,"value":true,"type":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('name'), 'value':('' + (color.name) + ''), 'placeholder':("title"), "class": ('name') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('shortCode'), 'value':('' + (color.shortCode ? color.shortCode : '') + ''), 'placeholder':('Short Code'), "class": ('shortCode') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><textarea name="description" class="description">' + escape((interp = color.description) == null ? '' : interp) + '</textarea><div class="card-actions"><a href="#" class="delete-card"><i class="icon-minus"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/brands/card_material": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var material = locals
  buf.push('<input');
  buf.push(attrs({ 'name':('_id'), 'value':('' + (material._id) + ''), 'type':('hidden') }, {"name":true,"value":true,"type":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('name'), 'value':('' + (material.name) + ''), 'placeholder':('title'), "class": ('name') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><textarea name="description" class="description">' + escape((interp = material.description) == null ? '' : interp) + '</textarea><div class="card-actions"><a href="#" class="delete-card"><i class="icon-minus"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/brands/collection_colors": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h3>Colors</h3><h5 class="fallback">please add colors</h5><div class="cards"></div><div class="card-collection-actions"><a href="#" class="add-card"><i class="icon-plus"></i>Add Color</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/brands/collection_materials": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h3>Materials</h3><h5 class="fallback">please add materials</h5><div class="cards"></div><div class="card-collection-actions"><a href="#" class="add-card"><i class="icon-plus"></i>Add Material</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/categories/categories_card": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var category = locals
  buf.push('<div class="span2"> <a');
  buf.push(attrs({ 'href':('#/categories/' + (category._id) + '/edit') }, {"href":false}));
  buf.push('>' + escape((interp = category.name) == null ? '' : interp) + '</a></div><div class="row-actions"><a');
  buf.push(attrs({ 'href':('#/categories/' + (category._id) + '/edit') }, {"href":false}));
  buf.push('><i class="icon-edit"></i></a><a');
  buf.push(attrs({ 'href':('#'), 'data-id':('' + (category._id) + ''), "class": ('delete') }, {"href":true,"data-id":false}));
  buf.push('><i class="icon-trash"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/categories/categories_index": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="page-header"><h1>Categories</h1><div class="actions"><a href="#/categories/new" class="action primary large">New Category</a></div></div><div class="content"><div class="loading"></div><h2 class="fallback">please add categories</h2><div id="cards-container"></div></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/categories/categories_updateorcreate": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var category = locals
  buf.push('<div class="page-header"><h1> ');
  if ( category.name.plural )
  {
  buf.push('Edit :: ' + escape((interp = category.name.plural) == null ? '' : interp) + '');
  }
  else
  {
  buf.push('New Category');
  }
  buf.push('</h1></div><form action="/categories" method="PUT" data-remote="true" enctype="multipart/form-data" id="main-form"><div class="clearfix row"><label>Name</label><input');
  buf.push(attrs({ 'name':("name"), 'value':('' + (category.name) + ''), 'id':('name') }, {"name":true,"value":false}));
  buf.push('/></div><div class="clearfix">');
  if ( category.onlyPlural == true)
  {
  buf.push('<div data-field="onlyPlural" class="checkbox on click-to-change"><div class="box"></div>Only Plural?</div>');
  }
  else
  {
  buf.push('<div data-field="onlyPlural" class="checkbox click-to-change"><div class="box"></div>Only Plural?</div>');
  }
  buf.push('</div></form><div class="actions"><a href="#" id="sync" class="action primary">Sync</a><a href="#/categories" class="action danger">Cancel</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/globals/dashboard_home": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="page-header"><h1>Dashboard</h1></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/globals/left_navigation": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<li class="search"><i class="icon-search"></i><input id="query" autocomplete="off" placeholder="Search" data-param=""/></li>');
  // iterate locals.links
  ;(function(){
    if ('number' == typeof locals.links.length) {
      for (var $index = 0, $$l = locals.links.length; $index < $$l; $index++) {
        var link = locals.links[$index];

  buf.push('<li><a');
  buf.push(attrs({ 'href':('' + (link.href) + ''), "class": ('' + (link.class) + '') }, {"href":true,"class":true}));
  buf.push('>' + escape((interp = link.title) == null ? '' : interp) + '</a></li>');
      }
    } else {
      for (var $index in locals.links) {
        var link = locals.links[$index];

  buf.push('<li><a');
  buf.push(attrs({ 'href':('' + (link.href) + ''), "class": ('' + (link.class) + '') }, {"href":true,"class":true}));
  buf.push('>' + escape((interp = link.title) == null ? '' : interp) + '</a></li>');
     }
    }
  }).call(this);

  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/globals/login": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/globals/search_result": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var result = locals 
  buf.push('<div class="link-container"><a');
  buf.push(attrs({ 'href':('#/' + (result.parent) + '/' + (result._id) + '/edit'), "class": ('link') }, {"href":true}));
  buf.push('>' + escape((interp = result.name ? result.name : result.title) == null ? '' : interp) + ' </a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/globals/search_results": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h5 class="fallback">no matches</h5><div class="loading"></div><ul id="cards-container"></ul>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/images/card_upload": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var file = locals
  buf.push('<span class="file-name">' + escape((interp = file.name) == null ? '' : interp) + '</span><span class="status-bar">' + escape((interp = file.status) == null ? '' : interp) + '</span><span class="scope">' + escape((interp = file.scope_name) == null ? '' : interp) + '</span>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/images/images_card": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var image = locals
  buf.push('<div');
  buf.push(attrs({ 'data-id':('' + (image._id) + ''), "class": ('index-row') }, {"data-id":true}));
  buf.push('><div class="span2">' + escape((interp = image.stem) == null ? '' : interp) + '</div>');
  // iterate image.types
  ;(function(){
    if ('number' == typeof image.types.length) {
      for (var $index = 0, $$l = image.types.length; $index < $$l; $index++) {
        var type = image.types[$index];

  buf.push('<div class="span75"><a');
  buf.push(attrs({ 'href':('http://i.symboli.se/images/' + (stem) + '-' + (type) + '.' + (ext) + ''), 'target':('_blank') }, {"href":true,"target":true}));
  buf.push('>');
  var __val__ = type
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</a></div>');
      }
    } else {
      for (var $index in image.types) {
        var type = image.types[$index];

  buf.push('<div class="span75"><a');
  buf.push(attrs({ 'href':('http://i.symboli.se/images/' + (stem) + '-' + (type) + '.' + (ext) + ''), 'target':('_blank') }, {"href":true,"target":true}));
  buf.push('>');
  var __val__ = type
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</a></div>');
     }
    }
  }).call(this);

  buf.push('<div class="row-actions"><a');
  buf.push(attrs({ 'href':('#'), 'data-id':("" + ( image._id ) + ""), "class": ('delete') }, {"href":true,"data-id":true}));
  buf.push('><i class="icon-trash"></i></a></div></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/images/images_gallery": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="page-header"><h1>Images</h1><div class="nav-bar"><span class="fileinput-button"><i class="icon-white icon-picture"></i><span>Add Images</span><input type="file" name="images[]" multiple="multiple" id="fileupload"/></span></div></div><div class="content"><div class="loading"></div><h2 class="fallback">Please add images</h2><div id="cards-container"></div></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/images/images_uploader": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h6>uploader<a href="#" class="close-uploader"><icon class="icon-remove icon-white"></icon></a></h6><div class="menu"><a href="#" data-url="/scopes" class="set-scope">scope<i class="icon-chevron-down"></i></a><a href="#" class="upload pull-right">upload</a></div><ul id="cards-container"></ul>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/markets/card_surcharge": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var surcharge = locals
  buf.push('<input');
  buf.push(attrs({ 'name':('_id'), 'value':('' + (surcharge._id) + ''), 'type':('hidden') }, {"name":true,"value":true,"type":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('type'), 'value':('' + ( surcharge.type ) + ''), 'placeholder':('name') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('cost'), 'value':('' + ( surcharge.cost ) + ''), 'placeholder':('cost') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><a href="#" class="delete-card"><i class="icon-remove"></i></a>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/markets/collection_surcharges": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h3>Surcharges</h3><h5 class="fallback">please add surcharges</h5><div class="cards"></div><div class="card-collection-actions"><a href="#" class="add-card"><i class="icon-plus"></i>Add Surchage</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/markets/markets_card": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var market = locals
  buf.push('<div class="span2"> <a');
  buf.push(attrs({ 'href':('#/markets/' + (market._id) + '/edit') }, {"href":false}));
  buf.push('>' + escape((interp = market.name) == null ? '' : interp) + '</a></div><div class="row-actions"><a');
  buf.push(attrs({ 'href':('#/markets/' + (market._id) + '/edit') }, {"href":false}));
  buf.push('><i class="icon-edit"></i></a><a');
  buf.push(attrs({ 'href':('#'), 'data-id':('' + (market._id) + ''), "class": ('delete') }, {"href":true,"data-id":true}));
  buf.push('><i class="icon-trash"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/markets/markets_index": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="page-header"><h1>Markets</h1><div class="actions"><a href="#/markets/new" class="action primary large">New Market</a></div></div><div class="content"><div class="loading"></div><h2 class="fallback">please add markets</h2><div id="cards-container"></div></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/markets/markets_upsert": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var market = locals
  buf.push('<div class="page-header"><h1> ');
  if ( market.name)
  {
  buf.push('Edit ' + escape((interp = market.name) == null ? '' : interp) + '');
  }
  else
  {
  buf.push('New Market');
  }
  buf.push('</h1></div><form action="/markets" method="PUT" enctype="multipart/form-data" id="main-form"><div class="row"><div class="clearfix"><input');
  buf.push(attrs({ 'name':('name'), 'placeholder':('Name'), 'value':("" + (market.name) + ""), 'id':('name') }, {"name":true,"placeholder":true,"value":false}));
  buf.push('/></div></div></form><div id="surcharges-container" class="cards-container row"></div><div class="actions"><a href="#" id="sync" class="action primary">Sync</a><a href="#/markets" class="action danger">Cancel</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/menus/drop_down_option": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var option = locals
  buf.push('<span');
  buf.push(attrs({ 'data-id':("" + (option._id) + "") }, {"data-id":true}));
  buf.push('>' + escape((interp = option.name) == null ? '' : interp) + '</span>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/menus/dynamo_option": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var option = locals
  buf.push('<span');
  buf.push(attrs({ 'data-id':('' + (option._id) + '') }, {"data-id":true}));
  buf.push('>' + escape((interp = option.name) == null ? '' : interp) + '</span>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/menus/menu_dropdown": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="loading"></div><h4 class="fallback">no options available</h4><ul class="cards"></ul>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/menus/menu_dynamo": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="search"><i class="icon-search"></i><input value="" placeholder="Search!" class="search-bar"/></div><h3 class="fallback">no matches</h3><ul class="dynamo-results cards"></ul><div class="clear"></div><div class="actions"><a href="#" class="destroy"><i class="icon-remove"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/messages/flash_message": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var message = locals;
  {
  buf.push('<span>' + escape((interp = message.text) == null ? '' : interp) + '</span><a href="#" class="delete"><i class="icon-trash"></i></a>');
  }
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/card_product_image": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var image = locals
  buf.push('<img');
  buf.push(attrs({ 'src':('http://i.symboli.se/images/' + (image.stem) + '-small.' + (image.ext) + ''), 'data-id':('' + (image.id) + ''), "class": ('image') }, {"src":true,"data-id":true}));
  buf.push('/>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/card_product_image_suggestion": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var image = locals
  buf.push('<img');
  buf.push(attrs({ 'src':('http://i.symboli.se/images/' + (image.stem) + '-small.' + (image.ext) + '') }, {"src":true}));
  buf.push('/>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/card_product_market": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   market = locals
  buf.push('<h6>');
  var __val__ = market.name
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</h6><ol class="stats"><li class="generated-statistics"><ul class="generated-statistics"><li class="stat"><div class="title">ROI</div><div class="roi">');
  var __val__ = market.ROI
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</div></li><li class="stat"><div class="title">Profit</div><div class="profit">');
  var __val__ = market.profit
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</div></li><li class="stat"><div class="title">Our Price</div><div class="price">');
  var __val__ = market.price
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</div></li><li class="activator"><div data-field="active" class="checkbox market-state"><div class="box"> </div></div></li></ul></li></ol>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/card_selling_point": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var sellingpoint = locals
  buf.push('<input');
  buf.push(attrs({ 'value':("" + (sellingpoint._id) + ""), 'name':("_id"), 'type':('hidden') }, {"value":true,"name":true,"type":true}));
  buf.push('/><input');
  buf.push(attrs({ 'value':("" + (sellingpoint.description) + ""), 'name':("description"), "class": ('selling-point-description') }, {"value":true,"name":true}));
  buf.push('/><a href="#" class="delete-card"><i class="icon-minus"></i></a>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/card_surcharge": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var surcharge = locals
  buf.push('<span class="type">');
  var __val__ = surcharge.type
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</span><span class="cost">');
  var __val__ = surcharge.cost
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</span>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/card_variation": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var variation = locals
  buf.push('<input');
  buf.push(attrs({ 'name':('_id'), 'value':('' + (variation._id) + ''), 'type':('hidden') }, {"name":true,"value":true,"type":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('displayWeight'), 'value':('' + (variation.displayWeight) + ''), 'type':('hidden') }, {"name":true,"value":true,"type":true}));
  buf.push('/><div class="cell"><input');
  buf.push(attrs({ 'name':('type'), 'value':('' + ( variation.type ) + ''), 'placeholder':('type'), "class": ('field') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/></div><div class="cell"><input');
  buf.push(attrs({ 'name':('surcharge'), 'value':('' + ( variation.surcharge ) + ''), 'placeholder':('surcharge'), "class": ('field') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/></div><div class="cell sku-container"><input');
  buf.push(attrs({ 'name':('sku'), 'value':('' + ( variation.sku ) + ''), 'placeholder':('sku'), 'disabled':('true'), "class": ('field') + ' ' + ('sku') }, {"name":true,"value":true,"placeholder":true,"disabled":true}));
  buf.push('/></div><div class="cell sku-mod-container"><input');
  buf.push(attrs({ 'name':('skuMod'), 'value':('' + ( variation.skuMod ) + ''), 'placeholder':('ex: sm, lg'), 'maxlength':('2'), "class": ('field') + ' ' + ('sku-mod') }, {"name":true,"value":true,"placeholder":true,"maxlength":true}));
  buf.push('/></div><div class="cell"><input');
  buf.push(attrs({ 'name':('mCode'), 'value':('' + ( variation.mCode ) + ''), 'placeholder':('EAN/UPC'), "class": ('field') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/></div><div class="cell quantity-container"><input');
  buf.push(attrs({ 'name':('exQuantity'), 'value':('' + ( variation.exQuantity ) + ''), 'placeholder':('External Quantity'), "class": ('field') + ' ' + ('quantity') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/></div><div class="cell quantity-container"><input');
  buf.push(attrs({ 'name':('inQuantity'), 'value':('' + ( variation.inQuantity ) + ''), 'placeholder':('Internal Quantity'), "class": ('field') + ' ' + ('quantity') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/></div><div class="cell card-actions"><a href="#" class="add-internal-item">increase</a><a href="#" class="subtract-internal-item">decrease</a><a');
  buf.push(attrs({ 'href':('#'), 'data-id':('' + ( variation.id ) + ''), "class": ('delete-card') }, {"href":true,"data-id":true}));
  buf.push('><i class="icon-remove"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/collection_image_gallery": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h5 class="fallback">add images</h5><ol id="cards-container" class="current-images"></ol><div class="image-suggestions-container"></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/collection_image_suggestions": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="gallery hidden"><div class="header"><i class="icon-remove close-gallery"></i></div><div class="search-bar hidden"><i class="icon-search"></i><input class="search-param"/></div><h5 class="fallback">no matches</h5><div class="loading"></div><ol id="cards-container" class="suggested-images"></ol></div><div class="gallery-actions"><a href="#" class="automate-product-images">automagic</a><a href="#" class="search-product-images">search</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/collection_markets": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="cards"></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/collection_selling_points": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h5>Bullet Points</h5><h5 class="fallback">please add selling points</h5><div class="cards"></div><div class="card-collection-actions"><a href="#" class="add-card"><i class="icon-plus"></i>Add Bullet</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/collection_surcharges": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/collection_variations": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<ul class="variations-table"><li class="headers"><h4 class="header">type</h4><h4 class="header">surcharge</h4><h4 class="header sku">SKU</h4><h4 class="header sku-mod">Mod</h4><h4 class="header">EAN/UPC</h4><h4 class="header quantity">External Quantity</h4><h4 class="header quantity">Internal Quantity</h4></li><li class="cards"></li></ul><h5 class="fallback">please add variations</h5><div class="card-collection-actions"><a href="#" class="add-card"><i class="icon-plus"></i>Variation</a><a href="#" data-url="/variationstemplates" data-field="_variationsTemplate" class="apply-template"><i class="icon-wrench"></i>Templates</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/products_card": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var product = locals
  buf.push('<div class="span2"> <a');
  buf.push(attrs({ 'href':('#/products/' + (product._id) + '/edit') }, {"href":false}));
  buf.push('>');
  var __val__ = product.title
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</a></div>');
  if ( product._color)
  {
  buf.push('<div class="span2">');
  var __val__ = product._color.name
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</div>');
  }
  else
  {
  buf.push('<div class="span2 missing">Missing Color</div>');
  }
  if ( product._category)
  {
   var name = product._category.singular ? product._category.singular : product._category.name;
  buf.push('<div class="span2">' + escape((interp =  name ) == null ? '' : interp) + '</div>');
  }
  else
  {
  buf.push('<div class="span2 missing">Missing Category</div>');
  }
  buf.push('<div class="row-actions"><a');
  buf.push(attrs({ 'href':('#/products/' + (product._id) + '/edit') }, {"href":false}));
  buf.push('><i class="icon-edit"></i></a><a');
  buf.push(attrs({ 'href':('#'), 'data-id':('' + (product._id) + ''), "class": ('delete') }, {"href":true,"data-id":true}));
  buf.push('><i class="icon-trash"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/products_index": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="page-header"><h1>Products</h1><div class="actions"><a href="#/products/new" class="action primary large">New Product</a></div></div><div class="content"><div class="loading"></div><h2 class="fallback">please add products</h2><div id="cards-container"></div></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/products/products_updateorcreate": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var product = locals
  buf.push('<div class="content"><div class="page-header"><h1>');
  if ( product.id)
  {
  buf.push('Edit : ' + escape((interp = product.title) == null ? '' : interp) + '');
  }
  else
  {
  buf.push('New Product');
  }
  buf.push('<span class="timestamp">' + escape((interp = product.updatedAt) == null ? '' : interp) + '</span></h1></div><form action="/products" method="PUT" enctype="multipart/form-data" id="main-form"><div class="clearfix title-container"><a href="#" data-field="_brand" data-querymodel="brand" class="click-to-change dynamo-menu brand">' + escape((interp =  product._brand ? product._brand.name : 'add brand' ) == null ? '' : interp) + '</a><input');
  buf.push(attrs({ 'name':("title"), 'value':("" + ( product.title ) + ""), 'placeholder':('Title'), 'id':('title') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><a href="#" data-field="_category" data-querymodel="category" class="click-to-change dynamo-menu category">' + escape((interp =  product._category ? product._category.name : 'add category' ) == null ? '' : interp) + '</a><div');
  buf.push(attrs({ "class": ('brand-dependants-container') + ' ' + ('' + ( product._brand ? '' : 'hidden') + '') }, {"class":true}));
  buf.push('><div class="drop-down-menu-container"><a href="#" data-parent="_brand" data-key="colors" data-field="_color" class="drop-down-trigger color click-to-change">' + escape((interp =  product._color ? product._color.name : 'add color' ) == null ? '' : interp) + '</a></div><div class="drop-down-menu-container"><a href="#" data-parent="_brand" data-key="materials" data-field="_material" class="drop-down-trigger material click-to-change">' + escape((interp =  product._material ? product._material.name : 'add material' ) == null ? '' : interp) + '</a></div></div><div class="genders-container"><div');
  buf.push(attrs({ 'data-field':('male'), "class": ('checkbox') + ' ' + ('' + (product.male == true ? 'on' : "" ) + '') + ' ' + ('click-to-change') }, {"data-field":true}));
  buf.push('><div class="box"> </div>Male</div><div');
  buf.push(attrs({ 'data-field':('female'), "class": ('checkbox') + ' ' + ('' + (product.female == true ? 'on' : '' ) + '') + ' ' + ('on') + ' ' + ('click-to-change') }, {"data-field":true}));
  buf.push('><div class="box"> </div>Female</div></div></div><div class="clearfix row"><h5>Supplier Information</h5><div class="holder"><div class="drop-down-menu-container"><a href="#" data-url="/suppliers" data-field="_supplier" class="click-to-change drop-down-trigger supplier">' + escape((interp =  product._supplier ? product._supplier.name : 'add supplier' ) == null ? '' : interp) + '</a></div><input');
  buf.push(attrs({ 'name':('skuBase'), 'value':("" + ( product.skuBase ) + ""), 'placeholder':('supplier sku...'), "class": ('sku-base') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('MAP'), 'value':("" + ( product.MAP ) + ""), 'placeholder':('MAP'), "class": ('product-map') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/></div></div><div class="clearfix row"><h5 class="description">Description</h5><textarea name="description" id="description">' + escape((interp = product.description) == null ? '' : interp) + '</textarea></div><div class="clearix gallery-container"></div><div class="clearfix row pricing-data"><h5 class="pricing-data">Pricing Information</h5><div class="static-product-variables"><div class="variable"><span class="add-on">Cost</span><input');
  buf.push(attrs({ 'name':("cost"), 'value':("" + ( product.cost ) + ""), 'id':('cost') }, {"name":true,"value":true}));
  buf.push('/></div><div class="variable"><span class="add-on">Markup (%)</span><input');
  buf.push(attrs({ 'name':('markup'), 'value':("" + ( product.markup ) + ""), 'id':('markup') }, {"name":true,"value":true}));
  buf.push('/></div></div><div class="supplier-surcharges">');
  if ( product._supplier)
  {
  // iterate product._supplier.surcharges
  ;(function(){
    if ('number' == typeof product._supplier.surcharges.length) {
      for (var $index = 0, $$l = product._supplier.surcharges.length; $index < $$l; $index++) {
        var surcharge = product._supplier.surcharges[$index];

  buf.push('<div class="supplier-surcharge"><span class="supplier-surcharge-type">');
  var __val__ = surcharge.type
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</span><span class="supplier-surcharge-cost">');
  var __val__ = surcharge.cost
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</span></div>');
      }
    } else {
      for (var $index in product._supplier.surcharges) {
        var surcharge = product._supplier.surcharges[$index];

  buf.push('<div class="supplier-surcharge"><span class="supplier-surcharge-type">');
  var __val__ = surcharge.type
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</span><span class="supplier-surcharge-cost">');
  var __val__ = surcharge.cost
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</span></div>');
     }
    }
  }).call(this);

  }
  buf.push('</div><div id="markets-container" class="cards-container"></div></div><div id="selling-points-container" class="row cards-container"></div><div id="variations-container" class="row cards-container"></div></form></div><div class="actions"><a');
  buf.push(attrs({ 'href':('#'), 'data-id':("" + (product.id) + ""), 'id':('sync'), "class": ('action') + ' ' + ('primary') }, {"href":true,"data-id":true}));
  buf.push('>Sync</a><a href="#/products" class="action danger">Cancel</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/scopes/card_action": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var action = locals
  buf.push('<input');
  buf.push(attrs({ 'name':('_id'), 'value':('' + (action._id) + ''), 'type':('hidden') }, {"name":true,"value":true,"type":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('suffix'), 'value':('' + ( action.suffix ) + ''), 'placeholder':('suffix') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('height'), 'value':('' + ( action.height ) + ''), 'placeholder':('height') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('width'), 'value':('' + ( action.width ) + ''), 'placeholder':('width') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><input name="job" value="resize" disabled="true" class="hidden"/><a href="#" class="delete-card"><i class="icon-remove"></i></a>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/scopes/collection_actions": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h3>Resizing Actions</h3><h5 class="fallback">please add actions</h5><div class="cards"></div><div class="card-collection-actions"><a href="#" class="add-card"><i class="icon-plus"></i>Add Action</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/scopes/scopes_card": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var scope = locals
  buf.push('<div class="span2"> <a');
  buf.push(attrs({ 'href':('#/scopes/' + (scope._id) + '/edit') }, {"href":false}));
  buf.push('>' + escape((interp = scope.name) == null ? '' : interp) + '</a></div><div class="row-actions"><a');
  buf.push(attrs({ 'href':('#/scopes/' + (scope._id) + '/edit') }, {"href":false}));
  buf.push('><i class="icon-edit"></i></a><a');
  buf.push(attrs({ 'href':('#'), 'data-id':('' + (scope._id) + ''), "class": ('delete') }, {"href":true,"data-id":true}));
  buf.push('><i class="icon-trash"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/scopes/scopes_index": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="page-header"><h1>Scopes</h1><div class="actions"><a href="#/scopes/new" class="action primary large">New Scope</a></div></div><div class="content"><div class="loading"></div><h2 class="fallback">please add scopes</h2><div id="cards-container"></div></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/scopes/scopes_upsert": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var scope = locals
  buf.push('<div class="page-header"><h1> ');
  if ( scope.name)
  {
  buf.push('Edit ' + escape((interp = scope.name) == null ? '' : interp) + '');
  }
  else
  {
  buf.push('New Scope');
  }
  buf.push('</h1></div><form action="/scopes" method="PUT" enctype="multipart/form-data" id="main-form"><div class="row"><div class="clearfix"><input');
  buf.push(attrs({ 'name':('name'), 'placeholder':('Name'), 'value':("" + (scope.name) + ""), 'id':('name') }, {"name":true,"placeholder":true,"value":false}));
  buf.push('/></div></div></form><div id="actions-container" class="cards-container row"></div><div class="actions"><a href="#" id="sync" class="action primary">Sync</a><a href="#/scopes" class="action danger">Cancel</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/suppliers/suppliers_card": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var supplier = locals
  buf.push('<div class="span2"> <a');
  buf.push(attrs({ 'href':('#/suppliers/' + (supplier._id) + '/edit') }, {"href":false}));
  buf.push('>' + escape((interp = supplier.name) == null ? '' : interp) + '</a></div><div class="row-actions"><a');
  buf.push(attrs({ 'href':('#/suppliers/' + (supplier._id) + '/edit') }, {"href":false}));
  buf.push('><i class="icon-edit"></i></a><a');
  buf.push(attrs({ 'href':('#'), 'data-id':('' + (supplier._id) + ''), "class": ('delete') }, {"href":true,"data-id":true}));
  buf.push('><i class="icon-trash"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/suppliers/suppliers_index": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="page-header"><h1>Suppliers</h1><div class="actions"><a href="#/suppliers/new" class="action primary large">New Supplier</a></div></div><div class="content"><div class="loading"></div><h2 class="fallback">please add suppliers</h2><div id="cards-container"></div></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/suppliers/suppliers_updateorcreate": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var supplier = locals
  buf.push('<div class="page-header"><h1> ');
  if ( supplier.name)
  {
  buf.push('Edit ' + escape((interp = supplier.name) == null ? '' : interp) + '');
  }
  else
  {
  buf.push('New Supplier');
  }
  buf.push('</h1></div><form action="/suppliers" method="PUT" enctype="multipart/form-data" id="main-form"><div class="row"><div class="clearfix"><input');
  buf.push(attrs({ 'name':('name'), 'placeholder':('Name'), 'value':("" + (supplier.name) + ""), 'id':('name') }, {"name":true,"placeholder":true,"value":false}));
  buf.push('/></div><div class="clearfix">	<input');
  buf.push(attrs({ 'name':('skuCode'), 'placeholder':('skuCode'), 'value':("" + (skuCode) + ""), 'disabled':('true'), 'id':('skuCode') }, {"name":true,"placeholder":true,"value":false,"disabled":true}));
  buf.push('/></div></div><div id="surcharges-container" class="row"></div></form><div class="actions"><a href="#" id="sync" class="action primary">Sync</a><a href="#/suppliers" class="action danger">Cancel</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/templates/card_template_variation": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   variation = locals;
  buf.push('<input');
  buf.push(attrs({ 'name':('_id'), 'value':('' + (variation._id) + ''), 'type':('hidden') }, {"name":true,"value":true,"type":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('type'), 'value':('' + (variation.type) + ''), 'placeholder':('type'), "class": ('type') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><input');
  buf.push(attrs({ 'name':('skuMod'), 'value':('' + (variation.skuMod) + ''), 'placeholder':('SKU modifier'), "class": ('sku-mod') }, {"name":true,"value":true,"placeholder":true}));
  buf.push('/><a href="#" class="delete-card"><i class="icon-minus"></i></a>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/templates/collection_template_variations": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h3>Variations</h3><h5 class="fallback">please add variations</h5><div class="cards"></div><div class="card-collection-actions"><a href="#" class="add-card"><i class="icon-plus"></i>Add Variation</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/templates/templates_card": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var template = locals
  buf.push('<div class="span2"> <a');
  buf.push(attrs({ 'href':('#/templates/' + (template._id) + '/edit') }, {"href":false}));
  buf.push('>' + escape((interp = template.name) == null ? '' : interp) + '</a></div><div class="row-actions"><a');
  buf.push(attrs({ 'href':('#/templates/' + (template._id) + '/edit') }, {"href":false}));
  buf.push('><i class="icon-edit"></i></a><a');
  buf.push(attrs({ 'href':('#'), 'data-id':('' + (template._id) + ''), "class": ('delete') }, {"href":true,"data-id":true}));
  buf.push('><i class="icon-trash"></i></a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/templates/templates_index": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="page-header"><h1>Templates</h1><div class="actions"><a href="#/templates/new" class="action primary large">New Template</a></div></div><div class="content"><div class="loading"></div><h2 class="fallback">please add templates</h2><div id="cards-container"></div></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/_templates/templates/templates_updateorcreate": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
   var template = locals
  buf.push('<div class="page-header"><h1> ');
  if ( template.name)
  {
  buf.push('Edit : ' + escape((interp = template.name) == null ? '' : interp) + '');
  }
  else
  {
  buf.push('New Template');
  }
  buf.push('</h1></div><form action="/variationstemplates" method="PUT" data-remote="true" enctype="multipart/form-data" id="main-form"><div class="clearfix"><label>Name</label><input');
  buf.push(attrs({ 'name':("name"), 'value':('' + (name) + ''), 'id':('name') }, {"name":true,"value":true}));
  buf.push('/></div></form><div id="variations-container" class="cards-container"></div><div class="actions"><a href="#" id="sync" class="action primary">Sync</a><a href="#/pages" class="action danger">Cancel</a></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/brands/brands_card": function(exports, require, module) {
  var BrandsCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/index_row_view');

  module.exports = BrandsCardView = (function(_super) {

    __extends(BrandsCardView, _super);

    function BrandsCardView() {
      return BrandsCardView.__super__.constructor.apply(this, arguments);
    }

    BrandsCardView.prototype.template = require('views/_templates/brands/brands_card');

    return BrandsCardView;

  })(View);
  
}});

window.require.define({"views/brands/brands_index": function(exports, require, module) {
  var BrandsIndexView, CollectionView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/collection_view');

  module.exports = BrandsIndexView = (function(_super) {

    __extends(BrandsIndexView, _super);

    function BrandsIndexView() {
      return BrandsIndexView.__super__.constructor.apply(this, arguments);
    }

    BrandsIndexView.prototype.className = 'brands-index';

    BrandsIndexView.prototype.tagName = 'section';

    BrandsIndexView.prototype.template = require('views/_templates/brands/brands_index');

    BrandsIndexView.prototype.itemView = require('views/brands/brands_card');

    return BrandsIndexView;

  })(CollectionView);
  
}});

window.require.define({"views/brands/brands_updateorcreate": function(exports, require, module) {
  var BrandUpdateOrCreateView, Colors, Colors_View, Materials, Materials_View, ModelView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/_templates/brands/brands_updateorcreate');

  ModelView = require('views/_base/model_view');

  Colors = require('models/colors');

  Materials = require('models/materials');

  Colors_View = require('views/brands/collection_colors');

  Materials_View = require('views/brands/collection_materials');

  module.exports = BrandUpdateOrCreateView = (function(_super) {

    __extends(BrandUpdateOrCreateView, _super);

    function BrandUpdateOrCreateView() {
      return BrandUpdateOrCreateView.__super__.constructor.apply(this, arguments);
    }

    BrandUpdateOrCreateView.prototype.template = template;

    BrandUpdateOrCreateView.prototype.tagName = 'section';

    BrandUpdateOrCreateView.prototype.className = 'brands-updateorcreate';

    BrandUpdateOrCreateView.prototype.initialize = function() {
      return BrandUpdateOrCreateView.__super__.initialize.apply(this, arguments);
    };

    BrandUpdateOrCreateView.prototype.renderSubviews = function() {
      this.renderColors();
      return this.renderMaterials();
    };

    BrandUpdateOrCreateView.prototype.renderMaterials = function(colors_array) {
      var subview;
      subview = new Materials_View({
        collection: this.model.get('materials'),
        container: this.$('#materials-container')
      });
      return this.subview(subview.cid, subview);
    };

    BrandUpdateOrCreateView.prototype.renderColors = function(materials_array) {
      var subview;
      subview = new Colors_View({
        collection: this.model.get('colors'),
        container: this.$('#colors-container')
      });
      return this.subview(subview.cid, subview);
    };

    return BrandUpdateOrCreateView;

  })(ModelView);
  
}});

window.require.define({"views/brands/card_color": function(exports, require, module) {
  var COlorCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/collection_item_view');

  module.exports = COlorCardView = (function(_super) {

    __extends(COlorCardView, _super);

    function COlorCardView() {
      return COlorCardView.__super__.constructor.apply(this, arguments);
    }

    COlorCardView.prototype.template = require('views/_templates/brands/card_color');

    return COlorCardView;

  })(View);
  
}});

window.require.define({"views/brands/card_material": function(exports, require, module) {
  var MaterialCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/collection_item_view');

  module.exports = MaterialCardView = (function(_super) {

    __extends(MaterialCardView, _super);

    function MaterialCardView() {
      return MaterialCardView.__super__.constructor.apply(this, arguments);
    }

    MaterialCardView.prototype.template = require('views/_templates/brands/card_material');

    return MaterialCardView;

  })(View);
  
}});

window.require.define({"views/brands/collection_colors": function(exports, require, module) {
  var CollectionColorsView, CollectionView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/card_collection_view');

  module.exports = CollectionColorsView = (function(_super) {

    __extends(CollectionColorsView, _super);

    function CollectionColorsView() {
      return CollectionColorsView.__super__.constructor.apply(this, arguments);
    }

    CollectionColorsView.prototype.className = 'colors';

    CollectionColorsView.prototype.template = require('views/_templates/brands/collection_colors');

    CollectionColorsView.prototype.itemView = require('views/brands/card_color');

    return CollectionColorsView;

  })(CollectionView);
  
}});

window.require.define({"views/brands/collection_materials": function(exports, require, module) {
  var CollectionMaterialsView, CollectionView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/card_collection_view');

  module.exports = CollectionMaterialsView = (function(_super) {

    __extends(CollectionMaterialsView, _super);

    function CollectionMaterialsView() {
      return CollectionMaterialsView.__super__.constructor.apply(this, arguments);
    }

    CollectionMaterialsView.prototype.className = 'materials';

    CollectionMaterialsView.prototype.template = require('views/_templates/brands/collection_materials');

    CollectionMaterialsView.prototype.itemView = require('views/brands/card_material');

    return CollectionMaterialsView;

  })(CollectionView);
  
}});

window.require.define({"views/categories/categories_card": function(exports, require, module) {
  var CategoriesCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/index_row_view');

  module.exports = CategoriesCardView = (function(_super) {

    __extends(CategoriesCardView, _super);

    function CategoriesCardView() {
      return CategoriesCardView.__super__.constructor.apply(this, arguments);
    }

    CategoriesCardView.prototype.template = require('views/_templates/categories/categories_card');

    return CategoriesCardView;

  })(View);
  
}});

window.require.define({"views/categories/categories_index": function(exports, require, module) {
  var CategoriesIndexView, CollectionView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/collection_view');

  module.exports = CategoriesIndexView = (function(_super) {

    __extends(CategoriesIndexView, _super);

    function CategoriesIndexView() {
      return CategoriesIndexView.__super__.constructor.apply(this, arguments);
    }

    CategoriesIndexView.prototype.className = 'categories-index';

    CategoriesIndexView.prototype.tagName = 'section';

    CategoriesIndexView.prototype.template = require('views/_templates/categories/categories_index');

    CategoriesIndexView.prototype.itemView = require('views/categories/categories_card');

    return CategoriesIndexView;

  })(CollectionView);
  
}});

window.require.define({"views/categories/categories_updateorcreate": function(exports, require, module) {
  var CategoriesUpdateOrCreateView, ModelView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/_templates/categories/categories_updateorcreate');

  ModelView = require('views/_base/model_view');

  module.exports = CategoriesUpdateOrCreateView = (function(_super) {

    __extends(CategoriesUpdateOrCreateView, _super);

    function CategoriesUpdateOrCreateView() {
      return CategoriesUpdateOrCreateView.__super__.constructor.apply(this, arguments);
    }

    CategoriesUpdateOrCreateView.prototype.template = template;

    CategoriesUpdateOrCreateView.prototype.tagName = 'section';

    CategoriesUpdateOrCreateView.prototype.className = 'categories-updateorcreate';

    CategoriesUpdateOrCreateView.prototype.initialize = function() {
      return CategoriesUpdateOrCreateView.__super__.initialize.apply(this, arguments);
    };

    return CategoriesUpdateOrCreateView;

  })(ModelView);
  
}});

window.require.define({"views/dashboard/dashboard_home": function(exports, require, module) {
  var DashboardHomeView, PageView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  PageView = require('views/_base/page_view');

  template = require('views/_templates/globals/dashboard_home');

  module.exports = DashboardHomeView = (function(_super) {

    __extends(DashboardHomeView, _super);

    function DashboardHomeView() {
      return DashboardHomeView.__super__.constructor.apply(this, arguments);
    }

    DashboardHomeView.prototype.template = template;

    DashboardHomeView.prototype.tagName = 'section';

    DashboardHomeView.prototype.className = 'dashboard';

    return DashboardHomeView;

  })(PageView);
  
}});

window.require.define({"views/globals/left_navigation": function(exports, require, module) {
  var LeftNavigationView, View, mediator, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  View = require('views/_base/view');

  template = require('views/_templates/globals/left_navigation');

  module.exports = LeftNavigationView = (function(_super) {

    __extends(LeftNavigationView, _super);

    function LeftNavigationView() {
      return LeftNavigationView.__super__.constructor.apply(this, arguments);
    }

    LeftNavigationView.prototype.template = template;

    LeftNavigationView.prototype.tagName = 'ul';

    LeftNavigationView.prototype.id = 'navigation';

    LeftNavigationView.prototype.container = '#left-pane';

    LeftNavigationView.prototype.autoRender = true;

    LeftNavigationView.prototype.initialize = function() {
      LeftNavigationView.__super__.initialize.apply(this, arguments);
      return this.delegate('keyup input#query', this.search);
    };

    LeftNavigationView.prototype.search = function(e) {
      var _this = this;
      if (this._searching !== true) {
        this._searching = true;
        setTimeout(function() {
          mediator.trigger('!startupController', 'search', 'query', {
            query: e.target.value
          });
          return _this._searching = false;
        }, 700);
      }
      return false;
    };

    return LeftNavigationView;

  })(View);
  
}});

window.require.define({"views/globals/login": function(exports, require, module) {
  var LoginView, View, mediator, template, utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  utils = require('lib/utils');

  View = require('views/_base/view');

  template = require('views/_templates/globals/login');

  module.exports = LoginView = (function(_super) {

    __extends(LoginView, _super);

    function LoginView() {
      return LoginView.__super__.constructor.apply(this, arguments);
    }

    LoginView.prototype.template = template;

    LoginView.prototype.id = 'login';

    LoginView.prototype.container = '#content-container';

    LoginView.prototype.autoRender = true;

    LoginView.prototype.initialize = function(options) {
      LoginView.__super__.initialize.apply(this, arguments);
      return this.initButtons(options.serviceProviders);
    };

    LoginView.prototype.initButtons = function(serviceProviders) {
      var buttonSelector, failed, loaded, loginHandler, serviceProvider, serviceProviderName, _results;
      _results = [];
      for (serviceProviderName in serviceProviders) {
        serviceProvider = serviceProviders[serviceProviderName];
        buttonSelector = "." + serviceProviderName;
        this.$(buttonSelector).addClass('service-loading');
        loginHandler = _(this.loginWith).bind(this, serviceProviderName, serviceProvider);
        this.delegate('click', buttonSelector, loginHandler);
        loaded = _(this.serviceProviderLoaded).bind(this, serviceProviderName, serviceProvider);
        serviceProvider.done(loaded);
        failed = _(this.serviceProviderFailed).bind(this, serviceProviderName, serviceProvider);
        _results.push(serviceProvider.fail(failed));
      }
      return _results;
    };

    LoginView.prototype.loginWith = function(serviceProviderName, serviceProvider, e) {
      e.preventDefault();
      if (!serviceProvider.isLoaded()) {
        return;
      }
      mediator.publish('login:pickService', serviceProviderName);
      return mediator.publish('!login', serviceProviderName);
    };

    LoginView.prototype.serviceProviderLoaded = function(serviceProviderName) {
      return this.$("." + serviceProviderName).removeClass('service-loading');
    };

    LoginView.prototype.serviceProviderFailed = function(serviceProviderName) {
      return this.$("." + serviceProviderName).removeClass('service-loading').addClass('service-unavailable').attr('disabled', true).attr('title', "Error connecting. Please check whether you areblocking " + (utils.upcase(serviceProviderName)) + ".");
    };

    return LoginView;

  })(View);
  
}});

window.require.define({"views/globals/search_result": function(exports, require, module) {
  var SearchResultView, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/view');

  mediator = require('mediator');

  module.exports = SearchResultView = (function(_super) {

    __extends(SearchResultView, _super);

    function SearchResultView() {
      return SearchResultView.__super__.constructor.apply(this, arguments);
    }

    SearchResultView.prototype.tagName = 'li';

    SearchResultView.prototype.className = 'result';

    SearchResultView.prototype.template = require('views/_templates/globals/search_result');

    SearchResultView.prototype.initialize = function() {
      return SearchResultView.__super__.initialize.apply(this, arguments);
    };

    return SearchResultView;

  })(View);
  
}});

window.require.define({"views/globals/search_results": function(exports, require, module) {
  var CollectionView, SearchResultsView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/_templates/globals/search_results');

  CollectionView = require('views/_base/collection_view');

  module.exports = SearchResultsView = (function(_super) {

    __extends(SearchResultsView, _super);

    function SearchResultsView() {
      return SearchResultsView.__super__.constructor.apply(this, arguments);
    }

    SearchResultsView.prototype.template = template;

    SearchResultsView.prototype.autoRender = true;

    SearchResultsView.prototype.tagName = 'section';

    SearchResultsView.prototype.className = 'search-results';

    SearchResultsView.prototype.itemView = require('views/globals/search_result');

    SearchResultsView.prototype.initialize = function() {
      SearchResultsView.__super__.initialize.apply(this, arguments);
      this.collection.setUrl(this.options.query);
      this.collection.load();
      return window.Results = this;
    };

    return SearchResultsView;

  })(CollectionView);
  
}});

window.require.define({"views/images/card_upload": function(exports, require, module) {
  var UploadCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/collection_item_view');

  module.exports = UploadCardView = (function(_super) {

    __extends(UploadCardView, _super);

    function UploadCardView() {
      return UploadCardView.__super__.constructor.apply(this, arguments);
    }

    UploadCardView.prototype.tagName = 'li';

    UploadCardView.prototype.template = require('views/_templates/images/card_upload');

    UploadCardView.prototype.decay = 1000;

    UploadCardView.prototype.initialize = function() {
      UploadCardView.__super__.initialize.apply(this, arguments);
      this.$el.attr('data-id', this.model.cid);
      this.$el.attr('data-name', this.model.get('name'));
      this.pass('status', '.status-bar');
      this.pass('scope_name', '.scope');
      return this.model.set('id', this.model.cid);
    };

    return UploadCardView;

  })(View);
  
}});

window.require.define({"views/images/images_card": function(exports, require, module) {
  var Image_Card_View, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/view');

  module.exports = Image_Card_View = (function(_super) {

    __extends(Image_Card_View, _super);

    function Image_Card_View() {
      return Image_Card_View.__super__.constructor.apply(this, arguments);
    }

    Image_Card_View.prototype.template = require('views/_templates/images/images_card');

    return Image_Card_View;

  })(View);
  
}});

window.require.define({"views/images/images_gallery": function(exports, require, module) {
  var CollectionView, ImagesGalleryView, UploaderCollection, UploaderView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/collection_view');

  UploaderView = require('views/images/images_uploader');

  UploaderCollection = require('models/uploader');

  module.exports = ImagesGalleryView = (function(_super) {

    __extends(ImagesGalleryView, _super);

    function ImagesGalleryView() {
      return ImagesGalleryView.__super__.constructor.apply(this, arguments);
    }

    ImagesGalleryView.prototype.className = 'image-gallery';

    ImagesGalleryView.prototype.tagName = 'section';

    ImagesGalleryView.prototype.template = require('views/_templates/images/images_gallery');

    ImagesGalleryView.prototype.itemView = require('views/images/images_card');

    ImagesGalleryView.prototype.subviews = [];

    ImagesGalleryView.prototype.initialize = function() {
      ImagesGalleryView.__super__.initialize.apply(this, arguments);
      this.delegate('change', '#fileupload', this.initUploader);
      this.subscribeEvent('image:saved', this.addImage);
      this.subscribeEvent('uploader:destroy', this.destroyUploader);
      return window.gallery = this;
    };

    ImagesGalleryView.prototype.addImage = function(image) {
      return this.collection.push(image);
    };

    ImagesGalleryView.prototype.initUploader = function(e) {
      var file, _i, _len, _ref, _results;
      if (e.target.files.length === 0) {

      } else {
        this.$('span.fileinput-button').addClass('hidden');
        window.queue = e.target.files;
        this.subview('uploader', new UploaderView({
          collection: new UploaderCollection()
        }));
        _ref = e.target.files;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          _results.push(this.subviewsByName.uploader.collection.push(file));
        }
        return _results;
      }
    };

    ImagesGalleryView.prototype.destroyUploader = function() {
      this.$('span.fileinput-button').removeClass('hidden');
      this.$('#fileupload').val('');
      return this.removeSubview('uploader');
    };

    return ImagesGalleryView;

  })(CollectionView);
  
}});

window.require.define({"views/images/images_uploader": function(exports, require, module) {
  var Chaplin, Drop_Down_Menu, Drop_Down_Menu_Options, ImageUploader, Scopes, View, mediator, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/_base/view');

  mediator = require('mediator');

  _ = require('underscore');

  Scopes = require('models/scopes');

  Drop_Down_Menu = require('views/menus/menu_dropdown');

  Drop_Down_Menu_Options = require('models/drop_down_menu');

  module.exports = ImageUploader = (function(_super) {

    __extends(ImageUploader, _super);

    function ImageUploader() {
      return ImageUploader.__super__.constructor.apply(this, arguments);
    }

    ImageUploader.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    ImageUploader.prototype.loadingSelector = '.loading';

    ImageUploader.prototype.listSelector = '#cards-container';

    ImageUploader.prototype.fallbackSelector = '.fallback';

    ImageUploader.prototype.className = 'gallery-uploader';

    ImageUploader.prototype.container = '.image-gallery';

    ImageUploader.prototype.containerMethod = 'prepend';

    ImageUploader.prototype.template = require('views/_templates/images/images_uploader');

    ImageUploader.prototype.itemView = require('views/images/card_upload');

    ImageUploader.prototype.initialize = function() {
      ImageUploader.__super__.initialize.apply(this, arguments);
      this.scopes = new Scopes();
      this.delegate('click', '.set-scope', this.initMenu);
      this.delegate('click', '.upload', this.initUploads);
      this.delegate('click', '.close-uploader', this.destroyUploader);
      this.subscribeEvent('destroySubview', this.destroyMenu);
      this.subscribeEvent('update:field', this.updateScopes);
      this.subscribeEvent('upload:moar', this.moar_data);
      this.subscribeEvent('upload:finished', this.finish_upload);
      this.subscribeEvent('upload:message', this.updateCard);
      return this.subscribeEvent('image:saved', this.cleanUp);
    };

    ImageUploader.prototype.initMenu = function(e) {
      this.destroyMenu();
      this.subview('drop_down_menu', new Drop_Down_Menu({
        collection: new Drop_Down_Menu_Options(),
        field: '_scope',
        container: e.target
      }));
      return e.preventDefault();
    };

    ImageUploader.prototype.updateScopes = function(data) {
      this.destroyMenu();
      this.collection.setScope(data._scope);
      return this.collection.updateStatus({
        status: 'Awaiting upload...'
      });
    };

    ImageUploader.prototype.initUploads = function(e) {
      var Item, _i, _len, _ref;
      _ref = this.collection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        Item = _ref[_i];
        if (!(Item.get('_upload') || !Item.get('_scope'))) {
          this.spawnUploadInstance(Item.getAttributes());
        }
      }
      return e.preventDefault();
    };

    ImageUploader.prototype.spawnUploadInstance = function(item) {
      var file, uploadable_file, _i, _len, _ref;
      _ref = window.queue;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.name === item.name) {
          uploadable_file = file;
        }
      }
      mediator.publish('upload:start', item);
      this.$("form.card[data-name=" + item.name + "]").children('.status-bar').text('uploading...');
      window.current_uploads[uploadable_file.name] = new FileReader();
      return window.current_uploads[uploadable_file.name].onload = function(e) {
        return mediator.publish('upload:data', {
          name: uploadable_file.name,
          data: e.target.result
        });
      };
    };

    ImageUploader.prototype.moar_data = function(data) {
      var file, new_file, place, stream, _i, _len, _ref;
      _ref = window.queue;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        stream = _ref[_i];
        if (stream.name === data.name) {
          file = stream;
        }
      }
      place = data.place * 524288;
      new_file = file.slice(place, place + Math.min(524288, file.size - place));
      return window.current_uploads[data.name].readAsBinaryString(new_file);
    };

    ImageUploader.prototype.finish_upload = function(data) {
      return this.collection.updateStatus({
        name: data.name,
        status: 'resizing...'
      });
    };

    ImageUploader.prototype.updateCard = function(data) {
      return this.collection.updateStatus({
        name: data.name,
        status: data.message
      });
    };

    ImageUploader.prototype.cleanUp = function(image) {
      this.collection.removeByFileName("" + image.stem + "." + image.ext);
      if (this.collection.length === 0) {
        return mediator.publish('uploader:destroy');
      }
    };

    ImageUploader.prototype.destroyMenu = function(cid) {
      return this.removeSubview('drop_down_menu');
    };

    ImageUploader.prototype.destroyUploader = function(e) {
      window.queue = null;
      mediator.publish('uploader:destroy', e);
      return e.preventDefault();
    };

    return ImageUploader;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/layout": function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.initialize = function() {
      return Layout.__super__.initialize.apply(this, arguments);
    };

    return Layout;

  })(Chaplin.Layout);
  
}});

window.require.define({"views/markets/card_surcharge": function(exports, require, module) {
  var Surcharge_Card_View, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/collection_item_view');

  module.exports = Surcharge_Card_View = (function(_super) {

    __extends(Surcharge_Card_View, _super);

    function Surcharge_Card_View() {
      return Surcharge_Card_View.__super__.constructor.apply(this, arguments);
    }

    Surcharge_Card_View.prototype.template = require('views/_templates/markets/card_surcharge');

    return Surcharge_Card_View;

  })(View);
  
}});

window.require.define({"views/markets/collection_surcharges": function(exports, require, module) {
  var CollectionView, Collection_Surcharges_View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/card_collection_view');

  module.exports = Collection_Surcharges_View = (function(_super) {

    __extends(Collection_Surcharges_View, _super);

    function Collection_Surcharges_View() {
      return Collection_Surcharges_View.__super__.constructor.apply(this, arguments);
    }

    Collection_Surcharges_View.prototype.className = 'surcharges-collection';

    Collection_Surcharges_View.prototype.template = require('views/_templates/markets/collection_surcharges');

    Collection_Surcharges_View.prototype.itemView = require('views/markets/card_surcharge');

    return Collection_Surcharges_View;

  })(CollectionView);
  
}});

window.require.define({"views/markets/markets_card": function(exports, require, module) {
  var MarketsCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/index_row_view');

  module.exports = MarketsCardView = (function(_super) {

    __extends(MarketsCardView, _super);

    function MarketsCardView() {
      return MarketsCardView.__super__.constructor.apply(this, arguments);
    }

    MarketsCardView.prototype.template = require('views/_templates/markets/markets_card');

    return MarketsCardView;

  })(View);
  
}});

window.require.define({"views/markets/markets_index": function(exports, require, module) {
  var CollectionView, MarketsIndexView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/collection_view');

  module.exports = MarketsIndexView = (function(_super) {

    __extends(MarketsIndexView, _super);

    function MarketsIndexView() {
      return MarketsIndexView.__super__.constructor.apply(this, arguments);
    }

    MarketsIndexView.prototype.className = 'markets-index';

    MarketsIndexView.prototype.tagName = 'section';

    MarketsIndexView.prototype.template = require('views/_templates/markets/markets_index');

    MarketsIndexView.prototype.itemView = require('views/markets/markets_card');

    return MarketsIndexView;

  })(CollectionView);
  
}});

window.require.define({"views/markets/markets_upsert": function(exports, require, module) {
  var MarketsUpsertView, ModelView, Surcharges_View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelView = require('views/_base/model_view');

  Surcharges_View = require('views/markets/collection_surcharges');

  module.exports = MarketsUpsertView = (function(_super) {

    __extends(MarketsUpsertView, _super);

    function MarketsUpsertView() {
      return MarketsUpsertView.__super__.constructor.apply(this, arguments);
    }

    MarketsUpsertView.prototype.template = require('views/_templates/markets/markets_upsert');

    MarketsUpsertView.prototype.tagName = 'section';

    MarketsUpsertView.prototype.className = 'market-upsert';

    MarketsUpsertView.prototype.initialize = function() {
      return MarketsUpsertView.__super__.initialize.apply(this, arguments);
    };

    MarketsUpsertView.prototype.renderSubviews = function() {
      return this.renderSurcharges();
    };

    MarketsUpsertView.prototype.renderSurcharges = function() {
      return this.subview('surcharges_collection', new Surcharges_View({
        collection: this.model.get('surcharges'),
        container: this.$('#surcharges-container')
      }));
    };

    return MarketsUpsertView;

  })(ModelView);
  
}});

window.require.define({"views/menus/drop_down_option": function(exports, require, module) {
  var DropDownMenuOptionView, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/view');

  mediator = require('mediator');

  module.exports = DropDownMenuOptionView = (function(_super) {

    __extends(DropDownMenuOptionView, _super);

    function DropDownMenuOptionView() {
      return DropDownMenuOptionView.__super__.constructor.apply(this, arguments);
    }

    DropDownMenuOptionView.prototype.tagName = 'li';

    DropDownMenuOptionView.prototype.className = 'option';

    DropDownMenuOptionView.prototype.template = require('views/_templates/menus/dynamo_option');

    DropDownMenuOptionView.prototype.initialize = function() {
      DropDownMenuOptionView.__super__.initialize.apply(this, arguments);
      return this.delegate('click', this.announce_selection);
    };

    DropDownMenuOptionView.prototype.announce_selection = function(e) {
      var data;
      data = {};
      data[this.model.collection.field] = this.model.getAttributes();
      return mediator.publish('update:field', data);
    };

    return DropDownMenuOptionView;

  })(View);
  
}});

window.require.define({"views/menus/dynamo_option": function(exports, require, module) {
  var DynamoMenuOptionView, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/view');

  mediator = require('mediator');

  module.exports = DynamoMenuOptionView = (function(_super) {

    __extends(DynamoMenuOptionView, _super);

    function DynamoMenuOptionView() {
      return DynamoMenuOptionView.__super__.constructor.apply(this, arguments);
    }

    DynamoMenuOptionView.prototype.tagName = 'li';

    DynamoMenuOptionView.prototype.template = require('views/_templates/menus/dynamo_option');

    DynamoMenuOptionView.prototype.initialize = function() {
      DynamoMenuOptionView.__super__.initialize.apply(this, arguments);
      return this.delegate('click', 'span', this.announce_selection);
    };

    DynamoMenuOptionView.prototype.announce_selection = function(e) {
      var data;
      data = {};
      data[this.model.collection.field] = this.model.getAttributes();
      return mediator.publish('update:field', data);
    };

    return DynamoMenuOptionView;

  })(View);
  
}});

window.require.define({"views/menus/menu_dropdown": function(exports, require, module) {
  var Chaplin, DropDownMenuView, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Chaplin = require('chaplin');

  View = require('views/_base/view');

  module.exports = DropDownMenuView = (function(_super) {

    __extends(DropDownMenuView, _super);

    function DropDownMenuView() {
      return DropDownMenuView.__super__.constructor.apply(this, arguments);
    }

    DropDownMenuView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    DropDownMenuView.prototype.template = require('views/_templates/menus/menu_dropdown');

    DropDownMenuView.prototype.className = 'drop-down-menu';

    DropDownMenuView.prototype.autoRender = true;

    DropDownMenuView.prototype.containerMethod = 'after';

    DropDownMenuView.prototype.container = null;

    DropDownMenuView.prototype.itemView = require('views/menus/drop_down_option');

    DropDownMenuView.prototype.listSelector = '.cards';

    DropDownMenuView.prototype.loadingSelector = '.loading';

    DropDownMenuView.prototype.fallbackSelector = '.fallback';

    DropDownMenuView.prototype.subviews = [];

    DropDownMenuView.prototype.initialize = function() {
      DropDownMenuView.__super__.initialize.apply(this, arguments);
      this.collection.field = this.container.dataset.field ? this.container.dataset.field : this.options.field;
      if (this.container.dataset.url) {
        this.collection.setUrl(this.container.dataset.url);
      } else {
        this.collection.initSyncMachine();
        this.collection.beginSync();
      }
      return this.delegate('click', '.destroy', this.destroy);
    };

    DropDownMenuView.prototype.destroy = function(e) {
      mediator.publish('destroy:drop_down_menu', this.cid);
      if (e) {
        return e.preventDefault();
      }
    };

    return DropDownMenuView;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/menus/menu_dynamo": function(exports, require, module) {
  var Chaplin, DynamoMenuView, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Chaplin = require('chaplin');

  View = require('views/_base/view');

  module.exports = DynamoMenuView = (function(_super) {

    __extends(DynamoMenuView, _super);

    function DynamoMenuView() {
      return DynamoMenuView.__super__.constructor.apply(this, arguments);
    }

    DynamoMenuView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    DynamoMenuView.prototype.template = require('views/_templates/menus/menu_dynamo');

    DynamoMenuView.prototype.tagName = 'section';

    DynamoMenuView.prototype.className = 'dynamo-menu';

    DynamoMenuView.prototype.containerMethod = 'before';

    DynamoMenuView.prototype.container = '.content';

    DynamoMenuView.prototype.itemView = require('views/menus/dynamo_option');

    DynamoMenuView.prototype.listSelector = '.cards';

    DynamoMenuView.prototype.fallbackSelector = '.fallback';

    DynamoMenuView.prototype.subviews = [];

    DynamoMenuView.prototype.initialize = function() {
      DynamoMenuView.__super__.initialize.apply(this, arguments);
      $('.overlay').removeClass('hidden');
      this.$('input.search-bar').focus();
      this.collection.query_location = "/_q/" + this.options.urlChunk + "?";
      this.collection.field = this.options.field;
      this.delegate('keyup', '.search-bar', this.query);
      return this.delegate('click', '.destroy', this.destroy);
    };

    DynamoMenuView.prototype.query = function(e) {
      return this.collection.query(e.target.value);
    };

    DynamoMenuView.prototype.destroy = function(e) {
      mediator.publish('destroy:dynamo_menu', this.cid);
      return e.preventDefault();
    };

    return DynamoMenuView;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/messages/flash_message": function(exports, require, module) {
  var FlashMessage, View, mediator, template, utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  utils = require('lib/utils');

  View = require('views/_base/view');

  template = require('views/_templates/messages/flash_message');

  module.exports = FlashMessage = (function(_super) {

    __extends(FlashMessage, _super);

    function FlashMessage() {
      return FlashMessage.__super__.constructor.apply(this, arguments);
    }

    FlashMessage.prototype.template = template;

    FlashMessage.prototype.className = 'flash-message';

    FlashMessage.prototype.autoRender = true;

    FlashMessage.prototype.containerMethod = 'before';

    FlashMessage.prototype.container = null;

    FlashMessage.prototype.initialize = function() {
      var callback,
        _this = this;
      FlashMessage.__super__.initialize.apply(this, arguments);
      this.container = $(this.options.container);
      this.$el.addClass(this.model.get('type'));
      if (this.options.decay) {
        callback = function() {
          return _this.destroy();
        };
        setTimeout(callback, this.options.decay);
      }
      return this.delegate('click', '.delete', this.destroy);
    };

    FlashMessage.prototype.destroy = function(e) {
      var _this = this;
      this.$el.fadeOut(300, function() {
        return _this.dispose();
      });
      return false;
    };

    return FlashMessage;

  })(View);
  
}});

window.require.define({"views/products/card_market": function(exports, require, module) {
  var Product_Market_Card_View, Surcharges_View, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/collection_item_view');

  mediator = require('mediator');

  Surcharges_View = require('views/products/collection_surcharges');

  module.exports = Product_Market_Card_View = (function(_super) {

    __extends(Product_Market_Card_View, _super);

    function Product_Market_Card_View() {
      return Product_Market_Card_View.__super__.constructor.apply(this, arguments);
    }

    Product_Market_Card_View.prototype.template = require('views/_templates/products/card_product_market');

    Product_Market_Card_View.prototype.className = 'market';

    Product_Market_Card_View.prototype.tagName = 'div';

    Product_Market_Card_View.prototype.decay = 700;

    Product_Market_Card_View.prototype.initialize = function() {
      Product_Market_Card_View.__super__.initialize.apply(this, arguments);
      this.delegate('click', '.activator', this.calculate_market_price);
      this.pass('price', '.price');
      this.pass('ROI', '.roi');
      this.pass('profit', '.profit');
      if (this.model.get('active')) {
        this.$el.toggleClass('active');
      }
      return this.subscribeEvent('markets:loaded', this.renderSurcharges);
    };

    Product_Market_Card_View.prototype.renderSurcharges = function() {
      return this.subview('surcharges', new Surcharges_View({
        collection: this.model.get('surcharges'),
        container: this.$('ol.stats')
      }));
    };

    Product_Market_Card_View.prototype.calculate_market_price = function(e) {
      if (this.model.fetch_pricing_data()._valid) {
        return this.swap_market_state();
      } else {
        return mediator.publish('message:flash', {
          error: this.model._lastError
        });
      }
    };

    Product_Market_Card_View.prototype.swap_market_state = function() {
      if (this.model.get('active') === true) {
        this.$el.removeClass('active');
        return this.deactivate();
      } else {
        this.$el.addClass('active');
        return this.activate();
      }
    };

    Product_Market_Card_View.prototype.activate = function(e) {
      return this.model.set('active', true);
    };

    Product_Market_Card_View.prototype.deactivate = function(e) {
      return this.model.set('active', false);
    };

    return Product_Market_Card_View;

  })(View);
  
}});

window.require.define({"views/products/card_product_image": function(exports, require, module) {
  var Chaplin, Product_Image, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view_helper');

  mediator = require('mediator');

  module.exports = Product_Image = (function(_super) {

    __extends(Product_Image, _super);

    function Product_Image() {
      return Product_Image.__super__.constructor.apply(this, arguments);
    }

    Product_Image.prototype.template = require('views/_templates/products/card_product_image');

    Product_Image.prototype.tagName = 'li';

    Product_Image.prototype.className = 'image-container';

    Product_Image.prototype.getTemplateFunction = function() {
      return this.template;
    };

    Product_Image.prototype.initialize = function() {
      Product_Image.__super__.initialize.apply(this, arguments);
      return this.delegate('click', '.image', this.remove_image);
    };

    Product_Image.prototype.remove_image = function(e) {
      return mediator.publish("image:remove", this.model.id);
    };

    return Product_Image;

  })(Chaplin.View);
  
}});

window.require.define({"views/products/card_product_image_suggestion": function(exports, require, module) {
  var Chaplin, Product_Image_Suggestion, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view_helper');

  mediator = require('mediator');

  module.exports = Product_Image_Suggestion = (function(_super) {

    __extends(Product_Image_Suggestion, _super);

    function Product_Image_Suggestion() {
      return Product_Image_Suggestion.__super__.constructor.apply(this, arguments);
    }

    Product_Image_Suggestion.prototype.template = require('views/_templates/products/card_product_image');

    Product_Image_Suggestion.prototype.tagName = 'li';

    Product_Image_Suggestion.prototype.className = 'image';

    Product_Image_Suggestion.prototype.getTemplateFunction = function() {
      return this.template;
    };

    Product_Image_Suggestion.prototype.initialize = function() {
      Product_Image_Suggestion.__super__.initialize.apply(this, arguments);
      return this.delegate('click', this.broadcast_image);
    };

    Product_Image_Suggestion.prototype.broadcast_image = function(e) {
      var collection;
      mediator.publish('image:add', this.model);
      collection = this.model.collection;
      collection.remove(this.model.id);
      if (collection.length === 0) {
        return mediator.publish('empty:collection');
      }
    };

    return Product_Image_Suggestion;

  })(Chaplin.View);
  
}});

window.require.define({"views/products/card_selling_point": function(exports, require, module) {
  var SellingPointCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/collection_item_view');

  module.exports = SellingPointCardView = (function(_super) {

    __extends(SellingPointCardView, _super);

    function SellingPointCardView() {
      return SellingPointCardView.__super__.constructor.apply(this, arguments);
    }

    SellingPointCardView.prototype.template = require('views/_templates/products/card_selling_point');

    return SellingPointCardView;

  })(View);
  
}});

window.require.define({"views/products/card_surcharge": function(exports, require, module) {
  var Product_Market_Surcharge_Card_View, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/view');

  module.exports = Product_Market_Surcharge_Card_View = (function(_super) {

    __extends(Product_Market_Surcharge_Card_View, _super);

    function Product_Market_Surcharge_Card_View() {
      return Product_Market_Surcharge_Card_View.__super__.constructor.apply(this, arguments);
    }

    Product_Market_Surcharge_Card_View.prototype.template = require('views/_templates/products/card_surcharge');

    return Product_Market_Surcharge_Card_View;

  })(View);
  
}});

window.require.define({"views/products/card_variation": function(exports, require, module) {
  var Variation_Card_View, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/collection_item_view');

  module.exports = Variation_Card_View = (function(_super) {

    __extends(Variation_Card_View, _super);

    function Variation_Card_View() {
      return Variation_Card_View.__super__.constructor.apply(this, arguments);
    }

    Variation_Card_View.prototype.template = require('views/_templates/products/card_variation');

    Variation_Card_View.prototype.initialize = function() {
      Variation_Card_View.__super__.initialize.apply(this, arguments);
      this.delegate("blur", 'input.sku-mod', this.update_sku);
      this.delegate('click', '.add-internal-item', this.add_item);
      this.delegate('click', '.subtract-internal-item', this.subtract_item);
      this.subscribeEvent('update:sku', this.update_sku_bit);
      this.pass('sku', 'input.sku');
      if (this.model.get('skuMod') !== '') {
        return this.update_sku_bit({
          value: this.model.get('skuMod'),
          position: 3
        });
      }
    };

    Variation_Card_View.prototype.update_sku = function(e) {
      var sku_bits;
      sku_bits = this.model.get('sku').split('-');
      sku_bits[3] = e.target.value;
      return this.model.set('sku', sku_bits.join('-').toUpperCase());
    };

    Variation_Card_View.prototype.update_sku_bit = function(options) {
      var sku_bits;
      sku_bits = this.model.get('sku').split('-');
      sku_bits[options.position] = options.value;
      return this.model.set('sku', sku_bits.join('-').toUpperCase());
    };

    Variation_Card_View.prototype.add_item = function(e) {
      e.preventDefault();
      return console.log(this.model.id);
    };

    Variation_Card_View.prototype.subtract_item = function(e) {
      e.preventDefault();
      return console.log(this.model.id);
    };

    return Variation_Card_View;

  })(View);
  
}});

window.require.define({"views/products/collection_image_gallery": function(exports, require, module) {
  var Chaplin, Image_Suggestions, Image_Suggestions_View, Product_Images_View, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/_base/view');

  mediator = require('mediator');

  Image_Suggestions_View = require('views/products/collection_image_suggestions');

  Image_Suggestions = require('models/product_images');

  module.exports = Product_Images_View = (function(_super) {

    __extends(Product_Images_View, _super);

    function Product_Images_View() {
      return Product_Images_View.__super__.constructor.apply(this, arguments);
    }

    Product_Images_View.prototype.autoRender = false;

    Product_Images_View.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    Product_Images_View.prototype.fallbackSelector = '.fallback';

    Product_Images_View.prototype.listSelector = '.current-images';

    Product_Images_View.prototype.className = 'gallery';

    Product_Images_View.prototype.template = require('views/_templates/products/collection_image_gallery');

    Product_Images_View.prototype.itemView = require('views/products/card_product_image');

    Product_Images_View.prototype.initialize = function() {
      Product_Images_View.__super__.initialize.apply(this, arguments);
      this.subscribeEvent('image:add', this.add_image);
      this.subscribeEvent('image:remove', this.remove_image);
      return this.init_image_suggestions();
    };

    Product_Images_View.prototype.init_image_suggestions = function() {
      return this.subview('suggestions_menu', new Image_Suggestions_View({
        collection: new Image_Suggestions(),
        container: this.$('.image-suggestions-container'),
        parent: this.options.parent
      }));
    };

    Product_Images_View.prototype.add_image = function(image) {
      return this.collection.add(image);
    };

    Product_Images_View.prototype.remove_image = function(id) {
      return this.collection.remove(id);
    };

    return Product_Images_View;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/products/collection_image_suggestions": function(exports, require, module) {
  var Chaplin, Product_Images_Suggestions_View, View, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/_base/view');

  mediator = require('mediator');

  module.exports = Product_Images_Suggestions_View = (function(_super) {

    __extends(Product_Images_Suggestions_View, _super);

    function Product_Images_Suggestions_View() {
      return Product_Images_Suggestions_View.__super__.constructor.apply(this, arguments);
    }

    Product_Images_Suggestions_View.prototype.autoRender = false;

    Product_Images_Suggestions_View.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    Product_Images_Suggestions_View.prototype.fallbackSelector = '.fallback';

    Product_Images_Suggestions_View.prototype.listSelector = '.suggested-images';

    Product_Images_Suggestions_View.prototype.loadingSelector = '.loading';

    Product_Images_Suggestions_View.prototype.className = 'suggestions-menu';

    Product_Images_Suggestions_View.prototype.template = require('views/_templates/products/collection_image_suggestions');

    Product_Images_Suggestions_View.prototype.itemView = require('views/products/card_product_image_suggestion');

    Product_Images_Suggestions_View.prototype.initialize = function() {
      Product_Images_Suggestions_View.__super__.initialize.apply(this, arguments);
      this.electDelegates();
      this.gallery = this.$('.gallery');
      return this.subscribeEvent('empty:collection', this.close_gallery);
    };

    Product_Images_Suggestions_View.prototype.electDelegates = function() {
      this.delegate('click', '.automate-product-images', this.init_suggestions);
      this.delegate('click', '.upload-product-images', this.init_uploader);
      this.delegate('click', '.search-product-images', this.init_search_menu);
      this.delegate('click', '.close-gallery', this.close_gallery);
      return this.delegate('keyup', '.search-param', this.image_search);
    };

    Product_Images_Suggestions_View.prototype.init_search_menu = function(e) {
      e.preventDefault();
      this.change_gallery_visibility();
      return this.$('.search-bar').removeClass('hidden');
    };

    Product_Images_Suggestions_View.prototype.init_uploader = function(e) {
      e.preventDefault();
      return console.log('uploader triggered');
    };

    Product_Images_Suggestions_View.prototype.init_suggestions = function(e) {
      var color, title;
      e.preventDefault();
      color = this.options.parent.get('_color');
      title = $('#title').val();
      if (color.shortCode) {
        if (title) {
          this.change_gallery_visibility();
          return this.collection.setUrl('/images/tags/blu.toorak');
        } else {
          return mediator.publish('message:flash', {
            error: 'must have a title to generate suggestions'
          });
        }
      } else {
        if (title) {
          return mediator.publish('message:flash', {
            error: 'must have a color shortcode to generate suggestions'
          });
        } else {
          return mediator.publish('message:flash', {
            error: 'must have a title and shortcode generate suggestions'
          });
        }
      }
    };

    Product_Images_Suggestions_View.prototype.image_search = function(e) {
      var _this = this;
      if (this._searching !== true) {
        this._searching = true;
        return setTimeout(function() {
          _this.collection.setUrl("/_q/image?" + e.target.value);
          return _this._searching = false;
        }, 1000);
      }
    };

    Product_Images_Suggestions_View.prototype.close_gallery = function() {
      this.change_gallery_visibility();
      return this.collection.reset();
    };

    Product_Images_Suggestions_View.prototype.change_gallery_visibility = function() {
      if (this.gallery.hasClass('hidden')) {
        $('.overlay').removeClass('hidden');
        this.gallery.removeClass('hidden');
        return this.$('.search-bar').val('');
      } else {
        $('.overlay').addClass('hidden');
        this.$('.search-bar').addClass('hidden');
        return this.gallery.addClass('hidden');
      }
    };

    return Product_Images_Suggestions_View;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/products/collection_markets": function(exports, require, module) {
  var Chaplin, Product_Markets_Collection_View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Product_Markets_Collection_View = (function(_super) {

    __extends(Product_Markets_Collection_View, _super);

    function Product_Markets_Collection_View() {
      return Product_Markets_Collection_View.__super__.constructor.apply(this, arguments);
    }

    Product_Markets_Collection_View.prototype.className = 'markets';

    Product_Markets_Collection_View.prototype.template = require('views/_templates/products/collection_markets');

    Product_Markets_Collection_View.prototype.itemView = require('views/products/card_market');

    Product_Markets_Collection_View.prototype.initialize = function() {
      Product_Markets_Collection_View.__super__.initialize.apply(this, arguments);
      return this.collection.load();
    };

    return Product_Markets_Collection_View;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/products/collection_selling_points": function(exports, require, module) {
  var CollectionSellingPointsView, CollectionView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/card_collection_view');

  module.exports = CollectionSellingPointsView = (function(_super) {

    __extends(CollectionSellingPointsView, _super);

    function CollectionSellingPointsView() {
      return CollectionSellingPointsView.__super__.constructor.apply(this, arguments);
    }

    CollectionSellingPointsView.prototype.className = 'selling-points';

    CollectionSellingPointsView.prototype.template = require('views/_templates/products/collection_selling_points');

    CollectionSellingPointsView.prototype.itemView = require('views/products/card_selling_point');

    return CollectionSellingPointsView;

  })(CollectionView);
  
}});

window.require.define({"views/products/collection_surcharges": function(exports, require, module) {
  var Chaplin, Product_Market_Surcharges_View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Product_Market_Surcharges_View = (function(_super) {

    __extends(Product_Market_Surcharges_View, _super);

    function Product_Market_Surcharges_View() {
      return Product_Market_Surcharges_View.__super__.constructor.apply(this, arguments);
    }

    Product_Market_Surcharges_View.prototype.tagName = 'li';

    Product_Market_Surcharges_View.prototype.autoRender = true;

    Product_Market_Surcharges_View.prototype.className = 'surcharges-collection';

    Product_Market_Surcharges_View.prototype.template = require('views/_templates/products/collection_surcharges');

    Product_Market_Surcharges_View.prototype.itemView = require('views/products/card_surcharge');

    Product_Market_Surcharges_View.prototype.containerMethod = 'prepend';

    return Product_Market_Surcharges_View;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/products/collection_variations": function(exports, require, module) {
  var CollectionVariationsView, CollectionView, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/card_collection_view');

  mediator = require('mediator');

  module.exports = CollectionVariationsView = (function(_super) {

    __extends(CollectionVariationsView, _super);

    function CollectionVariationsView() {
      return CollectionVariationsView.__super__.constructor.apply(this, arguments);
    }

    CollectionVariationsView.prototype.className = 'variations';

    CollectionVariationsView.prototype.template = require('views/_templates/products/collection_variations');

    CollectionVariationsView.prototype.itemView = require('views/products/card_variation');

    CollectionVariationsView.prototype.initialize = function() {
      CollectionVariationsView.__super__.initialize.apply(this, arguments);
      if (this.collection.length !== 0) {
        return this.swap_template_button_visibility();
      }
    };

    CollectionVariationsView.prototype.add = function(e) {
      var psuedo_sku;
      e.preventDefault();
      if (this.collection.at(0)) {
        psuedo_sku = this.collection.at(0).get('sku').split('-');
        psuedo_sku[3] = 'xx';
        return this.collection.add({
          sku: psuedo_sku.join('-')
        });
      } else {
        this.collection.add();
        mediator.publish('variation:first');
        return this.swap_template_button_visibility();
      }
    };

    CollectionVariationsView.prototype.swap_template_button_visibility = function() {
      var button;
      button = this.$('a.apply-template');
      if (button.hasClass('hidden')) {
        return button.removeClass('hidden');
      } else {
        return button.addClass('hidden');
      }
    };

    return CollectionVariationsView;

  })(CollectionView);
  
}});

window.require.define({"views/products/products_card": function(exports, require, module) {
  var ProductsCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/index_row_view');

  module.exports = ProductsCardView = (function(_super) {

    __extends(ProductsCardView, _super);

    function ProductsCardView() {
      return ProductsCardView.__super__.constructor.apply(this, arguments);
    }

    ProductsCardView.prototype.template = require('views/_templates/products/products_card');

    return ProductsCardView;

  })(View);
  
}});

window.require.define({"views/products/products_index": function(exports, require, module) {
  var CollectionView, ProductsIndexView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/collection_view');

  module.exports = ProductsIndexView = (function(_super) {

    __extends(ProductsIndexView, _super);

    function ProductsIndexView() {
      return ProductsIndexView.__super__.constructor.apply(this, arguments);
    }

    ProductsIndexView.prototype.className = 'products-index';

    ProductsIndexView.prototype.tagName = 'section';

    ProductsIndexView.prototype.template = require('views/_templates/products/products_index');

    ProductsIndexView.prototype.itemView = require('views/products/products_card');

    return ProductsIndexView;

  })(CollectionView);
  
}});

window.require.define({"views/products/products_updateorcreate": function(exports, require, module) {
  var Drop_Down_Menu_Options, Dynamo_Menu_Options, Image_Gallery, Menu_Dropdown, Menu_Dynamo, ModelView, ProductUpdateOrCreateView, Product_Images, Product_Markets_View, Selling_Points_View, Variations_View, mediator, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/_templates/products/products_updateorcreate');

  ModelView = require('views/_base/model_view');

  mediator = require('mediator');

  Menu_Dropdown = require('views/menus/menu_dropdown');

  Drop_Down_Menu_Options = require('models/drop_down_menu');

  Menu_Dynamo = require('views/menus/menu_dynamo');

  Dynamo_Menu_Options = require('models/dynamo_menu');

  Variations_View = require('views/products/collection_variations');

  Selling_Points_View = require('views/products/collection_selling_points');

  Image_Gallery = require('views/products/collection_image_gallery');

  Product_Markets_View = require('views/products/collection_markets');

  Product_Images = require('models/product_images');

  module.exports = ProductUpdateOrCreateView = (function(_super) {

    __extends(ProductUpdateOrCreateView, _super);

    function ProductUpdateOrCreateView() {
      return ProductUpdateOrCreateView.__super__.constructor.apply(this, arguments);
    }

    ProductUpdateOrCreateView.prototype.template = template;

    ProductUpdateOrCreateView.prototype.tagName = 'section';

    ProductUpdateOrCreateView.prototype.className = 'product-updateorcreate';

    ProductUpdateOrCreateView.prototype.initialize = function() {
      ProductUpdateOrCreateView.__super__.initialize.apply(this, arguments);
      return this.decay = 1000;
    };

    ProductUpdateOrCreateView.prototype.renderSubviews = function() {
      this.renderVariations();
      this.renderSellingPoints();
      this.render_image_gallery();
      return this.render_product_markets();
    };

    ProductUpdateOrCreateView.prototype.viewBindings = function() {
      this.registerSubscriptions();
      return this.electDelegates();
    };

    ProductUpdateOrCreateView.prototype.registerSubscriptions = function() {
      this.subscribeEvent('destroy:dynamo_menu', this.destroy_dynamo_menu);
      this.subscribeEvent('destroy:drop_down_menu', this.destroy_drop_down_menu);
      this.subscribeEvent('update:field', this.update_field);
      this.subscribeEvent('fetch_pricing_data', this.fetch_pricing_data);
      return this.subscribeEvent('variation:first', this.set_first_sku);
    };

    ProductUpdateOrCreateView.prototype.electDelegates = function() {
      this.delegate("click", "a.dynamo-menu", this.create_dynamo_menu);
      this.delegate("click", "a.drop-down-trigger", this.create_drop_down_menu);
      this.delegate("click", "a.apply-template", this.create_drop_down_menu);
      this.delegate("blur", 'input.sku-base', this.update_sku_supplier_base);
      this.delegate("blur", "input#cost", this.fetch_pricing_data);
      this.delegate("blur", "input#markup", this.fetch_pricing_data);
      return this.delegate("blur", 'input.product-map', this.fetch_pricing_data);
    };

    ProductUpdateOrCreateView.prototype.initModelBindings = function() {
      ProductUpdateOrCreateView.__super__.initModelBindings.apply(this, arguments);
      this.modelBind('change:_brand', this.update_brand);
      this.modelBind('change:_category', this.update_category);
      this.modelBind('change:_supplier', this.update_supplier);
      this.modelBind('change:_color', this.update_color);
      this.modelBind('change:_material', this.update_material);
      return this.modelBind('change:_variationsTemplate', this.update_variations);
    };

    ProductUpdateOrCreateView.prototype.renderVariations = function() {
      return this.subview('variations_list', new Variations_View({
        collection: this.model.get('variations'),
        container: this.$('#variations-container')
      }));
    };

    ProductUpdateOrCreateView.prototype.renderSellingPoints = function() {
      return this.subview('selling_points_list', new Selling_Points_View({
        collection: this.model.get('selling_points'),
        container: this.$('#selling-points-container')
      }));
    };

    ProductUpdateOrCreateView.prototype.render_image_gallery = function() {
      return this.subview('image_gallery', new Image_Gallery({
        collection: this.model.get('images'),
        container: this.$('.gallery-container'),
        parent: this.model
      }));
    };

    ProductUpdateOrCreateView.prototype.render_product_markets = function() {
      return this.subview('product_markets', new Product_Markets_View({
        collection: this.model.get('price_points'),
        container: this.$('#markets-container')
      }));
    };

    ProductUpdateOrCreateView.prototype.create_dynamo_menu = function(e) {
      this.resetMenus();
      this.subview('dynamo_menu', new Menu_Dynamo({
        collection: new Dynamo_Menu_Options(),
        field: e.target.dataset.field,
        urlChunk: e.target.dataset.querymodel
      }));
      return e.preventDefault();
    };

    ProductUpdateOrCreateView.prototype.destroy_dynamo_menu = function() {
      $('.overlay').addClass('hidden');
      return this.removeSubview('dynamo_menu');
    };

    ProductUpdateOrCreateView.prototype.create_drop_down_menu = function(e) {
      this.resetMenus();
      if (this.model.get(e.target.dataset.parent) || e.target.dataset.url) {
        this.subview('drop_down_menu', new Menu_Dropdown({
          collection: new Drop_Down_Menu_Options(),
          field: e.target.dataset.field,
          container: e.target
        }));
        if (!e.target.dataset.url) {
          this.subview('drop_down_menu').collection.reset(this.model.get(e.target.dataset.parent)[e.target.dataset.key]).finishSync();
        }
      } else {
        mediator.publish('message:flash', {
          error: "" + (e.target.dataset.parent.replace("_", '')) + " must be set first"
        });
      }
      return e.preventDefault();
    };

    ProductUpdateOrCreateView.prototype.destroy_drop_down_menu = function() {
      return this.removeSubview('drop_down_menu');
    };

    ProductUpdateOrCreateView.prototype.update_field = function(data) {
      var key, value;
      for (key in data) {
        value = data[key];
        this.model.set(key, value);
      }
      return this.resetMenus();
    };

    ProductUpdateOrCreateView.prototype.resetMenus = function() {
      if (this.subviewsByName['dynamo_menu']) {
        this.destroy_dynamo_menu();
      }
      if (this.subviewsByName['drop_down_menu']) {
        return this.destroy_drop_down_menu();
      }
    };

    ProductUpdateOrCreateView.prototype.update_brand = function(model, brand) {
      this.notify_client('.brand', brand.name);
      this.model.set('_color', null);
      this.model.set('_material', null);
      if (brand.name) {
        return this.$('.brand-dependants-container').removeClass('hidden');
      }
    };

    ProductUpdateOrCreateView.prototype.update_category = function(model, category) {
      return this.notify_client('.category', category.name);
    };

    ProductUpdateOrCreateView.prototype.update_supplier = function(model, supplier) {
      var ele, surcharge, _i, _len, _ref, _results;
      this.notify_client('.supplier', supplier.name);
      this.update_sku(supplier.skuCode, 0);
      this.$('.supplier-surcharges').empty();
      if ((supplier != null ? supplier.surcharges.length : void 0) > 0) {
        _ref = supplier.surcharges;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          surcharge = _ref[_i];
          ele = "<div class='supplier-surcharge'><span class='supplier-surcharge-type'>" + surcharge.type + " </span><span class='supplier-surcharge-cost'> " + surcharge.cost + "</span></div>";
          _results.push(this.$('.supplier-surcharges').append(ele));
        }
        return _results;
      }
    };

    ProductUpdateOrCreateView.prototype.update_color = function(model, color) {
      if (color) {
        this.notify_client('.color', color.name);
        return this.update_sku(color.shortCode, 2);
      } else {
        return this.notify_client('.color', 'add color');
      }
    };

    ProductUpdateOrCreateView.prototype.update_material = function(model, material) {
      if (material) {
        return this.notify_client('.material', material.name);
      } else {
        return this.notify_client('.material', 'add material');
      }
    };

    ProductUpdateOrCreateView.prototype.update_variations = function(model, template) {
      var variation, _i, _len, _ref;
      _ref = template.variations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        variation = _ref[_i];
        delete variation.id;
        delete variation._id;
        this.subview('variations_list').collection.push(variation);
      }
      return this.subview('variations_list').swap_template_button_visibility();
    };

    ProductUpdateOrCreateView.prototype.set_first_sku = function() {
      if (this.model.get('_supplier')) {
        this.update_sku(this.model.get('_supplier').skuCode, 0);
      }
      if (this.model.get('_color')) {
        this.update_sku(this.model.get('_color').shortCode, 2);
      }
      if (this.$('.sku-base').val()) {
        return this.update_sku(this.$('.sku-base').val(), 1);
      }
    };

    ProductUpdateOrCreateView.prototype.notify_client = function(selector, value) {
      $(selector).text(value).addClass('changed');
      return setTimeout(function() {
        return $(selector).removeClass('changed');
      }, this.decay);
    };

    ProductUpdateOrCreateView.prototype.applyDefaultTemplate = function(e) {
      this.model.set('productVariationTemplateId', this.model.get('parent').category.categoryVariationTemplateId);
      return e.preventDefault();
    };

    ProductUpdateOrCreateView.prototype.update_sku = function(val, position) {
      return mediator.publish('update:sku', {
        value: val,
        position: position
      });
    };

    ProductUpdateOrCreateView.prototype.update_sku_supplier_base = function(e) {
      return mediator.publish('update:sku', {
        value: e.target.value,
        position: 1
      });
    };

    ProductUpdateOrCreateView.prototype.fetch_pricing_data = function(instance) {
      var pricing_data;
      pricing_data = {
        MAP: Number($('.product-map').val(), 10) || 0,
        supplier_costs: this.model.get('_supplier') ? _(this.model.get('_supplier').surcharges).pluck('cost').reduce(function(total, surcharge) {
          return total + surcharge;
        }) : 0,
        product_cost: Number(this.$('#cost').val(), 10),
        markup: Number(this.$('#markup').val(), 10)
      };
      if (instance.target) {
        return mediator.publish("pricing_data", pricing_data);
      } else {
        return mediator.publish("pricing_data:" + instance, pricing_data);
      }
    };

    return ProductUpdateOrCreateView;

  })(ModelView);
  
}});

window.require.define({"views/scopes/card_action": function(exports, require, module) {
  var ActionCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/collection_item_view');

  module.exports = ActionCardView = (function(_super) {

    __extends(ActionCardView, _super);

    function ActionCardView() {
      return ActionCardView.__super__.constructor.apply(this, arguments);
    }

    ActionCardView.prototype.template = require('views/_templates/scopes/card_action');

    return ActionCardView;

  })(View);
  
}});

window.require.define({"views/scopes/collection_actions": function(exports, require, module) {
  var CollectionActionsView, CollectionView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/card_collection_view');

  module.exports = CollectionActionsView = (function(_super) {

    __extends(CollectionActionsView, _super);

    function CollectionActionsView() {
      return CollectionActionsView.__super__.constructor.apply(this, arguments);
    }

    CollectionActionsView.prototype.className = 'actions-collection';

    CollectionActionsView.prototype.template = require('views/_templates/scopes/collection_actions');

    CollectionActionsView.prototype.itemView = require('views/scopes/card_action');

    return CollectionActionsView;

  })(CollectionView);
  
}});

window.require.define({"views/scopes/scopes_card": function(exports, require, module) {
  var ScopesCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/index_row_view');

  module.exports = ScopesCardView = (function(_super) {

    __extends(ScopesCardView, _super);

    function ScopesCardView() {
      return ScopesCardView.__super__.constructor.apply(this, arguments);
    }

    ScopesCardView.prototype.template = require('views/_templates/scopes/scopes_card');

    return ScopesCardView;

  })(View);
  
}});

window.require.define({"views/scopes/scopes_index": function(exports, require, module) {
  var CollectionView, ScopesIndexView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/collection_view');

  module.exports = ScopesIndexView = (function(_super) {

    __extends(ScopesIndexView, _super);

    function ScopesIndexView() {
      return ScopesIndexView.__super__.constructor.apply(this, arguments);
    }

    ScopesIndexView.prototype.className = 'scopes-index';

    ScopesIndexView.prototype.tagName = 'section';

    ScopesIndexView.prototype.template = require('views/_templates/scopes/scopes_index');

    ScopesIndexView.prototype.itemView = require('views/scopes/scopes_card');

    return ScopesIndexView;

  })(CollectionView);
  
}});

window.require.define({"views/scopes/scopes_upsert": function(exports, require, module) {
  var Actions_View, ModelView, ScopesUpsertView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/_templates/scopes/scopes_upsert');

  ModelView = require('views/_base/model_view');

  Actions_View = require('views/scopes/collection_actions');

  module.exports = ScopesUpsertView = (function(_super) {

    __extends(ScopesUpsertView, _super);

    function ScopesUpsertView() {
      return ScopesUpsertView.__super__.constructor.apply(this, arguments);
    }

    ScopesUpsertView.prototype.template = template;

    ScopesUpsertView.prototype.tagName = 'section';

    ScopesUpsertView.prototype.className = 'scopes-upsert';

    ScopesUpsertView.prototype.initialize = function() {
      return ScopesUpsertView.__super__.initialize.apply(this, arguments);
    };

    ScopesUpsertView.prototype.renderSubviews = function() {
      return this.renderActions();
    };

    ScopesUpsertView.prototype.renderActions = function() {
      var subview;
      subview = new Actions_View({
        collection: this.model.get('actions'),
        container: this.$('#actions-container')
      });
      return this.subview(subview.cid, subview);
    };

    return ScopesUpsertView;

  })(ModelView);
  
}});

window.require.define({"views/suppliers/suppliers_card": function(exports, require, module) {
  var SuppliersCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/index_row_view');

  module.exports = SuppliersCardView = (function(_super) {

    __extends(SuppliersCardView, _super);

    function SuppliersCardView() {
      return SuppliersCardView.__super__.constructor.apply(this, arguments);
    }

    SuppliersCardView.prototype.template = require('views/_templates/suppliers/suppliers_card');

    return SuppliersCardView;

  })(View);
  
}});

window.require.define({"views/suppliers/suppliers_index": function(exports, require, module) {
  var CollectionView, SuppliersIndexView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/collection_view');

  module.exports = SuppliersIndexView = (function(_super) {

    __extends(SuppliersIndexView, _super);

    function SuppliersIndexView() {
      return SuppliersIndexView.__super__.constructor.apply(this, arguments);
    }

    SuppliersIndexView.prototype.className = 'suppliers-index';

    SuppliersIndexView.prototype.tagName = 'section';

    SuppliersIndexView.prototype.template = require('views/_templates/suppliers/suppliers_index');

    SuppliersIndexView.prototype.itemView = require('views/suppliers/suppliers_card');

    return SuppliersIndexView;

  })(CollectionView);
  
}});

window.require.define({"views/suppliers/suppliers_updateorcreate": function(exports, require, module) {
  var ModelView, Suppliers_Upsert_View, Surcharges_View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/_templates/suppliers/suppliers_updateorcreate');

  ModelView = require('views/_base/model_view');

  Surcharges_View = require('views/markets/collection_surcharges');

  module.exports = Suppliers_Upsert_View = (function(_super) {

    __extends(Suppliers_Upsert_View, _super);

    function Suppliers_Upsert_View() {
      return Suppliers_Upsert_View.__super__.constructor.apply(this, arguments);
    }

    Suppliers_Upsert_View.prototype.template = template;

    Suppliers_Upsert_View.prototype.tagName = 'section';

    Suppliers_Upsert_View.prototype.className = 'suppliers-updateorcreate';

    Suppliers_Upsert_View.prototype.initialize = function() {
      return Suppliers_Upsert_View.__super__.initialize.apply(this, arguments);
    };

    Suppliers_Upsert_View.prototype.renderSubviews = function() {
      return this.renderSurcharges();
    };

    Suppliers_Upsert_View.prototype.renderSurcharges = function() {
      var subview;
      subview = new Surcharges_View({
        collection: this.model.get('surcharges'),
        container: this.$('#surcharges-container')
      });
      return this.subview('surcharges_collection', subview);
    };

    return Suppliers_Upsert_View;

  })(ModelView);
  
}});

window.require.define({"views/templates/card_template_variation": function(exports, require, module) {
  var TemplateVariationCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/collection_item_view');

  module.exports = TemplateVariationCardView = (function(_super) {

    __extends(TemplateVariationCardView, _super);

    function TemplateVariationCardView() {
      return TemplateVariationCardView.__super__.constructor.apply(this, arguments);
    }

    TemplateVariationCardView.prototype.template = require('views/_templates/templates/card_template_variation');

    return TemplateVariationCardView;

  })(View);
  
}});

window.require.define({"views/templates/collection_template_variations": function(exports, require, module) {
  var CollectionTemplateVariationsView, CollectionView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/card_collection_view');

  module.exports = CollectionTemplateVariationsView = (function(_super) {

    __extends(CollectionTemplateVariationsView, _super);

    function CollectionTemplateVariationsView() {
      return CollectionTemplateVariationsView.__super__.constructor.apply(this, arguments);
    }

    CollectionTemplateVariationsView.prototype.className = 'template-variations';

    CollectionTemplateVariationsView.prototype.template = require('views/_templates/templates/collection_template_variations');

    CollectionTemplateVariationsView.prototype.itemView = require('views/templates/card_template_variation');

    return CollectionTemplateVariationsView;

  })(CollectionView);
  
}});

window.require.define({"views/templates/templates_card": function(exports, require, module) {
  var TemplatesCardView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/_base/index_row_view');

  module.exports = TemplatesCardView = (function(_super) {

    __extends(TemplatesCardView, _super);

    function TemplatesCardView() {
      return TemplatesCardView.__super__.constructor.apply(this, arguments);
    }

    TemplatesCardView.prototype.template = require('views/_templates/templates/templates_card');

    return TemplatesCardView;

  })(View);
  
}});

window.require.define({"views/templates/templates_index": function(exports, require, module) {
  var CollectionView, TemplatesIndexView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/_base/collection_view');

  module.exports = TemplatesIndexView = (function(_super) {

    __extends(TemplatesIndexView, _super);

    function TemplatesIndexView() {
      return TemplatesIndexView.__super__.constructor.apply(this, arguments);
    }

    TemplatesIndexView.prototype.className = 'templates-index';

    TemplatesIndexView.prototype.tagName = 'section';

    TemplatesIndexView.prototype.template = require('views/_templates/templates/templates_index');

    TemplatesIndexView.prototype.itemView = require('views/templates/templates_card');

    return TemplatesIndexView;

  })(CollectionView);
  
}});

window.require.define({"views/templates/templates_updateorcreate": function(exports, require, module) {
  var ModelView, Template_Variations_Collection, TemplatesUpdateOrCreateView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/_templates/templates/templates_updateorcreate');

  ModelView = require('views/_base/model_view');

  Template_Variations_Collection = require('views/templates/collection_template_variations');

  module.exports = TemplatesUpdateOrCreateView = (function(_super) {

    __extends(TemplatesUpdateOrCreateView, _super);

    function TemplatesUpdateOrCreateView() {
      return TemplatesUpdateOrCreateView.__super__.constructor.apply(this, arguments);
    }

    TemplatesUpdateOrCreateView.prototype.template = template;

    TemplatesUpdateOrCreateView.prototype.tagName = 'section';

    TemplatesUpdateOrCreateView.prototype.className = 'templates-updateorcreate';

    TemplatesUpdateOrCreateView.prototype.initialize = function() {
      return TemplatesUpdateOrCreateView.__super__.initialize.apply(this, arguments);
    };

    TemplatesUpdateOrCreateView.prototype.renderSubviews = function() {
      return this.renderTemplateVariations();
    };

    TemplatesUpdateOrCreateView.prototype.renderTemplateVariations = function() {
      var subview;
      subview = new Template_Variations_Collection({
        collection: this.model.get('variations'),
        container: this.$('#variations-container')
      });
      return this.subview(subview.cid, subview);
    };

    return TemplatesUpdateOrCreateView;

  })(ModelView);
  
}});

