import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import COLORS from "../constants/Colors";

const Button = props => {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <Text style ={styles.text}>{props.text}</Text>
            </TouchableOpacity>
        </View>
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

export default Button