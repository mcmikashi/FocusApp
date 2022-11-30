import { StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";
import RoundedButton from "../components/RoundedButton";
const Focus = ({ validateFocus }) => {
  const [tempFocus, settempFocus] = useState("");
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.textinput}
          placeholder="What did you want to focus on ?"
          onChangeText={settempFocus}
          value={tempFocus}
        />
        <RoundedButton
          title="Go"
          size={60}
          onPress={() => validateFocus(tempFocus)}
        />
      </View>
    </View>
  );
};

export default Focus;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  textinput: {
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
    padding: 8,
    width: "75%",
  },
});
