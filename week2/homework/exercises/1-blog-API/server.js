const express = require('express');
const fs = require('fs');

const app = express();

// YOUR CODE GOES IN HERE

app.use(express.json());

// to create a blog
app.post('/blogs', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  fs.writeFileSync(title, content);
  res.end('ok');
});

// to update and existing blog
app.put('/posts/:title', (req, res) => {
  const title = req.params.title;
  const content = req.body.content;
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end('ok');
  } else {
    res.status(400).end('This post does not exist!');
  }
});

// to delete a blog
app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    res.status(400).end('This blog not found actually!');
  }
});

// to read a blog bu title name
app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.send(post);
  } else {
    res.status(400).end('there is no blogs with title :' + title);
  }
});

//  to read all post
app.get('/blogs', (req, res) => {
  const allFilesTitle = fs.readdirSync(__dirname);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(allFilesTitle));
  /* I tried to just get the files' names that I just posted but I couldn't. 
  It just bring all files in the folder including the package name and this file name */
});

// Create server port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(` started the server at ${port}`);
});
