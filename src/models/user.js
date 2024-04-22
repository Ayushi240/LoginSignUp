const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/test")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("Failed to connect");
    });

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const collection = new mongoose.model('LoginCollection',LoginSchema)
module.exports = collection;