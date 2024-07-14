const express = require('express');
const router = express.Router();
const projet = require("../services/projet");
const problematique = require("../services/problematique");
const description = require("../services/description");
const collab = require("../services/collab");
const theme = require("../services/theme");
const profil = require("../services/profil");
const authenticateJWT = require('../middlewares/authMiddleware'); // Adjust the path to the middleware

/* GET Projet */
router.get('/', async function(req, res, next) {
  try {
    res.json(await projet.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Projet`, err.message);
    next(err);
  }
});

/* GET ALL Projet details */
router.get('/all&lang=:lang', async function(req, res, next) {
  try {
    res.json(await projet.getAllDetails(req.params.lang));
  } catch (err) {
    console.error(`Error while getting Projet`, err.message);
    next(err);
  }
});

/* GET Projet spécifique avec langue et collabers */
router.get('/info/:id&lang=:lang', async function(req, res, next) {
  try {
    let rep = await projet.getInfo(parseInt(req.params.id), req.params.lang);
    rep[0].collabers = await projet.getCollabers(parseInt(req.params.id));
    res.json(rep[0]);
  } catch (err) {
    console.error(`Error while getting Projet`, err.message);
    next(err);
  }
});

/* GET Projet spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await projet.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting Projet`, err.message);
    next(err);
  }
});

/* POST Projet */
router.post('/', authenticateJWT, async function(req, res, next) {
  let creation_projet;
  let fk_idProjet; 
  try {
    let index;
    let fk_idTheme;
    let fk_idProfil;
    // besoin de créer le projet pour le lier aux autres tables...
    creation_projet = await projet.create({nomProjet: req.body.nomProjet, dateDebutProjet: req.body.dateDebutProjet,dateDerniereMaj: req.body.dateDerniereMaj, idGithub: req.body.idGithub, lienHosting: req.body.lienHosting});
    fk_idProjet = creation_projet[0].pk_idprojet;
    await description.create({fk_idProjet: fk_idProjet, fk_idLangue: req.body.fk_idLangue, description: req.body.description})
    // pour chaque id de theme, creer liaisons au projet. Tout d'abord on vérifie l'existence des liens...
    let verifThemes = await theme.getMultiple().then( (r)=>{ let res=[]; r.map( (elem, j) => {res[j] = elem.pk_idtheme}); return res; } );
    for (let index = 0; index < req.body.themes.length; index++) {
      if(!verifThemes.includes(req.body.themes[index])){
        let themeNonExistant = new Error("Un des thèmes renseignés n'existe pas");
        themeNonExistant.name = "themeNonExistant";
        throw themeNonExistant;
      }
    }// creation en boucle après vérif car sinon il faudrait traquer quel id à causé l'erreur...
    for (index = 0; index < req.body.themes.length; index++) {
      fk_idTheme = req.body.themes[index];
      await problematique.create({fk_idTheme: fk_idTheme, fk_idProjet: fk_idProjet})
    }

    let verifProfils = await profil.getMultiple().then( (r)=>{ let res=[]; r.map( (elem, j) => {res[j] = elem.pk_idprofil}); return res; } );
    for (let index = 0; index < req.body.profils.length; index++) {
      if(!verifProfils.includes(req.body.profils[index])){
        let profilNonExistant = new Error("Un des profils renseignés n'existe pas");
        profilNonExistant.name = "profilNonExistant";
        throw profilNonExistant;
      }
    }
    // pour chaque id de profil, creer liaisons au projet.
    for (index = 0; index < req.body.profils.length; index++) {
      fk_idProfil = req.body.profils[index];
      await collab.create({fk_idProjet: fk_idProjet, fk_idProfil: fk_idProfil })
    }
    res.json({message: "Ajout du projet réussi"});
  } catch (err) {
    console.log(err, "=============");
    if(err.name === "themeNonExistant"){
      description.remove({fk_idProjet: fk_idProjet, fk_idLangue: req.body.fk_idLangue});
      projet.remove(fk_idProjet);
      res.status(500).json({message: err.message});      
    } else if(err.name === "profilNonExistant"){
      for (index = 0; index < req.body.themes.length; index++) {
        fk_idTheme = req.body.themes[index];
        await problematique.remove({fk_idTheme: fk_idTheme, fk_idProjet: fk_idProjet})
      }
      description.remove({fk_idProjet: fk_idProjet, fk_idLangue: req.body.fk_idLangue});
      projet.remove(fk_idProjet);
      res.status(500).json({message: err.message});      
    } else {
      console.error(`Error while creating Projet`, err.message);
      next(err);
    }
  }
});

/* PUT Projet */
router.put('/:id', authenticateJWT, async function(req, res, next) {
  try {
    if(req.body.fk_idLangue === undefined || req.body.pk_idProjet === undefined){
      let idmissing = new Error("Identifiant non renseigné");
      idmissing.name = "idmissing";      
      throw idmissing;
    }
    if(isNan(req.body.fk_idLangue) || isNaN(req.body.pk_idProjet)){
      let idnan = new Error("Identifiant au mauvais format");
      idnan.name = "idnan";      
      throw idnan;
    }
    await projet.update(req.params.id, {fk_idProjet: req.body.fk_idProjet, nomProjet: req.body.nomProjet, dateDebutProjet: req.body.dateDebutProjet, dateDerniereMaj: req.body.dateDerniereMaj, idGithub: req.body.idGithub, lienHosting: req.body.lienHosting});
    res.json(await description.update({fk_idProjet: req.params.id, fk_idLangue: req.body.fk_idLangue}, {fk_idProjet: req.body.pk_idProjet, fk_idLangue: req.body.fk_idLangue, description: req.body.description}));
  } catch (err) {
    if(err.name === "idmissing"){
      res.status(500).json({message: err.message});
    if(err.name === "idnan"){
      res.status(500).json({message: err.message});
    } else {
      console.error(`Error while updating Projet`, err.message);
      next(err);
    }
  }
}
});

/* DELETE Projet */
router.delete('/:id', authenticateJWT, async function(req, res, next) {
  try {
    await collab.removeProjectTies(req.params.id);
    await problematique.removeProjectTies(req.params.id);
    await description.removeProjectTies(req.params.id);
    await projet.remove(req.params.id);
    res.status(200).json({message: "Projet supprimé avec succès"});      
  } catch (err) {
    console.error(`Error while deleting Projet`, err.message);
    next(err);
  }
});

module.exports = router;