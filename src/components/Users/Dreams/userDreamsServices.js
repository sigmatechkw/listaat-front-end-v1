import axios from "axios";
import toast from "react-hot-toast";
import {store} from "../../../store";
import {getCookie} from "cookies-next";

const state = store.getState()

export const fetchUserDreams = async (id, roleId, page = 1, search, sortKey = 'id', sortType = 'desc', perPage = 10, type = '', status = '', isLate = '', isPublic = '', isPaid = '', setRows, setLoading) => {
  let params = {
    paginate: 1,
    page: page + 1,
    perPage,
    type,
    status,
    isLate,
    isPublic,
    isPaid,
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
    let url = `${process.env.NEXT_PUBLIC_API_KEY}dreams/${id}/user`

    if(roleId  === 3) {
      url = `${process.env.NEXT_PUBLIC_API_KEY}dreams/${id}/expert`
    }

    const response = await axios.get(url, {
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
