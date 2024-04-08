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
    `SELECT * FROM problematique WHERE fk_idTheme=?`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(problematique){
  const result = await db.query(
    `INSERT INTO problematique (fk_idTheme, fk_idProjet) VALUES (?, ?)`,
    [problematique.fk_idTheme, problematique.fk_idProjet]
  );

  let message = 'Error in creating problematique';

  if (result.affectedRows) {
    message = 'problematique created successfully';
  }

  return {message};
}

async function update(id, problematique){
  const result = await db.query(
    `UPDATE problematique SET problematique.fk_idTheme=?, problematique.fk_idProjet=? WHERE problematique.fk_idTheme = ?;`,
    [problematique.fk_idTheme, problematique.fk_idProjet, id] 
  );

  let message = 'Error in updating problematique';

  if (result.affectedRows) {
    message = 'problematique updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM problematique WHERE fk_idTheme=?`,
    [id]
  );

  let message = 'Error in deleting problematique';

  if (result.affectedRows) {
    message = 'problematique deleted successfully';
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