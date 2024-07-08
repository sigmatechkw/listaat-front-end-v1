import axios from "axios";
import {store} from "../../store";
import toast from "react-hot-toast";

const state = store.getState()

export const getOnlineUsersStatistics = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users/online-statistics`, {
      headers: {
        'Authorization': state.auth.token,
        'Accepted-Language': state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (err) {
    toast.error(err.response?.data?.message)

    return null
  }

}
