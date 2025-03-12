import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employeeDetails: null
}

export const employeeDetailsSlice = createSlice({
    name: 'employeeDetails',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.employeeDetails = action.payload
        },
        resetUser: (state, action) => {
            console.log("object")
            state.employeeDetails = action.payload
        }
    }
})


export const { setUser, resetUser } = employeeDetailsSlice.actions

export default employeeDetailsSlice.reducer