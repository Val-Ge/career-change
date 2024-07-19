const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const port = 3000;

const app = express();

//import models
const Post = require('./models/post');

//load route files
const postRoutes = ('./routes/postRoutes')

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/careerChange', {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//set ejs as templating engine
app.set('view engine', 'ejs');

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(methodOverride('_method'));

//express session will come here

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//set views directory
app.set('views', path.join(__dirname, 'views'));

//Routes
app.use('/', postRoutes);

//start server
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});