const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const port = 80;
//mongoose related stuffs
mongoose.connect('mongodb://localhost/contactDance' , {useNewUrlParser: true});
// Defining Mongoose Schema 
const contactSchema = new mongoose.Schema({
    name:  String,
    phone:  String,
    email:  String,
    address:  String,
    desc:  String 
});
// Defining collections of contactDance database 
const contact = mongoose.model('Contact' , contactSchema);

// express related stuff 
app.use('/static' , express.static('static')); // for serving static files 
app.use(express.urlencoded());
//PUG RENDERING
app.set('view engine' , 'pug');
app.set('views' , './views')
//endpoints 
app.get('/', (req,res) => {
    const params = {};
    res.status(200).render('index' , params);
})
app.get('/contact' , (req,res)=> {
    res.status(200).render('contact');
})
// saving data from the user to the database => ...
app.post('/contact' , (req,res) => {
    let myData = new contact(req.body); // object bana rahe hain document ke andar..
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database");
    });
    // res.status(200).render('contact.pug');
});
//listener 
app.listen(port , () => {
    console.log(`The application started succesfully on ${port}`);
})