import axios from "axios";
import {getCookie} from "cookies-next";
import toast from "react-hot-toast";
import {store} from "../../store";

const state = store.getState();

export const getDateRanges = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}getDateRanges`, {
      headers: {
        'Authorization': getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

    return response.data.data.items
  } catch (e) {
    toast.error(e.response?.data?.message)
  }
}

export const fetchFaqStatistics = async (dateRange) => {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}faqs/getStatistics/${dateRange}`)

    return response.data.data.items
  } catch (e) {
    toast.error(e.response?.data?.message)
  }
}
