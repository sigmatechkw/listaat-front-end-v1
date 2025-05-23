import axios from 'axios'
import toast from 'react-hot-toast'
import { getCookie } from 'cookies-next'

export const fetchCountries = async (page = 1, search, sortKey, sortType, perPage = 10, setRows, setLoading) => {
  let params = {
    paginate: 1,
    page: page + 1,
    perPage: perPage
  }

  if (sortKey) {
    params.sortKey = sortKey
  }

  if (search) {
    params.search = search
  }

  if (typeof sortType === 'string') {
    params.sortType = sortType
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}countries`, {
      params,
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    console.log(response.data.data);
    setRows(response.data.data)
    setLoading(false)
  } catch (err) {
    toast.error(err.response?.data?.message)
    setLoading(false)
  }
}

export const fetchCountriesInfinityQuery = async ({ pageParam = 1, queryKey }) => {

  try{ 
    const [_, searchTerm] = queryKey;

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}countries`, {
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
    
    return response.data.data
  }catch(err) { 
    toast.error(err.response?.data?.message)
  }
}

