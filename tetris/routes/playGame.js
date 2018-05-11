var express = require('express');
var router = express.Router();

/* GET playgame listing. */
router.get('/', function(req, res, next) {
    res.render('playGame', { title: 'Express' });
});

module.exports = router;
