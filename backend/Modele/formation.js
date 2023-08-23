const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');

class Formation extends Model{}

Formation.init({
    theme:{
        type : DataTypes.STRING(50), 
        allowNull : false, 
    },
    description:{
        type : DataTypes.STRING(500), 
        allowNull : false, 
    },
    duree:{
        type : DataTypes.STRING(8), 
        allowNull : false,
    },
    approbation:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }},{
        sequelize,
        modelName : 'Formation'
    })


module.exports = Formation;