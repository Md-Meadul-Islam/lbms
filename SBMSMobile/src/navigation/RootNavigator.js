import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";

import BusinessNavigator from "./BusinessNavigator";

import MainNavigator from "./MainNavigator";

import SplashScreen from "../screens/Splash/SplashScreen";

import { useAuth } from "../contexts/AuthContext";

import StorageService from "../services/storage/storage.service";

import { useEffect, useState } from "react";

export default function RootNavigator() {
  const { loading, isAuthenticated } = useAuth();

  const [hasBusiness, setHasBusiness] = useState(false);

  useEffect(() => {
    checkBusiness();
  }, []);

  async function checkBusiness() {
    const business = await StorageService.getBusiness();

    setHasBusiness(!!business);
  }

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : hasBusiness ? (
        <MainNavigator />
      ) : (
        <BusinessNavigator />
      )}
    </NavigationContainer>
  );
}
