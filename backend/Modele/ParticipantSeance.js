const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');

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

module.exports = ParticipantSeance;
