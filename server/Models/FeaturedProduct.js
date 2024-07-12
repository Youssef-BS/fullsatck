const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Market = require('./Market');
const Subcategory = require("./Subcategory");
const Product = require('./Products');

const FeaturedProduct = sequelize.define('FeaturedProduct', {
 
  

});

// Define association after Market model is required

module.exports = FeaturedProduct;