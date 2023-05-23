import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
export default function ViewNotes({ route }) {
  console.log(route.params);
  const { header, date, comment } = route.params.note;
  return (
    <View style={styles.container}>
      <TextInput style={styles.input}>{header}</TextInput>
      <TextInput style={styles.input}>{date}</TextInput>
      <TextInput style={styles.input} multiline>
        {comment}
      </TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    margin: 2,
  },
  input: {
    height: 35,
    fontSize: 25,
    textAlign: "center",
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
