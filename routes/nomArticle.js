const express = require('express');
const router = express.Router();
const nomArticle= require("../services/nomArticle");

/* GET NomArticle */
router.get('/', async function(req, res, next) {
  try {
    res.json(await nomArticle.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting NomArticle`, err.message);
    next(err);
  }
});

/* GET NomArticle spécifique*/
router.get('/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await nomArticle.getOne({fk_idArticle : req.params.id, fk_idLangue: req.params.lang}));
  } catch (err) {
    console.error(`Error while getting NomArticle`, err.message);
    next(err);
  }
});

/* POST Theme */
router.post('/', async function(req, res, next) {
  try {
    res.json(await nomArticle.create(req.body));
  } catch (err) {
    console.error(`Error while creating NomArticle`, err.message);
    next(err);
  }
});

/* PUT NomArticle */
router.put('/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await nomArticle.update({fk_idArticle : req.params.id, fk_idLangue: req.params.lang}, req.body));
  } catch (err) {
    console.error(`Error while updating NomArticle`, err.message);
    next(err);
  }
});

/* DELETE NomArticle */
router.delete('/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await nomArticle.remove({fk_idArticle : req.params.id, fk_idLangue: req.params.lang}));
  } catch (err) {
    console.error(`Error while deleting NomArticle`, err.message);
    next(err);
  }
});

module.exports = router;