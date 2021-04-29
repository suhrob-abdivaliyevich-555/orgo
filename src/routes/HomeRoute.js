const { Router } = require('express')
const { findNews, findTop, findBest, findView } = require('../models/ProductModels')
const { findProduct } = require('../models/ProductModels')
const { updateUserPush, findUser } = require('../models/UserModel')
const router = Router()

router.get('/', async (req, res)=> {
    let productNews = await findNews()
    let productTop = await findTop()
    let productBest = await findBest()
    let productView = await findView()
    let product = await findProduct()
    let x
    if(req.user){
         x = 'index'
    }else{
         x = 'register'
    }
    res.render( x , {
        title: (req.user)? "Home Page": "Registration",
        product,
        productNews, 
        productTop,
        productBest,
        productView,
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/'
    })
})

router.post('/', async(req, res)=> {
    try{
        let {product_id} = await req.body
        let userFind = await findUser(req.user.name)
        let userProductId = userFind.productCart
        for(let i = 0; i < userProductId.length; i++){
            if(userProductId[i] == product_id){
                res.redirect('/cart')
                return 0;
            }
        }
        let result = await updateUserPush(req.user.name, product_id)
        res.redirect('/cart')
    }catch(e){
        console.log(e)
    }
})


module.exports = {
    path: '/', 
    router: router
}