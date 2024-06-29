const App = () => {  
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  /* create the Header component that receives as prompt the course */
  const Header = (props) => {    
    return(
      <div>
        <h1>
          {props.course}
        </h1>
      </div>
    )
  }

  /* Create the Part component */
  const Part = (props) => {
    /*console.log('part is called')*/
    return(
      <div>
        {props.part.name} {props.part.exercises}
      </div>
    )
  }

  /*Create the Content component */
  const Component = (props) => {
    return (
      <div>
        {props.parts.map(part => <Part part={part} />)}
      </div>
    )
  }
  
  /*Create the Total component */
  const Total = (props) => {
    /* console.log('Total was used')*/
    const exercises = props.parts.map(value => value.exercises)
    let sum = 0
    exercises.forEach(num =>{
      sum += num
    })
    return(
      <div>
        <p>
          Number of exercises {sum}
        </p>        
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Component parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}
export default App