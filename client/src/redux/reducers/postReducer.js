const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    posts : []
}
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers:{
        addPost:(state, action) => {
            // console.log("adding", state.posts);
            // console.log('addpost reducer payload',action.payload);
            state.posts = action.payload

        },
        updatePost: (state,action) => {
            // console.log("state", state.posts);
            // console.log(' action.payload', action.payload);
            const {_id} = action.payload
            const index = state.posts.map(post => post._id).indexOf(_id)
            // console.log('index in reducer to update', index);
            if(index !== -1){
                state.posts[index] = action.payload
                // console.log("updated");

            }
            
        },

        removePost:(state, action) => {
            const {_id} = action.payload
            const index = state.posts.map(post => post._id).indexOf(_id)
            console.log('index in reducer to update', index);
            if(index !== -1){
               let newPosts =state.posts.filter(post => post._id !== _id)
                console.log({newPosts});
                state.posts = newPosts

            }

        },
        removeAllPost:(state) => {
            state.posts = []

        },
    }
})

export const {addPost,updatePost,removePost, removeAllPost}= postSlice.actions
export default postSlice.reducer