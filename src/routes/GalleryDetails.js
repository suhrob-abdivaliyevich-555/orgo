const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
        x = 'gallery-details'
   }else{
        x = 'register'
   }
    res.render(x, {
        title: (req.user)? "gallery-details Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/gallery-details'
    })
})

module.exports = {
    path: '/gallery-details', 
    router: router
}