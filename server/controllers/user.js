const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

const authenticate = async (req, res) => {
  res.status(200).send({ auth: true, message: "Authenticated!" });
}

const changePassword = async (req, res) => {
  try {
    console.log(req.user._id)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const newPassword = req.body.password;
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: 'New password must be at least 8 characters long' });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(req.user._id, { password: hashedPassword });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    // Handle specific error cases if necessary
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Add a confirmation step here if needed

    const user = await User.findByIdAndRemove(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error.message);
  }
};

const getAccountDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('email name profilePicture');
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(req.params.arrayName);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const deleteFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const arrayName = req.params.arrayName;
    const id = req.params.id;
    if(arrayName !== 'favoriteSongs' && arrayName !== 'favoritePlaylists' && arrayName !== 'favoriteArtists' && arrayName !== 'favoriteAlbums' && arrayName !== 'favoritePodcasts') {
      return res.status(400).send('Invalid array name');
    }
    const index = user[arrayName].indexOf(id);
    if(!index) {
      return res.status(400).send('This id does not exist in this array');
    }
    if (index > -1) {
      user[arrayName].splice(index, 1);
    }
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const arrayName = req.params.arrayName;
    const id = req.body.id;
    if (user[arrayName].indexOf(id) === -1) {
      user[arrayName].push(id);
    } else {
      return res.status(400).send('This id already exists in this array');
    }
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const getHistory = async (req, res) => {
  try {
    const history = await User.findById(req.user._id).select('history');
    res.send(history);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const getLastSongFromHistory = async (req, res) => {
  try {
    const history = await User.findById(req.user._id).select('history');
    res.send(history[history.length - 1]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const addToHistory = async (req, res) => {
  try {
    const historyObject = {
      songId: req.body.songId,
      artistId: req.body.artistId,
      minutesListened: req.body.minutesListened,
      songLength: req.body.songLength,
      date: req.body.date
    }

  } catch (error) {
    res.status(500).send(error.message);
  }
  
}
const getMinutesListened = async (req, res) => {
  try {
    const history = await User.findById(req.user._id).select('history');
    if(history.length === 0) {
      return res.send(0)
    } else {
      let minutesListened = 0;
      for(let i = 0; i < history.length; i++) {
        minutesListened += history[i].minutesListened;
      }
      res.send(minutesListened);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const getMostListenedArtists = async (req, res) => {
  try {
    const history = await User.findById(req.user._id).select('history');
    if(history.length === 0) {
      return res.send(0)
    } else {
      const artistIds = history.map(e => e.artistId);
      const occurrences = artistIds.reduce((acc, e) => acc.set(e.artistId, (acc.get(e.artistId) || 0) + e.minutesListened), new Map());
      const sortedOccurrences = new Map([...occurrences.entries()].sort((a, b) => b[1] - a[1]));
      const mostListenedArtists = [];
      for (let [key, value] of sortedOccurrences) {
        mostListenedArtists.push(key);
      }
      res.send(mostListenedArtists);

    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const getMostListenedSongs = async (req, res) => {
  try {
    const history = await User.findById(req.user._id).select('history');
    if(history.length === 0) {
      return res.send(0)
    } else {
      const songIds = history.map(e => e.songId);
      const occurrences = songIds.reduce((acc, e) => acc.set(e.songId, (acc.get(e.songId) || 0) + e.minutesListened), new Map());
      const sortedOccurrences = new Map([...occurrences.entries()].sort((a, b) => b[1] - a[1]));
      const mostListenedSongs = [];
      for (let [key, value] of sortedOccurrences) {
        mostListenedSongs.push(key);
      }
      res.send(mostListenedSongs);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  authenticate,
  changePassword,
  deleteUser,
  getAccountDetails,
  getFavorites,
  deleteFromFavorites,
  addToFavorites,
  getHistory,
  getLastSongFromHistory,
  addToHistory,
  getMinutesListened,
  getMostListenedArtists,
  getMostListenedSongs
}