var express = require('express');
var router = express.Router();

/* GET secrete listing. */
router.get('/', function(req, res, next) {
  //res.send('Inside secret');



const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const decipher = crypto.createDecipher('aes256', 'asaadsaad');

var cipheredmessage;
decryptedCode = '';

decipher.on('readable', () => {
  const data = decipher.read();
  if (data)
  decryptedCode += data.toString('utf8');
});

decipher.on('end', () => {
  console.log(decryptedCode); 
  // Prints: some clear text data
});

// Connection URL
const url = 'mongodb://localhost:27017/labmongodb';

// Database Name
const databaseName = 'labmongodb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  const db = client.db(databaseName);
  
  db.collection('homework7').findOne(err, function(err, result){
      if(err) throw err;
      cipheredmessage = result.message;
     // decipher.write(cipheredmessage, 'hex');
     // console.log('my object: ' + decipher.final('hex'));
    //decipher.end();
      var decrypted = decipher.update(cipheredmessage, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      res.send(decrypted);
      console.log('my text: ' + decryptedCode);
  });

  client.close();
});


});

module.exports = router;
