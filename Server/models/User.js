const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
    
    },
    email: {
        type:String,
        unique: 1 ,
    },
    password: {
        type: String,
        minglength: 6
    },
    firstname: {
        type:String,
        maxlength: 50
    },
    lastname:{
        type:String,
        required:true,
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})
userSchema.pre('save', function( next ) {
    let user = this;
    
    if(user.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(salt, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});



module.exports = mongoose.model('User', userSchema);

