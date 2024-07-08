import {store} from "../../store";
import axios from "axios";
import {getCookie} from "cookies-next";
import toast from "react-hot-toast";
import {t} from "i18next";

const state = store.getState()

export const fetchExpertTransactions = async (page = 1, search, sortKey = 'id', sortType = 'desc', perPage = 10, paid = '', expert = '', setRows, setLoading) => {
  let params = {
    paginate: 1,
    page: page + 1,
    perPage,
    paid,
    expert_id: expert?.id
  }

  if (search) {
    params.search = search
  }

  if (sortKey) {
    params.sortKey = sortKey
  }

  if (typeof sortType === 'string') {
    params.sortType = sortType
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}experts-transactions`, {
      params,
      headers: {
        'Authorization': getCookie('token'),
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

export const deleteExpertTransactions = async (ids) => {
  let data = {
    delete_ids: ids
  }

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}experts-transactions/delete`, data, {
      headers: {
        'Authorization': getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const payExpertTransactions = async (ids) => {
  let data = {
    ids: ids
  }

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}experts-transactions/pay`, data, {
      headers: {
        'Authorization': getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const exportExpertsTransactions = async () => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}experts-transactions/export`, {}, {
      headers: {
        'Authorization': getCookie('token'),
        'Content-disposition': 'attachment'
      }
    })
    toast.success(t('success'))
  } catch (err) {
    // toast.error(err.response.data.message)
  }
}

export const fetchExpertsTransactionsStatistics = async (expertId) => {
  let params = ''
  if (expertId) {
    params = `?expert_id=${expertId}`
  }
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}experts-transactions/statistics${params}`, {
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
