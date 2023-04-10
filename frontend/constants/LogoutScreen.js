import React from "react";
import { View, Text, Button } from "react-native";

const LogoutScreen = ({ onLogOut }) => {
  const handleLogout = () => {
    onLogOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Are you sure you want to log out?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutScreen;
