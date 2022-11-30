import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";
import React from "react";
import RoundedButton from "../components/RoundedButton";
const Historic = ({ focusList, clearHistory, focusSubject, deleteItem }) => {
  const Item = ({ title, status, onPress, deleteItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item(status)} onPress={onPress}>
        {title}
      </Text>
      <RoundedButton
        size={30}
        title="X"
        style={styles.deleteButton}
        onPress={deleteItem}
        testID="deleteButton"
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      status={item.status}
      onPress={() => focusSubject(item)}
      deleteItem={() => deleteItem(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things you havent focus on :</Text>
      {focusList.length ? (
        <View>
          <SafeAreaView>
            <FlatList
              data={focusList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
          <Button
            title="clear"
            style={styles.clearButton}
            onPress={() => clearHistory()}
          />
        </View>
      ) : (
        <Text style={styles.simpleText}>Nothing yet</Text>
      )}
    </View>
  );
};

export default Historic;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginVertical: 15,
  },
  item: (status) => ({
    textAlign: "center",
    color: status ? "green" : "red",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
  }),
  simpleText: {
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 1,
  },
  deleteButtonTet: {
    fontSize: 5,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
});
