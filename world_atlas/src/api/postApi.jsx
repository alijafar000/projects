// country_api = "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"

import axios from "axios" 

const api = axios.create({
    baseURL: "https://restcountries.com/v3.1"
});

//HTTP GET METHOD for getting data using axios

export const getCountryData = () => {
    return api.get("/all?fields=name,population,region,capital,flags");
}


//HTTP GET METHOD for individual getting data using axios
export const getCountryIndData = (name) => {
    return api.get(
        `/name/${name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
    );
}