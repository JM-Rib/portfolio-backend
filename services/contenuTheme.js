const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM ContenuTheme`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM ContenuTheme WHERE fk_idTheme=$1 AND fk_idLangue=$2`,
    [id.fk_idTheme, id.fk_idLangue]
  );

  return helper.emptyOrRows(rows);
}

async function create(contenuTheme){
  const result = await db.query(
    `INSERT INTO ContenuTheme (fk_idTheme, fk_idLangue, contenuTheme) VALUES ($1, $2, $3)`,
    [contenuTheme.fk_idTheme, contenuTheme.fk_idLangue, contenuTheme.contenuTheme]
  );

  let message = 'Error in creating theme';

  if (result) {
    message = 'theme created successfully';
  }

  return {message};
}

async function update(id, contenuTheme){
  const result = await db.query(
    `UPDATE ContenuTheme SET ContenuTheme.fk_idTheme=$1, ContenuTheme.fk_idLangue=$2, ContenuTheme.contenuTheme=$3 WHERE ContenuTheme.fk_idTheme=$4 AND ContenuTheme.fk_idLangue=$5;`,
    [contenuTheme.fk_idTheme, contenuTheme.fk_idLangue, contenuTheme.contenuTheme, id.fk_idTheme, id.fk_idLangue] 
  );

  let message = 'Error in updating theme';

  if (result) {
    message = 'theme updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM ContenuTheme WHERE fk_idTheme=$1 AND fk_idLangue=$2`,
    [id.fk_idTheme, id.fk_idLangue]
  );

  let message = 'Error in deleting theme';

  if (result) {
    message = 'theme deleted successfully';
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