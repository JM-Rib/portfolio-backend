const express = require('express');
const router = express.Router();
const problematique = require("../services/problematique");
const authenticateJWT = require('../middlewares/authMiddleware'); // Adjust the path to the middleware

/* GET problematique spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await problematique.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting problematique`, err.message);
    next(err);
  }
});

/* POST problematique */
router.post('/', authenticateJWT, async function(req, res, next) {
  try {
    res.json(await problematique.create(req.body));
  } catch (err) {
    console.error(`Error while creating problematique`, err.message);
    next(err);
  }
});

/* PUT problematique */
router.put('/:id',authenticateJWT, async function(req, res, next) {
  try {
    res.json(await problematique.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating problematique`, err.message);
    next(err);
  }
});

/* DELETE problematique */
router.delete('/:id',authenticateJWT, async function(req, res, next) {
  try {
    res.json(await problematique.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting problematique`, err.message);
    next(err);
  }
});

module.exports = router;