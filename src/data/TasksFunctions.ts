import { doc, addDoc, deleteDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { taskType } from '../types';
import {
  FireDB_TaskListCollection,
  FireDB_TaskListQuery,
  FireDB,
  GoogleCollectionName,
} from './FirebaseDB';

// --------------------------- FUNCIONES PARA COLECCION DE TASKLIST --------------------------- //
//async function checkGoogleUser(subId: string) {}

//async function deleteGoogleUser(subId: string) {}
// FUNCION PARA AGREGAR USUARIOS DEL GoogleUsers
export async function newGoogleUser(subId: string, email: string) {
  try {
    const GUserData = {
      email,
    };
    await setDoc(doc(FireDB, GoogleCollectionName, subId), GUserData);
    return;
  } catch (error) {
    console.warn(error);
  }
  return;
}

export function getGoogleUser(subId: string) {
  try {
    doc(FireDB, GoogleCollectionName, subId);
    return true;
  } catch (_error) {
    return false;
  }
}
// --------------------------- FUNCIONES PARA COLECCION DE TASKLIST --------------------------- //
// FUNCION PARA AGREGAR TAREAS DEL TASKLIST
export async function createTask(
  emails: string[],
  taskTitle: string,
  taskDescription: string
) {
  await addDoc(FireDB_TaskListCollection, {
    emails,
    title: taskTitle,
    description: taskDescription,
  });
  //console.log("se ha agregado una nueva tarea");
  return;
}

// FUNCION PARA ELIMINAR TAREAS DEL TASKLIST
export async function deleteTask(taskID: string, taskTitle: string) {
  if (window.confirm(`Estas seguro de borrar la tarea "${taskTitle}"?`)) {
    const DocToDelete = doc(FireDB_TaskListCollection, taskID);
    await deleteDoc(DocToDelete);
  }
}

export async function getTasks(
  Gemail: string,
  setTasks: React.Dispatch<React.SetStateAction<taskType[]>>
) {
  onSnapshot(FireDB_TaskListQuery, (querySnapshot) => {
    const TaskDocs: taskType[] = [];
    querySnapshot.forEach((fireDoc) => {
      //console.log(fireDoc.data());
      const Doc: { emails: string[]; title: string; description: string } =
        fireDoc.data() as {
          emails: string[];
          title: string;
          description: string;
        };

      if (Doc.emails.some((email) => email === Gemail)) {
        TaskDocs.push({
          id: fireDoc.id,
          ...Doc,
        });
      }
      setTasks(TaskDocs);
    }); //*/
  });
}
// --------- TESTING LOCAL DATA --------- //
/*export const tasks: taskType[] = [
  { id: '1', title: 'Mi primer Tarea', description: 'Esta es mi primer tarea' },
  {
    id: '2',
    title: 'Mi segunda Tarea',
    description: 'Esta es mi segunda tarea',
  },
  { id: '3', title: 'Mi tercer Tarea', description: 'Esta es mi tercer tarea' },
];*/
