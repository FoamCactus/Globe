var express = require('express');
var router = express.Router();
var stream = require('pubnub-twitter/pubnub-twitter');
/* GET tweets */
router.get('/', function (req, res, next) {
    var tweets = [];
    stream(function (tweet) {
        if(tweet["geo"]){
            tweets.push(tweet);
            }
    });
    setTimeout((function () {
        res.send(tweets);
    }), 500);
});

module.exports = router;
