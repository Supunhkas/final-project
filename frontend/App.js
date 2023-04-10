import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import BottomNavigator from "./constants/BottomNavigator";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" style="inverted" />

        {isLoggedIn ? (
          <>
            <BottomNavigator onLogOut={handleLogout} />
          </>
        ) : (
          <LoginScreen onLogin={handleLogin} />
        )}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
