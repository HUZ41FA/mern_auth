import { apiSlice } from "./APISlice";

const USER_URL = '/api/v1/users';

export const usersAPISlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: ()=>({
                url: `${USER_URL}/logout`,
                method: 'POST'
            })
        }),

        register: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/`,
                method: 'POST',
                body: data
            })
        }),

        updateUser: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
    })
})

export const { 
    useLoginMutation, 
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation,
} = usersAPISlice;