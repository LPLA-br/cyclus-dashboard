import { Text, View, Pressable } from "react-native";
import { useEffect } from "react";
import { useNavigation, Stack, Link } from "expo-router";

export default function Index() {

  const navigation = useNavigation();

  useEffect(() =>
  {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen options={{title:"BLUETOOTH"}} />
      <Text>Teste do bluetooth</Text>

      <Pressable style={{backgroundColor: "#00ff00"}}>
        <Link href={"bluetooth"}> procurar dispositivo bluetooth </Link>
      </Pressable>

    </View>
  );
}
