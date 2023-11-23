import { createSlice } from '@reduxjs/toolkit'


const usersData = createSlice({
    name: "user",
    initialState: {
        tokens: {
            accessToken: null || localStorage.getItem('AT'),
            refreshToken: localStorage.getItem('RT') || ""
        }
    },
    reducers: {
        storeUserTokens: (state, action) => {

            localStorage.setItem('AT', (action.payload.accessToken))

            localStorage.setItem('RT', (action.payload.refreshToken))

            state.tokens.accessToken = action.payload.accessToken

            state.tokens.refreshToken = action.payload.refreshToken

        },
        removeUserTokens: (state, action) => {

            localStorage.removeItem('AT')

            localStorage.removeItem('RT')

            state.tokens.accessToken = ""

            state.tokens.refreshToken = ""

        }
    }
})


export default usersData.reducer

export const { storeUserTokens, removeUserTokens } = usersData.actions

