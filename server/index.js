const express = require('express');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

var app = express();
const port = 1997;
const portMongodb = 2018;

var url = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(url);
app.use(bodyParser.json());
app.use(fileUpload());

app.set('view engine', 'ejs');

const conn = mysql.createConnection({
    host: 'db4free.net',
    user: 'huda197',
    password: 'ecommercehuda2',
    database: 'ecommercehuda',
    port: 3306,
});

// LOGIN EXPRESS

app.get('/login', (req, res) => {
    const { email, password } = req.query;
    var sql = `select * from akun where Email='${email}' && Pass='${password}'`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    });
});

app.get('/keeplogin', (req, res) => {
    const { email } = req.query;
    var sql = `select * from akun where Email='${email}'`;
    conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        };
        res.send(results[0]);
    });
});

app.post('/addakun', (req, res) => {
    const { Username, Email, Password } = req.body;
    var data = {
        Username: Username,
        Email: Email,
        Pass: Password,
        StatusId: 2,
    };
    var sql = 'INSERT INTO akun SET ?';
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        var sql1 = `select * from akun where Email='${Email}' && Pass='${Password}'`;
        conn.query(sql1, (err, results1) => {
            if (err) throw err;
            res.send(results1);
        });
    });
});

// SHOP EXPRESS

app.get('/render/:type', (req, res) => {
    var { type } = req.params;
    var sql = `SELECT * FROM ${type}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get(`/shop`, (req, res) => {
    var { category, brand, subcategory, search } = req.query;
    if (category == 'undefined' && brand == 'undefined' && subcategory == 'undefined' && search == 'undefined') {
        var sql = `SELECT * FROM product`;
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        })
    }
    else if (search !== 'undefined') {
        var sql = `SELECT * FROM product WHERE Name Like '%${search}%'`;
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        })
    }
    else {
        var sql = `SELECT p.* FROM product p    join category c on p.CategoryId = c.Id 
                                                join brand b on p.Brand = b.Id
                                                join subcategory s on p.SubCategoryId = s.Id
                                                WHERE c.Name='${category}' || b.Name='${brand}' || s.Name='${subcategory}' `;
        conn.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                res.send('ERROR!');
            }
            res.send(results);
        });
    }
});

// CART EXPRESS

app.get('/cart/:idUser', (req, res) => {
    const { idUser } = req.params;
    var sql = `SELECT p.*, c.Quantities, c.Id as IdCart FROM product p join cart c on p.Id = c.ProductId WHERE c.AkunId=${idUser}`;
    if (idUser === 0) {
        console.log('Kosong');
    }
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/addtocart', (req, res) => {
    const { idUser, idProduct } = req.body;
    var data = {
        AkunId: idUser,
        ProductId: idProduct,
        Quantities: 1,
        Date: new Date(),
    };

    if (idUser === 0) {
        console.log('Kosong');
    }
    else if (idUser >= 1) {
        var ceksql = `SELECT * FROM cart WHERE AkunId=${idUser} && ProductId=${idProduct}`;
        conn.query(ceksql, (err, results) => {
            var quantity = 0;
            if (err) throw err;
            if (results.length >= 1) {
                quantity = results[0].Quantities;
            }
            if (quantity >= 1) {
                var quantsql = `UPDATE cart SET Quantities=${quantity + 1} WHERE AkunId=${idUser} && ProductId=${idProduct}`;
                conn.query(quantsql, (err, results) => {
                    if (err) throw err;
                    var sql1 = `SELECT p.*, c.Quantities, c.Id as IdCart FROM product p join cart c on p.Id = c.ProductId WHERE c.AkunId=${idUser}`;
                    conn.query(sql1, (err1, results1) => {
                        if (err1) throw err1;
                        res.send(results1);
                    })
                })
            }
            else if (quantity === 0) {
                var sql = `INSERT INTO cart SET ?`;
                conn.query(sql, data, (err, results) => {
                    if (err) throw err;
                    var sql1 = `SELECT p.*, c.Quantities, c.Id as IdCart FROM product p join cart c on p.Id = c.ProductId WHERE c.AkunId=${idUser}`;
                    conn.query(sql1, (err1, results1) => {
                        if (err1) throw err1;
                        res.send(results1);
                    })
                });
            }
        })
    }
});

app.delete('/deletecart', (req, res) => {
    const { iduser, idproduct } = req.query;
    var sql = `DELETE FROM cart WHERE AkunId=${iduser} && ProductId=${idproduct}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        var sql1 = `SELECT p.*, c.Quantities, c.Id as IdCart FROM product p join cart c on p.Id = c.ProductId WHERE c.AkunId=${iduser}`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

app.put(`/qty/:idCart`, (req, res) => {
    const { qty, idUser } = req.body;
    var sql = `UPDATE cart SET Quantities = ${qty} WHERE Id = ${req.params.idCart}`;
    if (qty !== 0) {
        conn.query(sql, (err, results) => {
            if (err) throw err;
            var sql1 = `SELECT p.*, c.Quantities, c.Id as IdCart FROM product p join cart c on p.Id = c.ProductId WHERE c.AkunId=${idUser}`;
            conn.query(sql1, (err1, results1) => {
                if (err1) throw err1;
                res.send(results1);
            })
        })
    }
})

app.delete('/deletecartorder/:idUser', (req, res) => {
    var sql = `DELETE FROM cart WHERE AkunId=${req.params.idUser}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})


// BACKEND MONGODB

const app1 = express();
const MongoClient = require('mongodb').MongoClient;
var urlMongodb = 'mongodb://huda:huda123@ds255539.mlab.com:55539/ecommercehuda';

app1.use(cors());
app1.use(bodyParser.json());


app1.get('/orderhistory/:idUser', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        karyawanCol = db.collection('orderhistory');
        karyawanCol.find({ nama: req.params.idUser }).toArray((err1, result) => {
            db.close();
            console.log('Search Berhasil!');
            res.send(result);
        })
    })
})

app1.post('/addorderhistory', (req, res) => {
    MongoClient.connect(urlMongodb, (err, db) => {
        karyawanCol = db.collection('orderhistory');
        karyawanCol.insertMany(
            [req.body],
            (err, result) => {
                db.close();
                console.log(result);
                res.send(result);
            }
        )
    })
})



app.listen(port, () => console.log(`Database MYSQL listening on port ${port}!`));
app1.listen(portMongodb, () => console.log(`Database MongoDb listening on portMongodb ${portMongodb}!`));
