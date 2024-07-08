import axios from 'axios'
import { getCookie } from 'cookies-next'

export const fetchCountriesDetails = async id => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}countries/${id}`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    
    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}
