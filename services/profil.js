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
    `SELECT * FROM Profil WHERE pk_idProfil=?`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(profil){
  const result = await db.query(
    `INSERT INTO Profil (nomProfil, prenomProfil, linkedin, github) VALUES (?, ?, ?, ?)`,
    [profil.nomProfil, profil.prenomProfil, profil.linkedin, profil.github]
  );

  let message = 'Error in creating profil';

  if (result.affectedRows) {
    message = 'profil created successfully';
  }

  return {message};
}

async function update(id, profil){
  const result = await db.query(
    `UPDATE Profil SET Profil.pk_idProfil=?, Profil.nomProfil=?, Profil.prenomProfil=?, Profil.linkedin=?, Profil.github=? WHERE Profil.pk_idProfil = ?;`,
    [profil.pk_idProfil, profil.nomProfil, profil.prenomProfil, profil.linkedin, profil.github, id] 
  );

  let message = 'Error in updating profil';

  if (result.affectedRows) {
    message = 'profil updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Profil WHERE pk_idProfil=?`,
    [id]
  );

  let message = 'Error in deleting profil';

  if (result.affectedRows) {
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