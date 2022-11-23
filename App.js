import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Focus from "./src/features/Focus";
import Historic from "./src/features/Historic";
import Timers from "./src/features/Timers";
import { colors } from "./src/utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [focusSubject, setfocusSubject] = useState(null);
  const [focusList, setfocusList] = useState([]);
  const [finishedFocus, setfinishedFocus] = useState(null);

  const savefocusListHistoric = async (focusList) => {
    try {
      const jsonFocusList = JSON.stringify(focusList);
      await AsyncStorage.setItem("focusListHistoric", jsonFocusList);
    } catch (e) {
      console.log(e);
    }
  };
  const loadfocusListHistoric = async () => {
    try {
      const jsonFocusList = await AsyncStorage.getItem("focusListHistoric");
      jsonFocusList != null ? setfocusList(JSON.parse(jsonFocusList)) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const validateFocus = (newFocus) => {
    setfocusSubject({ id: uuidv4(), title: newFocus, status: false });
  };
  const historicFocus = (oldFocus) => {
    setfocusSubject(oldFocus);
  };
  function timerEnd(focusSubject) {
    setfocusSubject(null);
    setfinishedFocus(focusSubject);
  }
  function resetFocusSubject(unfinishedFocus) {
    const result = focusList.find(({ id }) => id === unfinishedFocus.id);
    if (!result) {
      setfocusList((previousList) => [...previousList, unfinishedFocus]);
    }
    setfocusSubject(null);
  }
  function clearHistory() {
    setfocusList(() => []);
  }
  useEffect(() => {
    if (finishedFocus) {
      const result = focusList.find(({ id }) => id === finishedFocus.id);
      if (result) {
        result.status = true;
        setfocusList((previousList) => [...previousList]);
      } else {
        setfocusList((previousList) => [
          ...previousList,
          { ...finishedFocus, status: true },
        ]);
      }
    }
  }, [finishedFocus]);
  useEffect(() => {
    savefocusListHistoric(focusList);
  }, [focusList]);
  useEffect(() => {
    loadfocusListHistoric();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timers
          focusSubject={focusSubject}
          timerEnd={timerEnd}
          backToSetFocus={resetFocusSubject}
        />
      ) : (
        <View>
          <Focus validateFocus={validateFocus} />
          <Historic
            focusSubject={historicFocus}
            focusList={focusList}
            clearHistory={clearHistory}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 25,
    justifyContent: "space-between",
    height: "100%",
  },
});
