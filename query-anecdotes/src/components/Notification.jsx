// eslint-disable-next-line react/prop-types
const Notification = ({anecdoteContent}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  //if (true) return null

  return (
    <div style={style}>
      {anecdoteContent} voted
    </div>
  )
}

export default Notification
