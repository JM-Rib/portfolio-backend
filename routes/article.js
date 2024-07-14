const express = require('express');
const router = express.Router();
const article = require("../services/article");
const authenticateJWT = require('../middlewares/authMiddleware'); // Adjust the path to the middleware

/* GET Article */
router.get('/', async function(req, res, next) {
  try {
    res.json(await article.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Article`, err.message);
    next(err);
  }
});

/* GET Article spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await article.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting Article`, err.message);
    next(err);
  }
});

/* POST Article */
router.post('/',authenticateJWT, async function(req, res, next) {
  try {
    res.json(await article.create(req.body));
  } catch (err) {
    console.error(`Error while creating Article`, err.message);
    next(err);
  }
});

/* PUT Article */
router.put('/:id',authenticateJWT, async function(req, res, next) {
  try {
    res.json(await article.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Article`, err.message);
    next(err);
  }
});

/* DELETE Article */
router.delete('/:id',authenticateJWT, async function(req, res, next) {
  try {
    res.json(await article.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Article`, err.message);
    next(err);
  }
});

module.exports = router;