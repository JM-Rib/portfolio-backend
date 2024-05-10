const express = require('express');
const router = express.Router();
const projet = require("../services/projet");
const problematique = require("../services/problematique");
const description = require("../services/description");

/* GET Projet */
router.get('/', async function(req, res, next) {
  try {
    res.json(await projet.getMultiple(req.query.page));
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
router.post('/', async function(req, res, next) {
  try {
    let index;
    let fk_idTheme;
    let fk_idProfil;
    let fk_idProjet; // besoin de créer le projet pour le lier aux autres tables...
    let creation_projet = await req.body.create({nomProjet: req.body.nomProjet, dateDebutProjet: req.body.dateDebutProjet,dateDerniereMaj: req.body.dateDerniereMaj, idGithub: req.body.idGithub, lienHosting: req.body.lienHosting});
    fk_idProjet = creation_projet.result[0].pk_idProjet;

    await description.create({fk_idProjet: fk_idProjet, fk_idLangue: req.body.fk_idLangue, description: req.body.description})
    // pour chaque id de theme, creer liaisons au projet.
    for (index = 0; index < req.body.themes.length; index++) {
      fk_idTheme = req.body.themes[index];
      await problematique.create({fk_idTheme: fk_idTheme, fk_idProjet: fk_idProjet})
    }
    // pour chaque id de profil, creer liaisons au projet.
    for (index = 0; index < req.body.profils.length; index++) {
      fk_idProfil = req.body.profils[index];
      await collab.create({fk_idProjet: fk_idProjet, fk_idProfil: fk_idProfil })
    }
    res.json({message: "Ajout du projet réussi"});
  } catch (err) {
    console.log(err, "=============");
    console.error(`Error while creating Projet`, err.message);
    next(err);
  }
});

/* PUT Projet */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await projet.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Projet`, err.message);
    next(err);
  }
});

/* DELETE Projet */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await projet.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Projet`, err.message);
    next(err);
  }
});

module.exports = router;