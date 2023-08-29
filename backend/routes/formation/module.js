const router = require('express').Router();
const cookieParser = require('cookie-parser');
const Formation = require('../../Modele/formation/Formation');
const Module = require('../../Modele/formation/Module');
const Collaborateur = require('../../Modele/Collaborateur');
router.use(cookieParser());

router.get('/all_modules', async(req,res) => {
    Module.findAll({
        include: {
            model: Formation,
            attributes: ['theme','id'],
            include:{
                model:Collaborateur,
                attributes:['nom','prenom'],
            }
        },
    })
    .then((module) => {
        res.status(200).json(
            module.map((module) => {
                return {
                    nom : module.titreModule,
                    theme : module.theme,
                    description : module.description,
                    formation: module.Formation.theme,
                    idFormation: module.Formation.id,
                    nomOrganisateur: module.Formation.Collaborateur.nom,
                    prenomOrganisateur: module.Formation.Collaborateur.prenom,
                }
            })
        )
        console.log(module)
    }) 
})

module.exports = router;
