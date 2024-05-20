const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM Description`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM Description WHERE fk_idProjet=$1 AND fk_idLangue=$2`,
    [id.fk_idProjet, id.fk_idLangue]
  );

  return helper.emptyOrRows(rows);
}

async function create(description){
  const result = await db.query(
    `INSERT INTO Description (fk_idProjet, fk_idLangue, description) VALUES ($1, $2, $3)`,
    [description.fk_idProjet, description.fk_idLangue, description.description ]
  );

  return result;
}

async function update(id, description){
  const result = await db.query(
    `UPDATE Description SET fk_idProjet=$1, fk_idLangue=$2, description=$3 WHERE fk_idProjet=$4 AND fk_idLangue=$5;`,
    [description.fk_idProjet, description.fk_idLangue, description.description, id.fk_idProjet, id.fk_idLangue] 
  );

  let message = 'Error in updating description';

  if (result.length > 0) {
    message = 'description updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Description WHERE fk_idProjet=$1 AND fk_idLangue=$2`,
    [id.fk_idProjet, id.fk_idLangue]
  );

  let message = 'Error in deleting description';

  if (result.length > 0) {
    message = 'description deleted successfully';
  }

  return {message};
}

async function removeProjectTies(id){
  const result = await db.query(
    `DELETE FROM Description WHERE fk_idProjet=$1`,
    [id]
  );

  let message = 'Error in deleting description';

  if (result.length > 0) {
    message = 'description deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  getOne,
  create,
  update,
  remove,
  removeProjectTies
}