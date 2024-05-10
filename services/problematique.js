const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM problematique`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM problematique WHERE fk_idTheme=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(problematique){
  const result = await db.query(
    `INSERT INTO problematique (fk_idTheme, fk_idProjet) VALUES ($1, $2)`,
    [problematique.fk_idTheme, problematique.fk_idProjet]
  );

  let message = 'Error in creating problematique';

  if (result) {
    message = 'problematique created successfully';
  }

  return {message};
}

async function update(id, problematique){
  const result = await db.query(
    `UPDATE problematique SET problematique.fk_idTheme=$1, problematique.fk_idProjet=$2 WHERE problematique.fk_idTheme = $3;`,
    [problematique.fk_idTheme, problematique.fk_idProjet, id] 
  );

  let message = 'Error in updating problematique';

  if (result) {
    message = 'problematique updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM problematique WHERE fk_idTheme=$1 AND fk_idProjet=$2`,
    [id.fk_idTheme, id.fk_idProjet] 
  );

  let message = 'Error in deleting problematique';

  if (result) {
    message = 'problematique deleted successfully';
  }

  return {message};
}

async function removeProjectTies(id){
  const result = await db.query(
    `DELETE FROM problematique WHERE fk_idProjet=$1`,
    [id] 
  );

  let message = 'Error in deleting problematique';

  if (result) {
    message = 'problematique deleted successfully';
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