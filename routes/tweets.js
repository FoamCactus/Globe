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
    while(true) {
        if(tweets.length > 100) {
            break;
        }
    }
    res.send(tweets);
});

module.exports = router;
