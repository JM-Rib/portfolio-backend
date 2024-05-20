const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM evoque`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM evoque WHERE fk_idTheme=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(evoque){
  const result = await db.query(
    `INSERT INTO evoque (fk_idTheme, fk_idArticle) VALUES ($1, $2)`,
    [evoque.fk_idTheme, evoque.fk_idArticle]
  );

  let message = 'Error in creating evoque';

  if (result.length > 0) {
    message = 'evoque created successfully';
  }

  return {message};
}

async function update(id, evoque){
  const result = await db.query(
    `UPDATE evoque SET evoque.fk_idTheme=$1, evoque.fk_idArticle=$2 WHERE evoque.fk_idTheme = $3;`,
    [evoque.fk_idTheme, evoque.fk_idArticle, id] 
  );

  let message = 'Error in updating evoque';

  if (result.length > 0) {
    message = 'evoque updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM evoque WHERE fk_idTheme=$1`,
    [id]
  );

  let message = 'Error in deleting evoque';

  if (result.length > 0) {
    message = 'evoque deleted successfully';
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