import { useSelector, useDispatch } from 'react-redux'
import { lisaaAani } from '../reducers/anecdoteReducer'
import { ilmoitusNakyviin, ilmoitusPois } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector( state => {
    const anecdotes = state.anecdotes
    const filter = state.filter
    return anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (id) => {
    console.log('vote', id)
    dispatch(lisaaAani(id))
    const anekdootti = anecdotes.find((a => a.id === id))
    dispatch(ilmoitusNakyviin(`you voted '${anekdootti.content}'`))
    setTimeout(() => {
        dispatch(ilmoitusPois())}, 5000)
  }

  return (
    <div>
      
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}
export default AnecdoteList