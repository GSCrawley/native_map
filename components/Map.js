import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// LIBRARIES
import Svg, { G, Path, Circle } from 'react-native-svg';
import * as d3 from "d3";

//CONSTANTS
import { COUNTRIES } from "../constants/countryShapes";
import COLORS from "../constants/Colors";

const Map = props => {
    
    const [countryList, setCountryList] = useState([]);

    const {
        dimensions,
        data,
        date,
        colorize
    } = props;

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
                    return (
                        <Path 
                            key={COUNTRIES[i].properties.country}
                            d={path}
                            stroke={COLORS.borders}
                            strokeWidth={0.6}
                            strokeOpacity={0.3}
                            fill={COLORS.greyDark}
                            opacity={0.4}
                            />
                    )
                })
            )
        })
        
        return (
            <View>
                <Svg
                    width={dimensions.width}
                    height={dimensions.height /2} 
                    // style={styles.svg}
                    >
                        <G>
                            <Circle
                                cx={dimensions.width /2}
                                cy={mapExtent /2}
                                r={mapExtent /2.1}
                                fill={COLORS.ocean} 
                                />
                        {countryList.map(x => x)}
                        </G>
                    </Svg>
            </View>
    );
    }

// const styles = StyleSheet.create({
//     svg: {
//     }
  
// });

export default Map;