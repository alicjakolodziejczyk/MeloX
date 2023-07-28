import React from 'react';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import IconButton from '@mui/material/IconButton';

const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong }) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
    <IconButton color={repeat ? 'primary' : 'inherit'} onClick={() => setRepeat((prev) => !prev)} ><LoopRoundedIcon/></IconButton>
    <IconButton disabled={!currentSongs?.length} color='inherit' onClick={handlePrevSong} ><SkipPreviousRoundedIcon/></IconButton>
    {isPlaying ? (
      <IconButton color='inherit' onClick={handlePlayPause} ><PauseRoundedIcon fontSize='large'/></IconButton>
    ) : (
      <IconButton color='inherit' onClick={handlePlayPause} ><PlayArrowRoundedIcon fontSize='large'/></IconButton>
    )}
    <IconButton disabled={!currentSongs?.length} color='inherit' onClick={handleNextSong} ><SkipNextRoundedIcon/></IconButton>
    <IconButton color={shuffle ? 'primary' : 'inherit'} onClick={() => setShuffle((prev) => !prev)} ><ShuffleRoundedIcon/></IconButton>
  </div>
);

export default Controls;
