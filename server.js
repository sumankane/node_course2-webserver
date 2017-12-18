const express = require ('express');

const hbs = require('hbs');

const fs = require ('fs');
app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('viewEngine','hbs');
app.use(express.static(__dirname + '/Public'));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} : ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n' , (error) => {
    if (error){
      console.log('Unable to append logs');
    }
  });
  next ();
});
app.use((req, res, next) => {
  res.render('maintenaince.hbs')
});
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get ('/',(req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    message: 'Welcome bro!!',
  });
});

app.get ('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    message: 'Welcome Bro!'
  });
});

app.get ('/bad',(req, res) => {
  res.send ({
    error: 'Unexpected error occured',
    details : 'Unable to connect'
  });
});
app.listen(3000);
