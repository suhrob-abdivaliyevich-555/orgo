const { Router } = require('express')
const Joi = require('joi')
const { createContactUser } = require('../models/ContactModel')

const router = Router()

const ContactValidation = new Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(32)
        .error(new Error("Firstname is incorrect"))
        .required(),
    last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(32)
        .error(new Error("Lastname is incorrect"))
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
        x = 'contact'
   }else{
        x = 'register'
   }
    res.render(x, {
        title: (req.user)? "Contact Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/contact'
    })
})

router.post('/', async(req, res)=> {
   try{
    const {first_name, last_name, email, phone_number, msg_subject, message } = await ContactValidation.validateAsync(req.body)
    const user = await createContactUser(first_name, last_name, email, phone_number, msg_subject, message)
    if(user){
        
        res.redirect('/contact')
    }
   }catch(e){
    res.render('contact', {
        title: 'Contact Page',
        path: '/contact',
        error: e + ''
    })
   }


})

module.exports = {
    path: '/contact', 
    router: router
}