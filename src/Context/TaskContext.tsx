import React from 'react';
import { GoogleAuthObject, ReactChildren, taskType } from '../types';
import jwtDecode from 'jwt-decode';
import { FireDBCollection, FireDBQueryTasks } from '../data/FirebaseDB';
import { addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

// requerido en typescript --ESTABLECER TIPADO PARA LOS CONTEXT
type ThemeMode = 'LightMode' | 'DarkMode';
type TaskContextType = {
  tasks: taskType[];
  Theme: {
    get: ThemeMode;
    set: React.Dispatch<React.SetStateAction<ThemeMode>>;
  };
  GoogleUser: {
    get: GoogleAuthObject | undefined;
    set: React.Dispatch<React.SetStateAction<GoogleAuthObject | undefined>>;
  };
  createTask(title: string, description: string): void;
  deleteTask(id: string, title: string): void;
};

//requerido en typescript --CREAR EL CONTEXT CON SUS RESPECTIVOS VALORES A EXPORTAR
export const TaskContext = React.createContext<TaskContextType>(null!);

//DECLARAR EL ELEMENTO CONTEXT JSX --------------------------------------------------------------------------
export function TaskContextProvider({ children }: ReactChildren) {
  // ----------------- INICIALIZANDO LOS HOOKS ----------------- //
  const [usuario, setUsuario] = React.useState<GoogleAuthObject | undefined>(
    undefined
  );
  const [tasks, setTasks] = React.useState<taskType[]>([]);
  const [theme, setTheme] = React.useState<ThemeMode>('LightMode');

  const Theme = { get: theme, set: setTheme };
  const GoogleUser = { get: usuario, set: setUsuario };

  // ----------------- FUNCION PARA INICIALIZAR GOOGLE IDENTITY OAUTH ----------------- //
  function handleCallbackResponse(
    Respuesta: google.accounts.id.CredentialResponse
  ) {
    console.log('Encoded Google JWT ID: ' + Respuesta.credential);
    const GAuthObject = jwtDecode(Respuesta.credential) as GoogleAuthObject;
    console.log(GAuthObject);
    setUsuario(GAuthObject);
    (document.getElementById('GoogleIdentityBTN') as HTMLElement).hidden = true;
  }

  function InitGoogleIdentity() {
    google.accounts.id.initialize({
      client_id:
        '548715619918-feud32epistvob7i1g14vskj4o65sltl.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('GoogleIdentityBTN') as HTMLElement,
      {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        shape: 'circle',
      }
    );
    google.accounts.id.prompt();
  }

  // ----------------- FUNCION PARA AGREGAR TAREAS AL TASKLIST ----------------- //
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
    if (GoogleUser.get === undefined) {
      InitGoogleIdentity();
      getTasks();
    }
  }, [GoogleUser.get]);

  // DEVUELVE LOS VALORES SELECCIONADOS DEL CONTEXTO
  const TaskContextValues: TaskContextType = {
    tasks,
    Theme,
    GoogleUser,
    createTask,
    deleteTask,
  };
  return (
    <TaskContext.Provider value={TaskContextValues}>
      {children}
    </TaskContext.Provider>
  );
}
