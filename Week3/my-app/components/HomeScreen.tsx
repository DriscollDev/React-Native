import { Text, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
// new imports
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../App";

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, "Home">;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is the home screen!</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", { itemId: 123, otherParam: "test" })
        }
      />
      <Button title="Open Modal" onPress={() => navigation.navigate("Modal")} />
      <Button
        title="Go to New Screen"
        onPress={() =>
          navigation.navigate("New")
        }
      />
    </View>
  );
}
