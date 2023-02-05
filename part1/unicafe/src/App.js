import { useState } from 'react'

const Button = ({ state, stateUpdateFunction, status }) => <button onClick={() => stateUpdateFunction(++state)}>{status}</button>

const Feedback = ({ good, neutral, bad, setGood, setNeutral, setBad }) => (
  <div>
    <h1>give feedback</h1>
    <Button state={good} stateUpdateFunction={setGood} status={"good"} />
    <Button state={neutral} stateUpdateFunction={setNeutral} status={"neutral"} />
    <Button state={bad} stateUpdateFunction={setBad} status={"bad"} />
  </div>
)

const StatisticLine = ({ statiticName, value }) => <p>{statiticName} {value}</p>

const Statistics = ({ good, neutral, bad }) => {
  const positive = ((good / (neutral + bad)) * 100)

  return (
    <div>
      <h1>statistics</h1>

      {
        good + neutral + bad ?
          <>
            <StatisticLine statiticName={"good"} value={good} />
            <StatisticLine statiticName={"neutral"} value={neutral} />
            <StatisticLine statiticName={"bad"} value={bad} />
            <StatisticLine statiticName={"all"} value={good + neutral + bad} />
            <StatisticLine statiticName={"average"} value={(good - bad) / 3} />
            <StatisticLine statiticName={"positive"} value={(!isNaN(positive) && isFinite(positive) ? positive : 0) + "%"} />
          </>
          :
          <p>No feedback given</p>
      }
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback
        good={good}
        neutral={neutral}
        bad={bad}
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App