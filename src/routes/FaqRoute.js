const { Router } = require('express')
const Joi = require('joi')
const { createQuestionUser } = require('../models/QuetionsModel')

const router = Router()

const FaqValidation = new Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(32)
        .error(new Error("Firstname is incorrect"))
        .required(),
    email: Joi.string()
        .error(new Error("Email is incorrect"))
        .required(),
    phone_number: Joi.number()
        .min(10000)
        .max(999999999999)
        .error(new Error("Phone number is incorrect"))
        .required(),
    msg_subject: Joi.string()
        .required(),
    message: Joi.string()
        .required()
})

router.get('/', (req, res)=> {
    let x
    if(req.user){
        x = 'faq'
   }else{
        x = 'register'
   }
    res.render(x, {
        title: (req.user)? "Faq Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/faq'
    })
})

router.post('/', async(req, res)=> {
   try{
    const { name, email, phone_number, msg_subject, message } = await FaqValidation.validateAsync(req.body)
    const user = await createQuestionUser(name, email, phone_number, msg_subject, message)
    if(user){
        res.redirect('/faq')
    }
   }catch(e){
    res.render('faq', {
        title: 'Faq Page',
        path: '/faq',
        error: e + ''
    })
   }


})

module.exports = {
    path: '/faq', 
    router: router
}