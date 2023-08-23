const {Sequelize} = require('sequelize');

//Initalisation de la base de donnée
const sequelize = new Sequelize('mysql://localhost:3306/intranettest', { 
  username : 'root', 
  password :''
})




module.exports = sequelize;