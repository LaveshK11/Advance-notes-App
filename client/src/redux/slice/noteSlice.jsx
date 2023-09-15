import { createSlice } from '@reduxjs/toolkit'

const addNotesData = createSlice({
    name: "notes",
    initialState: "",
    reducers: {
        writeNotes(state, action) {
            return state + action.payload;
        },
    }
})


export default addNotesData.reducer

export const { writeNotes } = addNotesData.actions 
