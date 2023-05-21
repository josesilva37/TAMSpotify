const express = require("express");
const {
  getUser,
  getUserPlaylists,
  getUserTopTracks,
  getUserTopArtists,
  addLikedSong,
  getLikedSongs,
  deleteLikedSong,
  checkIfLikedSong,
} = require("../Controllers/Spotify");
const router = express.Router();
const { getUserDb , getAllUsers, createUser } = require('../Controllers/sequelize/users.controller')


router.get("/User/:token", async (req, res) => {
  getUser(req.params.token)
    .then((data) => {
      if (data.error) {
        res.status(data.error.status).json({ message: data.error });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: error.message });
    });
});
router.get("/UserPlaylists/:token", async (req, res) => {
  getUserPlaylists(req.params.token)
    .then((data) => {
      if (data.error) {
        res.status(data.error.status).json({ message: data.error });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: error.message });
    });
});
router.get("/UserTopTracks/:time/:token", async (req, res) => {
  getUserTopTracks(req.params.token, req.params.time)
    .then((data) => {
      if (data.error) {
        res.status(data.error.status).json({ message: data.error });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: error.message });
    });
});

router.get("/UserTopArtists/:time/:token", async (req, res) => {
  getUserTopArtists(req.params.token, req.params.time)
    .then((data) => {
      if (data.error) {
        res.status(data.error.status).json({ message: data.error });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: error.message });
    });
});

router.get("/UserAlbums/:token", async (req, res) => {
  getUser(req.params.token)
    .then((data) => {
      if (data.error) {
        res.status(data.error.status).json({ message: data.error });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: error.message });
    });
});

router.get("/UserAlbum/:id/:token", async (req, res) => {
  getUser(req.params.token, req.params.id)
    .then((data) => {
      if (data.error) {
        res.status(data.error.status).json({ message: data.error });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: error.message });
    });
});

router.put("/addLikedSong/:id/:token", async (req, res) => {
  addLikedSong(req.params.token, req.params.id)
    .then((data) => {
      if (data.error) {
        res.status(data.error.status).json({ message: data.error });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: error.message });
    });
});

router.get("/listLikedSongs/:offset/:token", async (req, res) => {
  getLikedSongs(req.params.token, req.params.offset)
    .then((data) => {
      if (data.error) {
        res.status(data.error.status).json({ message: data.error });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: error.message });
    });
});

router.delete("/deleteLikedSong/:id/:token", async (req, res) => {
  deleteLikedSong(req.params.token, req.params.id)
    .then((data) => {
      if (data.error) {
        res.status(data.error.status).json({ message: data.error });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: error.message });
    });
});

router.get("/isLikedSong/:id/:token", async (req, res) => {
  checkIfLikedSong(req.params.token, req.params.id)
    .then((data) => {
      if (data.error) {
        res.status(data.error.status).json({ message: data.error });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: error.message });
    });
});

router.get("/getAllUsersDb", (req, res) => {
    getAllUsers(req, res)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log(err);
        });
});

router.get("/getUserDb/:email", (req, res) => {
    const email = req.params.email;

    getUserDb(req, res, email)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log(err);
        });
});

router.post("/createUserDb/:email/:name", (req, res) => {
    const email = req.params.email;
    const nome = req.params.name
    
    createUser(req, res, email, nome)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log(err);
        });
});


module.exports=router;
