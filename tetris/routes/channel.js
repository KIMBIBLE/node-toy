var express = require('express');
var router = express.Router();

/* GET channel page. */
router.get('/', function(req, res, next) {
  res.render('channel', { title: 'Express' });
});

module.exports = router;
