var express = require('express');
var engines = require('consolidate');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);
var app = express();

app.set('views', __dirname + '/');
app.set('view engine', 'html');
app.engine('html', engines.mustache);
app.use(express.static('public'));
app.use(express.static('./'));

app.get('/', function (req, res) {
  res.render('index.html');
});

// Add middleware
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true
}));
app.use(webpackHotMiddleware(compiler)) // Check [HMR] connected in console


const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});
