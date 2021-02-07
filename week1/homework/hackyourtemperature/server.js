const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
app.use(express.json());

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: false}));

app.get('/', (req, res) => {
  res.render(index);
});

// Listen to local host on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server initialized successfully at ${port}`);
});
