import React from "react";
import { tasks as tareas } from "../data/tasks";
import { ReactChildren, taskType } from "../types";
import { FireDB, FireDBCollection, FireDBQueryTasks } from "../data/FirebaseDB";
import { addDoc, getDocs, onSnapshot } from "firebase/firestore";

// requerido en typescript --ESTABLECER TIPADO PARA LOS CONTEXT
type ThemeMode = "LightMode" | "DarkMode";
type TaskContextType = {
  tasks: taskType[];
  Theme: {
    getTheme: ThemeMode;
    setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
  };
  createTask(id: string, title: string, description: string): void;
  getTasks(): Promise<void>;
  deleteTask(id: string): void;
};

//requerido en typescript --CREAR EL CONTEXT CON SUS RESPECTIVOS VALORES A EXPORTAR
export const TaskContext = React.createContext<TaskContextType>(null!);

//DECLARAR EL ELEMENTO CONTEXT JSX
export function TaskContextProvider({ children }: ReactChildren) {
  const [tasks, setTasks] = React.useState<taskType[]>([]);
  const [theme, setTheme] = React.useState<ThemeMode>("LightMode");

  const Theme = { getTheme: theme, setTheme };

  // FUNCION PARA AGREGAR TAREAS AL TASKLIST
  async function createTask(
    taskID: string,
    taskTitle: string,
    taskDescription: string
  ) {
    await addDoc(FireDBCollection, {
      id: taskID,
      title: taskTitle,
      description: taskDescription,
    });

    console.log("se ha agregado una nueva tarea");
    return;
  }
  // FUNCION PARA OBTENER TAREAS DE TASKLIST
  async function getTasks() {
    const querySnapshot = await getDocs(FireDBQueryTasks);
    const FireDBUnsuscribe = onSnapshot(FireDBQueryTasks, () => {
      querySnapshot.forEach((element) => {
        console.log(element.data());
      }); //*/
    });
  }

  // FUNCION PARA ELIMINAR TAREAS DEL TASKLIST
  function deleteTask(taskID: string) {
    //Filtra el array, todos los objetos que cumplan el filtro (sean verdaderos), se mantienen!
    //setTasks(tasks.filter((tareita) => tareita.id !== taskID));
    // Borrar tarea mediante firebase
    /*console.log(tasks);
    console.log(taskID);//*/
  }

  React.useEffect(() => {
    //setTasks(tareas);
    getTasks();
  }, []);

  // DEVUELVE LOS VALORES SELECCIONADOS DEL CONTEXTO
  const TaskContextValues: TaskContextType = {
    tasks,
    Theme,
    createTask,
    getTasks,
    deleteTask,
  };
  return (
    <TaskContext.Provider value={TaskContextValues}>
      {children}
    </TaskContext.Provider>
  );
}
