import axios from "axios";
import {getCookie} from "cookies-next";
import toast from "react-hot-toast";
import {store} from "../../store";

const state = store.getState()

export const fetchChatsList = async (page, search) => {
  let params = {
    paginate: 1,
    page: page.pageParam + 1,
    search: search
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}live-chats`, {
      params,
      headers: {
        'Authorization': getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}

export const fetchChatMessages = async (id) => {
  let params = {
    chat_id: id,
    // paginate: 1,
    // page: page.pageParam + 1,
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}live-chats/messages`, {
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

export const readChatMessages = async (id) => {
  let data = {
    chat_id: id,
  }

  try {
    await axios.put(`${process.env.NEXT_PUBLIC_API_KEY}live-chats/read`, data, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })
  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}
