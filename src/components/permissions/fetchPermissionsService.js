import axios from 'axios'
import toast from 'react-hot-toast'
import { store } from '../../store'
import { getCookie } from 'cookies-next'

const state = store.getState()

export const fetchPermissions = async (page = 1, search, sortKey, sortType, perPage = 10, setRows, setLoading) => {
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}permissions`, {
      params,
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    const reformattedArray = []
    for (const group in response.data.data.items) {
      if (response.data.data.items.hasOwnProperty(group)) {
        response.data.data.items[group].forEach(item => {
          if (!reformattedArray.some(el => el.id === item.id)) {
            reformattedArray.push({ id: item.id, name: item.group_name })
          }
        })
      }
    }

    setRows(reformattedArray)
    setLoading(false)
  } catch (err) {
    toast.error(err.response?.data?.message)
    setLoading(false)
  }
}
