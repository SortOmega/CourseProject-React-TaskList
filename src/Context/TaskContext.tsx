import React from "react";
import { ReactChildren, taskType } from "../types";
import { FireDB, FireDBCollection, FireDBQueryTasks } from "../data/FirebaseDB";
import { addDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";

// requerido en typescript --ESTABLECER TIPADO PARA LOS CONTEXT
type ThemeMode = "LightMode" | "DarkMode";
type TaskContextType = {
  tasks: taskType[];
  Theme: {
    getTheme: ThemeMode;
    setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
  };
  createTask(title: string, description: string): void;
  deleteTask(id: string, title: string): void;
};

//requerido en typescript --CREAR EL CONTEXT CON SUS RESPECTIVOS VALORES A EXPORTAR
export const TaskContext = React.createContext<TaskContextType>(null!);

//DECLARAR EL ELEMENTO CONTEXT JSX --------------------------------------------------------------------------
export function TaskContextProvider({ children }: ReactChildren) {
  const [tasks, setTasks] = React.useState<taskType[]>([]);
  const [theme, setTheme] = React.useState<ThemeMode>("LightMode");

  const Theme = { getTheme: theme, setTheme };

  // FUNCION PARA AGREGAR TAREAS AL TASKLIST
  async function createTask(taskTitle: string, taskDescription: string) {
    await addDoc(FireDBCollection, {
      title: taskTitle,
      description: taskDescription,
    });
    //console.log("se ha agregado una nueva tarea");
    return;
  }
  // FUNCION PARA OBTENER TAREAS DE TASKLIST
  async function getTasks() {
    onSnapshot(FireDBQueryTasks, (querySnapshot) => {
      const TaskDocs: taskType[] = [];
      querySnapshot.forEach((fireDoc) => {
        //console.log(fireDoc.data());
        const Doc: { title: string; description: string } = fireDoc.data() as {
          title: string;
          description: string;
        };
        TaskDocs.push({
          id: fireDoc.id,
          ...Doc,
        });
        setTasks(TaskDocs);
      }); //*/
    });
  }

  // FUNCION PARA ELIMINAR TAREAS DEL TASKLIST
  async function deleteTask(taskID: string, taskTitle: string) {
    if (window.confirm(`Estas seguro de borrar la tarea "${taskTitle}"?`)) {
      const DocToDelete = doc(FireDBCollection, taskID);
      await deleteDoc(DocToDelete);
    }
  }

  React.useEffect(() => {
    getTasks();
  }, []);

  // DEVUELVE LOS VALORES SELECCIONADOS DEL CONTEXTO
  const TaskContextValues: TaskContextType = {
    tasks,
    Theme,
    createTask,
    deleteTask,
  };
  return (
    <TaskContext.Provider value={TaskContextValues}>
      {children}
    </TaskContext.Provider>
  );
}
