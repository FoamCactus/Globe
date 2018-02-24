var express = require('express');
var router = express.Router();
var stream = require('pubnub-twitter/pubnub-twitter');
/* GET tweets */
router.get('/', function (req, res, next) {
    var tweets = [];
    var t = [];
    var tlocation = [];
    stream(function (tweet) {
        if(tweet["geo"] && tweet["geo"].type === "Point"){
            /*= JSON.parse(tweet);*/
            tlocation[0] = tweet["geo"].coordinates[0];
            tlocation[1] = tweet["geo"].coordinates[1];
            tlocation[2] = 500;
            t[0] = tweet["user"].name;
            t[1] = tlocation;
            /*tlocation = t.geo.coordinates;*/
            tweets.push(t);
        }
    });
    setTimeout(function(){
            res.send(tweets);
    },400);
});

module.exports = router;
