PageView = require 'views/_base/page_view'
template = require 'views/_templates/globals/dashboard_home'

module.exports = class DashboardHomeView extends PageView
  template: template
  tagName: 'section'
  className: 'dashboard'
