import { createApi, fetchBaseQuery, isFulfilled, isRejected, isPending } from '@reduxjs/toolkit/query/react';

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://spotify81.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'f63080c13fmsh4fa61ff701124f9p151c93jsna9dfc83611d0');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopSongs: builder.query({
      query: () => '/top_200_tracks',
      retry: (failureCount, error) => {
        if (failureCount < 3 && error.status === 429) {
          return true; // Retry on rate limit error up to 3 times
        }
        return false; // Do not retry for other errors or after 3 attempts
      },
    }),
    getTopPlaylists: builder.query({
      query: () => '/search?q=top&type=playlists&offset=0&limit=20&numberOfTopResults=20',
      retry: (failureCount, error) => {
        if (failureCount < 3 && error.status === 429) {
          return true; // Retry on rate limit error up to 3 times
        }
        return false; // Do not retry for other errors or after 3 attempts
      },
    }),
    getTopArtists: builder.query({
      query: () => '/top_20_by_monthly_listeners',
      retry: (failureCount, error) => {
        if (failureCount < 3 && error.status === 429) {
          return true; // Retry on rate limit error up to 3 times
        }
        return false; // Do not retry for other errors or after 3 attempts
      },
    }),
    getTrack: builder.query({
      query: (id) => `/tracks?ids=${id}`,
      retry: (failureCount, error) => {
        if (failureCount < 3 && error.status === 429) {
          return true; // Retry on rate limit error up to 3 times
        }
        return false; // Do not retry for other errors or after 3 attempts
      }
    }),
    getPlaylist: builder.query({
      query: (id) => `/playlist?id=${id}`,
      retry: (failureCount, error) => {
        if (failureCount < 3 && error.status === 429) {
          return true; // Retry on rate limit error up to 3 times
        }
        return false; // Do not retry for other errors or after 3 attempts
      }
    }),
  }),
});

export const {
  useGetTopSongsQuery,
  useGetTopPlaylistsQuery,
  useGetTopArtistsQuery,
  useGetTrackQuery,
  useGetPlaylistQuery,
} = spotifyApi;
