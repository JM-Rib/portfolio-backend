const express = require('express');
const router = express.Router();
const collab = require("../services/collab");
const authenticateJWT = require('../middlewares/authMiddleware'); // Adjust the path to the middleware

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
    // res.json(await collab.update(req.params.id, req.body));
    // delete links, re-create links
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