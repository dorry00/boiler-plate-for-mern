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
        required:true,
        maxlength: 50
    },
    lastname:{
        type:String,
        maxlength: 50,
        required:true,
    },
    role : {
        type:Number,
        default: 0 
    },
    profilepic: String,
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
    
            bcrypt.hash(user.passwword,salt,function(err,hash){
                if(err)return next(err)
                user.password=hash
                next()
            })
                 })
    } else {
        next()
    }
});

userSchema.methods.comparePassword= function(plainPassword,cb){
    bcrypt.compare(plainPassword,this.password, function(err,isMatch){
        if(err) return cb(err)
        if(isMatch){
            return cb(null, user);
        }
        else{
            return  cb(null, false, {message: 'Invalid password'});
        }
    })
}




module.exports = mongoose.model('User', userSchema);

