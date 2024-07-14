const express = require('express');
const router = express.Router();
const paragraphe= require("../services/paragraphe");
const authenticateJWT = require('../middlewares/authMiddleware'); // Adjust the path to the middleware

/* GET Paragraphe */
router.get('/', async function(req, res, next) {
  try {
    res.json(await paragraphe.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Paragraphe`, err.message);
    next(err);
  }
});

/* GET Paragraphe spécifique*/
router.get('/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await paragraphe.getOne({fk_idConstitue : req.params.id, fk_idLangue: req.params.lang}));
  } catch (err) {
    console.error(`Error while getting Paragraphe`, err.message);
    next(err);
  }
});

/* POST Theme */
router.post('/', authenticateJWT, async function(req, res, next) {
  try {
    res.json(await paragraphe.create(req.body));
  } catch (err) {
    console.error(`Error while creating Paragraphe`, err.message);
    next(err);
  }
});

/* PUT Paragraphe */
router.put('/:id&lang=:lang',authenticateJWT, async function(req, res, next) {
  try {
    res.json(await paragraphe.update({fk_idConstitue : req.params.id, fk_idLangue: req.params.lang}, req.body));
  } catch (err) {
    console.error(`Error while updating Paragraphe`, err.message);
    next(err);
  }
});

/* DELETE Paragraphe */
router.delete('/:id&lang=:lang',authenticateJWT, async function(req, res, next) {
  try {
    res.json(await paragraphe.remove({fk_idConstitue : req.params.id, fk_idLangue: req.params.lang}));
  } catch (err) {
    console.error(`Error while deleting Paragraphe`, err.message);
    next(err);
  }
});

module.exports = router;