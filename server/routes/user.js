const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/authenticate', userController.authenticate);
router.put('/change-password', userController.changePassword);
router.delete('/delete', userController.deleteUser);
router.get('/account-details', userController.getAccountDetails);
router.get('/favorites/:arrayName', userController.getFavorites);
router.delete('/favorites/:arrayName/:id', userController.deleteFromFavorites);
router.post('/favorites/:arrayName', userController.addToFavorites);
router.get('/history', userController.getHistory);
router.get('/history/lastSong', userController.getLastSongFromHistory)
router.post('/history', userController.addToHistory);
router.get('/minutes-listened', userController.getMinutesListened);
router.get('/most-listened-artists/:quantity', userController.getMostListenedArtists);
router.get('/most-listened-songs/:quantity', userController.getMostListenedSongs);

module.exports = router;