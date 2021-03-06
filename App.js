import React, {useState, useMemo} from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';


// COMPONENTS
// 'dimensions' will determine the dimensions of our map to fit the mobile screen


import Map from "./components/Map";

//CONSTANTS
import COLORS from "./constants/Colors";

//FUNCTIONS
import movingAverage from "./functions/movingAverage";

//DATA
import covidData_raw from "./assets/data/who_data.json";

//LIBRARIES

import * as d3 from "d3";

export default function App() {
  const dimensions = Dimensions.get("window");

  const [stat, setStat] = useState("avg_confirmed");
  const  [date, setDate] = useState("2020-12-20");

  //Data Manipulation
  const covidData = useMemo(() => {
    const countriesAsArray = Object.keys(covidData_raw).map((key) => ({
      name: key,
      data: covidData_raw[key]
    }));

  //Narrowing down the output to only countries with more than 10 confirmed deaths
        
    const windowSize = 7;

    const countriesWithAvg = countriesAsArray.map(country => ({
      name: country.name,
      data: [...movingAverage(country.data, windowSize)]
    }));

    const onlyCountriesWithData = countriesWithAvg.filter(country =>
      country.data.findIndex((d, _) => d[stat] >= 10) != -1
      );

    return onlyCountriesWithData;
  }, []); 
  
  const maxY = useMemo(() => {
    return d3.max(covidData, (country) =>
    d3.max(country.data, (d) => d[stat])
    );
  }, [stat])

  const colorize = useMemo(() => {
    const colorScale = d3.scaleSequentialSymlog(d3.interpolateOranges) //Symlog allows for '0' 
    .domain([0,maxY]);

    return colorScale;
  })   
  
  return (
    <View style={styles.container}>
        <Map
          dimensions={dimensions} 
          data={covidData}
          date={date}
          colorize={colorize}
          stat={stat}
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
