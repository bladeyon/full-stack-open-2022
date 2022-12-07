const Header = ({ course }) => <h3>{course}</h3>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ parts }) => {
  let sum = parts.reduce((sum, part) => (sum += part.exercises), 0);
  return <h4>total of {sum} exercises </h4>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const App = () => {
  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        { id: 1, name: "Fundamentals of React", exercises: 10 },
        { id: 2, name: "Using props to pass data", exercises: 7 },
        { id: 3, name: "State of a component", exercises: 14 },
        { id: 4, name: "Redux", exercises: 11 }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        { name: "Routing", exercises: 3, id: 1 },
        { name: "Middlewares", exercises: 7, id: 2 }
      ]
    }
  ];

  return (
    <>
      <h1>Web development</h1>
      {courses.map((course) => (
        <Course key={course.id} course={course}></Course>
      ))}
    </>
  );
};

export default App;
