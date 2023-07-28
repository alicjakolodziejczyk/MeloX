import React from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
const VolumeBar = ({ value, min, max, onChange, setVolume }) => (
  <div className="flex flex-1 items-center justify-end">
    <Stack direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
    {value <= 1 && value > 0.5 && <IconButton color='inherit' type="button" onClick={() => setVolume(0)} ><VolumeUpIcon/></IconButton>}
    {value <= 0.5 && value > 0 && <IconButton color='inherit' type="button" onClick={() => setVolume(0)} ><VolumeDownIcon/></IconButton>}
    {value <= 0 && <IconButton color='inherit' type="button" onClick={() => setVolume(1)} ><VolumeOffIcon/></IconButton>}
    <IconButton color='inherit' type="button" onClick={() => setVolume(0)} ></IconButton>
          <Slider
            aria-label="Volume"
            step={0.01}
            value={value}
            min={min}
            max={max}
            onChange={onChange}
            sx={{ width: '10vw' }}
          />
        </Stack>
    
  </div>
);

export default VolumeBar;
