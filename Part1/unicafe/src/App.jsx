import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = ({text,value,endChar=''}) => (
  <tr>
    <td>{text}</td>
    <td>{value}{endChar}</td>
  </tr>
  //<p>{text} {value}{endChar}</p>
)


const Statistics =({good,neutral,bad,allClick}) => {
  if (allClick==0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
        <tbody>          
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='average' value={((good+bad*-1)/allClick).toFixed(1)}/>
          <StatisticLine text='positive' value={(good/allClick*100).toFixed(1)}endChar='%'/>
        </tbody>
      </table> 
    </div>  
  )  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClick, setAllclick] = useState(0)

  const HandleGood = ()=>{
    setGood(good+1)
    setAllclick(allClick+1)   
  }

  const HandleNeutral = ()=>{
    setNeutral(neutral+1)
    setAllclick(allClick+1)   
  }

  const HandleBad = () => {
    setBad(bad+1)
    setAllclick(allClick+1)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={HandleGood} text='good'/>
      <Button handleClick={HandleNeutral} text='neutral'/>
      <Button handleClick={HandleBad} text='bad'/>
      <Header text='statistics'/>
      <Statistics good = {good} neutral = {neutral} bad = {bad} allClick={allClick}/>
      
    </div>
  )
}

export default App