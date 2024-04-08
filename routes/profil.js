const express = require('express');
const router = express.Router();
const profil = require("../services/profil");

/* GET Profil */
router.get('/', async function(req, res, next) {
  try {
    res.json(await profil.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Profil`, err.message);
    next(err);
  }
});

/* GET Profil spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await profil.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting Profil`, err.message);
    next(err);
  }
});

/* POST Profil */
router.post('/', async function(req, res, next) {
  try {
    res.json(await profil.create(req.body));
  } catch (err) {
    console.error(`Error while creating Profil`, err.message);
    next(err);
  }
});

/* PUT Profil */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await profil.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Profil`, err.message);
    next(err);
  }
});

/* DELETE Profil */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await profil.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Profil`, err.message);
    next(err);
  }
});

module.exports = router;