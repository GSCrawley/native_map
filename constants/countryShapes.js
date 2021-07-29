import { feature } from "topojson-client";

import countries from "../assets/data/countries-50m.json";

const COUNTRIES = feature(countries, countries.objects.countries)

export default COUNTRIES