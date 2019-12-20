const productsRoutes = (app, fs) => {

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
            res.send(myProducts);
           
     });

    // PUT 
    app.post('/products', (req, res) => {
            let product = req.body.newProduct  ; 
            let newProduct = {} ; 
            newProduct["price"] = Number(product["price"]) ; 
            newProduct["rating"] = Number(product["rating"]) ; 
            newProduct["warranty_years"] =  Number(product["warranty_years"]) ;
            newProduct["type"] = product["type"] ;  
            newProduct["name"] = product["name"] ;  
            let newId = myProducts[myProducts.length - 1]["_id"] + 1 ;
            newProduct["_id"] = newId ; 
            let a = false ; 
            newProduct["available"] == "Yes" ? a = true : a  ; 
            newProduct["available"] = a ;   
            console.log(newProduct) ;     
            myProducts.push(newProduct) ; 
            res.status(200).send(myProducts) ;  
              //res.redirect('/products');    
            
        });
    // DELETE
    app.delete('/products/:id', (req, res) => {
            const productId = req.params["id"]; 
            myProducts = myProducts.filter(p => p["_id"]!=Number(productId)) ; 
            console.log(productId) ; 
            res.status(200).send(`users id:${productId} removed`);
            //res.redirect('/products');    
            
     });
     // Update
    app.put('/products/:id', (req, res) => {
            console.log(req.body) ; 
            const productId = req.params["id"]; 
            let indexOfProduct = myProducts.map(p => p["_id"]).indexOf(Number(productId)) ; 
            if(indexOfProduct===-1){
              res.status(404).send("Product doesn't exist");
            }
            else{
            // Une librairie de mapping à utiliser (trop de code ) 
            
               myProducts[indexOfProduct]["name"] = req.body[0]["name"] ;
               myProducts[indexOfProduct]["type"] = req.body[0]["type"] ;
               myProducts[indexOfProduct]["price"] = req.body[0]["price"] ;
               myProducts[indexOfProduct]["rating"] = req.body[0]["rating"] ;
               myProducts[indexOfProduct]["warranty_years"] = req.body[0]["warranty_years"] ;
               myProducts[indexOfProduct]["available"] = req.body[0]["available"] ;
            }
            res.status(200).send(`users id:${productId} updated`);
            //res.redirect('/products');    
     });

};

module.exports = productsRoutes;
