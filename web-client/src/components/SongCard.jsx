import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'

export default function SongCard({song, isPlaying, activeSong, i, data}) {
  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }
  return (
    <Card>
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.track.album.images['0'].url} className="w-full h-full rounded-lg" />
      </div>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {song.track.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
        {song.track.artists.map((artist, index) => (
          <React.Fragment key={index}>
            <Link>{artist.name}</Link>
            {" "}
          </React.Fragment>
        ))}
        </Typography>
      </CardContent>
      <CardActions>
        {/* Like */}
      </CardActions>
    </Card>
  );
}