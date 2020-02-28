var orm = require("../config/orm");
var admin = {
    allAttedance: function(cb) {
        orm.allAttendance("checkInTable", function(res) {
            cb(res);
        });
    },
    
    allMembers: function(cb) {
        orm.allMembers("membersTable", function(res) {
            cb(res);
        });
    },
    addToSessions: function(cols, vals, cb) { 
        console.log("add to sessions");
        orm.addToSessions("checkInTable", cols, vals, function(res) {
            cb(res);
    });
    },
    // deleteMember: function(condition, cb) {
    //     console.log("delete member");
    //     orm.deleteMember("membersTable", condition, function(res){
    //         cb(res);
    //     });
    // }
};
module.exports = admin;