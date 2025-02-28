const mysql = require('mysql2');

const database = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'freelancehub'
});

database.connect((error) => {
    if (error) throw error;
    console.log('Connected to the MySQL database succeffuly');
})

module.exports = database;