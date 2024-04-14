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
    `SELECT * FROM Description WHERE pk_idDescription=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(description){
  const result = await db.query(
    `INSERT INTO Description (description, fk_idLangue) VALUES ($1, $2)`,
    [description.description, description.fk_idLangue]
  );

  let message = 'Error in creating description';

  if (result) {
    message = 'description created successfully';
  }

  return {message};
}

async function update(id, description){
  const result = await db.query(
    `UPDATE Description SET Description.pk_idDescription=$1, Description.description=$2, Description.fk_idLangue=$3 WHERE Description.pk_idDescription = $4;`,
    [description.pk_idDescription, description.description, description.fk_idLangue, id] 
  );

  let message = 'Error in updating description';

  if (result) {
    message = 'description updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Description WHERE pk_idDescription=$1`,
    [id]
  );

  let message = 'Error in deleting description';

  if (result) {
    message = 'description deleted successfully';
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