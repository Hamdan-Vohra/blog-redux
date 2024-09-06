import {createApi,fetchBaseQuery} from'@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath:'api',
    tagTypes:['posts'],
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3500/blogs'}),
    endpoints:(builder)=>({
        getBlogPosts:builder.query({
            query:()=>({url:'/'}),
            transformResponse:res=>res.sort((a,b)=>b.date < a.date),
            providesTags:['posts']
        }),
        getEachBlog:builder.query({
            query:({id})=>({
                url:`/${id}`,
                method:'GET',
                body:id
            })
        }),
        postNewBlog:builder.mutation({
            query:(blog)=>({
                url:'/',
                method:'POST',
                body:blog
            }),
            invalidatesTags:['posts']
        }),
        editBlogPost:builder.mutation({
            query:(blog)=>({
                url:`/${blog.id}`,
                method:'PATCH',
                body:blog
            }),
            invalidatesTags:['posts']
        }),
        deleteBlogPost:builder.mutation({
            query:({id})=>({
                url:`/${id}`,
                method:'DELETE',
                body:id
            }),
            invalidatesTags:['posts']
        }),
    })
})

export const {
    useGetBlogPostsQuery,
    useGetEachBlogQuery,
    useDeleteBlogPostMutation,
    useEditBlogPostMutation,
    usePostNewBlogMutation,
} = blogApi