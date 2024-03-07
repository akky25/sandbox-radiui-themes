import { Flex, Text, Box, Card } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import EditDialog from "./EditDialog";
import { useContext, useState } from "react";
import { Task } from "@/type";
import { format } from "date-fns";
import { TaskDispatchContext } from "./TaskProvider";

export default function TaskCard(task: Task) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const taskDispatch = useContext(TaskDispatchContext);
  return (
    <>
      <Card asChild>
        <button onClick={() => setOpenEditDialog(true)}>
          <Flex gap="3" align="center" justify="between">
            <Box>
              <Text as="div" size="3" weight="bold">
                {task.title}
              </Text>
              <Text as="div" size="1" color="gray">
                {format(task.updatedAt, "yyyy/MM/dd HH:mm")}
              </Text>
            </Box>
            <div
              role="button"
              aria-label={`削除 ${task.title}`}
              className="rt-reset rt-BaseButton rt-IconButton rt-r-size-2 rt-variant-ghost"
              onClick={(e) => {
                e.stopPropagation();
                taskDispatch && taskDispatch({ type: "delete", id: task.id });
              }}
            >
              <Cross1Icon color="gray" />
            </div>
          </Flex>
        </button>
      </Card>
      <EditDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        task={task}
      />
    </>
  );
}
