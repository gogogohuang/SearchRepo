var express = require('express');
var engines = require('consolidate');
var app = express();

app.set('views', __dirname + '/');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.render('index.html');
});


app.listen(3000, ()=>{
  console.log('listen on 3000 port');
});
