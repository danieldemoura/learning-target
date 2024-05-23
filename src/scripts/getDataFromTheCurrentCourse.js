import { fetchData } from "../api/fetchData.js"

export const getDataFromTheCurrentCourse = 
    async endpoint => await fetchData(endpoint)
