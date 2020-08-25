const db = require("../data/config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id }).first();
}

function findSteps(id) {
  return db("steps").where({ id }).first();
}

function add(SchemeData) {
  return db("schemes")
    .insert(SchemeData)
    .returning("id")
    .then((ids) => {
      const id = ids[0];
      return findById(id);
    });
}

function update(changes, id) {
  return db("schemes")
    .where("id", id)
    .first()
    .update(changes)
    .then(() => {
      findById(id);
    });
}

function remove(id) {
  return db("schemes").where({ id }).del();
}
