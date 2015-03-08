var Stock = require('./models/stock');
var Trade = require('./models/trade');

function getStocks(res){
    Stock.find(function(err, stocks) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) res.send(err)
        res.json(stocks); // return all todos in JSON format
    });
};

function getTrades(res){
    Trade.find(function(err, trades) {
        if(err) res.send(err);
        res.json(trades);
    });
}

module.exports = function(app){
    // Adding, Deleting, Viewing Stocks
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

    // Adding, Deleting, Viewing Trades
    app.get('/api/trades', function(req, res) {
        getTrades(res);
    });
    app.post('/api/trades', function(req, res) {
        Trade.create({
            name : req.body.name,
            desc : req.body.desc,
            date : req.body.date
        }, function(err, trade){
            if(err) res.send(err);
            getTrades(res);
        });
    });
    app.delete('/api/trades/:trade_id', function(req, res) {
        Trade.remove({
            _id : req.params.stock_id
        }, function(err, trade) {
            if (err) res.send(err);
            getTrades(res);
        });
    });

    // Application
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    app.get('/cashTrades', function(req, res) {
        res.sendfile('./public/cashTrades.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    app.get('/fnoTrades', function(req, res) {
        res.sendfile('./public/fnoTrades.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
}
