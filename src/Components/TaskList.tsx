import React from "react";
import { taskType } from "../types";
import TaskCard from "./TaskCard";
import { TaskContext } from "../Context/TaskContext";

function TaskList() {
  const { tasks, Theme } = React.useContext(TaskContext);

  if (tasks.length === 0)
    return (
      <span className={`EmptyTaskList ${Theme.getTheme}`}>
        No hay tareas aun!
      </span>
    );

  return (
    <div className={`TaskListBox`}>
      {tasks.map((task: taskType) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
