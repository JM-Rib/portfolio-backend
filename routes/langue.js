const express = require('express');
const router = express.Router();
const langue = require("../services/langue");
const authenticateJWT = require('../middlewares/authMiddleware'); // Adjust the path to the middleware

/* GET Langue */
router.get('/', async function(req, res, next) {
  try {
    res.json(await langue.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Langue`, err.message);
    next(err);
  }
});

/* GET Langue spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await langue.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting Langue`, err.message);
    next(err);
  }
});

/* POST Langue */
router.post('/', authenticateJWT, async function(req, res, next) {
  try {
    res.json(await langue.create(req.body));
  } catch (err) {
    console.error(`Error while creating Langue`, err.message);
    next(err);
  }
});

/* PUT Langue */
router.put('/:id', authenticateJWT, async function(req, res, next) {
  try {
    res.json(await langue.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Langue`, err.message);
    next(err);
  }
});

/* DELETE Langue */
router.delete('/:id', authenticateJWT, async function(req, res, next) {
  try {
    res.json(await langue.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Langue`, err.message);
    next(err);
  }
});

module.exports = router;