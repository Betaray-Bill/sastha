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
        }
    }
})


export const { setUser } = employeeDetailsSlice.actions

export default employeeDetailsSlice.reducer