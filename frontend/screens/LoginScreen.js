import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/loginImages/BgImage2.png")}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View style={styles.formWrapper}>
          <Image
            source={require("../assets/loginImages/fingernail.png")}
            style={{ resizeMode: "contain", height: 50 }}
          />
          <Text style={styles.header}>Login</Text>

          <Text style={styles.label}>User Name</Text>
          <TextInput style={styles.txtInput} placeholder="UserName" />

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.txtInput} placeholder="Password" />
          <TouchableOpacity style={styles.button}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  formWrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#1C1E21",
  },
  txtInput: {
    backgroundColor: "#F0F2F5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E4E6EB",
    fontSize: 16,
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#00a6a5",
    padding: 10,
    borderRadius: 5,
    paddingVertical: 10,
    width: "100%",
  },
});
