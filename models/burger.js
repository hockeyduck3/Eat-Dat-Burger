const orm = require('../config/orm');

const burger = {
    selectAll: function(cb) {
        orm.selectAll(data => {
            cb(data)
        });
    },

    insertOne: function(burgers, nameVal, cb) {
        orm.insertOne(burgers, nameVal, function(res) {
            cb(res);
        });
    },

    updateOne: function(burgers, whereVal, idVal, cb) {
        orm.updateOne(burgers, whereVal, id, function(results) {
            cb(results);
        });
    }
}

module.exports = burger;