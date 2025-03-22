import components from "./components";
import "./App.css";

const App = () => {
  return (
    <div className="app-wrapper">
      <h1>Frontend Machine Coding Questions</h1>
      <div className="app-container">
        {Object.entries(components).map(([name, Component], index) => (
          <div key={name}>
            <h2>
              {index + 1}. {name}
            </h2>
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
