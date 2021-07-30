import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// LIBRARIES
import Svg, { G, Path, Circle } from 'react-native-svg';
import * as d3 from "d3";
import {
    PanGestureHandler, 
    PinchGestureHandler,
    State
} from 'react-native-gesture-handler'

//CONSTANTS
import { COUNTRIES } from "../constants/countryShapes";
import COLORS from "../constants/Colors";

const Map = props => {
    
    const [countryList, setCountryList] = useState([]);
    const [translateX, setTranslateX] = useState([0]);
    const [translateY, setTranslateY] = useState([0]);


    const {
        dimensions,
        covidData,
        date,
        colorize,
        stat
    } = props;


    //Gesture Handlers
    const PanGestureHandler = event => {
        setTranslateX(event.nativeEvent.translationX);
        setTranslateY(event.nativeEvent.translationY);

    };

    // Create Map Paths
    // useMemo hook creates a constant that will only change with changing dependencies. in this case I am making sure the dimensions of the map will always fill half the screen. it will matter once the
    
    const mapExtent = useMemo(() => {
        return dimensions.width > dimensions.height /2 ? dimensions.height / 2 : dimensions.width;
    }, [dimensions]);
    
    const countryPaths = useMemo(() => {
        const clipAngle = 155;
        const projection = d3.geoAzimuthalEqualArea()
            .center([180,-180])
            .rotate([0,-90])
            .fitSize([mapExtent,mapExtent], {type: "FeatureCollection", features: COUNTRIES})
            .clipAngle(clipAngle)
            .translate([dimensions.width / 2, mapExtent / 2]);

        const geoPath = d3.geoPath().projection(projection);

        const windowPaths = COUNTRIES.map(geoPath);

        return windowPaths;
    }, [dimensions]); 

        useEffect(() => {
            setCountryList(
                countryPaths.map((path, i) => {
                    const curCountry = COUNTRIES[i].properties.name;

                    const isCountryNameInData = covidData.some(country => country.name === curCountry);

                    const curCountryData = isCountryNameInData 
                        ? covidData.find(country => country.name === curCountry)["data"]
                        : null;
                    
                    const isDataAvailable = isCountryNameInData
                        ? curCountryData.some(covidData => covidData.date === date)
                        : false;
                    
                    const dateIndex = isDataAvailable
                        ? curCountryData.findIndex(x => x.date === date)
                        : null;


                    return (
                        <Path 
                            key={COUNTRIES[i].properties.name}
                            d={path}
                            stroke={COLORS.greyLight}
                            strokeWidth={0.6}
                            strokeOpacity={0.5}
                            fill={
                                isDataAvailable 
                                    ? colorize(curCountryData[dateIndex][stat]) 
                                    : COLORS.greyLight
                            }
                            opacity={isDataAvailable ? 1 : 0.4}
                            />
                    )
                })
            )
        }, []);
        
        return (
            <View>
                <PanGestureHandler
                    onGestureEvent={(e) => panGestureHandler(e)}
                    >
                    <Svg
                    width={dimensions.width}
                    height={dimensions.height /2} 
                    // style={styles.svg}
                    >
                        <G
                            transform={`translate(${translateX},${translateY})`}
                            >
                            <Circle
                                cx={dimensions.width /2}
                                cy={mapExtent /2}
                                r={mapExtent /2.1}
                                fill={COLORS.lightPrimary} 
                            />
                            {countryList.map(x => x)}
                        </G>
                    </Svg>
                </PanGestureHandler>
                
            </View>
    );
    }

// const styles = StyleSheet.create({
//     svg: {
//     }
  
// });

export default Map;