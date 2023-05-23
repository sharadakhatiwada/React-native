import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Food from "./Food";
import AddFood from "./AddFood";
import EditFood from "./EditFood";
import FoodDetails from "./FoodDetals";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FoodList() {
  const navigation = useNavigation();
  const [foods, setFoods] = useState([]);
  const [originalFoods, setOriginalFoods] = useState([]);
  const [search, setSearch] = useState("");
  const fetchAllFoods = async () => {
    try {
      let { data } = await axios.get("http://localhost:3000/foods", {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${await AsyncStorage.getItem("token")}`,
        },
      });
      setFoods(data);
      setOriginalFoods(data);
      navigation.navigate("food-list");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (food) => {
    try {
      const token = await AsyncStorage.getItem("token");
      let res = await axios.post(`http://localhost:3000/foods`, food, {
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      });
      fetchAllFoods();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteFood = async (food) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(food);
      let res = await axios.delete(
        `http://localhost:3000/foods/${food._id}`,

        {
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${token}`,
          },
        }
      );
      fetchAllFoods();
    } catch (err) {
      console.log(err);
    }
  };
  const editFood = async (food) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(food);
      let res = await axios.put(
        `http://localhost:3000/foods/${food._id}`,
        food,

        {
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${token}`,
          },
        }
      );
      fetchAllFoods();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const newFoods = originalFoods.filter((food) =>
      food?.name?.toLowerCase()?.includes(search?.toLowerCase())
    );
    setFoods(newFoods);
  }, [search]);
  useEffect(() => {
    fetchAllFoods();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          marginLeft: "38%",

          borderWidth: 0.5,
          borderRadius: "50%",
          height: 100,
          width: 100,
          alignItems: "center",
          paddingTop: 11,
          marginTop: 10,
          backgroundColor: "#FF3371",
        }}
      >
        <Ionicons name="fast-food-outline" size={65} color="lightgrey" />
      </View>

      {/* <Ionicons
        name="fast-food-outline"
        size={45}
        color="#000"
        style={{ marginLeft: "45%", marginTop: 3 }}
      /> */}
      <ScrollView>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate("add-food", { handleSubmit })}
        >
          <Text style={styles.textButton}>Add Food</Text>
        </TouchableHighlight>

        <TextInput
          style={styles.input}
          placeholder="Search Here..."
          onChangeText={(text) => setSearch(text)}
        />
        {foods &&
          foods.map((food) => (
            <Food
              key={food._id}
              food={food}
              deleteFood={deleteFood}
              editFood={editFood}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function FoodNavigator() {
  return (
    <Stack.Navigator initialRouteName="food">
      <Stack.Screen
        name="food-list"
        component={FoodList}
        options={{ title: "Food List", headerShown: false }}
      />
      <Stack.Screen name="add-food" component={AddFood} />
      <Stack.Screen name="edit-food" component={EditFood} />
      <Stack.Screen name="food-details" component={FoodDetails} />
    </Stack.Navigator>
  );
}

{
  /* <Stack.Screen name="edit-food" component={EditFood} />;
; */
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    height: 50,
    textAlign: "center",
    fontSize: 20,
    margin: 1,
    borderColor: "grey",
  },
  button: {
    borderWidth: 0.5,
    borderColor: "grey",
    width: "100%",
    height: 40,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "#FF336E",
  },
  textButton: {
    textAlign: "center",
    fontSize: 25,
    color: "lightgrey",
    paddingTop: 5,
  },
});
