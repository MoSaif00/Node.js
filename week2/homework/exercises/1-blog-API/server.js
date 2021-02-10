const express = require('express');
const fs = require('fs');

const app = express();

// YOUR CODE GOES IN HERE

app.use(express.json());

//setup  posts directory
const FILES_DIR = __dirname + '/posts-files';

// to handle error
function isInvalid(req) {
  if (
    typeof req.body == 'undefined' ||
    typeof req.body.title == 'undefined' ||
    typeof req.body.content == 'undefined'
  ) {
    return true;
  } else {
    return false;
  }
}

// to create a blog
app.post('/blogs', (req, res) => {
  if (isInvalid(req)) {
    res.status(400);
    res.send('Invalid Request!! sorry');
    return;
  } else {
    const title = req.body.title;
    const content = req.body.content;
    fs.writeFileSync(`${FILES_DIR}/${title}`, content);
    res.status(200);
    res.end(`Post ( ${title} ) is created.`);
  }
});

// to update and existing blog
app.put('/posts/:title', (req, res) => {
  if (isInvalid(req)) {
    res.status(400);
    res.send('Invalid Request!! sorry');
    return;
  } else {
    const title = req.params.title;
    const content = req.body.content;
    if (fs.existsSync(`${FILES_DIR}/${title}`)) {
      fs.writeFileSync(`${FILES_DIR}/${title}`, content);
      res.status(200);
      res.end(`Post ( ${title} ) got updated.`);
    } else {
      res.status(400).end(`There is no post with title : ${title}`);
    }
  }
});

// to delete a blog
app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(`${FILES_DIR}/${title}`)) {
    fs.unlinkSync(`${FILES_DIR}/${title}`);
    res.end(`Post ( ${title} ) got deleted.`);
  } else {
    res.status(400).end(`There is no post with title : ${title}`);
  }
});

// to read a blog bu title name
app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(`${FILES_DIR}/${title}`)) {
    const post = fs.readFileSync(`${FILES_DIR}/${title}`);
    res.send(post);
  } else {
    res.status(400).end(`There is no post with title : ${title}`);
  }
});

//  to read all post
app.get('/blogs', (req, res) => {
  const allFilesTitle = fs.readdirSync(FILES_DIR);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(allFilesTitle));
});

// Create server port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(` started the server at ${port}`);
});
