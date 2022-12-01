import { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, StatusBar} from "react-native";
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

  const loadFocusListHistoric = async () => {
    try {
      const jsonFocusList = await AsyncStorage.getItem("focusListHistoric");
      jsonFocusList != null ? setfocusList(JSON.parse(jsonFocusList)) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const updateFocusListHistoric = async () => {
    try {
      if (focusList.length > 0) {
        const jsonFocusList = JSON.stringify(focusList);
        await AsyncStorage.setItem("focusListHistoric", jsonFocusList);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const removeFocusListHistoric = async () => {
    try {
      await AsyncStorage.removeItem("focusListHistoric");
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
    removeFocusListHistoric();
  }
  function deleteItemFromHistory(itemId) {
    let newFocuslist = focusList.filter((item) => item.id != itemId);
    setfocusList(() => [...newFocuslist]);
    if (focusList.length === 0) {
      removeFocusListHistoric();
    }
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
    updateFocusListHistoric();
  }, [focusList]);
  useEffect(() => {
    loadFocusListHistoric();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'red'}/>
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
            deleteItem={deleteItemFromHistory}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.background,
    padding: 25,
    justifyContent: "space-between",
    height: "100%",
  },
});
