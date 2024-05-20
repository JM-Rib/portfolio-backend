const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve("services", '../.env') }).parsed;
const JWT_SECRET = dotenv.JWT_SECRET; const JWT_EXPIRES_IN = dotenv.JWT_EXPIRES_IN;
const db = require('../db');

/* dotenv does not want to load values despite storing 
  them in an object called "parsed" so I have to get 
  them from parsed for it to work */
const helper = require('../helper');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AxiosHeaders } = require('axios');

async function getMultiple(){
  const rows = await db.query(
    `SELECT * FROM Admin`,
    []  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getOne(id){
  const rows = await db.query(
    `SELECT * FROM Admin WHERE pk_idAdmin=$1`,
    [id]  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function create(admin){
  const result = await db.query(
    `INSERT INTO Admin (identifiant, mdp, fk_idProfil) VALUES ($1, $2, $3)`,
    [admin.identifiant, admin.mdp, admin.fk_idProfil]  );

  let message = 'Error in creating admin';

  if (result.length > 0) {
    message = 'admin created successfully';
  }
  return {message};
}

async function update(id, admin){
  const result = await db.query(
    `UPDATE Admin SET Admin.pk_idAdmin=$1, Admin.identifiant=$2, Admin.mdp=$3, Admin.fk_idProfil=$4 WHERE Admin.pk_idAdmin = $5;` ,
    [admin.pk_idAdmin, admin.identifiant, admin.mdp, admin.fk_idProfil, id]  
  );

  let message = 'Error in updating admin';

  if (result.length > 0) {
    message = 'admin updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Admin WHERE pk_idAdmin=$1`,
    [id]
  );

  let message = 'Error in deleting admin';

  if (result.length > 0) {
    message = 'admin deleted successfully';
  }

  return {message};
}

async function signup(admin){
  const rows = await db.query(
    `INSERT INTO Admin (identifiant, mdp, fk_idProfil) VALUES ($1, $2, $3)`,
    [admin.identifiantAdmin, admin.mdpAdmin, admin.fk_idProfil]  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function login(admin){
  const rows = await db.query(
    `SELECT * FROM Admin WHERE Admin.identifiant=$1`,
    [admin.identifiant]  );
  const data = helper.emptyOrRows(rows);
  
  return {
    data
  }
}

async function verifyToken(admin){ //ou "decoded"
  const rows = await db.query(
    `SELECT * FROM Admin WHERE Admin.identifiant=$1`,
    [admin.identifiant]    );
  const data = helper.emptyOrRows(rows);
  
  return{
    data
  }
}

async function removeProfilTies(id){
  const result = await db.query(
    `DELETE FROM admin WHERE fk_idProfil=$1`,
    [id]
  );

  let message = 'Error in deleting admin';

  if (result.length > 0) {
    message = 'admin deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  getOne,
  create,
  update,
  remove,
  signup,
  login,
  verifyToken,
  removeProfilTies
}