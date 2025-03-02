import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    generatorData: null
}

export const createGeneratorSlice = createSlice({
    name: 'generatorData',
    initialState,
    reducers: {
        setGeneratorData: (state, action) => {
            state.generatorData = action.payload
        }
    }
})


export const { setGeneratorData } = createGeneratorSlice.actions

export default createGeneratorSlice.reducer