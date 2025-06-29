import { useDispatch } from 'react-redux'
import { lisaaAnekdootti } from '../reducers/anecdoteReducer'
import { ilmoitusNakyviin, ilmoitusPois } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()
        
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(lisaaAnekdootti(newAnecdote))
        dispatch(ilmoitusNakyviin(`you added '${content}'`))
        setTimeout(() => {
        dispatch(ilmoitusPois())}, 5000)
      }

  return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm