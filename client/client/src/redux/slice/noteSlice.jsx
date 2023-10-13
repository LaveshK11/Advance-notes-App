import { createSlice } from '@reduxjs/toolkit'

const addNotesData = createSlice({
    name: "notes",
    initialState: {
        editorHtml: '',
    },
    reducers: {
        writeNotes: (state, action) => {
            state.editorHtml = action.payload;
        },
        setInputBoxEmpty: (state, action) => {
            state.editorHtml = ""; 
        },
    }
})


export default addNotesData.reducer

export const { writeNotes, setInputBoxEmpty } = addNotesData.actions 
