import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { naytaIlmoitus } from './notificationReducer'


/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/
const initialState = []/*anecdotesAtStart.map(asObject)*/


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    lisaaAnekdootti(state, action) {
      const content = action.payload
      state.push(content)
    },
    lisaaAani(state, action) {
      const id = action.payload
      const muutettavaAnekdootti = state.find(n => n.id === id)
      const muutettuAnekdootti = {
        ...muutettavaAnekdootti,
        votes: muutettavaAnekdootti.votes + 1
      }

      console.log(state)

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : muutettuAnekdootti
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
    },
  })

export const { lisaaAnekdootti, lisaaAani, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(lisaaAnekdootti(newAnecdote))
    dispatch(naytaIlmoitus(`you added '${content}'`, 5))
  }
}

export const aanestaAnekdoottia = (anekdootti) => {
  return async dispatch => {
    const muutettuAnekdootti = {
      ...anekdootti,
      votes: anekdootti.votes + 1
    }
    
    const paivitettyAnekdootti = await anecdoteService.update(muutettuAnekdootti)
    dispatch(lisaaAani(paivitettyAnekdootti.id))
    dispatch(naytaIlmoitus(`you voted '${anekdootti.content}'`, 5))
  }
}

export default anecdoteSlice.reducer