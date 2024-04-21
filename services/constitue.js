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
    `SELECT * FROM constitue WHERE pk_idConstitue=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(constitue){
  const result = await db.query(
    `INSERT INTO constitue (fk_idConstitue, fk_idArticle, fk_idMedia) VALUES ($1, $2, $3)`,
    [constitue.fk_idConstitue, constitue.fk_idArticle, constitue.fk_idMedia]
  );

  let message = 'Error in creating constitue';

  if (result) {
    message = 'constitue created successfully';
  }

  return {message};
}

async function update(id, constitue){
  const result = await db.query(
    `UPDATE constitue SET constitue.pk_idConstitue=$1, constitue.fk_idConstitue=$2, constitue.fk_idArticle=$3, constitue.fk_idMedia=$4 WHERE constitue.pk_idConstitue = $5;`,
    [constitue.pk_idConstitue, constitue.fk_idConstitue, constitue.fk_idArticle, constitue.fk_idMedia, id] 
  );

  let message = 'Error in updating constitue';

  if (result) {
    message = 'constitue updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM constitue WHERE pk_idConstitue=$1`,
    [id]
  );

  let message = 'Error in deleting constitue';

  if (result) {
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