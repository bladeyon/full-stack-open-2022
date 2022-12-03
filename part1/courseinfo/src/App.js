const Header = (props) => <h1>{props.course}</h1>;
const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);
const Content = (props) => (
  <>
    <Part part={props.part[0].name} exercises={props.part[0].exercises}></Part>
    <Part part={props.part[1].name} exercises={props.part[1].exercises}></Part>
    <Part part={props.part[2].name} exercises={props.part[2].exercises}></Part>
  </>
);
const Total = (props) => {
  let sum = 0;
  props.parts.forEach((part) => {
    sum += part.exercises;
  });

  return <p>Number of exercises {sum}</p>;
};
function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
}

export default App;
