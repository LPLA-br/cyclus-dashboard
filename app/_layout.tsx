import { Stack, Slot } from "expo-router";

export default function RootLayout() {
  return (
       <Stack screenOptions={{ headerStyle: { backgroundColor: "#ff7900" } }} >
        <Slot />
       </Stack>
  );
}
