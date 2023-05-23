import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Button,
  Image,
} from "react-native";

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function AddFood({ route }) {
  const { handleSubmit } = route.params;
  const [food, setFood] = useState({
    name: "",
    price: "",
    origin: "",
    image: "",
  });
  const handleChange = (text, name) => {
    const copyFood = { ...food };
    copyFood[name] = text;
    setFood(copyFood);
  };

  const handlePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) handleChange(result.assets[0].uri, "image");
  };
  console.log(food);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={food.name}
        onChangeText={(text) => handleChange(text, "name")}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="price"
        value={food.price}
        onChangeText={(text) => handleChange(text, "price")}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="origin"
        value={food.origin}
        onChangeText={(text) => handleChange(text, "origin")}
      ></TextInput>
      <Button title="Pick an image from camera roll" onPress={handlePick} />
      <View>
        {food.image && (
          <Image
            source={{ uri: food.image }}
            style={{ height: 200, width: "80%" }}
          />
        )}
      </View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => handleSubmit(food)}
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
    borderWidth: 0.5,
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
