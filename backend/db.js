
const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017";

const ConnectToMongo = () =>{
    mongoose.connect(mongooseURI).then(
        console.log("Connect succesfully")
    );
}

module.exports = ConnectToMongo;