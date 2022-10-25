const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    database: "my_project",
    user: "root",
    password: ""
})

conn.connect((err) => {
    if (err) {
        console.log("error connecting : " + err.stack);
        return
    }
    console.log("connnected DB");
});
// conn.end()
module.exports = conn;