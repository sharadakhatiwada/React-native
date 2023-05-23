import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import Note from "./Note";
import AddNote from "./AddNotes";
import ViewNotes from "./ViewNotes";
import { useEffect, useState } from "react";
function getCurrentDateTime() {
  let date = new Date();

  return date.toUTCString();
}
const notes = [
  {
    date: getCurrentDateTime(),
    header: "Noodle",
    comment: "Need to have more noodles next week",
  },
  {
    date: getCurrentDateTime(),
    header: "Abc",
    comment: "Need to have more noodles next week",
  },
  {
    date: getCurrentDateTime(),
    header: "Xyz",
    comment: "Need to have more noodles next week",
  },
];
import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
function NoteList() {
  const navigation = useNavigation();
  const [myNote, setMyNote] = useState([]);

  const fetchAllNotes = async () => {
    axios
      .get("http://localhost:3000/notes", {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${await AsyncStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("resss", res.data);
        setMyNote(res.data);
      });
  };
  const saveNote = async (note) => {
    try {
      axios
        .post("http://localhost:3000/notes", note, {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${await AsyncStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          fetchAllNotes();
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginLeft: "38%",
          borderColor: "lightgrey",
          borderWidth: 0.5,
          borderRadius: "50%",
          height: 100,
          width: 100,
          alignItems: "center",
          paddingTop: 16,
          marginTop: 10,
          marginBottom: 5,
          backgroundColor: "#FF3371",
        }}
      >
        <Ionicons name="book" size={65} color="lightgrey" />
      </View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate("add-note", { saveNote });
        }}
      >
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableHighlight>
      <ScrollView>
        {myNote && myNote.map((note) => <Note key={note._id} note={note} />)}
      </ScrollView>
    </SafeAreaView>
  );
}
export default function NotesNavigator() {
  return (
    <Stack.Navigator initialRouteName="food">
      <Stack.Screen
        name="note-list"
        component={NoteList}
        options={{ title: "Note List", headerShown: false }}
      />
      <Stack.Screen name="add-note" component={AddNote} />
      <Stack.Screen name="note-details" component={ViewNotes} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 50,
    width: "100%",
    backgroundColor: "#FF3371",
  },
  buttonText: {
    fontSize: 30,
    textAlign: "center",
    paddingTop: 5,
    color: "lightgrey",
  },
});
