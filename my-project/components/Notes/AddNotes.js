import {
  Text,
  TouchableHighlight,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function AddNote({ route }) {
  const navigation = useNavigation();
  const { saveNote } = route.params;
  const [notes, setNotes] = useState({ header: "", comment: "" });
  const onChangeHandler = (text, name) => {
    const copyNotes = { ...notes };
    copyNotes[name] = text;
    setNotes(copyNotes);
  };
  const onSubmitHandler = () => {
    saveNote(notes);
    navigation.navigate("note-list");
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Header"
        style={styles.inputHeader}
        value={notes.header}
        onChangeText={(text) => onChangeHandler(text, "header")}
      ></TextInput>
      <TextInput
        placeholder="Comment"
        style={styles.inputComment}
        multiline
        value={notes.comment}
        onChangeText={(text) => onChangeHandler(text, "comment")}
      ></TextInput>
      <TouchableHighlight style={styles.button} onPress={onSubmitHandler}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputHeader: {
    height: 45,
    borderWidth: 0.5,
    margin: 5,
    paddingLeft: 5,
  },
  inputComment: {
    height: 80,
    borderWidth: 0.5,
    margin: 5,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#FF3371",
    width: "50%",
    height: 40,
    marginLeft: "40%",
    borderRadius: "10%",
  },
  buttonText: {
    fontSize: 30,
    textAlign: "center",
    color: "lightgrey",
  },
});
