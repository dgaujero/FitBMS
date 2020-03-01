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
router.get("/getmembers", function (req, res) {
  manage.allMembers(function (data) {
    res.json({ members: data })
  });
});

router.post("/signin", function (req, res) {
  // var classID = req.params.id;
  console.log(req.body);
  manage.addToSessions(
    ["name", "purpose"],
    [req.body.name, req.body.purpose],
    function (result) {
      res.json({ id: result.insertId });
    }
  );
});

router.get("/viewmember/id/:id", function (req, res) {
  console.log(req.params.id);
  var condition = "uId = '" + req.params.id + "'";
  member.viewMember(condition, function (data) {
    res.json({ member: data })
  });
});


router.put("/updatemember/", function (req, res) {
  var condition = "uId = '" + req.body.profileUpdate.uId + "'";
  console.log("UpdateSTEP1");
  member.updateMember({
    firstName: req.body.profileUpdate.firstName,
    lastName: req.body.profileUpdate.lastName,
    bday: req.body.profileUpdate.bday,
    phoneNum: req.body.profileUpdate.phoneNum,
    address: req.body.profileUpdate.address,
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id });
    }
  });
});


router.get("/manage/attendance", function (req, res) {
  manage.allAttedance(function (data) {
    res.json({ checkedIn: data });
  });
});
// MANAGEMENT SIDE

router.delete("/manage/members/id/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  console.log(req.params.id);
  manage.deleteMember(condition, function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.get("/trainers", function (req, res) {
  manage.allTrainers(function (data) {
    res.json({ trainers: data });
  });
});

router.get("/getclasses", function (req, res) {
  manage.allClasses(function (data) {
    res.json({ classes: data });
  });
});

router.put("/updateclass/id/:id", function (req, res) { //class update
  var condition = "id = " + req.params.id;
  console.log(req.body)
  console.log("controller update");
  manage.update({
    nameOfClass: req.body.nameOfClass,
    classType: req.body.typeOfClass,
    assignedTrainer: req.body.assignedTrainer,
    classSize: req.body.classSize
  }, condition, function (result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id });
    }
  });
});

router.post("/addclass", function (req, res) {
  // var classID = req.params.id;
  console.log(req.body);
  console.log("new class controller")
  manage.createNewClass([
    "nameOfClass", "classType", "assignedTrainer", "classSize"
  ], [
    req.body.addClass.nameOfClass, req.body.addClass.classType, req.body.addClass.assignedTrainer, req.body.addClass.classSize
  ], function (result) {
    res.json({ id: result.insertId });
  });
});


// delete class
router.delete("/deleteclass/id/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  console.log(req.params.id);
  manage.deleteClasses(condition, function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.post("/newmember", function (req, res) {
    // var classID = req.params.id;
    console.log(req.body);
    member.createMember(
        [ "firstName", "lastName", "address", "bday", "phoneNum", "uId"], 
        [req.body.firstName, req.body.lastName, req.body.address, req.body.bday, req.body.phoneNum, req.body.uId],
        function (result) {
            res.json({ id: result.insertId });
        }
    );
});
  
module.exports = router;