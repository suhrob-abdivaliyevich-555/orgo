const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
         x = 'terms-of-service'
    }else{
         x = 'register'
    }
    res.render('terms-of-service', {
        title: (req.user)? "Terms-of-service Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/terms-of-service'
    })
})

module.exports = {
    path: '/terms-of-service', 
    router: router
}