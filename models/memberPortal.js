var orm = require("../config/orm");
var member = {

    viewMember: function(condition, cb) {
        console.log("memberportal")
        orm.viewMember("membersTable", condition, function(res) {
            cb(res);
        });
    }
    
};
module.exports = member;