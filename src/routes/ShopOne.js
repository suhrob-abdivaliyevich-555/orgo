const { Router } = require('express')
const { findProduct } = require('../models/ProductModels')
const { updateUserPush, findUser } = require('../models/UserModel')

const router = Router()

router.get('/', async(req, res)=> {
    let x
    if(req.user){
         x = 'shop-1'
    }else{
         x = 'register'
    }
    let product = await findProduct()
    res.render(x, {
        title: (req.user)? "Shop One Page": "Registration",
        product,
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/shop-1'
    })
})

router.post('/', async(req, res)=> {
    try{
        let {product_id} = await req.body
        let userFind = await findUser(req.user.name)
        let userProductId = userFind.productCart
        for(let i = 0; i < userProductId.length; i++){
            if(userProductId[i] == product_id){
                res.redirect('/shop-1')
                return 0;
            }
        }
        let result = await updateUserPush(req.user.name, product_id)
        res.redirect('/shop-1')
    }catch(e){
        console.log(e)
    }
})

module.exports = {
    path: '/shop-1', 
    router: router
}