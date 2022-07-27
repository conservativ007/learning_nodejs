const path = require('path');
const express = require('express');
const morgan = require('morgan');

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, 'localhost', (err) => {
  err ? console.log(err) : console.log(`listening port ${PORT}`)
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title })
});

app.get('/contacts', (req, res) => {
  const contacts = {
    "name" : "Maks", "age" : 27,
    "name" : "Sveta", "age" : 25
  }
  const title = 'Contacts';
  res.render(createPath('contacts'), { contacts, title })
});

app.get('/posts', (req, res) => {
  const title = "Posts";
  const posts = [
    {
      id: 1,
      text: "some text",
      title: "Post title",
      date: "05.05.21",
      author: "Maks"
    }
  ]
  res.render(createPath('posts'), { title, posts })
});

app.post('/add-post', (request, response) => {
  const { title, author, text } = request.body;
  const post = {
    id: new Date(),
    date: (new Date()).toLocaleDateString(),
    title,
    author,
    text,
  };
  response.render(createPath('post'), { post, title })
});

app.get('/posts/:id', (req, res) => {
  const title = "Post";
  const post = {
    id: 1,
    text: "some text",
    title: "Post title",
    date: "05.05.21",
    author: "Maks"
  }
  res.render(createPath('post'), { title, post })
});

app.get('/add-post', (req, res) => {
  const title = "add post";
  res.render(createPath('add-post'), { title })
});


app.get('/about-us', (req, res) => {
  res.redirect('/contacts')
});

app.use((req, res) => {
  res
  .status(404)
  .render(createPath('error'))
});

