var express = require('express');
var exphbs  = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
  var queryString = req.query.term;
  var term = encodeURIComponent(queryString);
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';

  http.get(url, function(response) {
    response.setEncoding('utf8');

    var body = '';

    response.on('data', function(d) {
      // Continuously update stream with data
      body += d;
    });

    response.on('end', function() {
      // Data reception is done, do whatever with it!
      var parsed = JSON.parse(body);
      res.render('home', {gifs: parsed.data})
    });
  });

  // giphy.search(req.query.term, function (err, response) {
  //   console.log(response);
  //   res.render('home', {gifs: response.data})
  // });
})

app.get('/hello-gif', function (req, res) {
  res.render('hello-gif', {url: 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})