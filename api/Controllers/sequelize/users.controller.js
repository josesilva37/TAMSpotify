const { users } = require("../../db/database");

function getAllUsers(req, res) {
  return new Promise((resolve, reject) => {
    users
      .findAll({
        attributes: ["email", "name"],
      })
      .then((users) => {
        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getUserDb(req, res, email) {
  return new Promise((resolve, reject) => {
    users
      .findOne({
        where: {
          email: email,
        },
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createUser(req, res, email, nome) {
    return new Promise((resolve, reject) => {
      users
        .create({
          email: email,
          name: nome
        })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

function createSpeaker(req, res) {
  speaker
    .create(req.body)
    .then((speaker) => {
      res.json(speaker);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateSpeaker(req, res) {
  speaker
    .update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((speaker) => {
      res.json(speaker);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteSpeaker(req, res) {
  speaker
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((speaker) => {
      res.json(speaker);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getAllUsers,
  getUserDb,
  createUser
};
