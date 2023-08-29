const router = require('express').Router();
const cookieParser = require('cookie-parser');
const Formation = require('../../Modele/formation/Formation');
const Module = require('../../Modele/formation/Module');
router.use(cookieParser());

router.get('/all_modules', async(req,res) => {
    Module.findAll({
        include: {
            model: Formation,
            attributes: ['theme','id']
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
                }
            })
        )
        console.log(module)
    }) 
})

module.exports = router;
