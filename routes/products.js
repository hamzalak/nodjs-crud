//ading other product


const productsRoutes = (app, fs) => {
    const Product = require('../model/product.js');
    // variables
    const  dataPath = './data/Products.json';
    let myProducts ; 
    fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            myProducts = JSON.parse(data) ;                    
           
        });

    // READ Products
    app.get('/products', (req, res) => {
           Product.find({}).then( users =>  res.send(users)) ; // cath error a  ajouter
           // res.send(myProducts);
           
     });

    // PUT 
    app.post('/products', (req, res) => {
      const product = new Product({ // products est le nom de la collection 
      _id : req.body._id,
      name : req.body.name, 
      type : req.body.type, 
      price : req.body.price,
      rating : req.body.rating,
      warranty_years : req.body.warranty_years,
      available : req.body.availaible
      });
 
    // Save a Product in the MongoDB
      product.save()    
                   .then(data => {
                       res.send(data);
                    }).catch(err => {
                        res.status(500).send({message: err.message});
                      }); 
            //res.redirect('/products');    */
            
        });
    // DELETE
    app.delete('/products/:id', (req, res) => {
        Product.findOneAndRemove(Number(req.params.id),(err,product)=> {
          if(err)  return res.status(500).send(err)  ; 
          return    res.status(200).send(`users id: ${product._id} removed `); 
                                  })
                        
            //res.redirect('/products');    
            
     });
     // Update
    app.put('/products/:id', (req, res) => {
           Product.findByIdAndUpdate(
            req.params.id ,
            req.body,
            {new: true},
            (err, product) => {
                if (err) return res.status(500).send(err);
                return res.send(product);
            }
        ) 
     });

};

module.exports = productsRoutes;
