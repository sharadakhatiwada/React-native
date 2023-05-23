import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import EditProfile from "./EditProfile";
import Ionicons from "react-native-vector-icons/Ionicons";
const Stack = createNativeStackNavigator();

function Profile() {
  const { signOut } = useContext(AuthContext);
  const [person, setPerson] = useState({});

  useEffect(() => {
    const setPersonObj = async () => {
      let res = await AsyncStorage.getItem("person");
      setPerson(JSON.parse(res));
    };
    setPersonObj();
  }, []);

  const navigation = useNavigation();
  if (!person) return "Loading...";
  return (
    <View style={styles.container}>
      <View
        style={{
          marginLeft: "38%",
          borderColor: "lightgrey",
          borderWidth: 0.5,
          borderRadius: "50%",
          height: 100,
          width: 100,
          alignItems: "center",
          paddingTop: 7,
          backgroundColor: "#FF3371",
        }}
      >
        <Ionicons name="person-outline" size={65} color="lightgrey" />
      </View>
      <Text style={styles.text}>Email: {person.email}</Text>
      <Text style={styles.text}>Phone Number: {person.phoneNumber}</Text>
      <Text style={styles.text}>Full Name: {person.fullName}</Text>
      <Text style={styles.text}>Address: {person.address}</Text>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate("edit-profile", { person, setPerson });
        }}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableHighlight>
    </View>
  );
}

export default function ProfileNavigator() {
  return (
    <Stack.Navigator initialRouteName="profile-details">
      <Stack.Screen
        name="profile-details"
        component={Profile}
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen name="edit-profile" component={EditProfile} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "grey",
    padding: 5,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    borderWidth: 0.5,
    backgroundColor: "#FF3371",
    height: 38,
    width: "70%",
    marginTop: 15,
    marginLeft: 66,
    borderRadius: "10%",
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    color: "#FFFDD0",
    padding: 2,
  },
});
//* This screen shows the owner's information (email, phone number, full name, password, address)
