import axios from 'axios'

export const getRecipiesByName = async (name) => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://www.themealdb.com/api/json/v1/1/search.php',
      params: { s: `${name}` },
    })
    const data = response.data
    return data
  } catch (error) {
    console.error(error)
    return error.response
  }
}

export const getCategories = async () => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
    })
    return response
  } catch (error) {
    console.error(error)
    return error.response
  }
}

export const getRecipiesByCatgory = async (name) => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://www.themealdb.com/api/json/v1/1/filter.php',
      params: { c: `${name}` },
    })
    return response
  } catch (error) {
    console.error(error)
    return error.response
  }
}
