const express = require("express");
const config = require("./mysqlConnectionConfig");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const app = express();

const path = require("path");

const PORT_NUMBER = 3000;

let connection = mysql.createConnection(config);

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use("/static", express.static(path.join(__dirname, "static-assets")));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.get("/home", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.get("/search", function (req, res) {
    let valueofsearch = req.query.searchterma;

    let sql = `select * from entries.entries WHERE word='${valueofsearch}';`

    connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        res.json({
            status: 200,
            data: results,
        });
    });

})

app.listen(PORT_NUMBER, function () {
    console.log("server started on PORT "+ PORT_NUMBER);
})