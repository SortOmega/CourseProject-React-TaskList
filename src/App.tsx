import React from "react";

import ReactIcon from "./assets/react.svg";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import { TaskContext } from "./Context/TaskContext";

function App() {
  const { Theme } = React.useContext(TaskContext);

  return (
    <React.StrictMode>
      <div id='AppContainer' className={Theme.getTheme}>
        <header>
          <h1>Bienvenido</h1>
          <img
            title={`React Logo - ${Theme.getTheme}`}
            src={ReactIcon}
            className={Theme.getTheme}
            alt=''
            onClick={() =>
              Theme.getTheme == "LightMode"
                ? Theme.setTheme("DarkMode")
                : Theme.setTheme("LightMode")
            }
          />
        </header>
        <main>
          <div className='TasksContainer'>
            <TaskForm />
            <TaskList />
          </div>
        </main>
      </div>
    </React.StrictMode>
  );
}

export default App;
