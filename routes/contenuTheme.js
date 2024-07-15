const express = require('express');
const router = express.Router();
const theme= require("../services/theme");
const contenuTheme= require("../services/contenuTheme");
const { create } = require('../services/profil');
const authenticateJWT = require('../middlewares/authMiddleware'); // Adjust the path to the middleware

/* GET tout les ContenuTheme d'une langue pour listing d'un dropdown */
router.get('/&lang=:lang', async function(req, res, next) {
  try {
    res.json(await contenuTheme.getMultipleSingleLang(req.params.lang));
  } catch (err) {
    console.error(`Error while getting ContenuThemes`, err.message);
    next(err);
  }
});

/* GET ContenuTheme tout languages */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await contenuTheme.getOneAllLangs(req.params.id));
  } catch (err) {
    console.error(`Error while getting ContenuTheme`, err.message);
    next(err);
  }
});

/* GET ContenuTheme spécifique*/
router.get('/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await contenuTheme.getOne({fk_idTheme : req.params.id, fk_idLangue: req.params.lang}));
  } catch (err) {
    console.error(`Error while getting ContenuTheme`, err.message);
    next(err);
  }
});

/* POST un thème qui n'existe pas encore et ne possède aucun id */
router.post('/', authenticateJWT, async function(req, res, next) {
  let rep_creation_id;
  try {
    if( !isNaN(req.body.contenuTheme) ){
      let erreurChiffre = new Error("Le libellé du thème est mal renseigné");
      erreurChiffre.name = "erreurChiffre";
      throw erreurChiffre;
    }
    // creation theme de l'id:
    rep_creation_id = await theme.create();
    // creation liason
    await contenuTheme.create({fk_idTheme: rep_creation_id.result[0].pk_idtheme, fk_idLangue: req.body.fk_idLangue, contenuTheme: req.body.contenuTheme});
    res.json({ message: "Thème crée avec succès"});
  } catch (err) {
    if(err?.code === "23503" && err?.constraint==="contenutheme_fk_idlangue_fkey" ) { // gestion erreur si langue n'existe pas
      console.error(`La langue choisie n'existe pas; Suppression du theme crée précedemment `, err.message);
      await theme.remove(rep_creation_id.result[0].pk_idtheme); // On suppr l'id du contenuTheme.
      res.status(500).json({message: "La langue choisie n'existe pas"});      
    } else if (err?.name === "erreurChiffre") {
      res.status(500).json({message: err.message});      
    } else {
      console.error(`Error while creating ContenuTheme`, err.message);
      next(err);
    }
  }
});

/* POST ContenuTheme Translation (liaison avec un thème existant) */
router.post('/traduction', authenticateJWT, async function(req, res, next) {
  try {
    if( !isNaN(req.body.contenuTheme) ){
      let erreurChiffre = new Error("Le libellé du thème est mal renseigné");
      erreurChiffre.name = "erreurChiffre";
      throw erreurChiffre;
    }
    res.json(await contenuTheme.create({fk_idTheme: req.body.fk_idTheme, fk_idLangue: req.body.fk_idLangue, contenuTheme: req.body.contenuTheme}));
  } catch (err) {
    if (err?.name === "erreurChiffre") {
      res.status(500).json({message: err.message});      
    } else if(err?.code === "23505" && err?.constraint === "contenutheme_pkey"){
      res.status(500).json({message: "Une traduction pour ce thème existe déjà dans cette langue"});      
    } else if(err?.code === "23503" && err?.constraint === "contenutheme_fk_idtheme_fkey"){
      res.status(500).json({message: "Le thème sélectionné n'existe pas"});      
    } else if(err?.code === "23503" && err?.constraint === "contenutheme_fk_idlangue_fkey"){
      res.status(500).json({message: "La langue sélectionnée n'existe pas"});      
    } else {
      console.error(`Error while creating ContenuTheme`, err.message);
      next(err);
    }
  }
});

/* PUT ContenuTheme traduction */
router.put('/:id&lang=:lang', authenticateJWT, async function(req, res, next) {
  try {
    res.json(await contenuTheme.update({fk_idTheme : req.params.id, fk_idLangue: req.params.lang}, req.body));
  } catch (err) {
    console.error(`Error while updating ContenuTheme`, err.message);
    next(err);
  }
});

/* DELETE ContenuTheme */
router.delete('/:id', authenticateJWT, async function(req, res, next) {
  try {
    await contenuTheme.removeThemeTies(req.params.id);
    res.json(await theme.remove(req.params.id));
  } catch (err) {
    res.status(500).json({message: "Erreur lors de la suppression du thème"});      
    console.error(`Error while deleting ContenuTheme`, err.message);
    next(err);
  }
});

module.exports = router;