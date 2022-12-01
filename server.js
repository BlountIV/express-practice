// load express 
const express = require('express');

// create our express app
const app = express(); 
const fs = require('fs') // this engine requires the fs module like we did Saturday

// configure the app (app.set)
app.engine('madeline', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' ).replace('#list#','<div>'+ options.list + '</div>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'madeline') // register the hypatia view engine

// mount middleware (app.use)

// mount routes
app.get('/', function(req, res) {
    res.send('<h1>Welcome to my blog!</h1>');
});

app.get('/games', function(req, res) {
    res.send('<h1>Monster Hunter</h1>');
});

app.get('/system', function(req, res) {
    res.send('<h1>Ps4</h1>');
});

app.get('/controller', function(req, res) {
    res.send('<h1>Playstation</h1>');
});

app.get('/storage', function(req, res) {
    res.send('<h1>1tb</h1>');
});

app.get('/more-games', (req, res) => {
    res.render('template', { title: 'more games', message: 'all games', list: 'Mortal Kombat<br/>Monster Hunter<br/>Fire emblem' })
  })
  
  app.get('/about-me', (req, res) => {
    res.render('template', { title: 'Hey', message: 'Moses!', list: 'Gamer<br/>Raver<br/>software engineer' })
  })
  
  app.get('/personal', (req, res) => {
    res.render('template', { title: 'Who am I', message: 'Personal stuff', list: '6 brothers<br/>aquarius<br/>goth styled' })
  })

  app.get('/pc', (req, res) => {
    res.render('favs', { title: 'Pc-games', message: 'pc games', content: 'literally every game out!' })
  })

  app.get('/life', (req, res) => {
    res.render('favs', { title: 'life', message: 'my life', content: 'software engineer' })
  })



// tell the app to listen on port 3000
app.listen(3000, function () {
    console.log('Listening on port 3000');
});