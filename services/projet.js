const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM Projet`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM Projet WHERE pk_idProjet=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(projet){
  const result = await db.query(
    `INSERT INTO Projet (nomProjet, dateDebutProjet, dateDerniereMaj, idGithub, lienHosting) VALUES ($1, $2, $3, $4, $5)`,
    [projet.nomProjet, projet.dateDebutProjet, projet.dateDerniereMaj, projet.idGithub, projet.lienHosting]
  );

  let message = 'Error in creating projet';

  if (result) {
    message = 'projet created successfully';
  }

  return {message};
}

async function update(id, projet){
  const result = await db.query(
    `UPDATE Projet SET Projet.pk_idProjet=$1, Projet.nomProjet=$2, Projet.dateDebutProjet=$3, Projet.dateDerniereMaj=$4, Projet.idGithub=$5, Projet.lienHosting=$6 WHERE Projet.pk_idProjet = $7;`,
    [projet.pk_idProjet, projet.nomProjet, projet.dateDebutProjet, projet.dateDerniereMaj, projet.idGithub, projet.lienHosting, id] 
  );

  let message = 'Error in updating projet';

  if (result) {
    message = 'projet updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Projet WHERE pk_idProjet=$1`,
    [id]
  );

  let message = 'Error in deleting projet';

  if (result) {
    message = 'projet deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  getOne,
  create,
  update,
  remove
}