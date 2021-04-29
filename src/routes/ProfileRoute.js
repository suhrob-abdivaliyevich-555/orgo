const { Router } = require('express')
const { findUser, updateProfilePush } = require('../models/UserModel')
const { findOneProduct } = require('../models/ProductModels')
const router = Router()

router.get('/', async(req, res)=> {
    let x
    if(req.user){
         x = 'profile'
    }else{
         x = 'register'
    }
    let productProfileArray = []
    const userFind = await findUser(req.user.name)
    const ProductProfileId =  userFind.profileProduct
    for(let i = 0; i < ProductProfileId.length; i++){
        let productFind = await findOneProduct(ProductProfileId[i])
        productProfileArray.push(productFind)
    }
    res.render(x, {
        title: (req.user)? "Profile Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/profile',
        productProfileArray: (productProfileArray)? productProfileArray: []
    })
})

router.post('/', async(req, res)=> {
    try{
        const userFind = await findUser(req.user.name)
        let userProductPricing = userFind.profileProduct
        let profilesProduct =  await req.body.product_pricing
        for(let i = 0; i < userProductPricing.length; i++){
            if(userProductPricing[i] == profilesProduct){
                res.redirect('/cart')
                return 0;
            }
        }
        let result = await updateProfilePush(req.user.name, profilesProduct)
            res.redirect('/profile')
    }catch(e){
        console.log(e)
    }
    
})

module.exports = {
    path: '/profile', 
    router: router
}