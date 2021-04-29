const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
         x = 'privacy-policy'
    }else{
         x = 'register'
    }
    res.render(x, {
        title: (req.user)? "Privacy-policy Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/privacy-policy'
    })
})

module.exports = {
    path: '/privacy-policy', 
    router: router
}