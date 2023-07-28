import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import { useGetPlaylistQuery } from '../redux/services/spotifyCore';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Dashboard() {
  const songsQuery = useGetPlaylistQuery('37i9dQZEVXbMDoHDwVN2tF');
  const [expandedSongs, setExpandedSongs] = useState(true);
  const songsData = songsQuery.data;

  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(state => state.player);

  if (!songsQuery.isLoading && !songsQuery.isError) {
    console.log("Piosenki", { songsData });
  }

  return (
    <div>
      {songsQuery.isLoading || songsQuery.isError ? (
        <Loader />
      ) : (
        <div>
          <div>
            <Typography sx={{ fontWeight: 'medium' }} variant="h4" component="div" gutterBottom>
              {songsData.name}
            </Typography>
          </div>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {expandedSongs ? (
              songsData.tracks.items.slice(0, 20).map((song, i) => (
                <Grid item xs={3} key={song.track.uri}>
                  <SongCard song={song} isPlaying={isPlaying} activeSong={activeSong} data={songsData.tracks.items} i={i} />
                </Grid>
              ))
            ) : (
              songsData.tracks.items.slice(0, 4).map((song, i) => (
                <Grid item xs={6} key={song.track.uri}>
                  <SongCard song={song} isPlaying={isPlaying} activeSong={activeSong} data={songsData.tracks.items} i={i} />
                </Grid>
              ))
            )}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
