function index(io) {
  var express = require('express');
  var router = express.Router();

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  router.post('/message', function(req, res, next) {
    io.emit('message', {foo: req.body.message});
    res.redirect('/');
  });

  return router
}

module.exports = index;
