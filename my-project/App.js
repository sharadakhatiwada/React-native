import { useReducer, useEffect, useMemo, createContext, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./components/Home";
import Login from "./components/Login";

export const AuthContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [userInfo, setUserInfo] = useState({
    user: {},
    token: "",
    error: {
      signUp: "",
      login: "",
    },
  });

  useEffect(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      let user = JSON.parse(await AsyncStorage.getItem("person"));

      setUserInfo({
        user,
        token,
        error: { signUp: "", login: "" },
      });
    } catch (e) {
      setUserInfo({
        user: {},
        token: "",
        error: { signUp: "", login: "" },
      });
    }
  }, []);

  async function commonSign(user, path) {
    try {
      let { data } = await axios.post(`http://localhost:3000/${path}`, user, {
        headers: {
          "content-type": "application/json",
        },
      });
      setUserInfo({ user: data.person, token: data.token });
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("person", JSON.stringify(data.person));
    } catch (err) {
      if (path === "login") {
        setUserInfo({
          ...userInfo,
          error: { ...userInfo.error, login: err.response.data },
        });
      } else {
        setUserInfo({
          ...userInfo,
          error: { ...userInfo.error, signUp: err.response.data },
        });
      }
    }
  }

  const authContext = {
    signIn: async (user) => {
      commonSign(user, "login");
    },
    signOut: () => {
      setUserInfo({
        user: {},
        token: "",
        isLoading: false,
        error: {
          login: "",
          signUp: "",
        },
      });

      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("person");
    },
    signUp: async (data) => {
      commonSign(data, "signUp");
    },
    err: (type) => {
      return userInfo.error[type];
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {!userInfo.token ? (
            <Stack.Screen
              name="sign-in"
              component={Login}
              options={{
                title: "login",
                // animationTypeForReplace: userInfo.isSignout ? "pop" : "push",
              }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
