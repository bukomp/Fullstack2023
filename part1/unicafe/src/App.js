import { useState } from 'react'


const Statistic = ({ statiticName, statitic }) => <p>{statiticName} {statitic}</p>

const Statistics = ({ good, neutral, bad }) => {
  const positive = ((good / (neutral + bad)) * 100)

  return (

    <div>
      <h1>statistics</h1>

      {
        good + neutral + bad ?
          <>
            <Statistic statiticName={"good"} statitic={good} />
            <Statistic statiticName={"neutral"} statitic={neutral} />
            <Statistic statiticName={"bad"} statitic={bad} />
            <Statistic statiticName={"all"} statitic={good + neutral + bad} />
            <Statistic statiticName={"average"} statitic={(good - bad) / 3} />
            <Statistic statiticName={"positive"} statitic={(!isNaN(positive) && isFinite(positive) ? positive : 0) + "%"} />
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

  const Feedback = () => (
    <div>
      <h1>give feedback</h1>
      <Button state={good} stateUpdateFunction={setGood} status={"good"} />
      <Button state={neutral} stateUpdateFunction={setNeutral} status={"neutral"} />
      <Button state={bad} stateUpdateFunction={setBad} status={"bad"} />
    </div>
  )



  const Button = ({ state, stateUpdateFunction, status }) => <button onClick={() => stateUpdateFunction(++state)}>{status}</button>


  return (
    <div>
      <Feedback />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App