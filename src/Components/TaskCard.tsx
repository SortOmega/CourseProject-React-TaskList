import React from "react";
import { TaskContext } from "../Context/TaskContext";
import { TaskCardProps } from "../types";

function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, Theme } = React.useContext(TaskContext);

  return (
    <div className={`TaskCard ${Theme.getTheme}`}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button
        className={Theme.getTheme}
        onClick={() => deleteTask(task.id, task.title)}>
        Eliminar Tarea
      </button>
    </div>
  );
}

export default TaskCard;
