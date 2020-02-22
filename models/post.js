var orm = require("../config/orm");
var admin = {
//     create: function(cols, vals, cb) {
//         orm.create("users", cols, vals, function(res) {
//             cb(res);
//     });
// },
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