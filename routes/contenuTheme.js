const express = require('express');
const router = express.Router();
const contenuTheme= require("../services/contenuTheme");

/* GET ContenuTheme */
router.get('/', async function(req, res, next) {
  try {
    res.json(await contenuTheme.getMultiple(req.query.page));
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

/* POST Theme */
router.post('/', async function(req, res, next) {
  try {
    res.json(await contenuTheme.create(req.body));
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