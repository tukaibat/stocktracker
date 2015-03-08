angular.module('cashApp', [])
    .controller('cashController', ['$scope', '$http', 'Trades', function($scope, $http, Trades) {
        $scope.loading = true;

        Trades.get()
            .success(function(data){
                $scope.trades = data;
                $scope.loading = false;
            })
            .error(function(err){
                console.log(err);
            });

        $scope.createTrade = function(){
            if($scope.trade.name != undefined
                && $scope.trade.date != undefined){
                $scope.loading = true;
                Trades.create($scope.trade)
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.trade = {};
                        $scope.trades = data;
                    });
            }
        };

        $scope.deleteTrade = function(id) {
            $scope.loading = true;
            Trades.delete(id)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.trades = data;
                });
        };
    }]);