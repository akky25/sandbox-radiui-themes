import { Task } from "@/type";
import { useReducer } from "react";

export type TaskAction =
  | { type: "add"; task: Pick<Task, "title" | "description"> }
  | { type: "delete"; id: number }
  | { type: "update"; task: Omit<Task, "updatedAt"> };

function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "add":
      // 新しいタスクのIDを決定
      const maxId = state.reduce((max, task) => Math.max(max, task.id), 0);
      const newTask: Task = {
        id: maxId + 1,
        title: action.task.title,
        description: action.task.description,
        updatedAt: new Date(),
      };
      return [newTask, ...state];

    case "delete":
      return state.filter((task) => task.id !== action.id);

    case "update":
      return state.map((task) =>
        task.id === action.task.id
          ? { ...task, ...action.task, updatedAt: new Date() }
          : task
      );

    default:
      return state;
  }
}

const initialTasks: Task[] = [
  {
    id: 2,
    title: "タスク２",
    description: "xxxxx",
    updatedAt: new Date("2024-03-02T09:05:00"),
  },
  {
    id: 1,
    title: "タスク１",
    description: "xxxxx",
    updatedAt: new Date("2023-12-30T14:24:00"),
  },
];

export const useTaskReducer = () => {
  return useReducer(tasksReducer, initialTasks);
};
