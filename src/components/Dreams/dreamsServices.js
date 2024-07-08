import axios from 'axios'
import toast from 'react-hot-toast'
import { t } from 'i18next'
import { store } from '../../store'
import { getCookie } from 'cookies-next'

const state = store.getState()

export const fetchDreams = async (page = 1, search, sortKey = 'id', sortType = 'desc', perPage = 10, type = '', status = '', isLate = '', isPublic = '', isPaid = '', user = '', setRows, setLoading) => {

  let params = {
    paginate: 1,
    page: page + 1,
    perPage,
    type,
    status,
    isLate,
    isPublic,
    isPaid,
  }

  if (search) {
    params.search = search
  }

  if (user) {
    params.user = user
  }

  if (sortKey) {
    params.sortKey = sortKey
  }

  if (typeof sortType === 'string') {
    params.sortType = sortType
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}dreams`, {
      params,
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })
    setRows(response.data.data)
    setLoading(false)
  } catch (err) {
    toast.error(err.response?.data?.message)
    setLoading(false)
  }
}

export const deleteDreams = async ids => {
  let data = {
    delete_ids: ids
  }

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}dreams/delete`, data, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const exportDreams = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_KEY}dreams/export`,
      {},
      {
        headers: {
          Authorization: getCookie('token'),
          'Content-disposition': 'attachment'
        }
      }
    )
    toast.success(t('success'))
  } catch (err) {
    // toast.error(err.response.data.message)
  }
}

export const fetchDreamsStatistics = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}dreams/statistics`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const fetchDreamsTypes = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}dreams/types`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const fetchDreamsStatuses = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}dreams/statuses`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const fetchDreamsUsers = async (page, search) => {
  let params = {
    paginate: 1,
    page: page.pageParam + 1,
    filters: {role: 2}
  }

  if (search) {
    params.search = search
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users`, {
      params,
      headers: {
        'Authorization': getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}
