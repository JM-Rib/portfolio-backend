const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM Profil`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM Profil WHERE pk_idProfil=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(profil){
  const result = await db.query(
    `INSERT INTO Profil (nomProfil, prenomProfil, linkedin, github) VALUES ($1, $2, $3, $4)`,
    [profil.nomProfil, profil.prenomProfil, profil.linkedin, profil.github]
  );

  let message = 'Error in creating profil';

  if (result) {
    message = 'profil created successfully';
  }

  return {message};
}

async function update(id, profil){
  const result = await db.query(
    `UPDATE Profil SET Profil.pk_idProfil=$1, Profil.nomProfil=$2, Profil.prenomProfil=$3, Profil.linkedin=$4, Profil.github=$5 WHERE Profil.pk_idProfil = $6;`,
    [profil.pk_idProfil, profil.nomProfil, profil.prenomProfil, profil.linkedin, profil.github, id] 
  );

  let message = 'Error in updating profil';

  if (result) {
    message = 'profil updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Profil WHERE pk_idProfil=$1`,
    [id]
  );

  let message = 'Error in deleting profil';

  if (result) {
    message = 'profil deleted successfully';
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