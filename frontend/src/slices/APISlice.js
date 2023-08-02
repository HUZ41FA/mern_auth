import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Base url is empty string because we are using proxy in vite.config.js
const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});