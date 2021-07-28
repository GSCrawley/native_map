import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


// COMPONENTS

import Map from "./components/Map";

export default function App() {
  return (
    <View style={styles.container}>
        <Map />       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
