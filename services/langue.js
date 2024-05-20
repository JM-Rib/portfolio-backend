const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM Langue`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM Langue WHERE pk_idLangue=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(langue){
  const result = await db.query(
    `INSERT INTO Langue (langue) VALUES ($1)`,
    [langue.langue]
  );

  let message = 'Error in creating langue';

  if (result.length > 0) {
    message = 'langue created successfully';
  }

  return {message};
}

async function update(id, langue){
  const result = await db.query(
    `UPDATE Langue SET Langue.pk_idLangue=$1, Langue.langue=$2 WHERE Langue.pk_idLangue = $3;`,
    [langue.pk_idLangue, langue.langue, id] 
  );

  let message = 'Error in updating langue';

  if (result.length > 0) {
    message = 'langue updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Langue WHERE pk_idLangue=$1`,
    [id]
  );

  let message = 'Error in deleting langue';

  if (result.length > 0) {
    message = 'langue deleted successfully';
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