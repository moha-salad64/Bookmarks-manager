const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const userSchama = new mongoose.Schema({
    username:{
        type: String ,
        required: true,
    },

    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin' , 'user'],
        default: 'user'
    }
});

userSchama.pre('save' , async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8);
    }
    return next();
})


module.exports = mongoose.model('user' ,  userSchama);