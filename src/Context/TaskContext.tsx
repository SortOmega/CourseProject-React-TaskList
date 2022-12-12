import React from "react";
import { tasks as tareas } from "../data/tasks";
import { ReactChildren, taskType } from "../types";

// requerido en typescript --ESTABLECER TIPADO PARA LOS CONTEXT
type ThemeMode = "LightMode" | "DarkMode";
type TaskContextType = {
  tasks: taskType[];
  Theme: {
    getTheme: ThemeMode;
    setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
  };
  createTask(title: string, description: string): void;
  deleteTask(id: number): void;
};

//requerido en typescript --CREAR EL CONTEXT CON SUS RESPECTIVOS VALORES A EXPORTAR
export const TaskContext = React.createContext<TaskContextType>({
  tasks: [],
  createTask: function (title: string, description: string): void {
    throw new Error("Function not implemented.");
  },
  deleteTask: function (id: number): void {
    throw new Error("Function not implemented.");
  },
  Theme: {
    getTheme: "LightMode",
    setTheme: function (value: React.SetStateAction<ThemeMode>): void {
      throw new Error("Function not implemented.");
    },
  },
});

//DECLARAR EL ELEMENTO CONTEXT JSX
export function TaskContextProvider({ children }: ReactChildren) {
  const [tasks, setTasks] = React.useState<taskType[]>([]);
  const [theme, setTheme] = React.useState<ThemeMode>("LightMode");

  const Theme = { getTheme: theme, setTheme };

  function createTask(taskTitle: string, taskDescription: string) {
    const newTask: taskType = {
      id: tasks.length,
      title: taskTitle,
      description: taskDescription,
    };
    setTasks([...tasks, newTask]);
    return;
  }

  function deleteTask(taskID: number) {
    //Filtra el array, todos los objetos que cumplan el filtro (sean verdaderos), se mantienen!
    setTasks(tasks.filter((tareita) => tareita.id !== taskID));
    /*console.log(tasks);
    console.log(taskID);//*/
  }

  React.useEffect(() => {
    setTasks(tareas);
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
