import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:{},
    users: []

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        addUsers: (state, action) => {
            // console.log(action.payload);
            state.users = action.payload      
        },
        addUser: (state, action) => {
            // console.log(action.payload);
            state.user = action.payload      
        },
        removeUser: (state) => {
            state.user= {} 
            state.users= {} 

        }
    }
})

export const {addUser,addUsers, removeUser} = userSlice.actions

export default userSlice.reducer
