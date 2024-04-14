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
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await description.getOne(req.params.id));
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
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await description.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Description`, err.message);
    next(err);
  }
});

/* DELETE Description */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await description.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Description`, err.message);
    next(err);
  }
});

module.exports = router;