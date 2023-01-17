
//Importing modules
// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

class Connection {
  
    static async open() {
      const URL = process.env.DATABASE_URL
      if (this.conn) return this.conn;
      this.conn = await MongoClient.connect(URL);
      return this.conn;
    }
  }
  
  Connection.conn = null;
  // Connection.url = connection_string;
  
  module.exports = { Connection };