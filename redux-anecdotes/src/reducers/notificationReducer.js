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

export const naytaIlmoitus = (teksti, aika) => {
    return dispatch => {
        dispatch(ilmoitusNakyviin(teksti))
        setTimeout(() => {
            dispatch(ilmoitusPois())
        }, aika * 1000)
    }
}

export default notificationSlice.reducer