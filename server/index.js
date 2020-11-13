const express = require('express')
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const port = process.env.PORT || 5000;
const Product = require('./models/product');

const app = express();
app.use(bodyParser);

//MongoDb Atlas setup
connection.connect();

// const testSave = async () => {
//   const productResult = new Product({
//     image: "/images/dress3.jpg",
//     title: "Midi sundress with shirring detail 3",
//     description: "This is for all something ... 3",
//     availableSizes: ["L"],
//     price: 105.2
//   });

//   const saveProductResult = await productResult.save();
//   console.log('saveProductResult: ', saveProductResult);
// }

// testSave();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log('App listening on port 5000!');
});