const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM Article`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM Article WHERE pk_idArticle=?`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(article){
  const result = await db.query(
    `INSERT INTO Article (nomArticle, fk_idAdmin) VALUES (?, ?)`,
    [article.nomArticle, article.fk_idAdmin]
  );

  let message = 'Error in creating article';

  if (result.affectedRows) {
    message = 'article created successfully';
  }

  return {message};
}

async function update(id, article){
  const result = await db.query(
    `UPDATE Article SET Article.pk_idArticle=?, Article.nomArticle=?, Article.fk_idAdmin=? WHERE Article.pk_idArticle = ?;`,
    [article.pk_idArticle, article.nomArticle, article.fk_idAdmin, id] 
  );

  let message = 'Error in updating article';

  if (result.affectedRows) {
    message = 'article updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Article WHERE pk_idArticle=?`,
    [id]
  );

  let message = 'Error in deleting article';

  if (result.affectedRows) {
    message = 'article deleted successfully';
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