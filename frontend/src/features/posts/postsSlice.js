import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = 'http://localhost:3500/blogs';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try{
        const response = await axios.get(POSTS_URL)
        return response.data
    }catch (err){
        return err.message
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try{
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
    } catch (err){
        return err.message
    }
})

export const updatePost = createAsyncThunk('posts/updatePost',async(updatedPost)=>{
    try{
        const response = await axios.put(`${POSTS_URL}/${updatedPost.id}`,updatedPost)
        return response.data;
    }catch (err){
        //while updating new post it will give 500 netwrok error as the new post generated is not updated the API database
        return err.message
    }
})

export const deletePost = createAsyncThunk('posts/deletePost',async(id)=>{
    console.log('deleting')
    try{
        const response = await axios.delete(`${POSTS_URL}/${id}`);
        if(response?.status === 200) return id;
        return `${response?.status}: ${response?.statusText}`
    }catch (err){
        return err.message
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                if(typeof action.payload === 'string')
                {
                    state.status = 'failed'
                    state.error = action.payload;
                    console.log('Fetch couldn\'t complete');
                    console.log(action.payload);
                    return;
                }

                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                // state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled,(state,action)=>{
                if(!action.payload?.id){
                    console.log('Update couldn\'t complete');
                    console.log(action.payload);
                    return;
                }

                const {id} = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter(post=> post.id !== id);
                state.posts = [...posts,action.payload];

            })
            .addCase(deletePost.fulfilled,(state,action)=>{
                if(!action.payload?.id){
                    console.log('Delete couldn\'t possible')
                    console.log(action.payload)//this was an error return by async function
                    return;
                }

                const {id} = action.payload;
                state.posts = state.posts.filter(post=>post.id !== id);
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state,postId) => state.posts.posts.find(post=> post.id.toString() === postId.toString());
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer