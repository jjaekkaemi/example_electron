const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
function addText(db, value, datetime) {
    db.run(`INSERT INTO text(value, datetime) VALUES ('${value}', '${datetime}')`, function (createResult) {
        if (createResult) throw createResult;
    });

}

function displayText(id, value, datetime) {
    console.log(id, value, datetime)
}

function listText(db) {
    db.serialize(function () {
        db.each("SELECT rowid AS id, value, datetime FROM text", function (err, row) {
            displayText(row.id, row.value, row.datetime);
        });
    });
}

function createDatabase(file) {
    let db = new sqlite3.Database(file);
    if (!fs.existsSync(file)) {
        console.log("creating database file");
        fs.openSync(file, "w");
        let query = "CREATE TABLE `text` ( `id` INTEGER primary key AUTOINCREMENT, 'value' TEXT, `datetime` TEXT )";
        db.serialize(function () {
            db.run(query);
            query = "CREATE TABLE `image` ( `id` INTEGER primary key AUTOINCREMENT, 'value' TEXT, `datetime` TEXT )";
            db.run(query);
        });
        console.log("database initialized");
    }
    // else {
    //     const query = "CREATE TABLE `memo` ( `contents` TEXT, `date` TEXT )";
    //     db.serialize();
    //     db.each(query);
    // }

    return db;
}
export { addText, displayText, listText, createDatabase };