import { useContext, useState } from "react";
import { AuthContext } from "../App";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import SignUp from "./SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
export default function Login() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={LoginPerson}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="sign-up" component={SignUp} />
    </Stack.Navigator>
  );
}

function LoginPerson() {
  const [user, setUser] = useState({ email: "", password: "" });
  const onChangeHandler = (text, name) => {
    const copyuser = { ...user };
    copyuser[name] = text;
    setUser(copyuser);
  };

  const { signIn, err } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          borderColor: "lightgrey",
          marginLeft: "38%",
          borderWidth: 0.5,
          borderRadius: "50%",
          height: 100,
          width: 100,
          alignItems: "center",
          paddingTop: 5,
          backgroundColor: "#FF3371",
        }}
      >
        <Ionicons name="person-outline" size={65} color="lightgrey" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        type="email"
        value={user.email}
        onChangeText={(text) => onChangeHandler(text, "email")}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={user.password}
        onChangeText={(text) => onChangeHandler(text, "password")}
      ></TextInput>
      <Text>{err("login")}</Text>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          signIn(user);
        }}
      >
        <Text style={styles.textButton}>Sign In</Text>
      </TouchableHighlight>
      <View
        stylee={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: "grey",
            marginLeft: 100,
            marginTop: 10,
          }}
        >
          Do not have an account?
        </Text>
      </View>
      <View>
        <TouchableHighlight
          style={{
            color: "grey",
            height: 35,
            width: 100,

            //     paddingTop: 20,
            marginLeft: 130,
            marginTop: 10,
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("sign-up")}
        >
          <Text
            style={{
              color: "grey",
              fontSize: 20,
              paddingLeft: 12,
            }}
            onPress={() => navigation.navigate("sign-up")}
          >
            Sign Up
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  input: {
    height: 45,
    fontSize: 25,
    width: "80%",
    textAlign: "center",
    marginTop: 25,
    borderBottomColor: "black",
    borderWidth: 0.25,
    marginLeft: "10%",
  },
  button: {
    borderColor: "black",
    width: "60%",
    borderRadius: "50%",
    height: 45,
    marginTop: 15,
    backgroundColor: "#FF3371",
    marginLeft: 70,
  },
  textButton: {
    padding: 7,
    textAlign: "center",
    fontSize: 23,
    color: "lightgrey",
  },
  text: {},
});
//name, price, date, and image link.
