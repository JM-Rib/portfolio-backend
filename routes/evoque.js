const express = require('express');
const router = express.Router();
const evoque = require("../services/evoque");

/* GET evoque */
router.get('/', async function(req, res, next) {
  try {
    res.json(await evoque.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting evoque`, err.message);
    next(err);
  }
});

/* GET evoque spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await evoque.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting evoque`, err.message);
    next(err);
  }
});

/* POST evoque */
router.post('/', async function(req, res, next) {
  try {
    res.json(await evoque.create(req.body));
  } catch (err) {
    console.error(`Error while creating evoque`, err.message);
    next(err);
  }
});

/* PUT evoque */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await evoque.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating evoque`, err.message);
    next(err);
  }
});

/* DELETE evoque */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await evoque.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting evoque`, err.message);
    next(err);
  }
});

module.exports = router;