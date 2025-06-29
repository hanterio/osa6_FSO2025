import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        ilmoitusNakyviin(state, action) {
            return action.payload
        },
        ilmoitusPois() {
            return initialState
        }
    }
})

export const { ilmoitusNakyviin, ilmoitusPois } = notificationSlice.actions
export default notificationSlice.reducer