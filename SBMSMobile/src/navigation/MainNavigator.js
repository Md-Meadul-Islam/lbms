import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text } from "react-native";

const Tab = createBottomTabNavigator();

function Dashboard() {
  return <Text>Dashboard</Text>;
}

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
    </Tab.Navigator>
  );
}
