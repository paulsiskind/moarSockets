var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var messages = db.get('messages');

router.get('/messages', function(req, res, next){
  messages.find({},function(err, data){
    res.json(data)
  })
})
router.post('/addMessage', function(req, res, next){
  messages.insert({message: req.body.message,
                   user: req.body.user,
                   room: req.body.room
                  
                  })

});


router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
});
module.exports = router;
