const express = require('express');
const router = express.Router();
const projet = require("../services/projet");

/* GET Projet */
router.get('/', async function(req, res, next) {
  try {
    res.json(await projet.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Projet`, err.message);
    next(err);
  }
});

/* GET Projet spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await projet.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting Projet`, err.message);
    next(err);
  }
});

/* POST Projet */
router.post('/', async function(req, res, next) {
  try {
    res.json(await projet.create(req.body));
  } catch (err) {
    console.error(`Error while creating Projet`, err.message);
    next(err);
  }
});

/* PUT Projet */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await projet.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Projet`, err.message);
    next(err);
  }
});

/* DELETE Projet */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await projet.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Projet`, err.message);
    next(err);
  }
});

module.exports = router;