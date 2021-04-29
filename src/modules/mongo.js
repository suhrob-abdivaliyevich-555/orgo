const mongoose = require('mongoose')

async function database() {
    return await mongoose.connect('mongodb://localhost/orgo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

module.exports = database