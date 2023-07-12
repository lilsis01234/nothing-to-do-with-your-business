const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste');


const router = require('express').Router();


//Ajouter un nouveau département
router.post('/add', async(req, res) => {
    try {
      const newDepartement = await Departement.create({
          nomDepartement : req.body.nomDepartement,
      });
      const savedDepartement = await newDepartement.save()
      res.status(201).json(savedDepartement);
    }
    catch (error){
        console.error('Erreur lors de la création d\'un département :', error);
        res.status(500).json({message :  'Erreur lors de la création de l\'utilisateur'});
    }
})

//Afficher les listes des départements
router.get('/all_departement', async(req, res) => {
    try {
        const listDepartement = await Departement.findAll();
        res.status(201).json(listDepartement);
    }
    catch (error){
        console.error('Erreur lors de la génération du liste des département :', error);
        res.status(500).json({message : 'Erreur lors de génération du liste de l\'utilisateur'});
    }
})


//Afficher seuleument un département
router.get('/:id', async(req, res) =>{
    const {id} = req.params;
    try {
        const departement = await Departement.findByPk(id);
        if (!departement ) {
            return res.status(404).json({error : 'Departement introuvable'});
        }
        res.json({departement});
    } catch (err) {
        console.error('Erreur lors de la récupération du département:', error);
        res.status(500).json({error : 'Erreur lors de la récupération du département'});
    }
})

//Mettre à jour les enregistrements existant 
router.put('/:id', async(req, res) => {
    if (req.body.id === req.params.id){
        const updateDepartement = await Departement.findByPk(req.params.id)
        if (!updateDepartement){
            return res.status(400).json({error : 'Département non trouvé'})
        }

        if(req.body.nomDepartement){
            updateDepartement.nomDepartement = req.body.nomDepartement;
        }


        await updateDepartement.save();
        res.status(200).json({message : 'Mise à jour du département réussie'});
    }
    else {
        res.status(401).json({message : 'Vous ne pouvez pas modifier ce département'});
    }

})


//Effacer un département
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const deleteDepartement = await Departement.findByPk(id);
        if (!deleteDepartement){
            return res.status(404).json({error : 'Departement introuvable'});
        }
        await Poste.destroy({
            where : {
                departement : id
            }
        })
        await deleteDepartement.destroy();
        res.sendStatus(204);
    } 
    catch (error){
        console.error('Erreur lors de la suppression du département: ', error)
        res.status(500).json({error : 'Erreur lors de la suppression du département'})
    }
})


module.exports = router;