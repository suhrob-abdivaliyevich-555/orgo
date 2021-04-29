const { Router } = require('express')
const { findUser } = require('../models/UserModel')
const { findOneProduct } = require('../models/ProductModels')
const { updateUserRemove } = require('../models/UserModel')
const router = Router()

router.get('/', async (req, res)=> {
    let x
    if(req.user){
        x = 'cart'
   }else{
        x = 'register'
   }
    let productIdArray = []
    const userFind = await findUser(req.user.name)
    const userProductId =  userFind.productCart
    for(let i = 0; i < userProductId.length; i++){
        let productFind = await findOneProduct(userProductId[i])
        productIdArray.push(productFind)
    }
    res.render(x, {
        title: (req.user)? "Cart Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/cart',
        productIdArray: (productIdArray)? productIdArray: []
    })
})

router.post('/', async (req, res)=> {                      
    const userFind = await findUser(req.user.name)
    let userProductId = userFind.productCart
    let userRemoveProduct = req.body.product_remove
    for(let i = 0; i < userProductId.length; i++){
        if(userProductId[i] == userRemoveProduct){
            userProductId.splice(i, 1)
        }
    }
    let x = await updateUserRemove(req.user.name, userProductId)
    res.redirect('/cart')
})

module.exports = {
    path: '/cart', 
    router: router
}