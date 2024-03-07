import useTaskForm from "@/Hooks/form";
import { Task } from "@/type";
import {
  Button,
  Dialog,
  Flex,
  TextField,
  Text,
  TextArea,
} from "@radix-ui/themes";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
};

export default function EditDialog({ open, onOpenChange, task }: Props) {
  const {
    form: {
      register,
      reset,
      formState: { errors },
    },
    onSubmit,
  } = useTaskForm({
    type: "update",
    id: task.id,
    defaultValues: { title: task.title, description: task.description },
    afterSubmit: () => onOpenChange(false),
  });

  const handleClose = () => reset();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: 450 }} onInteractOutside={handleClose}>
        <Dialog.Title>タスクの編集</Dialog.Title>
        <form onSubmit={onSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text size="2" mb="1" weight="bold">
                タイトル
              </Text>
              <TextField.Input
                {...register("title", { required: true })}
                data-error={!!errors.title}
              />
            </label>
            <label>
              <Text size="2" mb="1" weight="bold">
                内容
              </Text>
              <TextArea
                size="3"
                {...register("description", { required: true })}
                data-error={!!errors.description}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Dialog.Close>
            {/* <Dialog.Close type="submit"> */}
            <Button>Save</Button>
            {/* </Dialog.Close> */}
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
