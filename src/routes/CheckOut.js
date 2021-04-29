const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
        x = 'checkout'
   }else{
        x = 'register'
   }
    res.render(x, {
        title: (req.user)? "Checkout": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/checkout'
    })
})

module.exports = {
    path: '/checkout', 
    router: router
}