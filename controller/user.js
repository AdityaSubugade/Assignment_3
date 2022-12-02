const express = require('express');
const fs = require('fs');
const { validateHeaderValue } = require('http');
const userRegister = (req,res) =>{
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let age = req.body.age;
    let phone = req.body.phone;
    let city = req.body.city;
    
    const getEmailRecord = fs.readFileSync('./user/data.txt').toString().split('\n');
    const getAllEmails = getEmails(getEmailRecord);

if (emailExists(getAllEmails,email)){
    res.render('register',{status:true,msg:'Sorry. Email Already Exists!!'})

}
else
{
    console.log(email);
    let data = name +'|' + email + '|' + pass +'|'+ age +'|'+ phone +'|'+ city;
    fs.appendFile('./user/data.txt', data + '\n', err =>{
        if(err) throw err;
    })
    res.render('register',{status: true,msg:'Registered Successfully!!'});
}
}
const login = (req,res)=>{
    let email = req.body.email; 
    let pass = req.body.pass;
    const completeFileData = fs.readFileSync('./user/data.txt').toString().split('\n');
    const email_password = getEmailAndPassword(completeFileData);
    console.log(email_password);
    const value = checkEmailAndPassword(email_password,email,pass);
    if(value.status)
        {
            res.render("Welcome",{name:value.name});
        }
        res.render('login',{loginflag:true, msg: "Invalid Email and Password!!"});
}

const logout = (req,res)=>{
    console.log('Logout Successfully!!!');
}

 function checkEmailAndPassword(email_password,userEmail,userPass)
 {
    for(let obj in email_password)
    {
        let email = email_password[obj].email;
        let pass = email_password[obj].pass;
        if(email == userEmail && pass == userPass)
        {
            let name = email_password[obj].name;
            return {
                status:true,
                name: name,
            };
        }
    }
    return {status:false};
 }
 function getEmailAndPassword(emailRecord)
 {
    const ENP = [];
    for(let i of emailRecord){
        let data = i.split('|');
        let name = data[0];
        let email = data[1];
        let pass = data[2];
        let obj = {
            name: name,
            email:email,
            pass:pass,
        }
        ENP.push(obj);
    }
    return ENP;
 }
 function emailExists(allEmails,email){
    for(let i of allEmails){
        if(i === email) return true;
    }
    return false;
 }

 function getEmails(emailRecord){
    const email = [];
    for(let i of emailRecord)
    {
        let emailInString = i.split('|');
        email.push(emailInString[1]);
    }
    return email;
 }

 module.exports = {
    userRegister, login
 };