import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
    reducerPath: 'postApi',
    // refetchOnFocus: true,
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: ({ page, limit }) => `/posts?page=${page}&limit=${limit}`,
        }),
        getPostBySlug: builder.query({
            query: (slug) => `/posts/${slug}`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllPostsQuery, useGetPostBySlugQuery } = postApi;
