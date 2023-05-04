import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const CameraScreen = () => {
  const navigation = useNavigation();
  const [predictions, setPredictions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBackPress = () => {
    if (cameraRef.current) {
      cameraRef.current.pausePreview();
    }
    navigation.goBack();
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      setIsLoading(true);
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImageUri(data.uri);
      sendImageToServer(data.base64);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled) {
      setImageUri(result.uri);
      sendImageToServer(result.base64);
    }
  };
  const sendImageToServer = async (base64Image) => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/nail-disease-detection-system/3",
        params: {
          api_key: "uaZamnbnrVZrva9hch1A",
        },
        data: base64Image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setResult({ time: response.data.time });

      setPredictions(response.data.predictions);
      setIsLoading(false);
      setShowResults(true); // show results when response received
      setTimeout(() => {
        setShowResults(false); // hide results after 8 seconds
      }, 8000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" style="light" />

      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        autoFocus={Camera.Constants.AutoFocus.on}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.Cbutton}
            onPress={() =>
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }
          >
            <Feather name="rotate-ccw" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Ionicons name="camera" size={38} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.Cbutton} onPress={pickImage}>
            <Ionicons name="images" size={24} />
          </TouchableOpacity>
        </View>
      </Camera>
      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}

      {showResults ? (
        predictions.length > 0 ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Time: {result.time}</Text>
            <Text style={styles.resultText}>Predictions:</Text>
            <FlatList
              data={predictions}
              keyExtractor={(item) => item.label}
              renderItem={({ item }) => (
                <View style={styles.predictionContainer}>
                  <Text style={styles.predictionLabel}>{item.class} </Text>
                  <Text style={styles.predictionValue}>
                    {(item.confidence * 100).toFixed(2)}%
                  </Text>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>No issues detected.</Text>
          </View>
        )
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Capture your Nail to check..</Text>
        </View>
      )}

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginRight: 80,
    marginLeft: 80,
  },
  Cbutton: {
    width: 44,
    height: 44,
    borderRadius: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  loadingText: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  resultContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
});
export default CameraScreen;
