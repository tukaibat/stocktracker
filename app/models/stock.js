var mongoose = require('mongoose');

module.exports = mongoose.model('Stock', {
    name: {type : String, default: ''},
    desc: {type : String, default: ''}
});
