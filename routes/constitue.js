const express = require('express');
const router = express.Router();
const constitue = require("../services/constitue");

/* GET constitue */
router.get('/', async function(req, res, next) {
  try {
    res.json(await constitue.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting constitue`, err.message);
    next(err);
  }
});

/* GET constitue spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await constitue.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting constitue`, err.message);
    next(err);
  }
});

/* POST constitue */
router.post('/', async function(req, res, next) {
  try {
    res.json(await constitue.create(req.body));
  } catch (err) {
    console.error(`Error while creating constitue`, err.message);
    next(err);
  }
});

/* PUT constitue */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await constitue.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating constitue`, err.message);
    next(err);
  }
});

/* DELETE constitue */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await constitue.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting constitue`, err.message);
    next(err);
  }
});

module.exports = router;