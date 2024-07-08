import axios from "axios";
import toast from "react-hot-toast";
import {store} from "../../store";
import {getCookie} from "cookies-next";

const state = store.getState()

export const fetchTransactions = async (page = 1, sortKey = 'id', sortType = 'desc', perPage = 10, paid = '', method = '', setRows, setLoading) => {
  let params = {
    paginate: 1,
    page: page + 1,
    perPage
  }

  if (sortKey) {
    params.sortKey = sortKey
  }

  if (typeof sortType === 'string') {
    params.sortType = sortType
  }

  let data = {
    filters: {}
  }

  if (paid !== '') {
    data.filters.paid = paid
  }

  if (method) {
    data.filters.method = method
  }

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}transactions`, data, {
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

export const fetchPaymentMethods = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}payment-methods`, {
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

export const fetchTransactionDetails = async (id, cookies = null) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}transactions/${id}`, {
      headers: {
        'Authorization': cookies?.token ?? state.auth.token,
        'Accepted-Language': cookies?.lang ?? state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)

    return null
  }

}
