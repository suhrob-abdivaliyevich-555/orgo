const { Router } = require('express')
const Joi = require('joi')
const { createProduct } = require('../models/ProductModels')
const { findProduct } = require('../models/ProductModels')
const upload = require('express-fileupload')
const fs = require('fs/promises')
const path = require('path')


const router = Router()

const ProductValidation = new Joi.object({
    product_name: Joi.string()
        .min(2)
        .max(32)
        .error(new Error("Product name is incorrect"))
        .required(),
    new_pricing: Joi.number()
        .error(new Error("New Pricing is incorrect"))
        .min(1)
        .required(),
    old_pricing: Joi.number()
        .error(new Error("Old Pricing is incorrect"))
        .min(1)
        .required(),
    news: Joi.string()
        .required(),
    top: Joi.string()
        .required(),
    best: Joi.string()
        .required(),
    view: Joi.string()
        .required(),
    total_count: Joi.number()
        .min(1)
        .max(5)
        .error(new Error("Count number is incorrect"))
        .required(),
    product_message: Joi.string()
        .required(),
    description_message: Joi.string()
        .required()
})

router.get('/', (req, res)=> {
    let x
    if(req.user){
        x = 'admin/product'
   }else{
        x = 'register'
   }
    res.render(x, {
        title:(req.user)? "Admin Panel Page": "Registration Page",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/admin/product'
    })
})

router.post('/', async (req, res)=> {
    try{
        const { product_name, new_pricing, old_pricing, news, top, best, view, total_count, product_message, description_message } = await ProductValidation.validateAsync(req.body)
        const product = await createProduct(product_name, new_pricing, old_pricing, news, top, best, view, total_count, product_message, description_message)
        if(product){
            res.redirect('/admin/product')
        }
       }catch(e){
        res.render('admin/product', {
            title: 'Admin Product Page',
            path: '/admin/product',
            error: e + ''
        })
       }
})

router.post('/photo', upload({size: 1024 * 10 * 1024}), async (req, res)=> {
    try{
        let productFind = await findProduct()
        let productFindId = await productFind[productFind.length - 1]._id
        const photoPath = path.join(__dirname, '..', 'public', 'product_img', `${productFindId}.jpg`)
        const fileStream = await fs.writeFile(photoPath, req.files.photo.data)
        res.send({
            ok: true
        })
    }catch(e) {
        res.send({
            ok: false
        })
    }
})

module.exports = {
    path: '/admin/product', 
    router: router
}