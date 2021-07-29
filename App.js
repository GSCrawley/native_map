import React, {useState, useMemo} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


// COMPONENTS
// 'dimensions' will determine the dimensions of our map to fit the mobile screen


import Map from "./components/Map";

//CONSTANTS
import COLORS from "./constants/Colors";

//FUNCTIONS
import movingAverage from "./functions/movingAverage"

//DATA
import covidData_raw from "./assets/data/who_data.json";

export default function App() {
  const dimensions = Dimensions.get("window");

  const [stat, setStat] = useState("confirmed");

  //Data Manipulation
  const covidData = useMemo(() => {
    const countriesAsArray = Object.keys(covidData_raw).map((key) => ({
      name: key,
      data: covidData_raw[key]
    }));
    
    const windowSize = 7;

    const countriesWithAvg = countriesAsArray.map(country => ({
      name: country.name,
      data: [...movingAverage(country.data, windowSize)]
    }));

    return countriesWithAvg;
  }, []); 
  
  console.log(covidData[0].data[0]);
  
  
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
