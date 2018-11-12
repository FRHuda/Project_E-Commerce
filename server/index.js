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

app.put('/updateakun/:id', (req, res) => {
    const { Username, Phone, Birthday } = req.body
    var data = {
        Username,
        Phone,
        Birthday
    };
    var sql = `UPDATE akun SET ? WHERE Id=${req.params.id}`;
    conn.query(sql, data, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
        var sql1 = `SELECT * FROM akun WHERE Id=${req.params.id}`;
        conn.query(sql1, (err1, results1) => {
            if (err1) {
                console.log(err1);
                throw err1;
            }
            res.send(results1);
        })
    })
})

// ADDRESS
app.get('/address/:id', (req, res) => {
    const { id } = req.params;
    var sql = `SELECT * FROM alamat WHERE UserId=${id}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.post('/address', (req, res) => {
    const { Address, PostCode, TownCity, Province, UserId } = req.body;
    const data = {
        UserId,
        Address,
        PostCode,
        TownCity,
        Province
    }
    var sql = `INSERT INTO alamat SET ?`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        var sql1 = `SELECT * FROM alamat WHERE UserId=${UserId}`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

app.put('/address/:id', (req, res) => {
    const { Address, PostCode, TownCity, Province } = req.body;
    const data = {
        Address,
        PostCode,
        TownCity,
        Province
    };
    var sql = `UPDATE alamat SET ? WHERE UserId=${req.params.id}`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        var sql1 = `SELECT * FROM alamat WHERE UserId=${req.params.id}`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

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
        var sql = `SELECT * FROM product ORDER BY Id Desc`;
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
                                                WHERE c.Name='${category}' || b.Name='${brand}' || s.Name='${subcategory}'
                                                ORDER BY p.Id Desc `;
        conn.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                res.send('ERROR!');
            }
            res.send(results);
        });
    }
});

app.get('/productdetail/:id', (req, res) => {
    const { id } = req.params;
    var sql = `SELECT p.*, c.Name as Category FROM product p join category c on p.CategoryId=c.Id WHERE p.Id = ${id}`;
    if (id !== undefined || id !== 0) {
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        })
    }
})

app.get('/getnewproduct', (req, res) => {
    var sql = `SELECT * FROM product ORDER BY Id Desc`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

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
        res.send(results);
    })
})


// BACKEND MONGODB TRANSACTION HISTORY

const app1 = express();
const MongoClient = require('mongodb').MongoClient;
var urlMongodb = 'mongodb://huda:huda123@ds255539.mlab.com:55539/ecommercehuda';

app1.use(cors());
app1.use(bodyParser.json());


app1.get('/orderhistory/:idUser', (req, res) => {
    MongoClient.connect(urlMongodb, (err, db) => {
        collection = db.collection('orderhistory');
        collection.find({ idUser: parseInt(req.params.idUser) }).toArray((err1, result) => {
            db.close();
            res.send(result);
        })
    })
})

app1.post('/addorderhistory', (req, res) => {
    MongoClient.connect(urlMongodb, (err, db) => {
        collection = db.collection('orderhistory');
        collection.insertMany(
            [req.body],
            (err, result) => {
                db.close();
                res.send(result);
            }
        )
    })
})


//BACKEND ADMIN

app.get('/admin/:get', (req, res) => {
    const { get } = req.params;
    var sql = `SELECT * FROM ${get}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.put('/userstatus/:id', (req, res) => {
    var sql = `UPDATE akun SET StatusId=${req.body.StatusId} WHERE Id=${req.params.id}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        var sql1 = 'SELECT * FROM akun';
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

app.delete('/user/:id', (req, res) => {
    var sql = `DELETE FROM akun WHERE Id=${req.params.id}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        var sql = `DELETE FROM cart WHERE AkunId=${req.params.id}`;
        conn.query(sql, (err, results) => {
            if (err) throw err;
            var sql = `DELETE FROM alamat WHERE UserId=${req.params.id}`;
            conn.query(sql, (err, results) => {
                if (err) throw err;
                var sql = `SELECT * FROM akun`;
                conn.query(sql, (err1, results1) => {
                    if (err1) throw err1;
                    res.send(results1);
                })
            })
        })
    })
})


app.put('/subcategory/:id', (req, res) => {
    var data = {
        Name: req.body.Name,
        CategoryId: req.body.CategoryId
    }
    var sql = `UPDATE subcategory SET ? WHERE Id=${req.params.id}`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        var sql1 = 'SELECT * FROM subcategory ORDER BY CategoryId';
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

app.delete('/subcategory/:id', (req, res) => {
    var sql = `DELETE FROM subcategory WHERE Id=${req.params.id}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        var sql = `DELETE FROM product WHERE SubCategoryId=${req.params.id}`;
        conn.query(sql, (err, results) => {
            if (err) throw err;
            var sql1 = `SELECT * FROM subcategory ORDER BY CategoryId`;
            conn.query(sql1, (err1, results1) => {
                if (err1) throw err1;
                res.send(results1);
            })
        })
    })
})

app.post(`/subcategory`, (req, res) => {
    var data = {
        Name: req.body.Name,
        CategoryId: req.body.CategoryId
    };
    var sql = `INSERT INTO subcategory SET ?`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        var sql1 = `SELECT * FROM subcategory ORDER BY CategoryId`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})


app.put('/brand/:id', (req, res) => {
    var data = {
        Name: req.body.Name
    };
    var sql = `UPDATE brand SET ? WHERE Id=${req.params.id}`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        var sql = `SELECT * FROM brand`;
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        })
    })
})
app.post(`/brand`, (req, res) => {
    var data = {
        Name: req.body.Name
    };
    var sql = `INSERT INTO brand SET ?`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        var sql = 'SELECT * FROM brand';
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        })
    })
})
app.delete(`/brand/:id`, (req, res) => {
    var sql = `DELETE FROM brand WHERE Id=${req.params.id}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        var sql = `DELETE FROM product WHERE Brand=${req.params.id}`;
        conn.query(sql, (err, results) => {
            if (err) throw err;
            var sql = `SELECT * FROM brand`;
            conn.query(sql, (err, results) => {
                if (err) throw err;
                res.send(results);
            })
        })
    })
})



app.put('/product/:id', (req, res) => {
    const { Name, CategoryId, SubCategoryId, Brand, Description, Img, Price } = req.body;
    var data = {
        Name, CategoryId, SubCategoryId, Brand, Description, Img, Price
    };
    var sql = `UPDATE product SET ? WHERE Id=${req.params.id}`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        var sql1 = `SELECT * FROM product ORDER BY Id DESC`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

app.post('/product', (req, res) => {
    const { Name, CategoryId, SubCategoryId, Brand, Description, Img, Price } = req.body;
    var data = {
        Name, CategoryId, SubCategoryId, Brand, Description, Img, Price
    };
    var sql = 'INSERT INTO product SET ?';
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        var sql = 'SELECT * FROM product ORDER BY Id DESC';
        conn.query(sql, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

app.delete('/product/:id', (req, res) => {
    var sql = `DELETE FROM product WHERE Id=${req.params.id}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        var sql = `SELECT * FROM product ORDER BY Id DESC`;
        conn.query(sql, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})


app1.get('/alltransaction', (req, res) => {
    MongoClient.connect(urlMongodb, (err, db) => {
        collection = db.collection('orderhistory');
        collection.find({}).toArray((err1, result) => {
            db.close();
            res.send(result);
        })
    })
})



app.listen(port, () => console.log(`Database MYSQL listening on port ${port}!`));
app1.listen(portMongodb, () => console.log(`Database MongoDb listening on portMongodb ${portMongodb}!`));
