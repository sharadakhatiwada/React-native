import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
export default function SignUp() {
  const { signUp, err } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    address: "",
  });
  const onChangeHandler = (text, name) => {
    const copyUser = { ...user };
    copyUser[name] = text;
    setUser(copyUser);
  };
  const onSubmitHandler = () => {
    signUp(user);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email.."
        type="email"
        value={user.email}
        onChangeText={(text) => onChangeHandler(text, "email")}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={user.phoneNumber}
        onChangeText={(text) => onChangeHandler(text, "phoneNumber")}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={user.fullName}
        onChangeText={(text) => onChangeHandler(text, "fullName")}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={user.password}
        secureTextEntry={true}
        onChangeText={(text) => onChangeHandler(text, "password")}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={user.address}
        onChangeText={(text) => onChangeHandler(text, "address")}
      ></TextInput>
      <Text>{err("signUp")}</Text>

      <TouchableHighlight style={styles.button} onPress={onSubmitHandler}>
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
