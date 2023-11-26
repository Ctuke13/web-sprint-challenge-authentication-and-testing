const db = require("../../data/dbConfig");

function findById(id) {
  return db("users as u").select("u.*").where("u.id", id).first();
}

async function insert({ username, password }) {
  const user = { username, password };
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findBy(filter) {
  return db("users as u").select("u.*").where(filter);
}

module.exports = {
  findById,
  insert,
  findBy,
};
