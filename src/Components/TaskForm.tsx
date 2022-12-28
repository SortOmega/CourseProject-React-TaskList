import React from 'react';
import { TaskContext } from '../Context/TaskContext';
import { createTask } from '../data/TasksFunctions';

function TaskForm() {
  // ----------------- INICIALIZANDO LOS HOOKS ----------------- //
  const { Theme, GoogleUser } = React.useContext(TaskContext);

  const TaskInitValues = { title: '', description: '' };
  const [taskFormValues, setTaskFormValues] = React.useState(TaskInitValues);

  // ----------------- HANDLE EVENTS ----------------- //
  const handleOnChange = (evento: React.ChangeEvent) => {
    const { name, value } = evento.target as
      | HTMLInputElement
      | HTMLTextAreaElement;

    setTaskFormValues({ ...taskFormValues, [name]: value });
  };

  const handleSubmit = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (GoogleUser.get === undefined) {
      alert('No Has Iniciado Sesion con tu cuenta de Google!');
      return;
    }

    if (taskFormValues.title == '' || taskFormValues.description == '') {
      alert('No has Agregado un Título o una descripción a la tarea!');
      return;
    }

    createTask(taskFormValues.title, taskFormValues.description);
    setTaskFormValues({ title: '', description: '' });
  };

  // ----------------- RETURN COMPONENTS ----------------- //
  return (
    <form onSubmit={handleSubmit}>
      <input
        name='title'
        type='text'
        className={Theme.get}
        placeholder='Escribe tu tarea...'
        onChange={handleOnChange}
        maxLength={40}
        value={taskFormValues.title}
        autoFocus
      />
      <textarea
        name='description'
        className={Theme.get}
        placeholder='Escriba la descripcion de la tarea...'
        onChange={handleOnChange}
        maxLength={320}
        value={taskFormValues.description}></textarea>
      <button className={Theme.get}>Guardar</button>
    </form>
  );
}

export default TaskForm;
