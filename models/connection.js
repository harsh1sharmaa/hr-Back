
//Importing modules
// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

class Connection {
    static async open() {
      if (this.conn) return this.conn;
      // this.conn = await mongoose.connect('mongodb://root:cedcommerce@127.0.0.1:27017/');
      this.conn = await MongoClient.connect('mongodb://root:cedcommerce@127.0.0.1:27017/');
      return this.conn;
    }
  }
  
  Connection.conn = null;
  // Connection.url = connection_string;
  
  module.exports = { Connection };