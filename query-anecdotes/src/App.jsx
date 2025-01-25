import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {getAnecdotes,postAnecdotes, putAnecdotes} from './services/AnecdotesServices'
import axios from 'axios'
import { useReducer } from 'react'

const notificationReducer = (state,action)=>{
  switch(action.type){
    case 'showNotification':
      return action.payload
  
    case "eraseNotification":
      return undefined
  }
}


const App = () => {
  
  const [showNotification,showNotificationDispatch] = useReducer(notificationReducer,undefined)
  
  const queryClient = useQueryClient()
  const anecdotes = useQuery({
    queryKey: ['Anecdotes'],
    queryFn:  getAnecdotes
  })
  
  const voteMutation = useMutation({
    mutationFn: putAnecdotes,
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ['Anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote,votes:anecdote.votes+1})
    showNotificationDispatch({type:'showNotification',payload:anecdote.content})
    setTimeout(() => {
      showNotificationDispatch({type:'eraseNotification'})
    }, 2000);
  }

  

 
  
  //console.log(JSON.parse(JSON.stringify(result)))
  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]
 
  
  if ( anecdotes.isLoading ) {
    return <div>loading data...</div>
  }
  
  return (
    <div>
      <h3>Anecdote app</h3>

      {showNotification && <Notification anecdoteContent={showNotification}  />}
      
      <AnecdoteForm />
    
      {anecdotes.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
