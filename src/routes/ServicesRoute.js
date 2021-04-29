const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
         x = 'services'
    }else{
         x = 'register'
    }
    res.render(x, {
        title: (req.user)? "Services Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/services'
    })
})

module.exports = {
    path: '/services', 
    router: router
}