export type ReactChildren = {
  children: React.ReactNode;
};

export type taskType = {
  id: string;
  emails: string[];
  title: string;
  description: string;
};

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

// ---------- Google Auth Object Type ------------- //

export type GoogleUserType = {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
};
export type GoogleAuthObject = {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  iat: number;
  exp: number;
  jti: string;
};
