var mongoose = require('mongoose');
var config = require('../helpers/config');
exports.connectMongoDb = function() {
    //connect to MongoDB
    var mongodbUri = config.dbUri;
    var options = {
        useNewUrlParser: true
    };
    mongoose.connect(mongodbUri, options);
};