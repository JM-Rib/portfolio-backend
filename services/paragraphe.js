const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM Paragraphe`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM Paragraphe WHERE fk_idConstitue=$1 AND fk_idLangue=$2`,
    [id.fk_idConstitue, id.fk_idLangue]
  );

  return helper.emptyOrRows(rows);
}

async function create(paragraphe){
  const result = await db.query(
    `INSERT INTO Paragraphe (fk_idConstitue, fk_idLangue, paragraphe) VALUES ($1, $2, $3)`,
    [paragraphe.fk_idConstitue, paragraphe.fk_idLangue, paragraphe.paragraphe]
  );

  let message = 'Error in creating paragraphe';

  if (result.length > 0) {
    message = 'paragraphe created successfully';
  }

  return {message};
}

async function update(id, paragraphe){
  const result = await db.query(
    `UPDATE Paragraphe SET Paragraphe.fk_idConstitue=$1, Paragraphe.fk_idLangue=$2, Paragraphe.paragraphe=$3 WHERE Paragraphe.fk_idConstitue=$4 AND Paragraphe.fk_idLangue=$5;`,
    [paragraphe.fk_idConstitue, paragraphe.fk_idLangue, paragraphe.paragraphe, id.fk_idConstitue, id.fk_idLangue] 
  );

  let message = 'Error in updating paragraphe';

  if (result.length > 0) {
    message = 'paragraphe updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Paragraphe WHERE fk_idConstitue=$1 AND fk_idLangue=$2`,
    [id.fk_idConstitue, id.fk_idLangue]
  );

  let message = 'Error in deleting paragraphe';

  if (result.length > 0) {
    message = 'paragraphe deleted successfully';
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