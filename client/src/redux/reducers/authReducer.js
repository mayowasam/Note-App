import { createSlice } from "@reduxjs/toolkit";


const initialState= {
    isAuthenticated : false,

}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        authUser:(state) => {
            state.isAuthenticated= true;
            // state.user= action.payload

        },
        removeAuth: (state) => {
            state.isAuthenticated= false;
        }
    }
})

export const {authUser, removeAuth} = authSlice.actions
export default authSlice.reducer