const express=require('express');
const { getUser, getUserPlaylists, getUserTopTracks, getUserTopArtists, addLikedSong, getLikedSongs, deleteLikedSong, checkIfLikedSong } = require('../Controllers/Spotify');
const { getUserDb , getAllUsers, createUser } = require('../Controllers/sequelize/users.controller');
const { createPlaylist, getPlaylistById } = require('../Controllers/sequelize/playlists.controller');
const { createPlaylistUser, getUsersPlaylists, getPlaylistUsers } = require('../Controllers/sequelize/playlist_user.controller');
const router=express.Router()


router.get("/User/:token",async (req,res)=>{
    
    res.send(await getUser(req.params.token))
})
router.get("/UserPlaylists/:token",async (req,res)=>{
    res.send(await getUserPlaylists(req.params.token))
})
router.get("/UserTopTracks/:time/:token",async (req,res)=>{
    res.send(await getUserTopTracks(req.params.token, req.params.time))
})
router.get("/UserTopArtists/:time/:token",async (req,res)=>{
    res.send(await getUserTopArtists(req.params.token, req.params.time))
})
router.get("/UserAlbums/:token",async (req,res)=>{
    res.send(await getUser(req.params.token))
})
router.get("/UserAlbum/:id/:token",async (req,res)=>{
    res.send(await getUser(req.params.token, req.params.id))
})

router.put("/addLikedSong/:id/:token", async (req, res) => {
    res.send(await addLikedSong(req.params.token , req.params.id))
})

router.get("/listLikedSongs/:offset/:token", async ( req, res) => {
    res.send(await getLikedSongs(req.params.token, req.params.offset))
})

router.delete("/deleteLikedSong/:id/:token", async (req, res)=> {
    res.send(await deleteLikedSong(req.params.token, req.params.id))
})

router.get("isLikedSong/:id/:token", async (req,res)=>{
    res.send(await checkIfLikedSong(req.params.token, req.params.id))
})

// router.get("/getAllUsersDb", (req, res) => {
//     getAllUsers(req, res)
//         .then(users => {
//             res.json(users);
//         })
//         .catch(err => {
//             res.sendStatus(500);
//             console.log(err);
//         });
// });

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

router.get("/userExist/:email", (req, res) => {
    const email = req.params.email;

    getUserDb(req, res, email)
        .then(user => {
            if(user == null){
                res.send(false)
            }else{
                res.send(true)
            }
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
            res.sendStatus(200);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log(err);
        });
});

router.post("/createPlaylist/:name", (req, res) => {
    const name = req.params.name
    
    createPlaylist(name)
        .then((resp) => {
            res.json(resp);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log(err);
        });
});

router.post("/createPlaylistUser/:playlistId/:userEmail", (req, res) => {
    const email = req.params.userEmail
    const playlistId = req.params.playlistId
    
    createPlaylistUser(playlistId, email)
        .then((resp) => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log(err);
        });
});


router.get("/getUsersPlaylits/:email", (req, res) => {
    const email = req.params.email;
  
    getUsersPlaylists(email)
      .then((resp) => {
        const playlistIds = resp.map((r) => r.dataValues.playlistId);
        const playlistPromises = playlistIds.map((playlistId) => {
            return getPlaylistById(playlistId)
        }
        );
  
        Promise.all(playlistPromises)
          .then((playlists) => {
            const playlistData = playlists
              .filter((playlist) => playlist !== null) // Filter out null playlists
              .map((playlist) => playlist.dataValues);
  
            res.json(playlistData);
          })
          .catch((err) => {
            res.sendStatus(500);
            console.log(err);
          });
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
});

router.get("/getPlaylistUsers/:playlistId", (req, res) => {
    const playlistId = req.params.playlistId;
    getPlaylistUsers(playlistId)
      .then((resp) => {
        const emails = resp.map((user) => user.userEmail);
        res.json(emails);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  });
  


module.exports=router;