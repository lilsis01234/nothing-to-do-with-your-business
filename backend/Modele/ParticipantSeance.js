const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const Collaborateur = require('./Collaborateur');
const Seance = require('./Seance');

class ParticipantSeance extends Model {}

ParticipantSeance.init(
  {
    // Colonnes de liaison
    seance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ParticipantSeance',
  }
);

ParticipantSeance.belongsTo(Seance, {
    foreignKey: 'seance',
});
ParticipantSeance.belongsTo(Collaborateur, {
    foreignKey: 'participant',
});
  
module.exports = ParticipantSeance;
