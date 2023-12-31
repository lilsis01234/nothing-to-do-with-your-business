const express = require('express');
//const mysql = require('mysql');
const sequelize = require('./database/database');
const cors = require('cors');
const path = require('path');


const app = express();
const departementRouter = require('./routes/departement');
const posteRouter = require('./routes/postes');
const collabRouter = require('./routes/collaborateur');
const compte_collab = require('./routes/compteCollab');
const login = require('./routes/auth');
const role = require('./routes/role');
const api_config = require('./config/api_config');
const password = require('./routes/motdepasseOublie');
const archive = require('./routes/archiveCollab')
const userProfile = require('./routes/userProfile');
const formations = require('./routes/formation/formation');
const modules = require('./routes/formation/module')
const seances = require('./routes/formation/seance')

//importation des configurations$
const dotenv = require('dotenv');
// const auth_config = require('./config/auth_config');

require('./config/passwordResetConfig')
dotenv.config();
// auth_config();

/*
const connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root',
    password : '',
    database : 'testintranet',
})
*/
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//Ajout de middleware express.json()
app.use(express.json())



app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//utilisation des routes middleware
app.use('/api', api_config) //route pour la configuration 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/departement', departementRouter); //route pour le département
app.use('/api/poste', posteRouter ); // route pour le router
app.use('/api/collaborateur', collabRouter); //route pour les collaborateurs
app.use('/api/compte_collaborateur', compte_collab) ; //route pour les comptes collaborateurs
app.use('/api/auth', login); //route pour l'authentification
app.use('/api/role', role); //route pour les rôles
app.use('/api/password', password ); //route pour les mot de passe
app.use('/api/archive', archive); //route pour archiver les collaborateurs 
app.use('/api/user', userProfile); //route pour afficher les profiles des collaborateurs 
app.use('/api/formation',formations);
app.use('/api/module',modules);
app.use('/api/seance',seances);


//Connection à la base de donnée MySQL
sequelize.authenticate()
    .then(() => {
        console.log('Connecté à la base de données MySQL');
    })
    .catch((err) =>{
        console.error('Erreur à la connexion à la base de donnes:', err)
    })
    

/*
connection.connect((err) =>{
    if (err){
        console.log('Erreur de connexion à la base de donnée', err)
    }
    else {
        console.log('Connexion à la base de donnée réussie')
    }
})*/


//Initialisation du serveur
app.listen(8000, () => {
    console.log('Serveur Express en écoute sur le port 8000')
});
