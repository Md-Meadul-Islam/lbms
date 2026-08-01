// import AppProvider from "./src/providers/AppProvider";
// // import RootNavigator from "./src/navigation/RootNavigator";

// export default function App() {
//   return <AppProvider>{/* <RootNavigator /> */}</AppProvider>;
// }
// import { View, Text } from "react-native";

// export default function App() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Hello SBMS</Text>
//     </View>
//   );
// }
import { View, Text } from "react-native";
import AppProvider from "./src/providers/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello SBMS</Text>
      </View>
    </AppProvider>
  );
}
