const sequelize = require('../database/database');
const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste'); 
const Collaborateur = require ('../Modele/Collaborateur');
const CompteCollab = require('../Modele/CompteCollab');
const RoleCollab = require('../Modele/Role');
const PasswordResetRequest = require('../Modele/PasswordResetRequest');
const ArchiveCollab = require('../Modele/ArchiveCollab');
const Formation = require('../Modele/Formation');
const CommentaireFormation = require('../Modele/CommentaireFormation');
const DiscussionFormation= require('../Modele/discussionFormation');
const Module = require('../Modele/Module');
const Seance = require('../Modele/Seance');
const ParticipantsSeance = require('../Modele/ParticipantsSeance');

const association = require('../Modele/associationSeanceCollab');

//Synchronisation de la base de donnée 
async function syncDatabase(){
    try{
        await sequelize.sync({force : true}); 
        const { Seance, Collaborateur, ParticipantsSeance } = association;

        Collaborateur.belongsToMany(Seance, { through: ParticipantsSeance });
        Seance.belongsToMany(Collaborateur, { through: ParticipantsSeance });
        console.log('La base de donnée est synchronisée avec succès')
    }  catch (error){
        console.error('Erreur lors de la synchronisation de la base de données :', error )
    } finally {
        sequelize.close();
    }
}

syncDatabase();