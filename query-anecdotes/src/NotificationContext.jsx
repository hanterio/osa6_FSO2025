import { createContext, useReducer } from 'react'

const NotificationReducer = (state, action) => {
    switch (action.type) {
    case 'NAYTA':
      return action.payload
    case 'PIILOTA':
      return ''
    default:
      return state
    }
}
 
const NotificationContext = createContext()


export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer)

  const naytaIlmoitus = (message, aika) => {
    notificationDispatch({ type: 'NAYTA', payload: message })

    setTimeout(() => {
      notificationDispatch({ type: 'PIILOTA' })
    }, aika * 1000)
  }
  return (
    <NotificationContext.Provider value={{notification, notificationDispatch, naytaIlmoitus}}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext