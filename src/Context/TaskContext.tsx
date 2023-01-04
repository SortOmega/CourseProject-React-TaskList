import React from 'react';
import {
  GoogleAuthObject,
  GoogleUserType,
  ReactChildren,
  taskType,
} from '../types';
import jwtDecode from 'jwt-decode';
import { newGoogleUser } from '../data/TasksFunctions';

// requerido en typescript --ESTABLECER TIPADO PARA LOS CONTEXT
type ThemeMode = 'LightMode' | 'DarkMode';
type TaskContextType = {
  Tasks: {
    get: taskType[];
    set: React.Dispatch<React.SetStateAction<taskType[]>>;
  };
  Theme: {
    get: ThemeMode;
    set: React.Dispatch<React.SetStateAction<ThemeMode>>;
  };
  GoogleUser: {
    get: GoogleUserType | undefined;
    set: React.Dispatch<React.SetStateAction<GoogleUserType | undefined>>;
  };
};

//requerido en typescript --CREAR EL CONTEXT CON SUS RESPECTIVOS VALORES A EXPORTAR
export const TaskContext = React.createContext<TaskContextType>(null!);

// ------------------------------------- DECLARAR EL ELEMENTO CONTEXT JSX ------------------------------------- //
export function TaskContextProvider({ children }: ReactChildren) {
  // ----------------- INICIALIZANDO LOS HOOKS ----------------- //
  const [usuario, setUsuario] = React.useState<GoogleUserType | undefined>(
    undefined
  );
  const [tasks, setTasks] = React.useState<taskType[]>([]);
  const [theme, setTheme] = React.useState<ThemeMode>('LightMode');

  const GoogleUser = { get: usuario, set: setUsuario };
  const Theme = { get: theme, set: setTheme };
  const Tasks = { get: tasks, set: setTasks };

  // ----------------- FUNCION PARA INICIALIZAR GOOGLE IDENTITY OAUTH ----------------- //
  function handleCallbackResponse(
    Respuesta: google.accounts.id.CredentialResponse
  ) {
    //console.log('Encoded Google JWT ID: ' + Respuesta.credential);
    const GAuthObject = jwtDecode(Respuesta.credential) as GoogleAuthObject;
    //console.log(GAuthObject);
    const GUserAuth: GoogleUserType = {
      sub: GAuthObject.sub,
      email: GAuthObject.email,
      email_verified: GAuthObject.email_verified,
      name: GAuthObject.name,
      picture: GAuthObject.picture,
      given_name: GAuthObject.given_name,
    };
    setUsuario(GUserAuth);
    (document.getElementById('GoogleIdentityBTN') as HTMLElement).hidden = true;

    newGoogleUser(GUserAuth.sub as string, GUserAuth.email as string);
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

  // ----------------- FUNCION PARA OBTENER TAREAS DE TASKLIST ----------------- //

  React.useEffect(() => {
    if (GoogleUser.get === undefined) {
      InitGoogleIdentity();
    }
  }, []);

  // ----------------- DEVUELVE LOS VALORES SELECCIONADOS DEL CONTEXTO ----------------- //
  const TaskContextValues: TaskContextType = {
    Tasks,
    Theme,
    GoogleUser,
  };
  return (
    <TaskContext.Provider value={TaskContextValues}>
      {children}
    </TaskContext.Provider>
  );
}
