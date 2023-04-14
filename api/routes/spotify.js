const express=require('express');
const { getUser, getUserPlaylists, getUserTopTracks, getUserTopArtists } = require('../Controllers/Spotify');
const router=express.Router()


router.get("/User",(req,res)=>{
    res.send(getUser(req.body.token))
})
router.get("/UserPlaylists",(req,res)=>{
    res.send(getUserPlaylists(req.body.token))
})
router.get("/UserTopTracks",(req,res)=>{
    res.send(getUserTopTracks(req.body.token, req.params.time))
})
router.get("/UserTopArtists",(req,res)=>{
    res.send(getUserTopArtists(req.body.token, req.params.time))
})
router.get("/UserAlbums",(req,res)=>{
    res.send(getUser(req.body.token))
})
router.get("/UserAlbum",(req,res)=>{
    res.send(getUser(req.body.token, req.body.id))
})



module.exports=router;