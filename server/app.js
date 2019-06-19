const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(fileUpload());


app.use(bodyParser.urlencoded({ extended: true }));

const rootRouter = require('./routes/index');
app.use('/', rootRouter);



app.post('/auth', (req, res, next) => {
  console.log("hey");
});


app.listen(3000, () => {
  console.log('%s Express server listening on port %d', '✓', 3000);
});

module.exports = app;