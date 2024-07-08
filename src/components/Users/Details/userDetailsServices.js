import axios from "axios";
import toast from "react-hot-toast";
import {t} from "i18next";
import {store} from "../../../store";
import {getCookie} from "cookies-next";

const state = store.getState()

export const fetchUserDetails = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users/${id}`, {
      headers: {
        'Authorization': getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)

    return null
  }
}

export const deleteUsers = async (ids) => {
  let data = {
    delete_ids: ids
  }

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}users/delete`, data, {
      headers: {
        'Authorization': getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const fetchExpertStatistics = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}experts/${id}/statistics`, {
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
