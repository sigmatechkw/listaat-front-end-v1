import {store} from "../../store";
import axios from "axios";
import {getCookie} from "cookies-next";
import toast from "react-hot-toast";

const state = store.getState()

export const fetchCollections = async (page = 1, search, sortKey = 'id', sortType = 'desc', perPage = 10, isActive = '', user = null, setRows, setLoading) => {
  let params = {
    paginate: 1,
    page: page + 1,
    perPage,
    active: isActive,
  }

  if (user) {
    params.userId = user.id
    params.withoutSystem = 1
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}collections`, {
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

export const fetchCollectionsInfinityQuery = async ({ pageParam = 1, queryKey }) => {
  try {
    const [_ , searchTerm] = queryKey;

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}collections`, {
      params: {
        page: pageParam,
        search: searchTerm,
        paginate : 1,
      },
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })

    return response.data.data;
  }catch(err) {
    toast.error(err.response?.data?.message)
  }
}

export const fetchCollectionsTypes = async () => {
  try {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}collections/get/types`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })

    return response.data.data.items;
  }catch(err) {
    toast.error(err.response?.data?.message)
  }
}

export const deleteCollections = async (ids) => {
  let data = {
    delete_ids: ids
  }

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}collections/delete`, data, {
      headers: {
        'Authorization': getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? state.lang ?? 'en'
      }
    })

  } catch (err) {
    toast.error(err.response?.data?.message)
  }
}
