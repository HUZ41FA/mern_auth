import { apiSlice } from "./APISlice";

const USER_URL = '/api/users';

export const usersAPISlice = apiSlice.injectEndpoints({
    endpoint : (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useLoginMutation } = usersAPISlice;