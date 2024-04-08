const express = require('express');
const router = express.Router();
const media = require("../services/media");

/* GET Media */
router.get('/', async function(req, res, next) {
  try {
    res.json(await media.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Media`, err.message);
    next(err);
  }
});

/* GET Media spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await media.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting Media`, err.message);
    next(err);
  }
});

/* POST Media */
router.post('/', async function(req, res, next) {
  try {
    res.json(await media.create(req.body));
  } catch (err) {
    console.error(`Error while creating Media`, err.message);
    next(err);
  }
});

/* PUT Media */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await media.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Media`, err.message);
    next(err);
  }
});

/* DELETE Media */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await media.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Media`, err.message);
    next(err);
  }
});

module.exports = router;