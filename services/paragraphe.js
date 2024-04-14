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
    `SELECT * FROM Paragraphe WHERE pk_idParagraphe=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(paragraphe){
  const result = await db.query(
    `INSERT INTO Paragraphe (contenu, fk_idLangue) VALUES ($1, $2)`,
    [paragraphe.contenu, paragraphe.fk_idLangue]
  );

  let message = 'Error in creating paragraphe';

  if (result) {
    message = 'paragraphe created successfully';
  }

  return {message};
}

async function update(id, paragraphe){
  const result = await db.query(
    `UPDATE Paragraphe SET Paragraphe.pk_idParagraphe=$1, Paragraphe.contenu=$2 WHERE Paragraphe.pk_idParagraphe = $3;`,
    [paragraphe.pk_idParagraphe, paragraphe.contenu, id] 
  );

  let message = 'Error in updating paragraphe';

  if (result) {
    message = 'paragraphe updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Paragraphe WHERE pk_idParagraphe=$1`,
    [id]
  );

  let message = 'Error in deleting paragraphe';

  if (result) {
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