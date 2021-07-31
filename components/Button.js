import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Animated} from "react-native";
import COLORS from "../constants/Colors";

const Button = props => {
    return (
        <Animated.View style={ props.buttonStyle}>
            <TouchableOpacity onPress={props.onPress}>
                <Text style ={styles.text}>{props.text}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        fontSize: 12,
        color: COLORS.orange,
        borderRadius: 90,
        backgroundColor: COLORS.primary,
        padding: 50,
        fontWeight: "bold"
    }
});

export default Button;