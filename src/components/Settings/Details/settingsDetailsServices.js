import axios from 'axios'
import toast from 'react-hot-toast'
import { t } from 'i18next'
import { getCookie } from 'cookies-next'

export const fetchSettingsDetails = async id => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}configurations/${id}/show`, {
    headers: {
      Authorization: getCookie('token'),
      'Accepted-Language': getCookie('lang') ?? 'en'
    }
  })

  return response.data.data.items
}
