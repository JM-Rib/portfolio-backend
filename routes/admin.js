const express = require('express');
const router = express.Router();
const admin = require("../services/admin");

const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve("routes", '../.env') }).parsed;
const JWT_SECRET = dotenv.JWT_SECRET; const JWT_EXPIRES_IN = dotenv.JWT_EXPIRES_IN;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { log } = require('console');

// /* GET Admin */
// router.get('/', async function(req, res, next) {
//   try {
//     res.json(await admin.getMultiple(req.query.page));
//   } catch (err) {
//     console.error(`Error while getting Admin`, err.message);
//     next(err);
//   }
// });
// 
/* verify token avant le get one car node confond
 la route verify avec un id d'admin */
/* GET user token Admin */
router.get('/verify/', async function(req, res, next) {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = String(req?.headers?.authorization?.replace('Bearer ', ''));
    const decoded = jwt.verify(token, JWT_SECRET);

    const result = await admin.verifyToken(decoded);

    if (!result) {
      res.status(400).json(defaultReturnObject);
    }
    delete result.mdp;
    res.status(200).json({ authenticated: true, user: result });
  } catch (err) {
    console.error(`Error while logging in`, err.message);
    res.status(400).send({ error: true, message: err.message });
  }
});
 
// /* GET Admin spécifique*/
// router.get('/:id', async function(req, res, next) {
//   try {
//     res.json(await admin.getOne(req.params.id));
//   } catch (err) {
//     console.error(`Error while getting Admin`, err.message);
//     next(err);
//   }
// });
// 
// /* POST Admin */
// router.post('/', async function(req, res, next) {
//   try {
//     res.json(await admin.create(req.body));
//   } catch (err) {
//     console.error(`Error while creating Admin`, err.message);
//     next(err);
//   }
// });
// 
// /* PUT Admin */
// router.put('/:id', async function(req, res, next) {
//   try {
//     res.json(await admin.update(req.params.id, req.body));
//   } catch (err) {
//     console.error(`Error while updating Admin`, err.message);
//     next(err);
//   }
// });
// 
// /* DELETE Admin */
// router.delete('/:id', async function(req, res, next) {
//   try {
//     res.json(await admin.remove(req.params.id));
//   } catch (err) {
//     console.error(`Error while deleting Admin`, err.message);
//     next(err);
//   }
// });
// 
/* Signup Admin */
router.post('/signup/', async function(req, res, next) {
  try {
    const identifiant = req.body.identifiant;
    const mdp = req.body.mdp;

    if (!identifiant || !mdp || identifiant===undefined || mdp===undefined || identifiant==='' || mdp==='' ) {
      res.status(400).end();
    }
    const hashedPassword = await bcrypt.hash(mdp, 8);
    const userData = {
      identifiant,
      mdp: hashedPassword,
    };

    const result = await admin.signup(userData);
    const token = jwt.sign({ user: result.pk_idAdmin }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({token: token});
  } catch (err) {
    console.error(`Error while signing up`, err.message);
    res.status(400).send({ error: true, message: err.message });
  }
});

/* POST login Admin */
router.post('/login/', async function(req, res, next) {
  try {
    const identifiant = req.body.identifiant;
    const mdp = req.body.mdp;

    if (!identifiant || !mdp || identifiant==='' || mdp==='' ) {
      res.status(403).end();
    }
    /* Appel bdd: */
    const result = await admin.login(req.body);

    /* on recup le mdp obtenu dans data, on le renomme, et on le compare a celui dans la base*/
    const hashedPassword = result.data[0].mdp;
    const isMatch = await bcrypt.compare(mdp, hashedPassword);
    if (!isMatch) {
      res.status(403).end();
    }
    /*les mdp correspondent, on renvoie le token correspondant a l'utilisateur:*/
    const token = jwt.sign({
        pk_idAdmin: result.data[0].pk_idAdmin,
        identifiant: result.data[0].identifiant
      },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({token: token});
  } catch (err) {
    console.error(`Error while logging in`, err.message);
    //erreur ici cf screen 17/05/2023:
    //res.status(400).send({ error: true, message: err.message });
    next(err);//regle l'erreur
  }
});

module.exports = router;