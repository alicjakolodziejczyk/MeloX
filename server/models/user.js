const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');


const historySchema = new mongoose.Schema({
  songId: String,
  artistId: String,
  minutesListened: Number,
  songLength: Number,
  date: Date
});

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  spotifyId: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024
  },
  profilePicture: {
    data: Buffer,
    contentType: String
  },
  // getFavoriteSongs, deleteSongFromFavoriteSongs, addSongToFavoriteSongs
  favoriteSongs: {
    type: [String],
    default: []
  }, 
  // getFavoritePlaylists, deletePlaylistFromFavoritePlaylists, addPlaylistToFavoritePlaylists
  favoritePlaylists: {
    type: [String],
    default: []
  },
  // getFavoriteArtists, deleteArtistFromFavoriteArtists, addArtistToFavoriteArtists
  favoriteArtists: {
    type: [String],
    default: []
  },
  // getFavoriteAlbums, deleteAlbumFromFavoriteAlbums, addAlbumToFavoriteAlbums
  favoriteAlbums: {
    type: [String],
    default: []
  },
  // getFavoritePodcasts, deletePodcastFromFavoritePodcasts, addPodcastToFavoritePodcasts
  favoritePodcasts: {
    type: [String],
    default: []
  },
  // getHistory, addToHistory, getMinutesListened, getMostListenedArtist, getMostListenedSong
  history: {
    type: [historySchema]
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
}

const validate = (user) => {
  const schema = Joi.object({
    googleId: Joi.string(),
    spotifyId: Joi.string(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: passwordComplexity().min(8).max(1024),
    profilePicture: Joi.string().allow(''), // Mogą być błędy dot obrazków
    favoriteSongs: Joi.array().items(Joi.string()),
    favoritePlaylists: Joi.array().items(Joi.string()),
    favoriteArtists: Joi.array().items(Joi.string()),
    favoriteAlbums: Joi.array().items(Joi.string()),
    favoritePodcasts: Joi.array().items(Joi.string())
  });
  return schema.validate(user);
};

const User = mongoose.model('user', userSchema);

module.exports = { User, validate };
