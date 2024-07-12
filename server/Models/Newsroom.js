const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Market = require('./Market');
const Subcategory = require("./Subcategory");
const Product = require('./Products');

const Newsroom = sequelize.define('Newsroom', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
});

// Define association after Market model is required

module.exports = Newsroom;