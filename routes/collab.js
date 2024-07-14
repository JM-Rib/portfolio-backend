const express = require('express');
const router = express.Router();
const collab = require("../services/collab");
const authenticateJWT = require('../middlewares/authMiddleware'); // Adjust the path to the middleware

/* GET collab */
router.get('/', async function(req, res, next) {
  try {
    res.json(await collab.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting collab`, err.message);
    next(err);
  }
});

/* GET collab spécifique*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await collab.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting collab`, err.message);
    next(err);
  }
});

/* POST collab */
router.post('/', authenticateJWT, async function(req, res, next) {
  try {
    res.json(await collab.create(req.body));
  } catch (err) {
    console.error(`Error while creating collab`, err.message);
    next(err);
  }
});

/* PUT collab */
router.put('/:id', authenticateJWT, async function(req, res, next) {
  try {
    res.json(await collab.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating collab`, err.message);
    next(err);
  }
});

/* DELETE collab */
router.delete('/:id', authenticateJWT, async function(req, res, next) {
  try {
    res.json(await collab.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting collab`, err.message);
    next(err);
  }
});

module.exports = router;