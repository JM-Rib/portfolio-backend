const express = require('express');
const router = express.Router();
const theme = require("../services/theme");

/* GET Theme */
router.get('/', async function(req, res, next) {
  try {
    res.json(await theme.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Theme`, err.message);
    next(err);
  }
});

/* GET Theme spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await theme.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting Theme`, err.message);
    next(err);
  }
});

/* POST Theme */
router.post('/', async function(req, res, next) {
  try {
    res.json(await theme.create());
  } catch (err) {
    console.error(`Error while creating Theme`, err.message);
    next(err);
  }
});

/* PUT Theme */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await theme.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Theme`, err.message);
    next(err);
  }
});

/* DELETE Theme */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await theme.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Theme`, err.message);
    next(err);
  }
});

module.exports = router;