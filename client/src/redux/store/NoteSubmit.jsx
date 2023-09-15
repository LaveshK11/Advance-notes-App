import { configureStore } from '@reduxjs/toolkit'
import addNotesData from '../slice/noteSlice'

const store = configureStore({
    reducer: {
        notes: addNotesData
    }
})


export default store