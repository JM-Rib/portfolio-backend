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
    `SELECT * FROM Paragraphe WHERE pk_idParagraphe=?`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(paragraphe){
  const result = await db.query(
    `INSERT INTO Paragraphe (contenu) VALUES (?)`,
    [paragraphe.contenu]
  );

  let message = 'Error in creating paragraphe';

  if (result.affectedRows) {
    message = 'paragraphe created successfully';
  }

  return {message};
}

async function update(id, paragraphe){
  const result = await db.query(
    `UPDATE Paragraphe SET Paragraphe.pk_idParagraphe=?, Paragraphe.contenu=? WHERE Paragraphe.pk_idParagraphe = ?;`,
    [paragraphe.pk_idParagraphe, paragraphe.contenu, id] 
  );

  let message = 'Error in updating paragraphe';

  if (result.affectedRows) {
    message = 'paragraphe updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Paragraphe WHERE pk_idParagraphe=?`,
    [id]
  );

  let message = 'Error in deleting paragraphe';

  if (result.affectedRows) {
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