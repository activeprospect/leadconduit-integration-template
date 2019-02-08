var ui = require('leadconduit-integration-ui');
var angular = require('angular');
require('angular-route');
require('simple-angular-pagination');

ui.init(init);

function init(config) {
  config = config || {};

  var app = angular.module('app', ['ngRoute', 'Pagination']);
  require('./config/index.js')(app, config);

  app
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/config', {
          template: require('./config/index.html'),
          controller: 'ConfigViewCtrl'
        })
        // put additional routes here, like: .when('/auth', {template: , controller: })
        .otherwise({
          redirectTo: '/config'
        });
    }]);

  angular.bootstrap(document, ['app']);
}
