const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')


const userSchema = new Schema({
    firstname:{
        type:String
    },
    surname:{
        type:String
    },
    username:{
        type:String,
         unique:[true, 'this username is already taken'], 
         minlength:[6, 'the minimum password is 6 characters']
        
    },
    email:{
        type:String, 
        unique:[true, 'this email is already used'],
        validate:[isEmail, 'Please input a valid email.npm fund']
    },
    password:{
        type:String, 
        minlength:[8, 'minimum password is 8 characters']
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt() 
    this.password = await bcrypt.hash(this.password, salt)   
    next()
})

const User = mongoose.model('users', userSchema)

module.exports = User