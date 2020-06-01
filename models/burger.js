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

    updateOne: function(val, id, cb) {
        let devoured = val.devoured;

        orm.updateOne(devoured, id, function(results) {
            cb(results);
        });
    },

    deleteOne: function(id, cb) {
        orm.deleteOne(id, (confirm) => {
            cb(confirm)
        })
    }
}

module.exports = burger;