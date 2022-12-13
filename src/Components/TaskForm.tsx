import React from "react";
import { taskType } from "../types";
import { TaskContext } from "../Context/TaskContext";

function TaskForm() {
  const { createTask, Theme } = React.useContext(TaskContext);

  const TaskInitValues: taskType = { title: "", description: "" };
  const [taskValues, setTaskValues] = React.useState<taskType>(TaskInitValues);

  const handleOnChange = (evento: React.ChangeEvent) => {
    const { name, value } = evento.target as
      | HTMLInputElement
      | HTMLTextAreaElement;

    setTaskValues({ ...taskValues, [name]: value });
  };

  const handleSubmit = (evento: React.FormEvent) => {
    evento.preventDefault();

    if (taskValues.title == "" || taskValues.description == "") {
      alert("No has Agregado un Título o una descripción a la tarea!");
      return;
    }
    createTask(taskValues.title, taskValues.description);
    setTaskValues({ title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='title'
        type='text'
        className={Theme.getTheme}
        placeholder='Escribe tu tarea...'
        onChange={handleOnChange}
        maxLength={40}
        value={taskValues.title}
        autoFocus
      />
      <textarea
        name='description'
        className={Theme.getTheme}
        placeholder='Escriba la descripcion de la tarea...'
        onChange={handleOnChange}
        maxLength={320}
        value={taskValues.description}></textarea>
      <button className={Theme.getTheme}>Guardar</button>
    </form>
  );
}

export default TaskForm;
