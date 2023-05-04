import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" style="inverted" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nail Disease Detection</Text>
      </View>
      <View style={styles.wrapper}>
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 26,
            marginBottom: 20,
            marginTop: -100,
          }}
        >
          Welcome Back User!
        </Text>
        <Text
          style={{ alignSelf: "flex-start", marginBottom: 50, fontSize: 18 }}
        >
          Scan the Image for get Diagnose
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Camera")}
        >
          <AntDesign
            name="camera"
            size={30}
            color="#4CAF50"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Take a Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Feather
            name="image"
            size={30}
            color="#4CAF50"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 120,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: 270,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default HomeScreen;
