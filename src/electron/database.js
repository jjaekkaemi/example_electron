const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
function addMemo(db, contents, date) {
    db.run(`INSERT INTO memo(contents, date) VALUES ('${contents}', '${date}')`, function (createResult) {
        if (createResult) throw createResult;
    });

}

function displayMemo(contents, date) {
    console.log(contents, date)
}

function listMemo(db) {
    db.serialize(function () {
        db.each("SELECT rowid AS id, contents, date FROM memo", function (err, row) {
            displayMemo(row.contents, row.date);
        });
    });
}

function createDatabase(file) {
    let db = new sqlite3.Database(file);
    if (!fs.existsSync(file)) {
        console.log("creating database file");
        fs.openSync(file, "w");
        const query = "CREATE TABLE `memo` ( `contents` TEXT, `date` TEXT )";
        db.serialize();
        db.each(query);

        console.log("database initialized");
    }
    // else {
    //     const query = "CREATE TABLE `memo` ( `contents` TEXT, `date` TEXT )";
    //     db.serialize();
    //     db.each(query);
    // }

    return db;
}
export { addMemo, displayMemo, listMemo, createDatabase };