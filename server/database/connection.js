const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/shopping-cart-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log('db connected...');
  } catch (e) {
    console.error(e);
  }
}

const connection = {
  connect
}

module.exports = connection;