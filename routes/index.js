var express = require('express');
var router = express.Router();

router.get('/api/v1/foo', function(req, res, next) {
  res.json({ title: 'Express' });
});

module.exports = router;
