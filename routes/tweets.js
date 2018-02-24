var express = require('express');
var router = express.Router();
var pubnub = require('pubnub');
var stream = require('pubnub-twitter/pubnub-twitter');
/* GET tweets */
router.get('/', function (req, res, next) {
    var tweets = [];
    stream(function (tweet) {
            tweets.push(tweet);
    });
    setTimeout((function () {
        res.send(tweets);
    }), 500);
});

module.exports = router;
