const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist');
const { Playlist } = require('../models/playlist');

router.get('/all', playlistController.getPlaylistsData);
router.get('/', playlistController.getPlaylistData);
router.post('/', playlistController.createPlaylist);
router.delete('/', playlistController.deletePlaylist);
router.delete('/song', playlistController.deleteSongFromPlaylist);
router.post('/song', playlistController.addSongToPlaylist);
router.get('/user', playlistController.getUsersPlaylists);

module.exports = router;