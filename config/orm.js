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

    insertOne: function(col, val, cb) {
        let querySearch = `INSERT INTO burgers (${col}) VALUES (?)`;

        connection.query(
            querySearch,

            val,
            
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
    },

    deleteOne: function(id, cb) {
        let querySearch = `DELETE FROM burgers WHERE id="${id}"`;

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