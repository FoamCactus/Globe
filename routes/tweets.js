var express = require('express');
var router = express.Router();
var stream = require('pubnub-twitter/pubnub-twitter');
/* GET tweets */
router.get('/', function (req, res, next) {
    var tweets = [];
    stream(function (tweet) {
        if(tweet["geo"] && tweet["geo"].type === "Point"){
            tweets.push(tweet);
        }
    });
    setTimeout(function(){
            res.send(tweets);
    },300);
});

module.exports = router;
