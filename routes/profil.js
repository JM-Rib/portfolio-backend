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
    console.log(req.body);
    if(
        !isNaN(req.body.nomProfil) 
      || !isNaN(req.body.prenomProfil) 
      || !isNaN(req.body.linkedin) 
      || !isNaN(req.body.github) 
    ){
      let erreurChiffre = new Error("Un des champs est mal renseigné");
      erreurChiffre.name = "erreurChiffre";
      throw erreurChiffre;
    }
    res.json(await profil.create(req.body));
  } catch (err) {
    if(err.name === "estUnChiffre") {
      res.status(500).json({message: err.message})
    } else if(err.code === "23502" && (err.column === "nomprofil" || err.column === "prenomprofil") ) {
      res.status(500).json({message: "Un des champs est manquant, veuillez re-vérifier"})
    } else {
      console.error(`Error while creating Profil`, err.message);
      next(err);
    }
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