import { TaskDispatchContext } from "@/Components/TaskProvider";
import { Task } from "@/type";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Input = Pick<Task, "title" | "description">;

export default function useTaskForm({
  type,
  id,
  defaultValues,
  afterSubmit,
}: {
  type: "add" | "update";
  id?: number;
  defaultValues?: Input;
  afterSubmit?: () => void;
}) {
  const taskDispatch = useContext(TaskDispatchContext);
  const form = useForm<Input>({ defaultValues });

  const handler: SubmitHandler<Input> = (data) => {
    if (type === "add") {
      taskDispatch &&
        taskDispatch({
          type: "add",
          task: { title: data.title, description: data.description },
        });
    } else if (type === "update" && id) {
      console.log("data", data);
      taskDispatch &&
        taskDispatch({
          type: "update",
          task: { id: id, title: data.title, description: data.description },
        });
    }
    form.reset();
    afterSubmit && afterSubmit();
  };
  const onSubmit = form.handleSubmit(handler);

  return { form, onSubmit };
}
