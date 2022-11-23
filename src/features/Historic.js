import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";
import React from "react";

const Historic = ({ focusList, clearHistory, focusSubject }) => {
  const Item = ({ title, status, onPress }) => (
    <View>
      <Text style={styles.item(status)} onPress={onPress}>
        {title}
      </Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      status={item.status}
      onPress={() => focusSubject(item)}
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
          <Button title="clear" onPress={() => clearHistory()} />
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
});
