import axios from "axios";
import toast from "react-hot-toast";
import {store} from "../../../store";
import {getCookie} from "cookies-next";

const state = store.getState()

export const fetchUsersRoles = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}roles`, {
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

export const fetchUsersStatistics = async (dateRange) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users/getStatistics/${dateRange}`, {
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

export const fetchDateRanges = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}getDateRanges`, {
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

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}countries`, {
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
