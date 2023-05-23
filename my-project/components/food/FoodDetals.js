import { TextInput, View, Text, StyleSheet, Image } from "react-native";

export default function FoodDetails({ route }) {
  const { food } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: food.image }}
        style={{
          height: 200,
          width: 200,
          borderRadius: "10%",
          marginLeft: "20%",
        }}
      />

      <Text style={styles.text}>Name: {food.name}</Text>

      <Text style={styles.text}>Price: {food.price}</Text>
      <Text style={styles.text}>Date: {food.createdDate}</Text>

      {food.updatedDate && (
        <Text style={styles.text}>Last Updated: {food.updatedDate}</Text>
      )}
      <Text style={styles.text}>Origin: {food.origin}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  input: {
    height: 35,
    textAlign: "center",
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
    margin: 5,
    textAlign: "center",
    color: "grey",
  },
});
