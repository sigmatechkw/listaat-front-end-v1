import {store} from "../../store";
import axios from "axios";
import {getCookie} from "cookies-next";
import toast from "react-hot-toast";

const state = store.getState()

export const fetchProjectTabTypes = async (page = 1, search, sortKey = 'id', sortType = 'asc', perPage = 10,  isActive = '',setRows, setLoading) => {
  let params = {
    page: page + 1,
    perPage,
    active: isActive,
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}project-tab-type`, {
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

export const fetchProjectTabsTypesAll= async () => {
  try{

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}project-tab-type`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    });

    return response.data.data;

  }catch(err){
    toast.error(err.response?.data?.message)
  }
};