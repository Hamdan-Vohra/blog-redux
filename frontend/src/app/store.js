import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
// import {blogApi} from '../features/api/apiSlice'
// import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: {
        // [blogApi.reducerPath]:blogApi.reducer,
        posts: postsReducer,
        users: usersReducer,

    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(todoApi.middleware),
})

// required for refetchOnFocus/refetchOnReconnect behaviors
// setupListeners(store.dispatch)
