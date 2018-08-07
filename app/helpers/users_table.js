var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var color = require('colors');
const uri = 'mongodb://dongtranv:1password@ds215172.mlab.com:15172/chat-room';
console.log('==========================================================='.green);


mongoose.connect(uri,{ useNewUrlParser: true } , (err, result) => {
    console.log('mongoose connected.'.green)
});

//Define a schema
var UserSchema = new mongoose.Schema({
    username:{ type: String, unique: true, required: true },
    hash_password: { type: String, required: true},
    email: { type: String , lowercase: true, trim: true},

    last_name: String,
    first_name: String,
    birth_date: String,
    gender: String,

    created_at: String
}, {
    collection: 'user'
});

// comparePassword
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password)
}

var userTable = mongoose.model('User', UserSchema);

//Export function to create "UserSchema" model class
// module.exports = mongoose.model('User', UserSchema );




