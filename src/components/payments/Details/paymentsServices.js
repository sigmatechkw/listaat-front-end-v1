import axios from 'axios'
import { getCookie } from 'cookies-next'

export const fetchPaymentsDetails = async id => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}payment-methods/${id}`, {
    headers: {
      Authorization: getCookie('token'),
      'Accepted-Language': getCookie('lang') ?? 'en'
    }
  })

  return response.data.data.items
}
