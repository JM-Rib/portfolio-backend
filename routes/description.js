const express = require('express');
const router = express.Router();
const description = require("../services/description");

/* GET Description */
router.get('/', async function(req, res, next) {
  try {
    res.json(await description.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Description`, err.message);
    next(err);
  }
});

/* GET Description spécifique*/
router.get('/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await description.getOne({fk_idProjet: req.params.id, fk_idLang: req.params.lang}));
  } catch (err) {
    console.error(`Error while getting Description`, err.message);
    next(err);
  }
});

/* POST Description */
router.post('/', async function(req, res, next) {
  try {
    res.json(await description.create(req.body));
  } catch (err) {
    console.error(`Error while creating Description`, err.message);
    next(err);
  }
});

/* PUT Description */
router.put('/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await description.update({fk_idProjet: req.params.id, fk_idLang: req.params.lang}, req.body));
  } catch (err) {
    console.error(`Error while updating Description`, err.message);
    next(err);
  }
});

/* DELETE Description */
router.delete('/:id&lang=:lang', async function(req, res, next) {
  try {
    res.json(await description.remove({fk_idProjet: req.params.id, fk_idLang: req.params.lang}));
  } catch (err) {
    console.error(`Error while deleting Description`, err.message);
    next(err);
  }
});

module.exports = router;