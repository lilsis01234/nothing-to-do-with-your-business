const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/Collaborateur');

router.get('/all_demandes_formations', async(req,res) => {
    Formation.findAll({
        include: {
            model: Collaborateur,
            attributes: ['nom', 'prenom']
        },
        where: {
            approbation: 0 
        }

    })
    .then((formation) => {
        res.status(200).json(
            formation.map((formation) => {
                return {
                    id : formation.id,
                    theme : formation.theme,
                    description : formation.description,
                    duree : formation.duree,
                    approbation : formation.approbation,
                    nomformateur: formation.Collaborateur.nom,
                    prenomformateur: formation.Collaborateur.prenom,
                }
            })
        )
        console.log(formation)
    }) 
})


router.get('/all_formations', async(req,res) => {
    Formation.findAll({
        include: {
            model: Collaborateur,
            attributes: ['nom', 'prenom']
        },
        where: {
            approbation: 1 
        }

    })
    .then((formation) => {
        res.status(200).json(
            formation.map((formation) => {
                return {
                    id : formation.id,
                    theme : formation.theme,
                    description : formation.description,
                    duree : formation.duree,
                    approbation : formation.approbation,
                    nomformateur: formation.Collaborateur.nom,
                    prenomformateur: formation.Collaborateur.prenom,
                }
            })
        )
        console.log(formation)
    }) 
})

module.exports = router;