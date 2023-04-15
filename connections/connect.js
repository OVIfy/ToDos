const mongoose = require('mongoose');
const {User} = require('./schema')

// main().catch(err => console.log(err));

async function connect(url) {
    try {  
        let conn = await mongoose.connect(url);
        return conn
    } catch (error) {
        console.log(error)
    }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = connect