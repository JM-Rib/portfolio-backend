const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM Media`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM Media WHERE pk_idMedia=?`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(media){
  const result = await db.query(
    `INSERT INTO Media (cheminFichier) VALUES (?)`,
    [media.cheminFichier]
  );

  let message = 'Error in creating media';

  if (result.affectedRows) {
    message = 'media created successfully';
  }

  return {message};
}

async function update(id, media){
  const result = await db.query(
    `UPDATE Media SET Media.pk_idMedia=?, Media.cheminFichier=? WHERE Media.pk_idMedia = ?;`,
    [media.pk_idMedia, media.cheminFichier, id] 
  );

  let message = 'Error in updating media';

  if (result.affectedRows) {
    message = 'media updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Media WHERE pk_idMedia=?`,
    [id]
  );

  let message = 'Error in deleting media';

  if (result.affectedRows) {
    message = 'media deleted successfully';
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