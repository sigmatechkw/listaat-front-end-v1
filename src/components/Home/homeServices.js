import axios from "axios";
import {store} from "../../store";
import toast from "react-hot-toast";
import {getCookie} from "cookies-next";

const state = store.getState()

export const getOnlineUsersStatistics = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users/online-statistics`, {
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
