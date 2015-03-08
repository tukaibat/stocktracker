var mongoose = require('mongoose');

module.exports = mongoose.model('Trade', {
    name: {type : String, default: ''},
    date: {type : Date, default: Date.now},
    quantity: {type : Number, min: 1},
    price: {type : Number, min: 0},
    desc: {type : String, default: ''}
});