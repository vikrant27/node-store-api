
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

const login = async(req,res) => {
    const {username,password} =req.body;

    if(!username || !password){
        throw new BadRequestError('Provide email and password')
    }

    //just for demo, normallly
    const id = new Date().getDate()


    //just for demo
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn: '30d'})

    //res.send('fake login/Register/Signup Route')
    res.status(200).json({message:'user created',token})
}

const dashboard = async(req,res) => {

    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({message:`Hello, ${req.user.username}`, secret:`Here is your authorized data, your lucky number is ${luckyNumber}`})
   
    
}

module.exports ={
    login,dashboard
}