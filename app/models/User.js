var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//Define a schema
var UserSchema = new mongoose.Schema({
    username:{ type: String, unique: true, required: true },
    password: { type: String, required: true},
    age: {type: Number, required: true},
    conversation: [{id: Number, message: String}]
}, {
    collection: 'user'
});

// comparePassword
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

//Export function to create "UserSchema" model class
module.exports = mongoose.model('User', UserSchema );