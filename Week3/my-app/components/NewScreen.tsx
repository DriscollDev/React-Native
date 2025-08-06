import { View, Text, Button } from "react-native";
// new imports
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../App";

type NewScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'New'
>;


type NewScreenRouteProp = RouteProp<StackParamList, 'New'>;

export function NewScreen() {
  const { params } = useRoute<NewScreenRouteProp>();
  const navigation = useNavigation<NewScreenNavigationProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>New Screen</Text>
    

      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}