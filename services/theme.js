const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM Theme`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM Theme WHERE pk_idTheme=?`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(theme){
  const result = await db.query(
    `INSERT INTO Theme (theme) VALUES (?)`,
    [theme.theme]
  );

  let message = 'Error in creating theme';

  if (result.affectedRows) {
    message = 'theme created successfully';
  }

  return {message};
}

async function update(id, theme){
  const result = await db.query(
    `UPDATE Theme SET Theme.pk_idTheme=?, Theme.theme=? WHERE Theme.pk_idTheme = ?;`,
    [theme.pk_idTheme, theme.theme, id] 
  );

  let message = 'Error in updating theme';

  if (result.affectedRows) {
    message = 'theme updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Theme WHERE pk_idTheme=?`,
    [id]
  );

  let message = 'Error in deleting theme';

  if (result.affectedRows) {
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