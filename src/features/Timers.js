import { StyleSheet, View, Text , Button, Vibration, Platform} from "react-native";
import { useState } from "react";
import ProgressBar from 'react-native-progress/Bar';
import Countdown from "../components/Countdown";
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from "../utils/colors";
import Timing from "./Timing";
const Timers = (
  {focusSubject, timerEnd, backToSetFocus}
  ) => {
  useKeepAwake();
  const DEFAULT_TIMER = 0.10;
  const [choosenTimer, setchoosenTimer] = useState(DEFAULT_TIMER);
  const [isStrarted, setisStrarted] = useState(false);
  const [progress, setProgress] = useState(1)
  const buttonTitle = isStrarted ? 'pause' : 'start'
  const onProgress = (actualProgress) => setProgress(actualProgress);
  const vibrate = () => {
    if (Platform.OS == "android") {
        Vibration.vibrate(5000)
    } else {
      const interval = setInterval(()=>Vibration.vibrate(), 1000)
      setTimeout(() => clearInterval(interval), 5000);
    }
  }
  const onEnd = () => {
    vibrate()
    timerEnd(focusSubject)
    
  }
  const onChangeTimer = (newTimer) => {
    setchoosenTimer(newTimer)
    setisStrarted(false)
    setProgress(1)
  }
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>You are focusing on :</Text>
        <Text style={styles.headingTask}>{focusSubject.title}</Text>
      </View>
      <Countdown minutes={choosenTimer} isPaused={!isStrarted} onProgress={onProgress} onEnd={onEnd}/>
      <ProgressBar style={styles.progressBar} progress={progress} color={colors.primary} height={15} testID="progress-bar"/>
      <Button title={buttonTitle} onPress={() => setisStrarted(!isStrarted)}/> 
      <Timing onChangeTimer={onChangeTimer}/>
      <Button title="back" onPress={() => backToSetFocus(focusSubject)}/>
    </View>
  );
};

export default Timers;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
    height: "75%",
    padding: 10,
  },
  heading: {
    fontSize:20,
    textAlign: "center",
  },
  headingTask: {
    fontSize:25,
    fontWeight:"800",
    textAlign: "center",
  },
  progressBar:{
    width:'100%'
  }
});
