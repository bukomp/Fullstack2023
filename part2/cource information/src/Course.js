
const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ parts }) => {
    const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
    const partsComponents = parts.map(part => <Part key={part.id} part={part} />)
    return <div>{partsComponents}</div>
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <p><strong>Total of {total} exercises</strong></p>
}

export default Course