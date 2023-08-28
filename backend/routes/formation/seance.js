const router = require('express').Router();
const cookieParser = require('cookie-parser');
const Formation = require('../../Modele/formation/Formation');
const Module = require('../../Modele/formation/Module');
const Seance = require('../../Modele/formation/Seance');
router.use(cookieParser());

router.get('/all_seances', async (req, res) => {
    Seance.findAll({
        include: [
            {
                model: Formation,
                attributes: ['theme']
            },
            {
                model: Module,
                attributes: ['titreModule']
            }
        ]
    })
    .then((seances) => {
        const formattedSeances = seances.map((seance) => {
            return {
                date: seance.date,
                heureentree: seance.heureStart,
                heuresortie: seance.heureEnd,
                places: seance.nombreDePlaces,
                formation: seance.Formation.theme,
                module: seance.Module.titreModule
            };
        });

        res.status(200).json(formattedSeances);
        console.log(formattedSeances);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des séances.' });
    });
});

module.exports = router;
