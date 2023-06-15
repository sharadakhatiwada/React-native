import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useState } from "react";
export default function EditFood({ route }) {
  const { food, editFood } = route.params;
  const [editFoodState, setEditFoodState] = useState(food);

  const onChangeHandler = (text, name) => {
    const copyEditFood = { ...editFoodState };
    copyEditFood[name] = text;
    setEditFoodState(copyEditFood);
  };

  // const handlePick = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   if (!result.cancelled) onChangeHandler(result.assets[0].uri, "image");
  // };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={editFoodState.name}
        onChangeText={(text) => onChangeHandler(text, "name")}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="price"
        value={editFoodState.price}
        onChangeText={(text) => onChangeHandler(text, "price")}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="origin"
        value={editFoodState.origin}
        onChangeText={(text) => onChangeHandler(text, "origin")}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="image.jpeg"
        value={editFoodState.image}
        onChangeText={(text) => onChangeHandler(text, "image")}
      ></TextInput>

      {editFoodState.image && (
        <Image
          source={{ uri: editFoodState.image }}
          style={{ height: 100, width: 100 }}
        />
      )}
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          editFood(editFoodState);
        }}
      >
        <Text style={styles.textButton}>Submit</Text>
      </TouchableHighlight>
    </View>
  );
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  input: {
    borderWidth: 1,
    height: 45,
    fontSize: 25,
    width: "100%",
    textAlign: "center",
    marginTop: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: 40,
    marginTop: 5,
    backgroundColor: "#87CEEB",
  },
  textButton: {
    textAlign: "center",
    fontSize: 30,
  },
});
//name, price, date, and image link.
//<Button title="Pick an image from camera roll" onPress={handlePick} />
