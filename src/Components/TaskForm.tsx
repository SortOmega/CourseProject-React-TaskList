import React from "react";
import { TaskContext } from "../Context/TaskContext";

function TaskForm() {
  const { createTask, Theme } = React.useContext(TaskContext);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (evento: React.FormEvent) => {
    evento.preventDefault();

    if (title == "" || description == "") {
      alert("No has Agregado un Título o una descripción a la tarea!");
      return;
    }
    createTask(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className={Theme.getTheme}
        placeholder='Escribe tu tarea...'
        onChange={(evento) => setTitle(evento.target.value)}
        maxLength={40}
        value={title}
        autoFocus
      />
      <textarea
        className={Theme.getTheme}
        placeholder='Escriba la descripcion de la tarea...'
        onChange={(evento) => setDescription(evento.target.value)}
        maxLength={320}
        value={description}></textarea>
      <button className={Theme.getTheme}>Guardar</button>
    </form>
  );
}

export default TaskForm;
