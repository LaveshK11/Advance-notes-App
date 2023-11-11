import { configureStore } from '@reduxjs/toolkit'
import addNotesData from '../slice/noteSlice'
import userData from '../slice/userSlice,'

const store = configureStore({
    reducer: {
        notes: addNotesData,
        user: userData,
    }
})


export default store