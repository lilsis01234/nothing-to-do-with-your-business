const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');


const ParticipantsSeance = sequelize.define('ParticipantsSeance', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true, 
        allowNull : false,
    },
    online:{
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    }
    // participant: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false, // Selon votre structure
    // },
}, {
  timestamps : false  
})

module.exports = ParticipantsSeance;