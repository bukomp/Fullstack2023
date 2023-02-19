const Course = ({ course }) => {
  const Header = () => <h1>{course.name}</h1>

  const Content = () => {
    const Part = ({ name, exercises }) => (<p>{name} {exercises}</p>)
    const partsComponents = course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)

    return <div>{partsComponents}</div>
  }

  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App