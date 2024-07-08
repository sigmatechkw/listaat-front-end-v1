import axios from 'axios'
import toast from 'react-hot-toast'
import { getCookie } from 'cookies-next'

export const fetchSms = async (page = 1, search, sortKey, sortType, perPage = 10, setRows, setLoading) => {
  let params = {
    paginate: 1,
    page: page + 1,
    perPage: perPage
  }

  if (sortKey) {
    params.sortKey = sortKey
  }

  if (search) {
    params.search = search
  }

  if (typeof sortType === 'string') {
    params.sortType = sortType
  }

  try {
    // /configurations
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}sms-methods`, {
      params,
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setRows(response.data.data)
    setLoading(false)
  } catch (err) {
    toast.error(err.response?.data?.message)
    setLoading(false)
  }
}

/* export const deleteSms = async (ids) => {
  console.log('iiii', ids)

  let data = {
    delete_ids: ids
  }

  console.log(data)

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}promo-codes/delete`, data, {
      headers: {
        'Authorization': state.auth.token,
        'Accepted-Language': state.lang ?? 'en'
      }
    })
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}
 */
