const database = require('../data/database.config');


// Service that will create a new category
exports.create = (newCategory, result) => {

    let sqlQuery = 'INSERT INTO category (Name) VALUES (?)';

    database.query(sqlQuery, [newCategory.name], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("Created category: ", { id: res.insertId, ...newCategory });
        result(null, { id: res.insertId, ...newCategory });
    });
};
