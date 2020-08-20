import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {

    let changeableUrl = url;

    if (country){
        changeableUrl = `${url}/countries/${country}`;

    }

    
    //all commented code in try block also correct but we code it in shorten form
    try{
        // const {data} = await axios.get(url);
        
        // const modifiedData = {
        //     confirmed: data.confirmed,  
        //     recovered: data.recovered,
        //     death: data.death,
        //     lastUpdate: data.lastUpdate
        // }

        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);

        // const modifiedData = {confirmed, recovered, death, lastUpdate};

        // return modifiedData;

        return {confirmed, recovered, deaths, lastUpdate};

    }catch(error){
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`);

        // const modifiedData = data.map((dailyData) => ({
        //     confirmed: dailyData.confirmed.tottal,
        //     deaths : dailyData.deaths.tottal,
        //     date: dailyData.reportDate
        // }));
        // return modifiedData;

        //upper code is not running error not found
        
        return data.map(({confirmed, deaths, reportDate: date})=>({
            confirmed: confirmed.total, deaths: deaths.total, date
        }));
        

    }catch(error){

    }
}

export const fetchCountries = async () => {
    try{
        const { data : {countries}} = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
          
    }catch(error){
        console.log(error);
    }
}