const express = require('express')
const exphbs = require('express-handlebars');
const { appendFileSync } = require('fs');
const PORT = 5555;
const app=express();
app.use(express.static('static'));

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.engine('handlebars',exphbs.engine());
app.set('view engine','handlebars');
app.set('views','./views');

const mPage = require('./routes/mainRouter');
const uPage = require('./routes/userRouter');

app.use('/',mPage);
app.use('/user',uPage);

app.listen(PORT,(err)=>{
    if (err) throw err;
    else
        console.log(`Server is running on ${PORT}`);

})