const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
         x = 'shop-2'
    }else{
         x = 'register'
    }
    res.render(x, {
        title: (req.user)? "Shop Two Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/shop-2'
    })
})

module.exports = {
    path: '/shop-2', 
    router: router
}