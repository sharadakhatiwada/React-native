import { useReducer, useEffect, useMemo, createContext, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./components/Home";
import Login from "./components/Login";

export const AuthContext = createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  // const [state, dispatch] = useReducer(
  //   (prevState, action) => {
  //     switch (action.type) {
  //       case "RESTORE_TOKEN":
  //         return {
  //           ...prevState,
  //           userToken: action.token,
  //           isLoading: false,
  //         };
  //       case "SIGN_IN":
  //         return {
  //           ...prevState,
  //           isSignout: false,
  //           userToken: action.token,
  //         };
  //       case "SIGN_OUT":
  //         return {
  //           ...prevState,
  //           isSignout: true,
  //           userToken: null,
  //         };
  //     }
  //   },
  //   {
  //     isLoading: true,
  //     isSignout: false,
  //     userToken: null,
  //   }
  // );

  const [userInfo, setUserInfo] = useState({
    user: {},
    token: "",
    isLoading: true,
    error: {
      signUp: "",
      login: "",
    },
  });

  useEffect(async () => {
    try {
      console.log("WElcome");
      const token = await AsyncStorage.getItem("token");
      let user = JSON.parse(await AsyncStorage.getItem("person"));
      console.log(token);
      setUserInfo({
        user,
        token,
        isLoading: false,
        error: { signUp: "", login: "" },
      });
    } catch (e) {
      setUserInfo({
        user: {},
        token: "",
        isLoading: false,
        error: { signUp: "", login: "" },
      });
    }
  }, []);

  async function commonSign(user, path) {
    try {
      console.log("heeeeee");
      let { data } = await axios.post(`http://localhost:3000/${path}`, user, {
        headers: {
          "content-type": "application/json",
        },
      });

      console.log(" dataaaaa", data.token);
      setUserInfo({ user: data.person, token: data.token, isLoading: false });
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("person", JSON.stringify(data.person));
    } catch (err) {
      console.log(err.response);
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
      // call api to signup and pass token from response to below
      console.log("sign uppppppaDlasjdlas");
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
          {userInfo.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : !userInfo.token ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="sign-in"
              component={Login}
              options={{
                title: "login",
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: userInfo.isSignout ? "pop" : "push",
              }}
            />
          ) : (
            // User is signed in
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
