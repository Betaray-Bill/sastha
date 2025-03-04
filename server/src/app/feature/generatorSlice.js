import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    generatorData: null
}

export const generatorDataSlice = createSlice({
    name: 'generatorData',
    initialState,
    reducers: {
        setGeneratorData: (state, action) => {
            state.generatorData = action.payload
        },
        resetGeneratorData: (state) => {
            state.generatorData = null
        }
    }
})


export const { setGeneratorData, resetGeneratorData } = generatorDataSlice.actions

export default generatorDataSlice.reducer