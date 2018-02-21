// ########################CONFIG########################

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/productManagerApp/dist' ));

// ########################################################


// ########################MONGOOSE########################

mongoose.connect('mongodb://localhost/productManager')

var productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  imageUrl: String,
}, {timestamps: true});

mongoose.model('product', productSchema);
var Product = mongoose.model('product');
// ########################################################

// ########################Routes########################
// // Root Request



// //get all products
app.get('/show-all', function(req, res) {
    Product.find({}, function(err, data) {
        if (err) {
          console.log('got an error');
        res.json({error: err});
        }
        else {
        console.log('showing all products');
        res.json({data: data});
      }
  })
})
//
//new task
app.post('/new', function(req, res) {

  var newProduct = new Product({
    title: req.body.title,
    price: req.body.price,
    imageUrl: req.body.imageUrl,

   })
  newProduct.save(function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log('successfully added a product');
      res.json({success: results});
      }
  })
})
//delete task
app.delete('/delete/:id', function(req, res) {
  console.log("server deleting: ", req.params.id)
   Product.findByIdAndRemove(req.params.id, function(err, results) {
     if(err) {
       console.log(err);
     } else {
       console.log('successfully deleted');
       res.json({success:results})
     }
   })
})
// show one product
app.get('/products/:id', function(req, res) {
  console.log("in the server")
  Product.findById(req.params.id, function(err, data) {
    if(err) {
      console.log("ERROR!", err);
    } else {
      console.log('retrieved one product from the DB!!');
      res.json(data)
    }
  })
})
//
//update product
app.put('/update/:id', function(req, res) {
    Product.findById(req.params.id, function(err, product) {
      if (err) {
        console.log("error updating product", err);
      } else {
        product.title = req.body.title;
        product.price = req.body.price;
        product.imageUrl = req.body.imageUrl;
        product.save(function(err, product) {
          if(err) {
            console.log('something went wrong');
            res.send(err);
          }  else {
          console.log('updated product', product)
          res.json({success: product})
        }
      })
    }
  })
})

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./productManagerApp/dist/index.html"))
  });

//########################Start Server########################
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("Product Manager listening on port 8000");
})
