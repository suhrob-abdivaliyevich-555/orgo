const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
        x = 'gallery'
   }else{
        x = 'register'
   }
    res.render(x, {
        title: (req.user)? "Gallery Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/gallery'
    })
})

module.exports = {
    path: '/gallery', 
    router: router
}