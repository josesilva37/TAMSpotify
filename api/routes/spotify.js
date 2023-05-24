const express = require("express");
const {
  createPlaylist,
  getPlaylistById,
} = require("../Controllers/sequelize/playlists.controller");
const {
  createPlaylistUser,
  getUsersPlaylists,
  getPlaylistUsers,
  addUserToPlaylist,
} = require("../Controllers/sequelize/playlist_user.controller");
const router = express.Router();
const {
  getUser,
  getUserPlaylists,
  getUserTopTracks,
  getUserTopArtists,
  addLikedSong,
  getLikedSongs,
  deleteLikedSong,
  checkIfLikedSong,
  getUserAlbums,
  getTrack,
  getAlbum,
} = require("../Controllers/Spotify");
const {
  getUserDb,
  getAllUsers,
  createUser,
} = require("../Controllers/sequelize/users.controller");
const {
  addSongToPlaylist,
  getAllSongsFromPlaylist,
} = require("../Controllers/sequelize/playlist_music.controller");

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
  getUserAlbums(req.params.token)
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
  getAlbum(req.params.token, req.params.id)
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

router.get("/deleteLikedSong/:id/:token", async (req, res) => {
  console.log(req.params.token, req.params.id)
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

router.get("/getTrack/:id/:token", async (req, res) => {
  getTrack(req.params.token, req.params.id)
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

router.get("/getUserDb/:email", (req, res) => {
  const email = req.params.email;

  if (email) {
    getUserDb(email)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

router.get("/userExist/:email", (req, res) => {
  const email = req.params.email;

  if (email) {
    getUserDb(email)
      .then((user) => {
        if (user == null) {
          res.send(false);
        } else {
          res.send(true);
        }
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

router.post("/createUserDb/:email/:name", (req, res) => {
  const email = req.params.email;
  const nome = req.params.name;

  if (email && nome) {
    createUser(email, nome)
      .then((user) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

router.post("/createPlaylist/:name", (req, res) => {
  const name = req.params.name;

  if (name) {
    createPlaylist(name)
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

router.post("/createPlaylistUser/:playlistId/:userEmail", (req, res) => {
  const email = req.params.userEmail;
  const playlistId = req.params.playlistId;

  if (email && playlistId) {
    createPlaylistUser(playlistId, email)
      .then((resp) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

router.post("/addUserToPlaylist/:playlistId/:userEmail", (req, res) => {
  const email = req.params.userEmail;
  const playlistId = req.params.playlistId;

  if (email && playlistId) {
    addUserToPlaylist(playlistId, email)
      .then((resp) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

router.get("/getUsersPlaylits/:email", (req, res) => {
  const email = req.params.email;
  if (email) {
    getUsersPlaylists(email)
      .then((resp) => {
        const playlistIds = resp.map((r) => r.dataValues.playlistId);
        const playlistPromises = playlistIds.map((playlistId) => {
          return getPlaylistById(playlistId);
        });

        Promise.all(playlistPromises)
          .then((playlists) => {
            const playlistData = playlists
              .filter((playlist) => playlist !== null) // Filter out null playlists
              .map((playlist) => playlist.dataValues);

            res.json(playlistData);
          })
          .catch((err) => {
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

router.get("/getPlaylistUsers/:playlistId", (req, res) => {
  const playlistId = req.params.playlistId;

  if (playlistId) {
    getPlaylistUsers(playlistId)
      .then((resp) => {
        const emails = resp.map((user) => user.userEmail);
        res.json(emails);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

router.post("/addSongToPlaylist/:playlistId/:musicId", (req, res) => {
  const musicId = req.params.musicId;
  const playlistId = req.params.playlistId;

  if (musicId && playlistId) {
    addSongToPlaylist(playlistId, musicId)
      .then((resp) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

router.get("/getAllSongsFromPlaylist/:playlistId", (req, res) => {
  const playlistId = req.params.playlistId;

  if (playlistId) {
    getAllSongsFromPlaylist(playlistId)
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
