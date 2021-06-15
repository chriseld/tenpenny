var express = require('express');
var router = express.Router();
// var con = require('./DbConnection');

router.post('/', function(req, res, next) {
    const authid = req.query.authid;
    const title = req.query.title;
    const blurb = req.query.blurb;
    const cover = req.query.cover;
    console.log(req.body);
});

module.exports = router;