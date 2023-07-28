import React from 'react'
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';

const PlayPause = ({isPlaying, activeSong, song, handlePause, handlePlay}) => (
  //console.log("PlayPause", {isPlaying, activeSong, song, handlePause, handlePlay})
  isPlaying && activeSong?.track.name === song.track.name ? (<PauseCircleRoundedIcon fontSize='large' color="secondary" onClick={handlePause}/>) : (<PlayCircleRoundedIcon fontSize='large' color="secondary" onClick={handlePlay}/>)
)

export default PlayPause