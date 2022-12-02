const {login,userRegister} = require('../controller/user');
const express = require('express');
const router = express.Router();
router.get("/",(req,res)=>{
    res.render("user")
})
router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/register",(req,res)=>{
    res.render("register")
})

router.get("/logout",(req,res)=>{
    res.render("index")
})
router.post('/register-data',userRegister);
router.post('/login-data',login)
module.exports = router;