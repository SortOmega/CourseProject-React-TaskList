import React from 'react';
import { TaskContext } from '../Context/TaskContext';
import { TaskCardProps } from '../types';
import { deleteTask } from '../data/TasksFunctions';

function TaskCard({ task }: TaskCardProps) {
  const { Theme } = React.useContext(TaskContext);

  return (
    <div className={`TaskCard ${Theme.get}`}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button
        className={Theme.get}
        onClick={() => deleteTask(task.id, task.title)}>
        Eliminar Tarea
      </button>
    </div>
  );
}

export default TaskCard;
