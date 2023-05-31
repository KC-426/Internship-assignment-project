const path = require('path')
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require("./routes/auth");
const productRoutes = require('./routes/product')

app.use('/auth', authRoutes);
app.use('/form', productRoutes)

mongoose.connect('mongodb+srv://kuldeep:18330468@cluster0.qw8m0tp.mongodb.net/Data')
.then(result => {
    app.listen(3000)
})
.catch(err => {
    console.log(err)
})