import { createSlice } from "@reduxjs/toolkit";

const mode = {
  light: "light",
  dark: "dark",
};

const initialState = {
  mode: mode.light,
  user: null,
  advert: {
    title: "MikaCosmetics",
    url: "mikacosmetics.com",
    text: "..",
  },
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === mode.light ? mode.dark : mode.light;
      if (state.mode === mode.dark) {
        document.documentElement.classList.add(mode.dark);
      } else {
        document.documentElement.classList.remove(mode.dark);
      }
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  toggleMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
} = authSlice.actions;
export default authSlice.reducer;
