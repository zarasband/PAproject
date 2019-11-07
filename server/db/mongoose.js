const mongoose = require('mongoose');
process.env.NODE_CONFIG_DIR = __dirname + '/config';

const config = require('config');


mongoose.Promise = global.Promise;
mongoose.connect(config.get('MONGOURI'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true });

module.exports = {
    mongoose
};