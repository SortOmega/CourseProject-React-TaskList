import React from 'react';
import { taskType } from '../types';
import TaskCard from './TaskCard';
import { TaskContext } from '../Context/TaskContext';

function TaskList() {
  // ----------------- INICIALIZANDO LOS HOOKS ----------------- //
  const { Tasks, Theme } = React.useContext(TaskContext);

  // ------------ RETURN COMPONENTS ------------ //
  if (Tasks.get.length === 0)
    return (
      <span className={`EmptyTaskList ${Theme.get}`}>No hay tareas aun!</span>
    );

  return (
    <div className={`TaskListBox`}>
      {Tasks.get.map((task: taskType) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
