const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
         x = 'pricing'
    }else{
         x = 'register'
    }
    res.render(x, {
        title: (req.user)? "Pricing Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/pricing'
    })
})

module.exports = {
    path: '/pricing', 
    router: router
}