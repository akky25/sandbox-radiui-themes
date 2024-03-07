import TaskCard from "@/Components/TaskCard";
import { TaskContext } from "@/Components/TaskProvider";
import useTaskForm from "@/Hooks/form";
import styles from "@/styles/Home.module.css";
import {
  Flex,
  Button,
  Container,
  TextArea,
  Heading,
  Section,
  TextField,
  Text,
} from "@radix-ui/themes";
import { useContext } from "react";

export default function Home() {
  const tasks = useContext(TaskContext);

  const {
    form: {
      register,
      reset,
      formState: { errors },
    },
    onSubmit,
  } = useTaskForm({ type: "add" });

  return (
    <>
      <Container size="1" pt="6">
        <Section py="0">
          <form onSubmit={onSubmit}>
            <Flex direction="column" gap="2">
              <Text as="label">
                <Flex direction="column" gap="1">
                  タイトル
                  <TextField.Root>
                    <TextField.Input
                      placeholder="Search the docs…"
                      {...register("title", { required: "true" })}
                      data-error={!!errors.title}
                    />
                  </TextField.Root>
                </Flex>
              </Text>
              <Text as="label">
                <Flex direction="column" gap="1">
                  内容
                  <TextArea
                    placeholder="description…"
                    className={styles.textArea}
                    {...register("description", { required: "true" })}
                    data-error={!!errors.description}
                  />
                </Flex>
              </Text>
              <Flex gap="3" pt="3" justify="end">
                <Button
                  size="2"
                  color="gray"
                  className={styles.button}
                  type="button"
                  onClick={() => reset()}
                >
                  クリア
                </Button>
                <Button size="2" className={styles.button} type="submit">
                  作成
                </Button>
              </Flex>
            </Flex>
          </form>
        </Section>
        <Section pt="5">
          <Heading align="center">Tasks</Heading>
          <Flex pt="2" direction="column" gap="2">
            {tasks?.map((task) => {
              return <TaskCard key={task.id} {...task} />;
            })}
          </Flex>
        </Section>
      </Container>
    </>
  );
}
