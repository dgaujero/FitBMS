var express = require("express");
var path = require("path");
var router = express.Router();
var manage = require("../models/post");
var member = require("../models/memberPortal")
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

router.post("/checkin/session", function (req, res) {
    // var classID = req.params.id;
    console.log(req.body);
    manage.addToSessions(
        [ "name" ], 
        [ req.body.name ],
        function (result) {
            res.json({ id: result.insertId });
        }
    );
});

router.get("/viewmember/id/:id", function(req,res) {
    console.log(req.params.id);
    var condition = "uId = '" + req.params.id +"'";
    member.viewMember(condition,function(data) {
        res.json({ member: data })
    });
});


module.exports = router;