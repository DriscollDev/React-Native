import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
// new import
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./components/HomeScreen";
import { DetailsScreen } from "./components/DetailsScreen";
import { ModalScreen } from "./components/ModalScreen";
import { NewScreen } from "./components/NewScreen";

export type StackParamList = {
  Home: undefined;
  Details: { itemId: number; otherParam?: string };
  Modal: undefined;
  New: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          options={{ headerShown: true }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerTitle: "My Custom Title",
            headerTitleStyle: { color: "red" },
            headerStyle: { backgroundColor: "pink" },
            headerBackTitle: "Back",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ presentation: "modal", headerShown: true }}
        />
        <Stack.Screen
          name="New"
          component={NewScreen}
          options={{
            headerShown: true,
            headerTitle: "New Screen Title",
            headerTitleStyle: { color: "blue" },
            headerStyle: { backgroundColor: "grey" },
            headerBackTitle: "Back",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
