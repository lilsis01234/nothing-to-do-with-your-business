const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');

class DiscussionFormation extends model{}

DiscussionFormation.init({
    sujet:{
        type:DataTypes.STRING(500),
        allowNull: false
    },
    contenu:{
        type:DataTypes.STRING(500),
        allowNull: false
    },
    fichier:{
        type:DataTypes.STRING(500),
        allowNull:true
    },
    formation:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Formation,
        key : 'id'
    }
}},{
    sequelize,
    modelName:'DiscussionFormation'
}
)

Module.exports = DiscussionFormation;