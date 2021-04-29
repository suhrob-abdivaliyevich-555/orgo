const { Router } = require('express')
const { findNews, findTop, findBest, findView } = require('../models/ProductModels')

const router = Router()

router.get('/', async (req, res)=> {
    let x
    if(req.user){
         x = 'shop-details'
    }else{
         x = 'register'
    }
    let productNews = await findNews()
    res.render(x, {
        title: (req.user)? "Shop-details Page": "Registration",
        productNews,
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/shop-1'
    })
})

module.exports = {
    path: '/shop-details', 
    router: router
}