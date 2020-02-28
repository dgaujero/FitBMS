var orm = require("../config/orm");
var member = {

    viewMember: function(condition, cb) {
        console.log("memberportal")
        orm.viewMember("membersTable", condition, function(res) {
            cb(res);
        });
    },

    updateMember: function(colVals, condition, cb) {
        console.log("UpdateSTEP2");
        console.log(colVals);
        orm.updateMember("membersTable", colVals, condition, function(res) {
            cb(res);
        });
    }
    
};
module.exports = member;