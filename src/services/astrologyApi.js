import axios from "axios";

export const countryList = async () => {
  try {
    const countries = await axios.get('https://www.astroved.com/new/json/Countries.json')
    return countries.data.Countries;
  }
  catch (err) {
    console.error('countrylist do not fetch', err)
  }
};

export const cityList = async (countryName, cityName) => {
  try {
    const cities = await axios.get(`https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry/${countryName}/${cityName}`)
    return cities
  } catch (error) {
    console.error('cityList is not able to fetch', error);
  }
}

export const fetchGemstoneReport = async (birthDetails) => {
  try {
    const report = await axios.post(`${import.meta.env.VITE_GEMSTONE_REPORT_API}`, birthDetails);
    // console.log('responce data', report.data)
    return report.data;
  } catch (error) {
    console.error('fetchGemstoneReport is not able to fetch', error);
    throw error;
  }
}

export const getTimeZone = async () => {
  try {
    const timezone = await axios.get('https://www.astroved.com/new/Home/GetLocationBasedOnIp')
    console.log(timezone.data.timeZone, "Timezone")
    return timezone
  }
  catch (err) {
    console.error("Timezone Fetch Failed", err)
  }
}