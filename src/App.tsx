import React from 'react';

import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import { TaskContext } from './Context/TaskContext';
import Header from './Components/Header';

function App() {
  const { Theme } = React.useContext(TaskContext);
  return (
    <React.StrictMode>
      <div id='AppContainer' className={Theme.get}>
        <Header />
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
