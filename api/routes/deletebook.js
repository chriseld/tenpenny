var express = require('express');
var router = express.Router();
var con = require('./DbConnection');

router.all('/', function(req, res, next) {
    const idbooks = req.query.idbooks;
    const authid = req.body.authid;

    if(authid) {

    con.query("DELETE books WHERE idbooks = " + idbooks, function (err, result, fields) {
        if (err) console.log(err);
        res.send(result);
    })

    con.query("DELETE chapters WHERE idbooks = " + idbooks, function (err, result, fields) {
        if (err) console.log(err);
        res.send(result);
    })
    }
});

module.exports = router;