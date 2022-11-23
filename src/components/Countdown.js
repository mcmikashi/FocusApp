import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect, useRef} from 'react'
import { colors } from '../utils/colors';

const minToMillis = (min) => min * 60 * 1000
const formatTime = (time) => time < 10 ? `0${time}` : time
const Countdown = (
    {minutes, isPaused, onProgress, onEnd}
) => {
  const [millis, setMillis] = useState(minToMillis(minutes))
  const leftMinutes = Math.floor(millis / 1000 / 60) % 60
  const leftSeconds = Math.floor(millis / 1000 ) % 60
  const interval = useRef(null)
  const countdown = () =>{
    setMillis((time) =>{
      if (time === 0) {
        clearInterval(interval.current)
        return time
      } else {
        const tiemLeft = time - 1000
        return tiemLeft 
      }
    })
  }
  useEffect(() => {
    if (millis === 0) {
        onEnd()
    }
    onProgress(millis / minToMillis(minutes))
  }, [millis])
  
  useEffect(() => {
    if (isPaused === false){
      interval.current = setInterval(countdown,1000)
      return () => clearInterval(interval.current)
    }
  }, [isPaused])
  useEffect(() => {
    setMillis(minToMillis(minutes))
 }, [minutes])
  return (
    <View style={styles.containerTime}>
      <Text style={styles.currentTime}>{formatTime(leftMinutes)}:{formatTime(leftSeconds)}</Text>
    </View>
  )
}

export default Countdown

const styles = StyleSheet.create({
  containerTime:{
    flex:0.5,
    backgroundColor:colors.primary,
    justifyContent:'center',
    alignContent:'center',
  },
  currentTime:{
    color:'white',
    fontWeight:'900',
    fontSize:50,
    textAlign:'center',
  },
})