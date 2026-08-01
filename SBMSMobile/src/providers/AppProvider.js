// import { QueryClientProvider } from "@tanstack/react-query";
// import { Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// import { queryClient } from "../config/queryClient";

// import { LightTheme } from "../theme";

// import { AuthProvider } from "../contexts/AuthContext";

export default function AppProvider({ children }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <SafeAreaProvider>
        <PaperProvider theme={LightTheme}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider> */}
      {children}
      {/* </AuthProvider>
          </QueryClientProvider>
        </PaperProvider>
      </SafeAreaProvider> */}
    </GestureHandlerRootView>
  );
}
