export type ReactChildren = {
  children: React.ReactNode;
};

export type taskType = { id: string; title: string; description: string };

export type TaskFormProps = {
  createTask(taskTitle: string, taskDescription: string): void;
};

export type TaskListProps = {
  tasks: taskType[];
  deleteTask(taskID: number): void;
};

export type TaskCardProps = {
  task: taskType;
};

export type firebaseConfigType = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};
