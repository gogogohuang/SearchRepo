var express = require('express');
var engines = require('consolidate');
var app = express();

app.set('views', __dirname + '/');
app.set('view engine', 'html');
app.engine('html', engines.mustache);
app.use(express.static('public'));
app.use(express.static('./'));

app.get('/', function (req, res) {
  res.render('index.html');
});

const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});
