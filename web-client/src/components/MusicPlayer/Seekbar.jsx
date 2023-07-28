import React from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import IconButton from '@mui/material/IconButton';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className="hidden sm:flex flex-row items-center">
      <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
        <IconButton color='inherit' type="button" onClick={() => setSeekTime(appTime - 5)} >
          <FastRewindRoundedIcon />
        </IconButton>
        <p>{value === 0 ? '0:00' : getTime(value)}</p>

        <Slider
              aria-label="Audio Track"
              step={0.01}
              value={value}
              min={min}
              max={max}
              onInput={onInput}
              sx={{ width: '30vw' }}/>
        <p>{max === 0 ? '0:00' : getTime(max)}</p>
        <IconButton color='inherit' type="button" onClick={() => setSeekTime(appTime + 5)} className="hidden lg:ml-4 lg:block">
          <FastForwardRoundedIcon />
        </IconButton>
        </Stack>
        
      </div>
  );
};

export default Seekbar;
