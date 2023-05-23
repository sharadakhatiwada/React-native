import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Food({ food, deleteFood, editFood }) {
  const navigation = useNavigation();
  const deletePress = () => {
    Alert.alert("Are You Sure", "to delete this food", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: () => {
          deleteFood(food);
        },
      },
    ]);
  };
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "70%" }}>
          <Text style={styles.text}>Name: {food.name}</Text>
          <Text style={styles.text}>Origin: {food.origin}</Text>
          <Text style={styles.text}>Price: {food.price}</Text>
          <Text style={styles.text}>Date: {food.createdDate}</Text>

          <View style={styles.buttonFlex}>
            <TouchableHighlight
              style={styles.button}
              onPress={() =>
                navigation.navigate("edit-food", { food, editFood })
              }
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={deletePress}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => navigation.navigate("food-details", { food })}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={{ width: "50%" }}>
          <Image
            source={{ uri: food.image }}
            style={{ height: 150, width: 110 }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  miniContainer: {
    flexDirection: "column",
  },
  input: {
    borderWidth: 1,
    boderColoor: "black",
  },
  buttonFlex: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    padding: 5,
  },
  button: {
    borderWidth: 0.5,
    backgroundColor: "#FF3371",
    borderRadius: "4%",
    width: "25%",
    margin: 2,
    borderColor: "grey",
  },
  buttonText: {
    textAlign: "center",
    color: "lightgrey",
  },
  card: {
    backgroundColor: "lightgrey",
    marginBottom: 5,
    flex: 1,
  },
});
