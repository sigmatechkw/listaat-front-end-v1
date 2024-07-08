import axios from 'axios'
import { getCookie } from 'cookies-next'

export const fetchPromosDetails = async id => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}promo-codes/${id}`, {
    headers: {
      Authorization: getCookie('token'),
      'Accepted-Language': getCookie('lang') ?? 'en'
    }
  })

  return response.data.data.promo
}
