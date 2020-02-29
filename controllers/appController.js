var express = require("express");
var path = require("path");
var router = express.Router();
var manage = require("../models/post");
var member = require("../models/memberPortal")
const connection = require("../config/connection")

// router.get("/attendance", function(req, res){
//     manage.all(function(data) {
//     res.json({ checkedIn: data });
// });
// });
router.get("/getmembers", function(req,res) {
    manage.allMembers(function(data) {
        res.json({ members: data })
    });
});

router.post("/signin", function (req, res) {
    // var classID = req.params.id;
    console.log(req.body);
    manage.addToSessions(
        [ "name", "purpose"], 
        [ req.body.name, req.body.purpose],
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


router.put("/updatemember/", function(req, res) {
    var condition = "uId = '" + req.body.profileUpdate.uId +"'";
    console.log("UpdateSTEP1");
    member.updateMember({
      firstName: req.body.profileUpdate.firstName,
      lastName: req.body.profileUpdate.lastName,
      bday: req.body.profileUpdate.bday,
      phoneNum: req.body.profileUpdate.phoneNum,
      address: req.body.profileUpdate.address,
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.json({ id: req.params.id });
      }
    });
  });


router.get("/manage/attendance", function(req, res){
    manage.allAttedance(function(data) {
    res.json({ checkedIn: data });
});
});

// router.deleteMember("/manage/members/id/:id", function(req, res) {
//     var condition = "id = " + req.params.id;
//     console.log(req.params.id);
//     manage.deleteMember(condition, function(result) {
//         if (result.affectedRows == 0) {
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });


module.exports = router;