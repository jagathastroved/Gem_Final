import axios from "axios";
import { getMockReportByDetails } from "../data/mockGemstoneReport.js";

/**
 * Single service file, single exported function.
 * Connects to astrology computation engine or returns structured calculation mock.
 */
export async function getGemstoneReport(birthDetails) {
  // Simulate quick API latency if needed or return immediately
  return new Promise((resolve) => {
    setTimeout(() => {
      const report = getMockReportByDetails(birthDetails);
      resolve(report);
    }, 400);
  });
}

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