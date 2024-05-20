const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM NomArticle`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM NomArticle WHERE fk_idArticle=$1 AND fk_idLangue=$2`,
    [id.fk_idArticle, id.fk_idLangue]
  );

  return helper.emptyOrRows(rows);
}

async function create(nomArticle){
  const result = await db.query(
    `INSERT INTO NomArticle (fk_idArticle, fk_idLangue, nomArticle) VALUES ($1, $2, $3)`,
    [nomArticle.fk_idArticle, nomArticle.fk_idLangue, nomArticle.nomArticle]
  );

  let message = 'Error in creating nomArticle';

  if (result.length > 0) {
    message = 'nomArticle created successfully';
  }

  return {message};
}

async function update(id, nomArticle){
  const result = await db.query(
    `UPDATE NomArticle SET NomArticle.fk_idArticle=$1, NomArticle.fk_idLangue=$2, NomArticle.nomArticle=$3 WHERE NomArticle.fk_idArticle=$4 AND NomArticle.fk_idLangue=$5;`,
    [nomArticle.fk_idArticle, nomArticle.fk_idLangue, nomArticle.nomArticle, id.fk_idArticle, id.fk_idLangue] 
  );

  let message = 'Error in updating nomArticle';

  if (result.length > 0) {
    message = 'nomArticle updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM NomArticle WHERE fk_idArticle=$1 AND fk_idLangue=$2`,
    [id.fk_idArticle, id.fk_idLangue]
  );

  let message = 'Error in deleting nomArticle';

  if (result.length > 0) {
    message = 'nomArticle deleted successfully';
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