import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Camera from "../components/CameraScreen";
import { Ionicons } from "@expo/vector-icons";
import LogoutScreen from "./LogoutScreen";

const Tab = createBottomTabNavigator();
const BottomNavigator = ({ onLogOut }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Camera") {
            iconName = focused ? "camera" : "camera-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,

        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen
        name="Logout"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out" color={color} size={size} />
          ),
        }}
      >
        {() => <LogoutScreen onLogOut={onLogOut} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomNavigator;
