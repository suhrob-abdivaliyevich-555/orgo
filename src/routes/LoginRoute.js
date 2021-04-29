const { Router, response } = require('express')
const Joi = require('joi')
const { compareCrypt } = require('../modules/bcrypt')
const { findUser } = require('../models/UserModel')
const { generetaJsonWebToken } = require('../modules/jwt')
const router = Router()

const LoginValidation = Joi.object({
    login: Joi.string()
        .required()
        .error(new Error('Login is incorrect')),
    password: Joi.string()
        .required()
        .error(new Error("Password is incorrect"))
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

router.get('/', (req, res)=> {
    res.render('login', {
        title: "Login Page",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/login'
    })
})

router.post('/', async (req, res) => {
    try{
        const { login, password } = await LoginValidation.validateAsync(req.body)
        let user = await findUser(login)
        if(!user){
            throw new Error(`User not found`)
        }

        const isAnswer = compareCrypt(password, user.password)
        if(!isAnswer){
            throw new Error(`Password in correct`)
        }
        let token = generetaJsonWebToken({
            _id: user._id, 
            username: user.username,
            email: user.email
        })
        res
           .cookie('token', token)
           .redirect('/')
    }catch(e){
        res.render('login', {
            title: "Login Page",
            path: '/login',
            error: e + ""
        })
    }
})

module.exports = {
    path: '/login', 
    router: router
}