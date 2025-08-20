import { StackActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Button, Text } from "react-native";
import { StackParamList } from "../App";

type ModalScreenNavigationProp = StackNavigationProp<StackParamList, 'Modal'>;

export function ModalScreen() {
  const navigation = useNavigation<ModalScreenNavigationProp>();

  // Here's where we listen for the modal to close
  const closeAndNavigate = () => {
    const unsubscribe = navigation.addListener('transitionEnd', () => {
      navigation.navigate('Details', { itemId: 123, otherParam: 'test' });
      unsubscribe();
    });

    navigation.dispatch(StackActions.pop(1));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Modal</Text>
      <Button title="Go to details" onPress={closeAndNavigate} />
    </View>
  );
}