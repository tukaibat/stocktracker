angular.module('stockController', [])

    // inject the Stocks service factory into our controller
    .controller('mainController', ['$scope','$http','Stocks', function($scope, $http, Stocks) {
        $scope.formData = {};
        $scope.loading = true;


        // GET =====================================================================
        // when landing on the page, get all stocks and show them
        // use the service to get all the stocks
        Stocks.get()
            .success(function(data) {
                $scope.stocks = data;
                $scope.loading = false;
            })
            .error(function(err){
                console.log(err);
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createStock = function() {
            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.stock.name != undefined) {
                $scope.loading = true;
                // call the create function from our service (returns a promise object)
                Stocks.create($scope.stock)
                    // if successful creation, call our get function to get all the new stocks
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.stock = {}; // clear the form so our user is ready to enter another
                        $scope.stocks = data; // assign our new list of stocks
                    });
            }
        };

        // DELETE ==================================================================
        // delete a stock after checking it
        $scope.deleteStock = function(id) {
            $scope.loading = true;

            Stocks.delete(id)
                // if successful creation, call our get function to get all the new stocks
                .success(function(data) {
                    $scope.loading = false;
                    $scope.stocks = data; // assign our new list of stocks
                });
        };
    }]);
