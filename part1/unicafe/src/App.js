import { useState } from "react";

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const feedClk = (type) => () =>
    setFeedback({ ...feedback, [type]: feedback[type] + 1 });

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={feedClk("good")} text="good"></Button>
      <Button onClick={feedClk("neutral")} text="neutral"></Button>
      <Button onClick={feedClk("bad")} text="bad"></Button>
      <h2>statistics</h2>
      <Statistics feedback={feedback} />
    </div>
  );
};

const Button = (props) => {
  const { text, onClick } = props;
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ feedback }) => {
  const { good, neutral, bad } = feedback;
  const all = good + neutral + bad;
  let average = 0,
    positive = 0;
  if (all === 0) {
    return <div>No feedback given</div>;
  } else {
    average = (good * 1 + neutral * 0 + bad * -1) / all;
    positive = (good / all) * 100;
  }
  return (
    <table>
      <tbody>
        <StatisticsLine value={good} text="good"></StatisticsLine>
        <StatisticsLine value={neutral} text="neutral"></StatisticsLine>
        <StatisticsLine value={bad} text="bad"></StatisticsLine>
        <StatisticsLine value={all} text="all"></StatisticsLine>
        <StatisticsLine value={average} text="average"></StatisticsLine>
        <StatisticsLine
          value={positive.toFixed(1) + "%"}
          text="positive"
        ></StatisticsLine>
      </tbody>
    </table>
  );
};

const StatisticsLine = (props) => {
  const { text, value } = props;
  return (
    <tr>
      <th style={{ textAlign: "left" }}>{text}</th>
      <td>{value}</td>
    </tr>
  );
};

export default App;
