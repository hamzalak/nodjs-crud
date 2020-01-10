const mongoose = require('mongoose') ; 

const productScheme = mongoose.Schema({_id : Number,
                                     name : String, 
                                     type : String, 
                                     price : Number,
                                     rating : Number,
                                     warranty_years : Number,
                                     available : Boolean

}) ; 

module.exports = mongoose.model('Product' , productScheme ) ; 
