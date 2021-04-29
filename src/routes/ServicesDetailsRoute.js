const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
         x = 'services-details'
    }else{
         x = 'register'
    }
    res.render(x, {
        title: (req.user)? "Services Details Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/services-details'
    })
})

module.exports = {
    path: '/services-details', 
    router: router
}