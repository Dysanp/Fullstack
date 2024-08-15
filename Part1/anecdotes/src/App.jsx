import { useState } from 'react'

const Button = ({text,onClick}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({text,votes}) => <p>{text}<br/>has {votes} votes</p>

const Header = ({text}) => <h1>{text}</h1>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const voteObject = {};
  for (let i = 0; i <= anecdotes.length; i++) {
    voteObject[i] = 0;
  }
  
  const [votes,setVotes] = useState(voteObject)
  
  const HandleNext = () => {
    const randsel = Math.floor(Math.random()*anecdotes.length)    
    setSelected(randsel)    
  }

  const HandleVote = () => {
    const voteCopy = {...votes}
    voteCopy[selected] += 1
    setVotes(voteCopy)
    if (voteCopy[selected] > voteCopy[maxSelected]) {
      setMaxSelected(selected)
    }
  }
  const [maxSelected,setMaxSelected] = useState(0)
  
  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={HandleVote} text='vote'/>
      <Button onClick={HandleNext} text='next anecdote'/>
      <Header text='Anecdote with most votes'/>
      <Anecdote text={anecdotes[maxSelected]} votes={votes[maxSelected]}/>
    </div>
  )
}

export default App
