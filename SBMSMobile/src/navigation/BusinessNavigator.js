import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function BusinessSelectionScreen() {
  return null;
}

export default function BusinessNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BusinessSelection"
        component={BusinessSelectionScreen}
      />
    </Stack.Navigator>
  );
}
