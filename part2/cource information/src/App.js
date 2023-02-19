const Course = ({ course }) => {
  const Header = () => <h2>{course.name}</h2>

  const Content = () => {
    const Part = ({ name, exercises }) => (<p>{name} {exercises}</p>)
    const partsComponents = course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
    const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0)

    return (
      <div>
        {partsComponents}
        <p><strong>total of {totalExercises} exercises</strong></p>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const coursesComponents = courses.map(course => <Course key={course.id} course={course} />)

  return (
    <div>
      {coursesComponents}
    </div>
  )
}

export default App
