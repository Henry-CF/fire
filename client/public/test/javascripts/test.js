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

window.require.define({"test/controllers/brand_controller_test": function(exports, require, module) {
  var Brand;

  Brand = require('models/brand');

  describe('Brand', function() {
    return beforeEach(function() {
      return this.model = new Brand();
    });
  });
  
}});

window.require.define({"test/controllers/categories_controller_test": function(exports, require, module) {
  var Categories;

  Categories = require('models/categories');

  describe('Categories', function() {
    return beforeEach(function() {
      return this.model = new Categories();
    });
  });
  
}});

window.require.define({"test/controllers/dashboard_controller_test": function(exports, require, module) {
  var Dashboard;

  Dashboard = require('models/dashboard');

  describe('Dashboard', function() {
    return beforeEach(function() {
      return this.model = new Dashboard();
    });
  });
  
}});

window.require.define({"test/controllers/left_navigation_controller_test": function(exports, require, module) {
  var LeftNavigation;

  LeftNavigation = require('models/left_navigation');

  describe('LeftNavigation', function() {
    return beforeEach(function() {
      return this.model = new LeftNavigation();
    });
  });
  
}});

window.require.define({"test/controllers/search_controller_test": function(exports, require, module) {
  var Search;

  Search = require('models/search');

  describe('Search', function() {
    return beforeEach(function() {
      return this.model = new Search();
    });
  });
  
}});

window.require.define({"test/controllers/sticky_assets_controller_test": function(exports, require, module) {
  var StickyAssets;

  StickyAssets = require('models/sticky_assets');

  describe('StickyAssets', function() {
    return beforeEach(function() {
      return this.model = new StickyAssets();
    });
  });
  
}});

window.require.define({"test/controllers/suppliers_controller_test": function(exports, require, module) {
  var Suppliers;

  Suppliers = require('models/suppliers');

  describe('Suppliers', function() {
    return beforeEach(function() {
      return this.model = new Suppliers();
    });
  });
  
}});

window.require.define({"test/controllers/templates_controller_test": function(exports, require, module) {
  var Templates;

  Templates = require('models/templates');

  describe('Templates', function() {
    return beforeEach(function() {
      return this.model = new Templates();
    });
  });
  
}});

window.require.define({"test/controllers/websockets_controller_test": function(exports, require, module) {
  var Websockets;

  Websockets = require('models/websockets');

  describe('Websockets', function() {
    return beforeEach(function() {
      return this.model = new Websockets();
    });
  });
  
}});

window.require.define({"test/models/brand": function(exports, require, module) {
  var Brand;

  Brand = require('models/brand');

  describe('Brand', function() {
    return beforeEach(function() {
      return this.model = new Brand();
    });
  });
  
}});

window.require.define({"test/models/brand_test": function(exports, require, module) {
  

  
}});

window.require.define({"test/models/brands_test": function(exports, require, module) {
  

  
}});

window.require.define({"test/models/categories_test": function(exports, require, module) {
  

  
}});

window.require.define({"test/models/category": function(exports, require, module) {
  var Category;

  Category = require('models/category');

  describe('Category', function() {
    return beforeEach(function() {
      return this.model = new Category();
    });
  });
  
}});

window.require.define({"test/models/drop_down_menu": function(exports, require, module) {
  var DropDownMenu;

  DropDownMenu = require('models/drop_down_menu');

  describe('DropDownMenu', function() {
    return beforeEach(function() {
      return this.model = new DropDownMenu();
    });
  });
  
}});

window.require.define({"test/models/dynamo_menu": function(exports, require, module) {
  var DynamoMenu;

  DynamoMenu = require('models/dynamo_menu');

  describe('DynamoMenu', function() {
    return beforeEach(function() {
      return this.model = new DynamoMenu();
    });
  });
  
}});

window.require.define({"test/models/header_test": function(exports, require, module) {
  var Header;

  Header = require('models/header');

  describe('Header', function() {
    beforeEach(function() {
      return this.model = new Header();
    });
    afterEach(function() {
      return this.model.dispose();
    });
    return it('should contain 4 items', function() {
      return expect(this.model.get('items')).to.have.length(4);
    });
  });
  
}});

window.require.define({"test/models/left_navigation": function(exports, require, module) {
  var LeftNavigation;

  LeftNavigation = require('models/left_navigation');

  describe('LeftNavigation', function() {
    return beforeEach(function() {
      return this.model = new LeftNavigation();
    });
  });
  
}});

window.require.define({"test/models/product": function(exports, require, module) {
  var Product;

  Product = require('models/product');

  describe('Product', function() {
    return beforeEach(function() {
      return this.model = new Product();
    });
  });
  
}});

window.require.define({"test/models/products_test": function(exports, require, module) {
  

  
}});

window.require.define({"test/models/search_results_test": function(exports, require, module) {
  

  
}});

window.require.define({"test/models/sellingpoint": function(exports, require, module) {
  var Sellingpoint;

  Sellingpoint = require('models/sellingpoint');

  describe('Sellingpoint', function() {
    return beforeEach(function() {
      return this.model = new Sellingpoint();
    });
  });
  
}});

window.require.define({"test/models/supplier": function(exports, require, module) {
  var Supplier;

  Supplier = require('models/supplier');

  describe('Supplier', function() {
    return beforeEach(function() {
      return this.model = new Supplier();
    });
  });
  
}});

window.require.define({"test/models/suppliers_test": function(exports, require, module) {
  

  
}});

window.require.define({"test/models/template": function(exports, require, module) {
  var Template;

  Template = require('models/template');

  describe('Template', function() {
    return beforeEach(function() {
      return this.model = new Template();
    });
  });
  
}});

window.require.define({"test/models/templates_test": function(exports, require, module) {
  

  
}});

window.require.define({"test/models/variation": function(exports, require, module) {
  var Variation;

  Variation = require('models/variation');

  describe('Variation', function() {
    return beforeEach(function() {
      return this.model = new Variation();
    });
  });
  
}});

window.require.define({"test/test-helpers": function(exports, require, module) {
  var chai, sinonChai;

  chai = require('chai');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  module.exports = {
    expect: chai.expect,
    sinon: require('sinon')
  };
  
}});

window.require.define({"test/views/brand_card_view": function(exports, require, module) {
  var BrandCardView;

  BrandCardView = require('views/brand_card_view');

  describe('BrandCardView', function() {
    return beforeEach(function() {
      return this.view = new BrandCardView();
    });
  });
  
}});

window.require.define({"test/views/brands_index_view": function(exports, require, module) {
  var BrandsIndexView;

  BrandsIndexView = require('views/brands_index_view');

  describe('BrandsIndexView', function() {
    return beforeEach(function() {
      return this.view = new BrandsIndexView();
    });
  });
  
}});

window.require.define({"test/views/dashboard_home_view": function(exports, require, module) {
  var DashboardHomeView;

  DashboardHomeView = require('views/dashboard_home_view');

  describe('DashboardHomeView', function() {
    return beforeEach(function() {
      return this.view = new DashboardHomeView();
    });
  });
  
}});

window.require.define({"test/views/header_view_test": function(exports, require, module) {
  var Header, HeaderView, HeaderViewTest, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Header = require('models/header');

  HeaderView = require('views/header_view');

  HeaderViewTest = (function(_super) {

    __extends(HeaderViewTest, _super);

    function HeaderViewTest() {
      return HeaderViewTest.__super__.constructor.apply(this, arguments);
    }

    HeaderViewTest.prototype.renderTimes = 0;

    HeaderViewTest.prototype.render = function() {
      HeaderViewTest.__super__.render.apply(this, arguments);
      return this.renderTimes += 1;
    };

    return HeaderViewTest;

  })(HeaderView);

  describe('HeaderView', function() {
    beforeEach(function() {
      this.model = new Header();
      return this.view = new HeaderViewTest({
        model: this.model
      });
    });
    afterEach(function() {
      this.view.dispose();
      return this.model.dispose();
    });
    it('should display 4 links', function() {
      return expect(this.view.$el.find('a')).to.have.length(4);
    });
    return it('should re-render on login event', function() {
      expect(this.view.renderTimes).to.equal(1);
      mediator.publish('loginStatus');
      return expect(this.view.renderTimes).to.equal(2);
    });
  });
  
}});

window.require.define({"test/views/home_page_view_test": function(exports, require, module) {
  var HomePageView;

  HomePageView = require('views/home_page_view');

  describe('HomePageView', function() {
    beforeEach(function() {
      return this.view = new HomePageView();
    });
    afterEach(function() {
      return this.view.dispose();
    });
    return it('should auto-render', function() {
      return expect(this.view.$el.find('img')).to.have.length(1);
    });
  });
  
}});

window.require.define({"test/views/left_navigation_view": function(exports, require, module) {
  var LeftNavigationView;

  LeftNavigationView = require('views/left_navigation_view');

  describe('LeftNavigationView', function() {
    return beforeEach(function() {
      return this.view = new LeftNavigationView();
    });
  });
  
}});

window.require.define({"test/views/search_results_view": function(exports, require, module) {
  var SearchResultsView;

  SearchResultsView = require('views/search_results_view');

  describe('SearchResultsView', function() {
    return beforeEach(function() {
      return this.view = new SearchResultsView();
    });
  });
  
}});

window.require('test/controllers/brand_controller_test');
window.require('test/controllers/categories_controller_test');
window.require('test/controllers/dashboard_controller_test');
window.require('test/controllers/left_navigation_controller_test');
window.require('test/controllers/search_controller_test');
window.require('test/controllers/sticky_assets_controller_test');
window.require('test/controllers/suppliers_controller_test');
window.require('test/controllers/templates_controller_test');
window.require('test/controllers/websockets_controller_test');
window.require('test/models/brand_test');
window.require('test/models/brands_test');
window.require('test/models/categories_test');
window.require('test/models/header_test');
window.require('test/models/products_test');
window.require('test/models/search_results_test');
window.require('test/models/suppliers_test');
window.require('test/models/templates_test');
window.require('test/views/header_view_test');
window.require('test/views/home_page_view_test');
