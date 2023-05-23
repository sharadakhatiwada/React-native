import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Ionicons } from "@expo/vector-icons";

//import files
import FoodNavigator from "./food/FoodList";
import NotesNavigator from "./Notes/Noteslist";
import Profile from "./Persons/Profile";

const Tab = createBottomTabNavigator();
export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="foods"
        component={FoodNavigator}
        options={{
          tabBarIcon: () => (
            <Ionicons name="fast-food" size={24} color="black" />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="notes"
        component={NotesNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="note" size={24} color="black" />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: () => <Ionicons name="person" size={24} color="black" />,
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
//<Stack.Screen name="food-details" component={CourseDetails} />
//<Stack.Screen name="Edit-food" component={EditCourse} />
//<Stack.Screen name="Add Course" component={AddCourse} />
