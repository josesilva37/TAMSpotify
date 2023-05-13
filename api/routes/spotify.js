const express=require('express');
const { getUser, getUserPlaylists, getUserTopTracks, getUserTopArtists, addLikedSong, getLikedSongs, deleteLikedSong, checkIfLikedSong } = require('../Controllers/Spotify');
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
router.get("/UserTopArtists",async (req,res)=>{
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

module.exports=router;