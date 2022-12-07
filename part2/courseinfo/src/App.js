const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ sum }) => <h4>total of {sum} exercises </h4>;

const Content = ({ parts }) => {
  console.log("Content");
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  console.log("Course");
  let sum = 0;
  course.parts.forEach((part) => {
    sum += part.exercises;
  });
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  );
};

const App = () => {
  console.log("App");
  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        { id: 1, name: "Fundamentals of React", exercises: 10 },
        { id: 2, name: "Using props to pass data", exercises: 7 },
        { id: 3, name: "State of a component", exercises: 14 }
      ]
    }
  ];

  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course}></Course>
      ))}
    </>
  );
};

export default App;
