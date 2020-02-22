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
// router.get("/getmembers", function(req,res) {
//     manage.allMembers(function(data) {
//         res.json({ members: data })
//     });
// });

router.get('/getmembers', (req, res) => { //added from project-test
    connection.connect();
    connection.query('SELECT * FROM membersTable', function(error, results) {
        if (!err) {
            res.send(results);
        } else {
            console.log('Error while performing Query.');
        }
    });
    connection.end();
});

module.exports = router;


// const router = require("express").Router();
// // const app = express();

// router.get('/getmembers', (req, res) => { //added from project-test
//     connection.connect();
//     connection.query('SELECT * FROM membersTable', function(error, results) {
//         if (!err) {
//             res.send(results);
//         } else {
//             console.log('Error while performing Query.');
//         }
//     });
//     connection.end();
// });

// module.exports = router;

