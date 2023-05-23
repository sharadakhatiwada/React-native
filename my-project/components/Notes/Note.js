import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Note({ note }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("note-details", { note });
        }}
      >
        <Text style={styles.input}>{note.header}</Text>
        <Text style={styles.input}>{note.date}</Text>
      </TouchableOpacity>
    </View>
  );
}
{
  /* <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate("note-details", { note });
        }}
      >
        <Text style={styles.buttontext}>View</Text>
      </TouchableHighlight> */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    margin: 2,
  },
  input: {
    height: 30,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "lightgrey",
  },
  button: {
    backgroundColor: "skyblue",
    borderWidth: 1,
    width: 50,
    height: 30,
  },
  buttontext: {
    textAlign: "center",
    fontSize: 20,
  },
});
//  <TextInput style={styles.input} multiline>
//    {note.comment}
//  </TextInput>;
