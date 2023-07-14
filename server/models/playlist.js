const mongoose = require('mongoose');
const Joi = require('joi');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  songs: [{
    type: Array,
    default: []
  }],
  img: {
    type: String
  }
})
// getPlaylistsData, getPlaylistData , createPlaylist, deletePlaylist (name, user, img, songs), deleteSongFromPlaylist (name, user, img, songs), addSongToPlaylist, editPlaylistName, getUsersPlaylists
const validate = (playlist) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    user: Joi.string().required(),
    songs: Joi.array().items(Joi.string()),
    img: Joi.string().allow('')
  });
  return schema.validate(playlist);
}

const Playlist = mongoose.model('playlist', playlistSchema);
module.exports = { Playlist, validate };
