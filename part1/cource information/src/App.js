const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  const Header = (props) => <h1>{props.course.name}</h1>

  const Content = (props) => {
    const Part = (props) => (<p>{props.part} {props.exercises}</p>)
    const partsComponents = props.course.parts.map((part, i) => <Part key={i} part={part.name} exercises={part.exercises} />)

    return <div>{partsComponents}</div>
  }

  const Total = (props) => (<p>Number of exercises {
    props.course.parts[0].exercises +
    props.course.parts[1].exercises +
    props.course.parts[2].exercises
  }</p>)

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App