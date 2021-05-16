var express = require('express');
var router = express.Router();
var con = require('./DbConnection');

router.get('/', function(req, res, next) {
    const email = req.query.email.toLowerCase();
    con.query("SELECT * FROM users WHERE active = 1 AND LOWER(email)='" + email + "'", function (err, result, fields) {
        if (err) throw err;
        try {if(result[0].idusers > 0) {
            res.send(result[0]);
        } else {
            res.send("User not found");
        }} catch {
            res.send("User not found")
        }
    })
});

module.exports = router;