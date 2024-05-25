const db = require('../db');
const helper = require('../helper');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM Projet`,
    []
  ); 
  return helper.emptyOrRows(rows);
} 

async function getList(){ 
    const rows = await db.query(
      `SELECT Projet.* FROM Projet;`,
    []
  );

  return helper.emptyOrRows(rows);
}

async function getCollabers(id){
  const rows = await db.query(
    `SELECT Profil.* FROM Projet LEFT JOIN collab ON Projet.pk_idProjet = collab.fk_idProjet LEFT JOIN Profil ON collab.fk_idProfil = Profil.pk_idProfil WHERE Projet.pk_idProjet=$1 `,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM Projet WHERE pk_idProjet=$1`,
    [id]
  );

  return helper.emptyOrRows(rows);
}

async function getAllDetails(fk_idLangue){
  const rows = await db.query(
    `SELECT P.*, D.description, array_agg(CT.contenuTheme) AS Themes FROM Projet P LEFT JOIN Description D ON P.pk_idProjet = D.fk_idProjet LEFT JOIN problematique PR ON P.pk_idProjet = PR.fk_idProjet LEFT JOIN ContenuTheme CT ON PR.fk_idTheme = CT.fk_idTheme WHERE D.fk_idLangue=$1 AND CT.fk_idLangue=$1 GROUP BY P.pk_idProjet, D.description;`,
    [fk_idLangue]
  );

  return helper.emptyOrRows(rows);
}

async function getInfo(id, fk_idLangue){
  const rows = await db.query(
    `SELECT P.*, D.description, array_agg(CT.contenuTheme) AS Themes FROM Projet P LEFT JOIN Description D ON P.pk_idProjet = D.fk_idProjet LEFT JOIN problematique PR ON P.pk_idProjet = PR.fk_idProjet LEFT JOIN ContenuTheme CT ON PR.fk_idTheme = CT.fk_idTheme WHERE P.pk_idProjet=$1 AND D.fk_idLangue=$2 AND CT.fk_idLangue=$2 GROUP BY P.pk_idProjet, D.description;`,
    [id, fk_idLangue]
  );

  return helper.emptyOrRows(rows);
}

async function create(projet){
  const result = await db.query(
    `INSERT INTO Projet (nomProjet, dateDebutProjet, dateDerniereMaj, idGithub, lienHosting) VALUES ($1, $2, $3, $4, $5) RETURNING pk_idProjet`,
    [projet.nomProjet, projet.dateDebutProjet, projet.dateDerniereMaj, projet.idGithub, projet.lienHosting ]
  );

  return result;
}

async function update(id, projet){
  const result = await db.query(
    `UPDATE Projet SET pk_idProjet=$1, nomProjet=$2, dateDebutProjet=$3, dateDerniereMaj=$4, idGithub=$5, lienHosting=$6 WHERE pk_idProjet=$7;`,
    [projet.pk_idProjet, projet.nomProjet, projet.dateDebutProjet, projet.dateDerniereMaj, projet.idGithub, projet.lienHosting, id] 
  );

  let message = 'Error in updating projet';

  if (result.length > 0) {
    message = 'projet updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Projet WHERE pk_idProjet=$1`,
    [id]
  );

  let message = 'Error in deleting projet';

  if (result.length > 0) {
    message = 'projet deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  getList,
  getCollabers,
  getOne,
  getAllDetails,
  getInfo,
  create,
  update,
  remove
}