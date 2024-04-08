const express = require('express');
const router = express.Router();
const paragraphe = require("../services/paragraphe");

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
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await paragraphe.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting Paragraphe`, err.message);
    next(err);
  }
});

/* POST Paragraphe */
router.post('/', async function(req, res, next) {
  try {
    res.json(await paragraphe.create(req.body));
  } catch (err) {
    console.error(`Error while creating Paragraphe`, err.message);
    next(err);
  }
});

/* PUT Paragraphe */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await paragraphe.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Paragraphe`, err.message);
    next(err);
  }
});

/* DELETE Paragraphe */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await paragraphe.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Paragraphe`, err.message);
    next(err);
  }
});

module.exports = router;