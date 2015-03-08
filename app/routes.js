var Stock = require('./models/stock');

function getStocks(res){
    Stock.find(function(err, stocks) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(stocks); // return all todos in JSON format
    });
};

module.exports = function(app){
    app.get('/api/stocks', function(req, res) {
        getStocks(res);
    });
    app.post('/api/stocks', function(req, res) {
        Stock.create({
            name : req.body.name,
            desc : req.body.desc
        }, function(err, stock){
            if(err) res.send(err);
            getStocks(res);
        });
    });
    app.delete('/api/stocks/:stock_id', function(req, res) {
        Stock.remove({
            _id : req.params.stock_id
        }, function(err, stock) {
            if (err) res.send(err);
            getStocks(res);
        });
    });

    // Application
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
}
