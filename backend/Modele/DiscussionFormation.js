const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');
const Collaborateur = require('./Collaborateur');

class DiscussionFormation extends Model{}

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
    }},
    collaborateur:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Collaborateur,
        key : 'id'
    }
}},{
    sequelize,
    modelName:'DiscussionFormation'
}
)

Module.belongsTo(Formation, {
    foreignKey : 'formation',
    onDelete : 'CASCADE'
})

Module.exports = DiscussionFormation;