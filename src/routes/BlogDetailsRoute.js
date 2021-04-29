const { Router } = require('express')

const router = Router()

router.get('/', (req, res)=> {
    let x
    if(req.user){
        x = 'blog-details'
   }else{
        x = 'register'
   }
    res.render(x, {
        title: (req.user)? "Blog Details Page": "Registration",
        user_name: req.user?.name,
        email: req.user?.email,
        path: '/blog-details'
    })
})

module.exports = {
    path: '/blog-details', 
    router: router
}