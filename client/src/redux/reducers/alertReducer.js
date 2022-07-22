import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    alert:{
        message:"",
        success: ""
    },

}

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers:{
        addAlert: (state, action) => {
            // console.log(action.payload);
            state.alert= action.payload
        },
        removeAlert: (state) => {
            state.alert= initialState
        }
    }
})

export const {addAlert, removeAlert} = alertSlice.actions

export default alertSlice.reducer
