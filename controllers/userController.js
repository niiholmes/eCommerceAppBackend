const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    const warning = {firstname:'', surname:'', username:'', email:'', password:''}

    if (err.message.includes('users validation failed')){
        Object.values (err.errors).forEach(({properties}) => {
        warning[properties.path] = properties.message

        })
    }
    return warning

}

let expire = 3*24*60*60

const createToken = (id) =>{
    return jwt.sign({id }), 'all token characters must be meaningless and long', {
        maxAge: expire
    }
}

const userControl = {}

//create
userControl.createUser = async(req, res) => {
    const{firstname, surname, username, email, password} = req.body
    try{
        let user = await User.create({firstname, surname, username, email, password})
        const token = createToken(user._id)
        res.cookie('jwt' , token, {httpOnly:true, maxAge: expire*1000})
        res.status(200).json({user:user_id})
    } catch(err){
        const warning = handleErrors(err)
        res.status(400).json(err)
        

    }
}



//read/get all users
userControl.getAllUsers = async(req, res) => {
    try{
        let result = await User.find({})
        res.status(200).send(result)

    } catch(err){
        const warning=handleErrors(err)
        res.status(500).json({warning})

    }
}
//get user
userControl.getUser = async(req, res) => {
    try{
        let result = await User.findOne({username:req.params.username})
        res.status(200).send(result)
        console.log(result)

    } catch(err){
        const warning=handleErrors(err)
        res.status(404).json({warning})

    }
}



//update
userControl.updateUser = async(req, res) =>{
    const{firstname, surname, username, email, password} = req.body
    try{
        let result = await User.findByIdAndUpdate({id:req.params}, {firstname, surname, username, email, password} )
        res.status(200).send(result)
    } catch(err){
        const warning=handleErrors(err)
        res.status(404).json({warning})

    }
}



//delete
userControl.deleteUser=async(req, res) =>{
    try{
        let result = await User.findByIdAndDelete({id:req.params})
        res.status(200).send({message: 'User deleted successfully'})

    } catch(err){
        const warning=handleErrors(err)
        res.status(500).json({warning})

    }
}

module.exports = userControl