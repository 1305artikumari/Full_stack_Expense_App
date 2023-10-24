const Sequelize  = require('sequelize');
const sequenlize=require('../config/db');
const expense=sequenlize.define('expense',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,

 },
 amount:{
    type:Sequelize.INTEGER,
    allowNull:false,
 },
 expensename:{
    type:Sequelize.STRING,
    allowNull:false,
 },
 expensetype:{
    type:Sequelize.STRING,
    allowNull:false,
 }
})
    module.exports=expense;
    