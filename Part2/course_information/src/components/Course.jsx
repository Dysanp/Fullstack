const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const sum = parts.reduce((total,part) => { return total+part.exercises},0)
  return (
    <h4>Number of exercises {sum}</h4>
  )  
}


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
}
  
const Course = ({ course }) => 
  <div>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
  </div>

  export default Course