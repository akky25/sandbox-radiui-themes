import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import TaskProvider from "@/Components/TaskProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme appearance="dark">
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </Theme>
  );
}
