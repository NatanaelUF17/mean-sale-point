const database = require('../data/database.config');

// Get all categories service
exports.getAllCategories = (result) => {
    
    let sqlQuery = 'SELECT * FROM category';

    database.query(sqlQuery, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null)
            return;
        }
        console.log("Category: ", res);
        result(null, res);
    });
};

// Get one category service (by id)
exports.getOneCategory = (id, result) => {
 
    let sqlQuery = 'SELECT * FROM category WHERE Id = ?';

    database.query(sqlQuery, id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null)
            return;
        }
        
        // found a category
        if(res.length) {
            console.log("Found category: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found a category
        result({ kind: 'not_found' }, null);
    });
};

// Create category service
exports.createCategory = (category, result) => {

    let sqlQuery = 'INSERT INTO category (Name) VALUES (?)';

    database.query(sqlQuery, [category.name], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created category: ", { id: res.insertId, ...category });
        result(null, { id: res.insertId, ...category });
    });
};


// Update category service (by id)
exports.updateCategory = (id, category, result) => {

    let sqlQuery = 'UPDATE category SET Name = ? WHERE Id = ?';

    database.query(sqlQuery, [category.name, id], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } 

        if(res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log("Updated category: ", { id: id, ...category });
        result(null, { id: id, ...category });
    });
};

// Delete category service (by id)
exports.deleteCategory = (id, result) => {

    let sqlQuery = 'DELETE FROM category WHERE Id = ?';

    database.query(sqlQuery, id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if(res.affectedRows == 0) {
            // not found category with the id
            result({ kind: 'not_found' });
            return;
        }

        console.log(`Deleted category with id ${id}`);
        result(null, res);
    });
};

