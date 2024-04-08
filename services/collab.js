const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM collab`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM collab WHERE fk_idProjet=?`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(collab){
  const result = await db.query(
    `INSERT INTO collab (fk_idProjet, fk_idProfil) VALUES (?, ?)`,
    [collab.fk_idProjet, collab.fk_idProfil]
  );

  let message = 'Error in creating collab';

  if (result.affectedRows) {
    message = 'collab created successfully';
  }

  return {message};
}

async function update(id, collab){
  const result = await db.query(
    `UPDATE collab SET collab.fk_idProjet=?, collab.fk_idProfil=? WHERE collab.fk_idProjet = ?;`,
    [collab.fk_idProjet, collab.fk_idProfil, id] 
  );

  let message = 'Error in updating collab';

  if (result.affectedRows) {
    message = 'collab updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM collab WHERE fk_idProjet=?`,
    [id]
  );

  let message = 'Error in deleting collab';

  if (result.affectedRows) {
    message = 'collab deleted successfully';
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