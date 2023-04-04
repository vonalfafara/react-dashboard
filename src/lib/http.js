import axios from "axios"

const http = axios.create({
  baseURL: "https://covid-19-statistics.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
  }
})

export default http