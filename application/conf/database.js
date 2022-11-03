const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'csc317db',
    password: 'Root@123',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



module.exports = db.promise();

