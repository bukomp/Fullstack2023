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

  const Header = (props) => <h1>{props.course}</h1>
  const Part = (props) => (<p>{props.part} {props.exercises}</p>)

  const Content = (props) => {
    const partsComponents = props.parts.map((part, i) => <Part key={i} part={part.name} exercises={part.exercises} />)
    return (<div>
      {partsComponents}
    </div>)
  }

  const Total = (props) => (<p>Number of exercises {props.parts.exercises + props.parts.exercises + props.parts.exercises}</p>)

  return (
    <div>
      <Header course={course} />
      <Content
        parts={parts}
      />
      <Total
        parts={parts}
      />
    </div>
  )
}

export default App