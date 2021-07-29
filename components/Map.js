import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// LIBRARIES
import Svg, { G, Path, Circle } from 'react-native-svg';
import * as d3 from "d3";

//CONSTANTS
import { COUNTRIES } from "../constants/countryShapes";

const Map = props => {
    
    const [countryList, setCountryList] = useState([]);
    const {
        dimensions
    } = props;

    // Create Map Paths
    // useMemo hook creates a constant that will only change with changing dependencies. in this case I am making sure the dimensions of the map will always fill half the screen
    
    const mapExtent = useMemo(() => {
        return dimensions.width > dimensions.height /2 ? dimensions.height / 2 : dimensions.width;
    }, [dimensions]);
    
    const countryPaths = useMemo(() => {
        const projection = d3.geoAzimuthalEqualArea()
            .center([180,-180])
            .rotate([0,-90])
            .fitSize([mapExtent,mapExtent], {type: "FeatureCollection", features: COUNTRIES})
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
                        key={COUNTRIES[i].properties.name}
                        d={path}
                        stroke="blue"
                        strokeWidth={1}
                        fill="#aaa"
                        />
                )
            })
        )
    })
    
    return (
        <View style={styles.container}>
            <Svg
                width={dimensions.width}
                height={dimensions.height /2}>
                    <G>
                    {countryList.map(x => x)}
                    </G>
                </Svg>
        </View>
  );
}

const styles = StyleSheet.create({
  
});

export default Map;