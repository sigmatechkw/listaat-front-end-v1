import axios from "axios";
import {getCookie} from "cookies-next";
import toast from "react-hot-toast";
import {store} from "../../store";

const state = store.getState()

export const fetchNotifications = async (page) => {
  let params = {
    paginate: 1,
    page: page.pageParam + 1
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}user/notifications`, {
      params,
      headers: {
        'Authorization': getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data
    // setRows(response.data.data)
    // setLoading(false)
  } catch (err) {
    toast.error(err.response?.data?.message)
    // setLoading(false)
  }
}
