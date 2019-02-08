var ui = require('leadconduit-integration-ui');

module.exports = function(app, config) {
  app.
    controller('ConfigViewCtrl', ['$scope', function($scope) {
      $scope.cancel = function() {
        ui.cancel();
      };

      // initialize object to return to LC
      $scope.flow = {
        steps: [{
          type: 'recipient',
          entity: {
            name: config.entity.name,
            id: config.entity.id
          },
          integration: {
            module_id: config.integration || 'leadconduit-service_being_integrated.outbound.handle',
            mappings: []
          }
        }]
      };

      // initialize data structure for rich UI use
      $scope.state ={
        apiKey: 'FOO_BAR',
        filters: [],
        action: 'stop_flow', // default value
        options: {}
      };
    }])

    .controller('Page1Ctrl', ['$scope', function($scope) {
      // reset state, in case user has come back here from Next screen
      $scope.state.filters = [];

      $scope.next = function() {
        if($scope.state.action === 'stop_flow') {
          $scope.state.filters.push({
            type: 'filter',
            reason: '{{service_being_integrated.handle.reason}}',
            outcome: 'failure',
            rule_set: {
              op: 'and',
              rules: [{
                lhv: 'service_being_integrated.handle.outcome',
                op: 'is equal to',
                rhv: 'failure'
              }],
            },
            description: 'Catch failure responses',
            enabled: true
          });
        }

        $scope.changePage(2);
      };
    }])
    .controller('Page2Ctrl', ['$scope', '$http', function($scope, $http) {

      var reasonMap = {
        first: 'This is the first reason; something bad',
        second: 'This is the second reason; something else bad'
      };

      $scope.addList = function(listName) {
        $http.post('multiendpoints/addlist', '{"name":"' + listName + '"}').then(function(response) {
          $scope.lists = response.data; // update with returned list data
        })
          .catch(function(response) {
            $scope.error = response.statusText;
          });
      };

      $http.get('simplequery?api_key=' + $scope.state.apiKey).then(function(response) {
        $scope.simpleResult = response.status + ' / ' + response.data.outcome;
      })
        .catch(function(response) {
          $scope.error = response.data.error;
        });

      $http.get('multiendpoints').then(function(response) {
        $scope.lists = response.data;
      });

      $scope.finish = function() {

        Object.keys($scope.state.options).forEach(key => {
          if ($scope.state.options[key]) {

            $scope.state.filters.push({
              type: 'filter',
              reason: reasonMap[key],
              outcome: 'failure',
              rule_set: {
                op: 'and',
                rules: [{
                  lhv: 'service_being_integrated.handle.' + key,
                  op: 'is true'
                }],
              },
              description: 'Catch ' + key + ' leads',
              enabled: true
            });
          }
        });

        $scope.flow.steps = $scope.flow.steps.concat($scope.state.filters);

        ui.create({
          flow: $scope.flow
        });
      };
    }]);
};