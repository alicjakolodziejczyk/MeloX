import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://spotify23.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'f63080c13fmsh4fa61ff701124f9p151c93jsna9dfc83611d0')
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopPlaylists: builder.query({ query: () => '/search/?q=top&type=playlists&offset=0&limit=10&numberOfTopResults=5' }),
  }),
});

export const {
  useGetTopPlaylistsQuery,
} = spotifyApi;
