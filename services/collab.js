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
    `SELECT * FROM collab WHERE fk_idProjet=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(collab){
  const result = await db.query(
    `INSERT INTO collab (fk_idProjet, fk_idProfil) VALUES ($1, $2)`,
    [collab.fk_idProjet, collab.fk_idProfil]
  );

  let message = 'Error in creating collab';

  if (result.length > 0) {
    message = 'collab created successfully';
  }

  return {message};
}

async function update(id, collab){
  const result = await db.query(
    `UPDATE collab SET collab.fk_idProjet=$1, collab.fk_idProfil=$2 WHERE collab.fk_idProjet = $3;`,
    [collab.fk_idProjet, collab.fk_idProfil, id] 
  );

  let message = 'Error in updating collab';

  if (result.length > 0) {
    message = 'collab updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM collab WHERE fk_idProjet=$1 AND fk_idProfil=$2`,
    [id.fk_idProjet, id.fk_idProfil]
  );

  let message = 'Error in deleting collab';

  if (result.length > 0) {
    message = 'collab deleted successfully';
  }

  return {message};
}

async function removeProjectTies(id){
  const result = await db.query(
    `DELETE FROM collab WHERE fk_idProjet=$1`,
    [id]
  );

  let message = 'Error in deleting collab';

  if (result.length > 0) {
    message = 'collab deleted successfully';
  }

  return {message};
}

async function removeProfilTies(id){
  const result = await db.query(
    `DELETE FROM collab WHERE fk_idProfil=$1`,
    [id]
  );

  let message = 'Error in deleting collab';

  if (result.length > 0) {
    message = 'collab deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  getOne,
  create,
  update,
  remove,
  removeProjectTies,
  removeProfilTies
}