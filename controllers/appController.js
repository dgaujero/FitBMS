var express = require("express");
var path = require("path");
var router = express.Router();
var manage = require("../models/post");
const connection = require("../config/connection")

router.get("/attendance", function(req, res){
    manage.all(function(data) {
    res.json({ checkedIn: data });
});
});
router.get("/getmembers", function(req,res) {
    manage.allMembers(function(data) {
        res.json({ members: data })
    });
});

module.exports = router;