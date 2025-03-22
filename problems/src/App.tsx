import components from "./components";

const App = () => {
  return (
    <div>
      <h1>Frontend Machine Coding Questions</h1>
      {Object.entries(components).map(([name, Component]) => (
        <div key={name}>
          <h2>{name}</h2>
          <Component />
        </div>
      ))}
    </div>
  );
};

export default App;
