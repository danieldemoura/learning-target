export const saveDataIntoLocalStorage = (key, value) => localStorage.setItem(key, value)
export const getDataJSONFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key))
export const hasDataIntoLocalStorage = () => Boolean(localStorage.getItem('courses'))