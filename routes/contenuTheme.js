const express = require('express');
const router = express.Router();
const theme= require("../services/theme");
const contenuTheme= require("../services/contenuTheme");
const { create } = require('../services/profil');

/* GET ContenuTheme */
router.get('/', async function(req, res, next) {
  try {
    res.json(await contenuTheme.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting ContenuTheme`, err.message);
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
router.post('/&lang=:lang', async function(req, res, next) {
  try {
    // creation theme de l'id:
    let rep_creation_id = await theme.create();
    // creation liason
    res.json(await contenuTheme.create({fk_idTheme: rep_creation_id.result[0].pk_idtheme, fk_idLangue: req.params.lang, contenuTheme: req.body.contenuTheme}));
    // gestion erreur si langue n'existe pas
  } catch (err) {
    console.error(`Error while creating ContenuTheme`, err.message);
    next(err);
  }
});

/* POST ContenuTheme Translation (liaison avec un thème existant) */
router.post('/traduction/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await contenuTheme.create({fk_idTheme: req.params.id, fk_idLangue: req.params.lang, contenuTheme: req.body.contenuTheme}));
  } catch (err) {
    console.error(`Error while creating ContenuTheme`, err.message);
    next(err);
  }
});

/* PUT ContenuTheme */
router.put('/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await contenuTheme.update({fk_idTheme : req.params.id, fk_idLangue: req.params.lang}, req.body));
  } catch (err) {
    console.error(`Error while updating ContenuTheme`, err.message);
    next(err);
  }
});

/* DELETE ContenuTheme */
router.delete('/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await contenuTheme.remove({fk_idTheme : req.params.id, fk_idLangue: req.params.lang}));
  } catch (err) {
    console.error(`Error while deleting ContenuTheme`, err.message);
    next(err);
  }
});

module.exports = router;