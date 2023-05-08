import { useIsFocusVisible } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

// state that is stored globally
// info that is stored through out the whole appplication adn we can grab it from anywhere
// don't have to pass state to different components, because you can access this global state from any component

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    // reducers are funstions that help modify the state
    reducers: {
        setMode: (state) => {
            //changing the state of the made (not directly even though it looks like you're changing state directly)
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        setlogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            // go through all of the posts and update the relevant post
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPost, setPosts } = authSlice.actions;
export default authSlice.reducer;