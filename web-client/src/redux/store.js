// import { configureStore } from '@reduxjs/toolkit';

// import playerReducer from './features/playerSlice';
// import { spotifyApi } from './services/spotifyCore';

// export const store = configureStore({
//   reducer: {
//     player: playerReducer,
//     [spotifyApi.reducerPath]: spotifyApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware),
// });


import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { spotifyApi } from './services/spotifyCore';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware),
});

// Subscribe to the playerReducer state changes and log the current state to the console
const unsubscribePlayerReducer = store.subscribe(() => {
  const playerState = store.getState().player;
  console.log('PlayerReducer State:', playerState);
});

// If you want to stop logging the playerReducer state at any point, you can call the 'unsubscribePlayerReducer' function.
// For example, you can call 'unsubscribePlayerReducer()' when the component unmounts.
