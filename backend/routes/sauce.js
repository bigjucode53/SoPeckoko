/*LOGIQUE ROUTE POUR CE QUI CONCERNE LES REQUETES SUR LES SAUCES */

const express = require('express');
const router = express.Router();//Création d'un router Express qui contient toutes les routes des requêtes "Sauces"

const sauceCtrl = require('../controllers/sauce');//Importation du controller
const auth = require('../middleware/auth');//Importation du middleware d'autorisation pour protéger les routes
const multer = require('../middleware/multer-config');//Importation du multer pour le téléchargement d'images/de fichiers

router.post('/', auth, multer, sauceCtrl.createSauce);//Requête POST pour enregistrer une nouvelle sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);//Requête PUT pour modifier une sauce en particulier
router.delete('/:id', auth, sauceCtrl.deleteSauce);//Requête DELETE pour supprimer une sauce en particulier
router.get('/:id', auth, sauceCtrl.getOneSauce);//Requête GET pour récupérer une sauce en particulier
router.get('/', auth, sauceCtrl.getAllSauces);//Requête GET pour récupérer la liste des sauces


module.exports = router;//Exportation du router

//Requête POST pour enregistrer un like/disklike
router.post("/:id/like", auth, sauceCtrl.likeSauce);


