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

router.get('/modules/:formationId', async(req, res) => {
    try{
       const idFormation = req.params.formationId;

        //Rechercher le postes qui appartiennent au departement
        const formations = await Formation.findAll({
            where : {id : idFormation}
        })

        if (!formations || formations.length === 0){
            return res.status(404).json({message: 'Aucune formation trouvée pour ce module'})
        }

        //Récupérations des employés associé à ce poste
        const modules = await Module.findAll({
            where : {formation: formations.map(formation => formation.id)},
            include : {model : Formation}
        })

        res.json(modules);

    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erreur lors de la récupération des employés'})
    }
})


module.exports = router;
