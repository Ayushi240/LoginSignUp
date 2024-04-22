const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
// const routes = require('./routes/main')
const collection = require('./models/user')
const app = express();
app.use(express.json())
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({extended:false}))


app.get('/login',(req,resp) => {
    resp.render("login");
})

app.get('/signup',(req,resp) => {
    resp.render("signup");
})

app.post('/signup',async (req,resp) => {
     const data = ({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
     })
     const checking = await collection.findOne({name:req.body.name});
     if(checking && (checking.name == req.body.name || checking.password == req.body.password )){
        resp.send("user details alresady exists")
     }
     else{
       await collection.insertMany([data]);
        resp.render("home")
     }
})

app.post('/login',async (req,resp) => {
        const check = await collection.findOne({name:req.body.name})
        if (check.password == req.body.password) {
            resp.render("home")
        }
        else{
            resp.send("incorrect password")
        }

})


app.use('/', express.static('public'));


// app.use('/', routes);

//template engine
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({extended:false}))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server started");
});
