const { Router } = require('express')
const Joi = require('joi')
const { createUser } = require('../models/UserModel')
const { generateCrypt } = require('../modules/bcrypt')
const { generetaJsonWebToken } = require('../modules/jwt')
const router = Router()

router.get('/', (req, res)=> {
    res.render('register', {
        title: "Register",
        path: '/register',
        user_name: req.user?.name,
        email: req.user?.email,
        error: ''
    })
})

const RegistrationValidation = new Joi.object({
    username: Joi.string()
        .alphanum()
        .min(6)
        .max(16)
        .error(new Error("Username is incorrect"))
        .required(),
    email: Joi.string()
        .error(new Error("Email is incorrect"))
        .required(),
    password: Joi.string()
        .min(6)
        .max(32)
        .error(new Error("Password is incorrect"))
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})

router.post('/', async(req, res)=> {
    try{
        const { username, email, password } = await RegistrationValidation.validateAsync(req.body)
        const user = await createUser(username, email, generateCrypt(password))
        let token = generetaJsonWebToken({
            _id: user._id,
            username: user.username,
        })
        res.cookie('token', token)
            .redirect('/login')
    }catch(e){
        res.render('register', {
            title: 'Registration Page',
            path: '/register',
            error: e + ''
        })
    }
})

module.exports = {
    path: '/register', 
    router: router
}