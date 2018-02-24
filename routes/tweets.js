var express = require('express');
var router = express.Router();

/* GET tweets */
router.get('/', function(req, res, next) {
    var stream = require('pubnub-twitter');
    var tweets = [];
    stream(function(tweet){
        tweets.push(tweet);
        console.log( "Tweet: ", JSON.stringify(tweet) );
    });
    res.send(tweets);
});

module.exports = router;
