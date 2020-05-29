const connection = require('./connection');

const orm = {
    selectAll: function (cb) {
        let querySearch = 'SELECT * FROM burgers';

        connection.query(
            querySearch,

            function (err, data) {
                if (err) throw err;

                cb(data);
            }
        );
    },

    insertOne: function(table, name, cb) {
        let querySearch = `INSERT INTO ${table} VALUES(${name}, false)`;

        connection.query(
            querySearch,
            
            function(err, data) {
                if (err) throw err;

                cb(data);
            }
        );
    },

    updateOne: function(table, where, id, cb) {
        let querySearch = `UPDATE ${table} WHERE ${where} = ${id}`;

        connection.query(
            querySearch,

            function(err, data) {
                if (err) throw err;
    
                cb(data);
            }
        );
    }
}

module.exports = orm;