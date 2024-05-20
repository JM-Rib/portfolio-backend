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
    `SELECT * FROM Article WHERE pk_idArticle=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function create(article){
  const result = await db.query(
    `INSERT INTO Article (fk_idAdmin) VALUES ($1)`,
    [article.fk_idAdmin]
  );

  let message = 'Error in creating article';

  if (result.length > 0) {
    message = 'article created successfully';
  }

  return {message};
}

async function update(id, article){
  const result = await db.query(
    `UPDATE Article SET Article.pk_idArticle=$1, Article.fk_idAdmin=$2 WHERE Article.pk_idArticle = $3;`,
    [article.pk_idArticle, article.fk_idAdmin, id] 
  );

  let message = 'Error in updating article';

  if (result.length > 0) {
    message = 'article updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Article WHERE pk_idArticle=$1`,
    [id]
  );

  let message = 'Error in deleting article';

  if (result.length > 0) {
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