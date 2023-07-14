const express = require("express"),
    app = express(),
    { Pool } = require('pg'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    poolConfig = require('./config/poolConfig.js')
    const { v4: uuidv4 } = require('uuid');
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

//product api's
app.delete('/product/:id', (req, res, next) => {
    try {
        const pool = new Pool(poolConfig);
        let dbQuery = '';
        dbQuery = `delete from product where id = '${req.params['id']}'`;
        pool.query(dbQuery, (err, result) => {
            if (err) {
                res.status(500).json({ success: false, error: err });
                console.log(err);
                pool.end();
            }
            else {
                pool.end();
                res.status(200).json({ success: true });
            }
        })
    }
    catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});
app.get('/products', (req, res, next) => {
    try {

        const pool = new Pool(poolConfig);
        const dbQuery = 'SELECT id,name, description, price, category_id FROM product limit 10'
        pool.query(dbQuery, (err, result) => {
            if (err) {
                res.status(500).json({ success: false, error: err });
                console.log(err);
                pool.end();
            }
            else {
                pool.end();
               res.send(result.rows);
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
app.get('/product/:id', (req, res, next) => {
    try {

        const pool = new Pool(poolConfig);
        const dbQuery = `SELECT id,name, description, price, category_id FROM product where id = '${req.params['id']}'`;
        pool.query(dbQuery, (err, result) => {
            if (err) {
                res.status(500).json({ success: false, error: err });
                console.log(err);
                pool.end();
            }
            else {
                pool.end();
               res.send(result.rows);
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
app.post('/product', (req, res) => {
    const data = {
        id : uuidv4(),
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.categoryid,
      }
      const pool = new Pool(poolConfig);
    pool.connect((err, client, done) => {
      const query = 'insert into product(id,name, description, price, category_id) values($1,$2,$3,$4,$5)';
      const values = [data.id, data.name, data.description, data.price, data.category];
  
      client.query(query, values, (error, result) => {
        done();
        if (error) {
            console.log(error);
          res.status(500).send({status: 'Error'});
        }
        else {
            res.status(200).send({
                status: 'Successful'
            });
        }
        
      });
    });
});
app.post('/product/:id', (req, res) => {

    const pool = new Pool(poolConfig);
                const data = {
                    id : req.params['id'],
                    name : req.body.name,
                    description : req.body.description,
                    price : req.body.price,
                    category : req.body.categoryid,
                  }
                
                  const query = `update product set id = '${data.id}',name = '${data.name}', 
                  description = '${data.description}', price = ${data.price}, 
                  category_id = '${data.category}' where id = '${data.id}'`;
                  pool.query(query, (err, result) => {
                    if (err) {
                        res.status(500).json({ success: false, error: err });
                        console.log(err);
                        pool.end();
                    }
                    else {
                        pool.end();
                        res.status(200).send({
                            status: 'Successful'
                          });
                    }
                });
            
 });
   



//category api's

app.delete('/category/:id', (req, res, next) => {
    try {
        const pool = new Pool(poolConfig);
        const dbQuery = `delete from category where id = '${req.params['id']}'`;
        pool.query(dbQuery, (err, result) => {
            if (err) {
                res.status(500).json({ success: false, error: err });
                console.log(err);
                pool.end();
            }
            else {
                pool.end();
                res.status(200).json({ success: true });
            }
        })
    }
    catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});
app.get('/categories', (req, res, next) => {
    try {

        const pool = new Pool(poolConfig);
        const dbQuery = 'SELECT id,name, description FROM category limit 10'
        pool.query(dbQuery, (err, result) => {
            if (err) {
                res.status(500).json({ success: false, error: err });
                console.log(err);
                pool.end();
            }
            else {
                pool.end();
               res.send(result.rows);
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
app.get('/category/:id', (req, res, next) => {
    try {

        const pool = new Pool(poolConfig);
        const dbQuery = `SELECT id,name, description FROM category where id = '${req.params['id']}'`;
        pool.query(dbQuery, (err, result) => {
            if (err) {
                res.status(500).json({ success: false, error: err });
                console.log(err);
                pool.end();
            }
            else {
                pool.end();
               res.send(result.rows);
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
app.post('/category', (req, res) => {
    const data = {
        id : uuidv4(),
        name : req.body.name,
        description : req.body.description
      }
    const pool = new Pool(poolConfig);
    pool.connect((err, client, done) => {
      const query = 'insert into category(id,name, description) values($1,$2,$3)';
      const values = [data.id, data.name, data.description];
  
      client.query(query, values, (error, result) => {
        done();
        if (error) {
            res.status(500).send({status: 'Error'});
          }
          else {
              res.status(200).send({
                  status: 'Successful'
              });
          }
      });
    });
});
app.post('/category/:id', (req, res) => {

    const pool = new Pool(poolConfig);
                const data = {
                    id : req.params['id'],
                    name : req.body.name,
                    description : req.body.description
                  }
                
                  const query = `update category set id = '${data.id}',name = '${data.name}', 
                  description = '${data.description}' where id = '${data.id}'`;
                  pool.query(query, (err, result) => {
                    if (err) {
                        res.status(500).json({ success: false, error: err });
                        console.log(err);
                        pool.end();
                    }
                    else {
                        pool.end();
                        res.status(200).send({
                            status: 'Successful'
                          });
                    }
                });
          
   
});

//common listing
app.get('/commonListing', (req, res, next) => {
    try {

        const pool = new Pool(poolConfig);
        const dbQuery = `select p.id ,p.name ,p.description ,p.price ,p.category_id as categoryId,c.name as categoryName  
        from product p left join category c   on p.category_id = c.id  limit 500`;
        pool.query(dbQuery, (err, result) => {
            if (err) {
                res.status(500).json({ success: false, error: err });
                console.log(err);
                pool.end();
            }
            else {
                pool.end();
               res.send(result.rows);
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});

app.listen(3333, () => {
    console.log("Server running on port 3333");
});






