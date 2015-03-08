angular.module('stockService', [])
    // super simple service
    // each function returns a promise object 
    .factory('Stocks', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/stocks');
            },
            create : function(stockData) {
                return $http.post('/api/stocks', stockData);
            },
            delete : function(id) {
                return $http.delete('/api/stocks/' + id);
            }
        }
    }]);
