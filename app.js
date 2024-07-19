const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const path = require('path');
const port = 3000;

const app = express();

// Import models
const Post = require('./models/post');


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/careerChange', {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// set up Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json()); 
app.use(methodOverride('_method'));

// Express session will come here

// Static folder
// app.use(express.static(path.join(__dirname, 'public')));

// Set views directory
// app.set('views', path.join(__dirname, 'views'));


// Routes
app.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('index', { posts: posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving posts");
    }   
});

app.get('/new', (req, res) => {
    res.render('new');  
});

app.post('/new', async (req, res) => {
  const {title, content } = req.body;
  const post = new Post({ title, content });

  try {
    await post.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating post");
  }
});

//delete route
app.delete('/delete/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("error deleting post");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
