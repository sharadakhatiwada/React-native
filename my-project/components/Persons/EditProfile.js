import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function EditProfile({ route }) {
  const { person, setPerson } = route.params;
  const [personObj, setPersonObj] = useState(person);
  const navigation = useNavigation();

  const onChangeHandler = (text, name) => {
    const copyuser = { ...personObj };
    copyuser[name] = text;
    setPersonObj(copyuser);
  };

  const submitHandler = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("token ", token);
      axios.put(
        `http://localhost:3000/person`,
        { person: personObj },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
        }
      );
      await AsyncStorage.setItem("person", JSON.stringify(personObj));
      setPerson(personObj);
      navigation.navigate("profile-details");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={personObj.phoneNumber}
          onChangeText={(text) => onChangeHandler(text, "phoneNumber")}
        ></TextInput>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>Full Name:</Text>
        <TextInput
          style={{
            borderWidth: 0.25,
            height: 45,
            fontSize: 18,
            width: "77%",
            textAlign: "center",
            marginTop: 5,
            marginLeft: 6,
          }}
          placeholder="Full Name"
          value={personObj.fullName}
          onChangeText={(text) => onChangeHandler(text, "fullName")}
        ></TextInput>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>Password:</Text>
        <TextInput
          style={{
            borderWidth: 0.25,
            height: 45,
            fontSize: 18,
            width: "77%",
            textAlign: "center",
            marginTop: 5,
            marginLeft: 6,
          }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => onChangeHandler(text, "password")}
        ></TextInput>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>Address:</Text>
        <TextInput
          style={{
            borderWidth: 0.25,
            height: 45,
            fontSize: 18,
            width: "80%",
            textAlign: "center",
            marginTop: 5,
            marginLeft: 5,
          }}
          placeholder="Address"
          value={personObj.address}
          onChangeText={(text) => onChangeHandler(text, "address")}
        ></TextInput>
      </View>

      <TouchableHighlight style={styles.button} onPress={submitHandler}>
        <Text style={styles.textButton}>Submit</Text>
      </TouchableHighlight>
    </View>
  );
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    justifyContent: "center",
  },
  input: {
    borderWidth: 0.25,
    height: 45,
    fontSize: 18,
    width: "67%",
    textAlign: "center",
    marginTop: 5,
    marginLeft: 4,
  },
  button: {
    width: "70%",
    height: 40,
    marginTop: 25,
    backgroundColor: "#FF3371",
    marginLeft: 60,
    borderRadius: "10%",
  },
  textButton: {
    textAlign: "center",
    fontSize: 30,
    color: "lightgrey",
  },
  text: {
    fontSize: 15,
    paddingTop: 15,
  },
});
//name, price, date, and image link.
