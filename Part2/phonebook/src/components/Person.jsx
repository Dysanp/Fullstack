const Person = ({person,deletePerson}) => (
  
    <li>
    {person.name} {person.number} {' '}
    <button onClick={deletePerson}>delete</button>
  </li>
  )

export default Person