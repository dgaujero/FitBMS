var orm = require("../config/orm");
var admin = {
    all: function(cb) {
        orm.all("checkInTable", function(res) {
            cb(res);
        });
    },
    allMembers: function(cb) {
        orm.allMembers("membersTable", function(res) {
            cb(res);
        });
    }
};
module.exports = admin;