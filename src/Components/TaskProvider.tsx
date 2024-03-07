import { TaskAction, useTaskReducer } from "@/Hooks/taskReducer";
import { Task } from "@/type";
import { Dispatch, createContext } from "react";

export const TaskContext = createContext<Task[] | null>(null);
export const TaskDispatchContext = createContext<Dispatch<TaskAction> | null>(
  null
);

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, dispatch] = useTaskReducer();
  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
}
