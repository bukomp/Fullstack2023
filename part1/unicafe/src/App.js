import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Feedback = () => (
    <div>
      <h1>give feedback</h1>
      <Button state={good} stateUpdateFunction={setGood} status={"good"} />
      <Button state={neutral} stateUpdateFunction={setNeutral} status={"neutral"} />
      <Button state={bad} stateUpdateFunction={setBad} status={"bad"} />
    </div>
  )

  const Statistics = () => (
    <div>
      <h1>statistics</h1>
      <Statistic statiticName={"good"} statitic={good} />
      <Statistic statiticName={"neutral"} statitic={neutral} />
      <Statistic statiticName={"bad"} statitic={bad} />
    </div>
  )

  const Button = ({ state, stateUpdateFunction, status }) => {
    return (<button
      onClick={() => addOne(state, stateUpdateFunction)}
    >
      {status}
    </button>)
  }
  const Statistic = ({ statiticName, statitic }) => <p>{statiticName} {statitic}</p>

  const addOne = (state, stateUpdateFunction) => {
    const newState = ++state
    stateUpdateFunction(newState)
  }

  return (
    <div>
      <Feedback />
      <Statistics />
    </div>
  )
}

export default App