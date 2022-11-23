import { StyleSheet, View } from "react-native";
import React from "react";
import RoundedButton from "../components/RoundedButton";
const Timing = ({ onChangeTimer }) => {
  let timingButton = [];
  for (let index = 1; index < 5; index++) {
    const valueTime = index * 5;
    timingButton.push(
      <RoundedButton
        key={valueTime}
        title={valueTime.toString()}
        size={65}
        onPress={() => onChangeTimer(valueTime)}
      />
    );
  }
  return <View style={styles.container}>{timingButton}</View>;
};

export default Timing;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
