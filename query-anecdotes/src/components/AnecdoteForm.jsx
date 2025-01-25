import {useMutation, useQueryClient } from "@tanstack/react-query"
import { postAnecdotes } from "../services/AnecdotesServices"


const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: postAnecdotes,
    onSuccess: (newAnecdote) =>{
        //  queryClient.invalidateQueries({querykey:['Anecdotes']})

        const Anecdotes = queryClient.getQueryData(['Anecdotes'])
        queryClient.setQueryData(['Anecdotes'], Anecdotes.concat(newAnecdote))
    }

  })

  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes:0})
    console.log(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
