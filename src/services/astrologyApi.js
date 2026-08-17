import axios from "axios";

export const countryList = async () => {
  try {
    const countries = await axios.get('https://www.astroved.com/new/json/Countries.json')
    return countries.data.Countries;
  }
  catch (err) {
    console.log('countrylist do not fetch')
  }
};

export const cityList = async (countryName, cityName) => {
  try {
    const cities = await axios.get(`https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry/${countryName}/${cityName}`)
    return cities
  } catch (error) {
    console.log('cityList is not able to fetch');
  }
}

export const fetchGemstoneReport = async (birthDetails) => {
  try {
    const report = await axios.post(`${import.meta.env.VITE_GEMSTONE_REPORT_API}`, birthDetails);
    console.log('responce data', report.data)
    return report.data;
  } catch (error) {
    console.error('fetchGemstoneReport is not able to fetch', error);
    throw error;
  }
}