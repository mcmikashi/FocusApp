import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
const RoundedButton = ({
    title,
    style={},
    textstyle={},
    size=40,
    ...props
    }) => {
  return (
    <TouchableHighlight style={[styles(size).button, style]} onPress={props.onPress} >
        <Text style={[styles(size).text, textstyle]}>{title}</Text>
    </TouchableHighlight>

  )
}
export default RoundedButton

const styles = (size) => 
StyleSheet.create({
    button: {
        borderRadius: size / 2,
        width: size,
        heigth: size,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:colors.buttonDefault,
        padding:10,
        marginHorizontal:5,
    },
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: '900',
    },
});
