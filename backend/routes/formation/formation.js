const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/Collaborateur');
const { Module } = require('module');
const Seance = require('../../Modele/formation/Seance');

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

router.post('/approuver/:id', async (req, res) => {
    const formationId = req.params.id;
    
    try {
        const updatedFormation = await Formation.update(
            { approbation: 1 },
            { where: { id: formationId } }
        );

        if (updatedFormation[0] === 0) {
            return res.status(404).json({ message: "Formation not found." });
        }

        return res.status(200).json({ message: "Formation approved successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while approving the formation." });
    }
});

router.post('/annulerapprobation/:id', async (req, res) => {
    const formationId = req.params.id;
    try {
        const updatedFormation = await Formation.update(
            { approbation: 0 },
            { where: { id: formationId } }
        );

        if (updatedFormation[0] === 0) {
            return res.status(404).json({ message: "Formation not found." });
        }

        return res.status(200).json({ message: "Formation approved successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while approving the formation." });
    }
});

router.delete('/desapprouver/:id', async (req, res) => {
    const {id} = req.params;
    try { 
        const deleteFormation = await Formation.findByPk(id);
        if (!deleteFormation) {
            return res.status(404).json({error : 'Formation introuvable'});
        }
        await deleteFormation.destroy();
        res.sendStatus(204);
        // const deletedModule = await Module.findAll({
        //     where:{
        //         formation: id
        //     },
        // })
        // await deletedModule.destroy();
        
        // const deletedSeance = await Seance.findAll({
        //     where:{
        //         formation:1
        //     }
        // })
        // await deletedSeance.destroy();
    }
    catch (error){
        console.error('Erreur lors de la suppréssion :', error)
        res.status(500).json({message : 'Erreur lors de la suppression du'})
    }
});

router.get('/formations/:idPersonne',async(req,res)=>{
    const idPersonne = req.params.idPersonne;
    Formation.findAll({
        where: {
            formateur: idPersonne ,
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
                }
            })
        )
        console.log(formation)
    }) 
})

router.post('/addFormation',async(req,res)=>{
    try{
        const newFormation = await(Formation.create({
            theme:req.body.theme,
            description:req.body.description,
            duree:req.body.duree,
            formateur:req.body.formateur,
            approbation:0
        }))
        const demandeFormation = await newFormation.save();
        res.status(201).json(demandeFormation);
    }
    catch(err){
        console.error(err)
    }

})

module.exports = router;