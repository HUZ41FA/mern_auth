import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// The base URL is empty string, because we are using proxy vite.config.js
const baseQuery = fetchBaseQuery({baseUrl: ""})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], // For Caching
    endpoints: (builder)=>({})
})