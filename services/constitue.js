const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM constitue`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM constitue WHERE pk_idConstitue=?`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(constitue){
  const result = await db.query(
    `INSERT INTO constitue (fk_idConstitue, fk_idArticle, fk_idMedia, fk_idParagraphe) VALUES (?, ?, ?, ?)`,
    [constitue.fk_idConstitue, constitue.fk_idArticle, constitue.fk_idMedia, constitue.fk_idParagraphe]
  );

  let message = 'Error in creating constitue';

  if (result.affectedRows) {
    message = 'constitue created successfully';
  }

  return {message};
}

async function update(id, constitue){
  const result = await db.query(
    `UPDATE constitue SET constitue.pk_idConstitue=?, constitue.fk_idConstitue=?, constitue.fk_idArticle=?, constitue.fk_idMedia=?, constitue.fk_idParagraphe=? WHERE constitue.pk_idConstitue = ?;`,
    [constitue.pk_idConstitue, constitue.fk_idConstitue, constitue.fk_idArticle, constitue.fk_idMedia, constitue.fk_idParagraphe, id] 
  );

  let message = 'Error in updating constitue';

  if (result.affectedRows) {
    message = 'constitue updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM constitue WHERE pk_idConstitue=?`,
    [id]
  );

  let message = 'Error in deleting constitue';

  if (result.affectedRows) {
    message = 'constitue deleted successfully';
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