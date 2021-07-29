import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


// COMPONENTS
// 'dimensions' will determine the dimensions of our map to fit the mobile screen


import Map from "./components/Map";

//CONSTANTS
import COLORS from "./constants/Colors";

export default function App() {
  const dimensions = Dimensions.get("window");

  return (
    <View style={styles.container}>
        <Map
          dimensions={dimensions} 
        />       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
